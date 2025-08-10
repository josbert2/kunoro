import React, { useEffect, useRef } from "react";

const TextMaskVideoHTML = ({
  text = "FIRMA",
  videoSrc,
  tiltDeg = -8,             // rotación del texto
  holdBeforeAnim = 0,       // si quieres que se vea plano unos ms antes de animar
  staggerMs = 100,          // desfase entre letras
  durationMs = 900,         // duración de subida por letra
  risePx = 80,              // cuánto sube cada letra
  weight = 900,
  family = "Geist, sans-serif",
}) => {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const rafRef = useRef(null);

  // easing suave con pequeño rebote
  const easeOutBack = (t, s = 1.2) => {
    const inv = t - 1;
    return 1 + (inv * inv * ((s + 1) * inv + s));
  };

  useEffect(() => {
    const video = document.createElement("video");
    video.src = videoSrc;
    video.muted = true;
    video.loop = true;
    video.playsInline = true;
    videoRef.current = video;

    let started = false;
    const tryPlay = () => {
      if (!started) {
        video.play().catch(() => {});
        started = true;
      }
    };

    video.addEventListener("canplay", tryPlay, { once: true });
    document.addEventListener("click", tryPlay, { once: true });

    const cleanup = () => {
      document.removeEventListener("click", tryPlay);
      video.pause();
      URL.revokeObjectURL?.(videoSrc);
    };
    return cleanup;
  }, [videoSrc]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const container = containerRef.current;
    let startTime = performance.now();

    const resize = () => {
      const dpr = Math.max(1, window.devicePixelRatio || 1);
      const { width, height } = container.getBoundingClientRect();
      canvas.width = Math.max(2, Math.floor(width * dpr));
      canvas.height = Math.max(2, Math.floor(height * dpr));
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const drawCover = (video, cw, ch) => {
      const vw = video.videoWidth || 16;
      const vh = video.videoHeight || 9;
      const scale = Math.max(cw / vw, ch / vh);
      const sw = vw * scale;
      const sh = vh * scale;
      const dx = (cw - sw) / 2;
      const dy = (ch - sh) / 2;
      ctx.drawImage(video, dx, dy, sw, sh);
    };

    const animate = (now) => {
      const elapsed = now - startTime;
      const cw = canvas.width / (window.devicePixelRatio || 1);
      const ch = canvas.height / (window.devicePixelRatio || 1);

      // Fondo (gradiente suave) detrás del video
      const bg = ctx.createLinearGradient(0, 0, 0, ch);
      bg.addColorStop(0, "#efe8ff");
      bg.addColorStop(1, "#efe8ff");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, cw, ch);

      // 1) Pintamos el video "cover"
      if (videoRef.current && (videoRef.current.readyState >= 2)) {
        drawCover(videoRef.current, cw, ch);
      }

      // 2) Cambiamos a modo máscara por texto
      ctx.save();
      ctx.globalCompositeOperation = "destination-in";
      ctx.textBaseline = "alphabetic";
      ctx.textAlign = "left";

      // Ajuste de tamaño de fuente para que quepa
      let fontSize = Math.min(cw * 0.26, ch * 0.7); // base
      ctx.font = `${weight} ${fontSize}px ${family}`;
      const tracking = fontSize * 0.06; // espaciado entre letras

      // Si no cabe, reduce hasta que encaje
      const measureLine = () => {
        let w = 0;
        for (let i = 0; i < text.length; i++) {
          w += ctx.measureText(text[i]).width;
          if (i < text.length - 1) w += tracking;
        }
        return w;
      };
      let totalW = measureLine();
      const maxW = cw * 0.9;
      while (totalW > maxW && fontSize > 10) {
        fontSize *= 0.94;
        ctx.font = `${weight} ${fontSize}px ${family}`;
        totalW = measureLine();
      }

      // Centro + rotación
      const xStart = (cw - totalW) / 2;
      const yBase = ch * 0.6;

      ctx.translate(cw / 2, ch / 2);
      ctx.rotate((tiltDeg * Math.PI) / 180);
      ctx.translate(-cw / 2, -ch / 2);

      // “Plano” antes de animar si se pide
      const animStart = holdBeforeAnim;

      // Dibuja letra por letra con animación suave
      let x = xStart;
      for (let i = 0; i < text.length; i++) {
        const chWidth = ctx.measureText(text[i]).width;

        let yOffset = 0;
        let alpha = 1;

        if (elapsed > animStart) {
          const t = Math.min(
            1,
            Math.max(0, (elapsed - animStart - i * staggerMs) / durationMs)
          );
          const eased = easeOutBack(t);
          yOffset = (1 - eased) * risePx; // sube desde abajo
          alpha = t;                       // entra con leve fade
        } else {
          // antes de animación: letra aún no visible
          alpha = 0;
        }

        ctx.globalAlpha = alpha;
        ctx.fillStyle = "#000"; // color del texto en la máscara (da igual, es una máscara)
        ctx.fillText(text[i], x, yBase + yOffset);

        x += chWidth + tracking;
      }

      ctx.restore();
      ctx.globalAlpha = 1;

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [text, tiltDeg, holdBeforeAnim, staggerMs, durationMs, risePx, weight, family]);

  return (
    <div ref={containerRef} style={styles.container}>
      <canvas ref={canvasRef} style={styles.canvas} />
      {/* gradiente visible sobre el lienzo para “look” más pulido */}
      <div style={styles.vignette} />
    </div>
  );
};

const styles = {
  container: {
    position: "relative",
    width: "100%",
    height: "100vh",
    overflow: "hidden",
    background:
      "linear-gradient(180deg, rgba(246,243,255,1) 0%, rgba(242,240,252,1) 100%)",
  },
  canvas: {
    position: "absolute",
    inset: 0,
    display: "block",
  },
  vignette: {
    position: "absolute",
    inset: 0,
    pointerEvents: "none",
    boxShadow: "inset 0 0 120px rgba(0,0,0,0.08)",
  },
};

export default TextMaskVideoHTML;
