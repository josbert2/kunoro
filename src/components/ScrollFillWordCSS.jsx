import { useEffect, useState } from "react";
import { useScroll, useSpring } from "motion/react";

/**
 * Versión alternativa usando CSS mask en lugar de SVG clipPath
 */
export default function ScrollFillWordCSS({
  text = "KUNORO",
  height = 44,
  base = "#777",
  fill = "#fff",
  container = null,
  fontFamily = "After",
  direction = "ltr",
}) {
  // Progreso de scroll (0 → 1)
  const { scrollYProgress } = useScroll(
    container ? { container } : undefined
  );

  // Suavizado
  const smooth = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 28,
    mass: 0.2,
  });

  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const unsub = smooth.on("change", (v) => {
      const p = Math.max(0, Math.min(1, v));
      setProgress(p);
   
    });
    return () => unsub();
  }, [smooth]);

  const fillPercentage = progress * 100;
  const maskPosition = direction === "rtl" 
    ? `${100 - fillPercentage}% 0` 
    : `${fillPercentage}% 0`;

  return (
    <div 
      style={{ 
        position: 'relative',
        width: '100%',
        height: `${height}px`,
        display: 'flex',
        letterSpacing: '0.05em',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden'
      }}
      role="img"
      aria-label={text}
    >
      {/* Capa base (oscura) */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          letterSpacing: '0.05em',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily,
          fontWeight: 900,
          fontSize: `${height * 0.7}px`,
          color: base,
          lineHeight: 1,
        }}
      >
        {text}
      </div>

      {/* Capa llena (clara) con mask */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily,
          fontWeight: 900,
          fontSize: `${height * 0.7}px`,
          color: fill,
          lineHeight: 1,
          maskImage: `linear-gradient(90deg, black ${fillPercentage}%, transparent ${fillPercentage}%)`,
          WebkitMaskImage: `linear-gradient(90deg, black ${fillPercentage}%, transparent ${fillPercentage}%)`,
          maskRepeat: 'no-repeat',
          WebkitMaskRepeat: 'no-repeat',
        }}
      >
        {text}
      </div>

      {/* Debug info */}
      <div 
        style={{ 
          position: 'absolute', 
          bottom: '-20px', 
          left: 0, 
          fontSize: '10px', 
          color: '#666',
          pointerEvents: 'none'
        }}
      >
        {Math.round(fillPercentage)}%
      </div>
    </div>
  );
}
