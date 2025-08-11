import { useEffect, useId, useState } from "react";
import { useScroll, useSpring } from "motion/react";

/**
 * Palabra que se "llena" con el scroll del contenedor.
 * - text: palabra a mostrar
 * - height: alto del SVG (px)
 * - base: color base (no lleno)
 * - fill: color de la parte llena
 * - container: ref del elemento que scrollea (si se omite, usa viewport)
 * - direction: "ltr" (izquierda a derecha) o "rtl" (derecha a izquierda)
 */
export default function ScrollFillWord({
  text = "KUNORO",
  height = 44,
  base = "#777",
  fill = "currentColor",
  container = null,
  fontFamily = "Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif",
  direction = "ltr",
}) {
  const clipId = useId();
  const viewW = 1000;
  const viewH = 200;

  // Progreso de scroll (0 → 1)
  const { scrollYProgress } = useScroll(
    container ? { container } : undefined
  );

  // Suavizado para que el borde avance fluido
  const smooth = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 28,
    mass: 0.2,
  });

  const [p, setP] = useState(0);
  useEffect(() => {
    const unsub = smooth.on("change", (v) => {
      const progress = Math.max(0, Math.min(1, v));
      setP(progress);
      // Debug: uncomment to see progress in console
      console.log(`ScrollFillWord progress: ${progress.toFixed(3)}`);
    });
    return () => unsub();
  }, [smooth]);

  const clipWidth = p * viewW;
  const rectX = direction === "rtl" ? viewW - clipWidth : 0;
  
  // Debug: Force some progress for testing
  // Uncomment the next 2 lines to test 50% fill
  // const clipWidth = 500; 
  // const rectX = 0;

  return (
    <svg
      width="100%"
      height={height}
      viewBox={`0 0 ${viewW} ${viewH}`}
      role="img"
      aria-label={text}
      style={{ display: "block" }}
    >
      <defs>
        <clipPath id={`${clipId}-clip`}>
          <rect x={rectX} y="0" width={clipWidth} height={viewH} />
        </clipPath>
      </defs>

      {/* Capa base (oscura) */}
      <text
        x="50%"
        y="50%"
        dominantBaseline="middle"
        textAnchor="middle"
        fontFamily={fontFamily}
        fontWeight={900}
        fontSize="140"
        fill={base}
      >
        {text}
      </text>

      {/* Capa llena (clara) recortada por el rect que crece con el scroll */}
      <text
        x="50%"
        y="50%"
        dominantBaseline="middle"
        textAnchor="middle"
        fontFamily={fontFamily}
        fontWeight={900}
        fontSize="140"
        fill={fill}
        clipPath={`url(#${clipId}-clip)`}
      >
        {text}
      </text>
    </svg>
  );
}
