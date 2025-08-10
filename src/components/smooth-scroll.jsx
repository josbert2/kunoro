import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { useLayoutEffect, useRef, useState } from "react";



export default function SmoothScroll({
  children,
  stiffness = 140,
  damping = 24,
  mass = 0.25,
}) {
  const contentRef = useRef(null);

  // Progreso nativo del scroll (0..1)
  const { scrollYProgress } = useScroll();

  // Altura del contenido y alto del viewport
  const [contentH, setContentH] = useState(0);
  const [vh, setVh] = useState(
    typeof window !== "undefined" ? window.innerHeight : 0
  );

  // Medición estable del contenido + viewport (incluye cambios de layout)
  useLayoutEffect(() => {
    if (!contentRef.current) return;

    const el = contentRef.current;
    const measure = () => {
      setContentH(el.scrollHeight);
      if (typeof window !== "undefined") setVh(window.innerHeight);
    };

    measure();

    const ro = new ResizeObserver(measure);
    ro.observe(el);

    window.addEventListener("resize", measure, { passive: true });
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  // Límite máximo a trasladar (px)
  const maxTranslate = Math.max(0, contentH - vh);

  // Calcula y bruto según el progreso, luego lo suaviza con un spring
  const yRaw = useTransform(scrollYProgress, (v) => -v * maxTranslate);
  const y = useSpring(yRaw, {
    stiffness,
    damping,
    mass,
    restDelta: 0.0008,
    restSpeed: 0.01,
  });

  // Accesibilidad: si el usuario prefiere menos movimiento, no aplicamos y
  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  return (
    <>
      {/* Este div 'expande' el documento para mantener la barra de scroll nativa */}
      <div style={{ height: contentH }} aria-hidden />

      {/* Contenido virtualizado: se mueve con transform y queda fijo en viewport */}
      <motion.div
        ref={contentRef}
        className="scrollBody"
        style={prefersReduced ? {} : { y, willChange: "transform" }}
      >
        {children}
      </motion.div>
    </>
  );
}
