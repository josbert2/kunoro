// OverlapStackStrict.jsx
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

const CARDS = [
  { id: 1, title: "Web design & development", copy: "Lorem ipsum dolor sit amet…", cta: "Find out more", color: "#ef8b8b" },
  { id: 2, title: "E-commerce builds",        copy: "Conversion-first storefronts.", cta: "See work",     color: "#27b36a" },
  { id: 3, title: "Brand systems",            copy: "Design libraries & guidelines.", cta: "Learn more", color: "#4f46e5" },
];

export default function OverlapStackStrict() {
  const wrapRef = useRef(null);
  const total = CARDS.length + 1; // +1 de respiro al final

  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ["start start", "end end"],
  });

  return (
    <section ref={wrapRef} style={{ height: `${total * 100}vh`, background: "#f3f4f6" }}>
      {/* viewport sticky */}
      <div style={{ position: "sticky", top: 0, height: "100vh", display: "grid", placeItems: "center" }}>
        {/* pila absoluta de CARDS individuales */}
        {CARDS.map((card, i) => {
          const seg = 1 / total;          // tamaño del tramo
          const start = i * seg;
          const end = (i + 1) * seg;

          // Antes de start -> 100% (fuera abajo)
          // Entre start y end -> 100% -> 0%
          // Después de end -> 0% (ya colocada)
          const y = useTransform(
            scrollYProgress,
            [0, start, end, 1],
            ["100%", "100%", "0%", "0%"]
          );

          // Parallax effects para elementos internos
          const textY = useTransform(scrollYProgress, [start, end], [50, -50]);
          const visualY = useTransform(scrollYProgress, [start, end], [-30, 30]);
          const titleScale = useTransform(scrollYProgress, [start, end], [0.9, 1.1]);
          const buttonRotate = useTransform(scrollYProgress, [start, end], [-2, 2]);

          // Stack effect DINÁMICO: las cartas se vuelven pequeñas cuando la siguiente las cubre
          // Cuando la siguiente carta empieza a aparecer, esta se hace pequeña y se centra
          const nextStart = ((i + 1) * seg); // Cuándo empieza la siguiente carta
          const stackScale = useTransform(
            scrollYProgress,
            [start, nextStart, nextStart + 0.2], // Transición de 20% del segmento
            [1, 1, 0.9] // De tamaño normal a 90% cuando la siguiente aparece
          );
          const stackPadding = useTransform(
            scrollYProgress,
            [start, nextStart, nextStart + 0.2],
            [20, 20, 50] // Padding aumenta para centrar la carta
          );

          return (
            <motion.div
              key={card.id}
              style={{
                position: "absolute",
                width: "100vw",
                height: "100vh",
                padding: stackPadding, // Padding dinámico para centrar
                y,
                zIndex: i + 1,
                willChange: "transform",
                transformOrigin: "center center",
              }}
            >
              {/* Inner container con rounded corners y stack effect dinámico */}
              <motion.div
                style={{
                  width: "100%",
                  height: "100%",
                  background: "#ffffff",
                  borderRadius: 24,
                  boxShadow: `
                    0 30px 80px rgba(0,0,0,0.15),
                    0 10px 30px rgba(0,0,0,0.08),
                    inset 0 1px 0 rgba(255,255,255,0.8)
                  `,
                  overflow: "hidden",
                  display: "grid",
                  gridTemplateColumns: "1.2fr 1fr",
                  gap: "4rem",
                  padding: "6rem 4rem",
                  position: "relative",
                  scale: stackScale, // Escala dinámica basada en scroll
                  willChange: "transform",
                }}
              >
                {/* texto izq con parallax */}
                <motion.div 
                  style={{ 
                    alignSelf: "center",
                    y: textY, // Parallax vertical
                    willChange: "transform"
                  }}
                >
                  <motion.h2 
                    style={{ 
                      margin: 0, 
                      fontSize: "clamp(32px,5vw,64px)", 
                      color: "#111827",
                      fontWeight: 700,
                      lineHeight: 1.1,
                      background: `linear-gradient(135deg, #111827 0%, ${card.color} 100%)`,
                      backgroundClip: "text",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      scale: titleScale, // Parallax scale
                      willChange: "transform"
                    }}
                  >
                    {card.title}
                  </motion.h2>
                  <motion.p 
                    style={{ 
                      marginTop: 24, 
                      color: "#6b7280", 
                      maxWidth: 520,
                      fontSize: "1.1rem",
                      lineHeight: 1.6,
                      y: useTransform(scrollYProgress, [start, end], [20, -20]), // Parallax independiente
                      willChange: "transform"
                    }}
                  >
                    {card.copy}
                  </motion.p>
                  <motion.button
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    style={{
                      marginTop: 32,
                      padding: "12px 24px",
                      borderRadius: 999,
                      border: `2px solid ${card.color}`,
                      background: `linear-gradient(135deg, ${card.color}15 0%, ${card.color}25 100%)`,
                      color: card.color,
                      cursor: "pointer",
                      fontWeight: 600,
                      fontSize: "0.95rem",
                      transition: "all 0.2s ease",
                      rotate: buttonRotate, // Parallax rotation
                      willChange: "transform"
                    }}
                  >
                    {card.cta}
                  </motion.button>
                </motion.div>

                {/* tarjeta visual derecha con parallax */}
                <motion.div 
                  style={{ 
                    display: "grid", 
                    alignItems: "end", 
                    position: "relative",
                    y: visualY, // Parallax vertical
                    willChange: "transform"
                  }}
                >
                  <motion.div
                    style={{
                      width: "100%",
                      height: "75%",
                      background: `linear-gradient(135deg, ${card.color} 0%, ${card.color}dd 50%, ${card.color}bb 100%)`,
                      borderRadius: 32,
                      boxShadow: `
                        0 25px 60px ${card.color}40,
                        0 10px 30px ${card.color}30,
                        inset 0 1px 0 rgba(255,255,255,0.3),
                        inset 0 -1px 0 rgba(0,0,0,0.1)
                      `,
                      position: "relative",
                      overflow: "hidden",
                      rotateY: useTransform(scrollYProgress, [start, end], [0, -8]), // Parallax 3D
                      scale: useTransform(scrollYProgress, [start, end], [1, 1.05]), // Parallax scale
                      willChange: "transform"
                    }}
                  >
                    {/* Efecto de brillo con parallax */}
                    <motion.div
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        height: "50%",
                        background: "linear-gradient(180deg, rgba(255,255,255,0.2) 0%, transparent 100%)",
                        borderRadius: "32px 32px 0 0",
                        x: useTransform(scrollYProgress, [start, end], [0, 20]), // Parallax horizontal
                        willChange: "transform"
                      }}
                    />
                  </motion.div>
                  
                  {/* Capas de profundidad con parallax */}
                  {[...Array(2)].map((_, layerIndex) => (
                    <motion.div
                      key={layerIndex}
                      style={{
                        position: "absolute",
                        left: `${2 + layerIndex * 1}%`,
                        right: `${2 + layerIndex * 1}%`,
                        bottom: `${-24 - layerIndex * 8}px`,
                        height: 24,
                        background: layerIndex === 0 ? "#f9fafb" : "#f3f4f6",
                        borderBottomLeftRadius: 24,
                        borderBottomRightRadius: 24,
                        boxShadow: `0 ${6 + layerIndex * 4}px ${16 + layerIndex * 8}px rgba(0,0,0,${0.06 - layerIndex * 0.02})`,
                        opacity: 0.8 - layerIndex * 0.2,
                        y: useTransform(scrollYProgress, [start, end], [0, layerIndex * 10]), // Parallax por capa
                        willChange: "transform"
                      }}
                    />
                  ))}
                </motion.div>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
