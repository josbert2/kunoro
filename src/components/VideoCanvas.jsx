import React, { useEffect, useRef } from "react";

export default function VideoTextCanvas60({
  text = "FIRMA",
  videoSrc,
  options = {},
}) {
  const {
    rotateDeg = -4,
    maxFontPx = 540,
    minFontPx = 64,
    vwFactor = 0.2,
    weight = 900,
    letterSpacingEm = -0.05,
    dxEm = 1.2,
    staggerMs = 100,
    durationMs = 900,
    riseEm = 1.1,
    targetFps = 60, // 👈 objetivo fijo
  } = options;

  const canvasRef = useRef(null);
  const videoRef = useRef(null);
  const rafRef = useRef(null);
  const lastFrameTimeRef = useRef(0);
  const stopRef = useRef(false);

  const metricsRef = useRef({
    letters: [],
    fontSize: 0,
    baseY: 0,
    risePx: 0,
    startTime: 0,
  });

  const easeOut = (t) => 1 - Math.pow(1 - t, 3);

  const buildMetrics = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });

    const dpr = Math.max(1, window.devicePixelRatio || 1);
    const W = Math.floor(window.innerWidth * dpr);
    const H = Math.floor(window.innerHeight * dpr);
    canvas.width = W;
    canvas.height = H;
    canvas.style.width = "100%";
    canvas.style.height = "100%";

    const targetPx = Math.min(maxFontPx, Math.max(minFontPx, window.innerWidth * vwFactor));
    const fontSize = Math.floor(targetPx * dpr);
    const risePx = fontSize * riseEm;
    const baseY = Math.floor(H * 0.5);

    ctx.textBaseline = "middle";
    ctx.textAlign = "left";
    ctx.font = `${weight} ${fontSize}px "Geist", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif`;

    const trackPx = fontSize * letterSpacingEm;
    const dxPx = fontSize * dxEm;

    const letters = [];
    let totalW = 0;
    for (let i = 0; i < text.length; i++) {
      const ch = text[i];
      const w = ctx.measureText(ch).width;
      letters.push({ ch, w });
      totalW += w + (i === 0 ? 0 : dxPx) + trackPx;
    }

    const startX = (W - totalW) / 2;

    let x = startX;
    for (let i = 0; i < letters.length; i++) {
      letters[i].x = x;
      letters[i].delay = i * staggerMs;
      x += letters[i].w + (i === 0 ? 0 : dxPx) + trackPx;
    }

    metricsRef.current = { letters, fontSize, baseY, risePx, startTime: 0 };
  };

  const drawFrame = (now) => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    if (!canvas || !video) return;

    const ctx = canvas.getContext("2d");
    const { letters, fontSize, baseY, risePx } = metricsRef.current;

    if (!metricsRef.current.startTime) {
      metricsRef.current.startTime = now;
    }
    const t = now - metricsRef.current.startTime;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const rot = (rotateDeg * Math.PI) / 180;
    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate(rot);
    ctx.translate(-canvas.width / 2, -canvas.height / 2);

    ctx.fillStyle = "#fff";
    ctx.textBaseline = "middle";
    ctx.textAlign = "left";
    ctx.font = `${weight} ${fontSize}px "Geist", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif`;

    for (const L of letters) {
      const local = Math.max(0, Math.min(1, (t - L.delay) / durationMs));
      if (local <= 0) continue;
      const p = easeOut(local);
      const y = baseY + (1 - p) * risePx;
      const scale = 1 - 0.02 * (1 - p);

      ctx.save();
      ctx.translate(L.x, y);
      ctx.scale(scale, scale);
      ctx.fillText(L.ch, 0, 0);
      ctx.restore();
    }

    ctx.restore();

    // Video "dentro" del texto: siempre pintamos, aunque sea el mismo frame (duplica a 60fps)
    ctx.globalCompositeOperation = "source-in";
    // imageSmoothing no afecta mucho, pero lo dejamos true para escalado
    ctx.imageSmoothingEnabled = true;
    if (video.readyState >= 2) {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    }
    ctx.globalCompositeOperation = "source-over";
  };

  useEffect(() => {
    const onResize = () => {
      buildMetrics();
      metricsRef.current.startTime = 0; // reinicia anim
    };

    buildMetrics();
    window.addEventListener("resize", onResize, { passive: true });

    const v = videoRef.current;
    if (v) {
      v.muted = true;
      v.loop = true;
      v.playsInline = true;
      v.playbackRate = 1;
      // v.crossOrigin = "anonymous"; // si usas otro dominio con CORS
      v.src = videoSrc || "";
      v.play().catch(() => {});
    }

    stopRef.current = false;
    const frameDuration = 1000 / (targetFps || 60);
    const tick = (now) => {
      if (stopRef.current) return;
      // throttle a ~60fps sin perder vsync
      if (now - lastFrameTimeRef.current >= frameDuration - 0.5) {
        // -0.5ms para compensar jitter
        lastFrameTimeRef.current = now;
        drawFrame(now);
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      stopRef.current = true;
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(rafRef.current);
      if (v) {
        v.pause();
        v.src = "";
        v.load();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    text, videoSrc,
    rotateDeg, maxFontPx, minFontPx, vwFactor,
    weight, letterSpacingEm, dxEm, staggerMs, durationMs, riseEm,
    targetFps
  ]);

  return (
    <div
      style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        background: "#000",
        overflow: "hidden",
      }}
    >
      <canvas ref={canvasRef} />
      {/* video fuente, fuera de pantalla */}
      <video ref={videoRef} style={{ position: "absolute", inset: "-9999px", width: 1, height: 1 }} />
    </div>
  );
}
