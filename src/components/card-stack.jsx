// OverlapStackStrict.jsx
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

const CARDS = [
  { 
    id: 1, 
    title: "Web Design & Development", 
    subtitle: "WEB DESIGN", 
    category: "WEB DEVELOPMENT",
    year: "2025",
    copy: "Creating stunning digital experiences with modern design principles", 
    cta: "Find out more", 
    color: "#ef8b8b",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&h=800&fit=crop&crop=center"
  },
  { 
    id: 2, 
    title: "E-commerce Builds", 
    subtitle: "DIGITAL COMMERCE", 
    category: "E-COMMERCE",
    year: "2025",
    copy: "Conversion-first storefronts that drive results", 
    cta: "See work", 
    color: "#27b36a",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&h=800&fit=crop&crop=center"
  },
  { 
    id: 3, 
    title: "Brand Systems", 
    subtitle: "BRAND IDENTITY", 
    category: "DESIGN SYSTEMS",
    year: "2025",
    copy: "Comprehensive design libraries & brand guidelines", 
    cta: "Learn more", 
    color: "#4f46e5",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200&h=800&fit=crop&crop=center"
  },
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
          const textY = useTransform(scrollYProgress, [start, end], [30, -30]);
          const imageY = useTransform(scrollYProgress, [start, end], [-50, 50]); // Parallax para imagen
          const titleScale = useTransform(scrollYProgress, [start, end], [0.95, 1.05]);
          const overlayOpacity = useTransform(scrollYProgress, [start, end], [0.4, 0.7]);

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
              {/* Hero card con imagen de fondo y texto superpuesto */}
              <motion.div
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: 24,
                  overflow: "hidden",
                  position: "relative",
                  scale: stackScale, // Escala dinámica basada en scroll
                  willChange: "transform",
                  boxShadow: `
                    0 30px 80px rgba(0,0,0,0.2),
                    0 10px 30px rgba(0,0,0,0.1)
                  `,
                }}
              >
                {/* Imagen de fondo con parallax */}
                <motion.div
                  style={{
                    position: "absolute",
                    inset: 0,
                    backgroundImage: `url(${card.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    y: imageY, // Parallax de imagen
                    scale: 1.1, // Ligeramente más grande para permitir el parallax
                    willChange: "transform",
                  }}
                />

                {/* Overlay con gradiente dinámico */}
                <motion.div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: `linear-gradient(135deg, ${card.color}80 0%, rgba(0,0,0,0.6) 100%)`,
                    opacity: overlayOpacity,
                    willChange: "transform",
                  }}
                />

                {/* Contenido superpuesto */}
                <motion.div
                  style={{
                    position: "relative",
                    zIndex: 2,
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    padding: "4rem",
                    y: textY, // Parallax del contenido
                    willChange: "transform",
                  }}
                >
                  {/* Header con categorías */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div>
                      <div style={{ 
                        fontSize: "0.875rem", 
                        color: "rgba(255,255,255,0.8)", 
                        fontWeight: 600,
                        letterSpacing: "0.1em",
                        textTransform: "uppercase"
                      }}>
                        {card.subtitle}
                      </div>
                      <div style={{ 
                        fontSize: "0.875rem", 
                        color: "rgba(255,255,255,0.6)", 
                        fontWeight: 500,
                        letterSpacing: "0.05em",
                        textTransform: "uppercase",
                        marginTop: "0.25rem"
                      }}>
                        {card.category}
                      </div>
                    </div>
                    <div style={{ 
                      fontSize: "0.875rem", 
                      color: "rgba(255,255,255,0.8)", 
                      fontWeight: 600 
                    }}>
                      {card.year}
                    </div>
                  </div>

                  {/* Título principal con parallax */}
                  <motion.div style={{ flex: 1, display: "flex", alignItems: "center" }}>
                    <motion.h1
                      style={{
                        fontSize: "clamp(3rem, 8vw, 8rem)",
                        fontWeight: 900,
                        color: "#ffffff",
                        margin: 0,
                        lineHeight: 0.9,
                        textTransform: "uppercase",
                        letterSpacing: "-0.02em",
                        scale: titleScale, // Parallax scale del título
                        willChange: "transform",
                        fontFamily: "Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif",
                      }}
                    >
                      {card.title}
                    </motion.h1>
                  </motion.div>

                  {/* Footer con descripción y CTA */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
                    <p style={{
                      color: "rgba(255,255,255,0.9)",
                      fontSize: "1.125rem",
                      lineHeight: 1.6,
                      maxWidth: "400px",
                      margin: 0,
                    }}>
                      {card.copy}
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      style={{
                        padding: "1rem 2rem",
                        borderRadius: "2rem",
                        border: "2px solid rgba(255,255,255,0.3)",
                        background: "rgba(255,255,255,0.1)",
                        color: "#ffffff",
                        cursor: "pointer",
                        fontWeight: 600,
                        fontSize: "0.95rem",
                        backdropFilter: "blur(10px)",
                        transition: "all 0.2s ease",
                      }}
                    >
                      {card.cta}
                    </motion.button>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
