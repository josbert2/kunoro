

import React, { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

/**
 * ProductsMenu
 * - Fullscreen overlay menu triggered by a hamburger button
 * - Shows a vertical list of products
 * - On hover/focus/tap of each item, three parallax image boxes appear
 * - Works on mobile (tap to activate an item, tap background/close to hide)
 * - Tailwind for layout + a small scoped <style> for the image styling
 */

const NAVIGATION_ITEMS = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Services", path: "/" },
  { label: "Portfolio", path: "/" },
  { label: "Contact", path: "/contacto" },
];

// Three image sets (left, right, top) — each contains one image per product label (same order)
const IMAGE_SETS = [
  [
    "https://assets.codepen.io/605876/air-force-1.jpeg?width=204&height=153&format=auto",
    "https://assets.codepen.io/605876/air-jordan-1.jpeg?width=204&height=153&format=auto",
    "https://assets.codepen.io/605876/huarache-1.jpeg?width=204&height=153&format=auto",
    "https://assets.codepen.io/605876/dunks-1.jpeg?width=204&height=153&format=auto",
    "https://assets.codepen.io/605876/air-max-1.jpeg?width=204&height=153&format=auto",
  ],
  [
    "https://assets.codepen.io/605876/air-force-2.jpeg?width=204&height=153&format=auto",
    "https://assets.codepen.io/605876/air-jordan-2.jpeg?width=204&height=153&format=auto",
    "https://assets.codepen.io/605876/huarache-2.jpeg?width=204&height=153&format=auto",
    "https://assets.codepen.io/605876/dunks-2.jpeg?width=204&height=153&format=auto",
    "https://assets.codepen.io/605876/air-max-2.jpeg?width=204&height=153&format=auto",
  ],
  [
    "https://assets.codepen.io/605876/air-force-3.jpeg?width=204&height=153&format=auto",
    "https://assets.codepen.io/605876/air-jordan-3.jpeg?width=204&height=153&format=auto",
    "https://assets.codepen.io/605876/huarache-3.jpeg?width=204&height=153&format=auto",
    "https://assets.codepen.io/605876/dunks-3.jpeg?width=204&height=153&format=auto",
    "https://assets.codepen.io/605876/air-max-3.jpeg?width=204&height=153&format=auto",
  ],
];

function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const spring = { type: "spring", stiffness: 260, damping: 24 };

export default function ProductsMenu() {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null); // which product is active
  const stageRef = useRef(null);

  // random transforms for the three boxes per activation
  const [tw, setTw] = useState([
    { x: 0, y: 0, r: 0 },
    { x: 0, y: 0, r: 0 },
    { x: 0, y: 0, r: 0 },
  ]);

  // Posiciones calculadas para evitar solapamiento
  const [boxPositions, setBoxPositions] = useState([
    { left: '20%', top: '30%' },
    { left: '70%', top: '60%' },
    { left: '50%', top: '20%' }
  ]);

  // parallax offsets from pointer (normalized -0.5 .. 0.5)
  const [px, setPx] = useState(0);
  const [py, setPy] = useState(0);

  // Función para verificar si dos cajas se superponen (mejorada)
  const checkOverlap = (pos1, pos2, minDistance = 25) => {
    const x1 = parseFloat(pos1.left);
    const y1 = parseFloat(pos1.top);
    const x2 = parseFloat(pos2.left);
    const y2 = parseFloat(pos2.top);
    
    const distance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    return distance < minDistance; // Aumentamos la distancia mínima
  };

  // Función mejorada para generar posiciones que no se toquen
  const generateNonOverlappingPositions = () => {
    const positions = [];
    const maxAttempts = 100;
    
    // Zonas predefinidas más separadas para evitar solapamientos
    const zones = [
      { leftMin: 5, leftMax: 35, topMin: 15, topMax: 75 },   // Zona izquierda
      { leftMin: 65, leftMax: 95, topMin: 15, topMax: 75 },  // Zona derecha  
      { leftMin: 35, leftMax: 65, topMin: 5, topMax: 45 }    // Zona superior centro
    ];
    
    for (let i = 0; i < 3; i++) {
      let attempts = 0;
      let validPosition = false;
      let newPos;
      const zone = zones[i];
      
      while (!validPosition && attempts < maxAttempts) {
        // Generar posición en la zona asignada
        newPos = { 
          left: `${rand(zone.leftMin, zone.leftMax)}%`, 
          top: `${rand(zone.topMin, zone.topMax)}%` 
        };
        
        // Verificar si no se superpone con posiciones existentes
        validPosition = true;
        for (let j = 0; j < positions.length; j++) {
          if (checkOverlap(newPos, positions[j])) {
            validPosition = false;
            break;
          }
        }
        
        attempts++;
      }
      
      // Posiciones de fallback más separadas si no encuentra espacio
      const fallbackPositions = [
        { left: '20%', top: '40%' },
        { left: '80%', top: '40%' },
        { left: '50%', top: '20%' }
      ];
      
      positions.push(newPos || fallbackPositions[i]);
    }
    
    return positions;
  };

  useEffect(() => {
    if (activeIndex !== null) {
      // Generar nuevas posiciones que no se superpongan
      const newPositions = generateNonOverlappingPositions();
      setBoxPositions(newPositions);
      
      // new random transforms when a product becomes active
      setTw([
        { x: rand(-20, 20), y: rand(-20, 20), r: rand(-20, 20) },
        { x: rand(-20, 20), y: rand(-20, 20), r: rand(-20, 20) },
        { x: rand(-20, 20), y: rand(-20, 20), r: rand(-20, 20) },
      ]);
    }
  }, [activeIndex]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
        setActiveIndex(null);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  // Parallax ultra-fluido con interpolación suave
  const onPointerMove = (e) => {
    if (!stageRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    
    // Interpolación suave para movimiento ultra-fluido
    setPx(prev => prev + (nx - prev) * 0.2);
    setPy(prev => prev + (ny - prev) * 0.2);
  };

  // Parallax ranges optimizados para máxima fluidez
  const PR = useMemo(
    () => [
      { prx: -0.3, pry: 0.1 }, // left box - más sutil
      { prx: 0.15, pry: -0.2 }, // right box - más sutil
      { prx: 0.2, pry: 0.25 }, // top box - más sutil
    ],
    []
  );

  const closeMenu = () => {
    setOpen(false);
    setActiveIndex(null);
  };

  return (
    <div className="top-5 right-5 z-50 absolute">
      {/* Hamburger Button */}
      <div
        className="inline-flex items-center gap-2 rounded-2xl cursor-pointer px-4 py-2 text-sm font-medium transition"
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5 stroke-black" />} 
        
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={closeMenu}
            />

            {/* Backdrop con gradiente elegante */}
            <div
              className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black backdrop-blur-md"
              onClick={closeMenu}
            />

            {/* Efectos visuales de fondo */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-conic from-transparent via-white/5 to-transparent rounded-full blur-2xl animate-spin" style={{animationDuration: '20s'}}></div>
            </div>

            {/* Grid pattern overlay */}
            <div 
              className="absolute inset-0 opacity-[0.02]"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
                `,
                backgroundSize: '50px 50px'
              }}
            ></div>

            {/* Content */}
            <div
              className="relative z-10 flex h-full w-full items-center justify-center p-4"
            >
              <section className="fluid w-full max-w-6xl text-center">
                {/* Header mejorado */}
                <div className="mb-12 flex items-center justify-between px-6">
                  <div className="flex flex-col items-start">
                    <h2 className="text-3xl font-black uppercase tracking-wider bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">
                      Products
                    </h2>
                    <div className="mt-2 h-1 w-16 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"></div>
                  </div>
                  <button
                    className="group relative rounded-full border border-white/20 p-3 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/5 backdrop-blur-sm hover:bg-white/10 hover:border-white/40"
                    onClick={closeMenu}
                    aria-label="Cerrar"
                  >
                    <X size={24} className="text-white/80 group-hover:text-white transition-colors" />
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400/20 to-purple-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </button>
                </div>

                <div className="relative" ref={stageRef} onPointerMove={onPointerMove}>
                  {/* Lista de navegación mejorada */}
                  <div className="relative z-20 mx-auto flex w-full max-w-md flex-col items-stretch gap-4">
                    {NAVIGATION_ITEMS.map((item, i) => (
                      <div key={item.label} className="group relative">
                        <Link
                          to={item.path}
                          onMouseEnter={() => setActiveIndex(i)}
                          onFocus={() => setActiveIndex(i)}
                          onClick={closeMenu}
                          onMouseLeave={() => setActiveIndex(null)}
                          onBlur={(e) => {
                            if (!e.currentTarget.contains(e.relatedTarget)) setActiveIndex(null);
                          }}
                          className="group relative w-full overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm px-8 py-6 text-left transition-all duration-75 ease-in hover:border-white/30 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/50 block"
                        >
                          {/* Número del item */}
                          <div className="absolute top-2 right-4 text-xs font-mono text-white/30 group-hover:text-white/50 transition-colors">
                            {String(i + 1).padStart(2, '0')}
                          </div>
                          
                          {/* Nombre del item */}
                          <div className="relative">
                            <span className={`block text-3xl font-black uppercase tracking-wider transition-all duration-50 ease-in ${
                              activeIndex === i 
                                ? "text-white" 
                                : "text-white/70 group-hover:text-white/90"
                            }`}>
                              {item.label}
                            </span>
                            
                            {/* Línea decorativa */}
                            <div className={`mt-3 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 transition-all duration-75 ease-in ${
                              activeIndex === i ? "w-full opacity-100" : "w-0 opacity-0 group-hover:w-4 group-hover:opacity-60"
                            }`}></div>
                          </div>
                          
                          {/* Indicador de estado activo */}
                          {activeIndex === i && (
                            <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-400 to-purple-400 rounded-r-full"></div>
                          )}
                        </Link>
                      </div>
                    ))}
                  </div>

                  {/* Stage holding the three parallax boxes */}
                  <div className="pointer-events-none absolute inset-0">
                    {/* Left holder */}
                    <BoxHolder
                      pos="left"
                      activeIndex={activeIndex}
                      imgs={IMAGE_SETS[0]}
                      tw={tw[0]}
                      px={px}
                      py={py}
                      pr={PR[0]}
                      position={boxPositions[0]}
                    />

                    {/* Right holder */}
                    <BoxHolder
                      pos="right"
                      activeIndex={activeIndex}
                      imgs={IMAGE_SETS[1]}
                      tw={tw[1]}
                      px={px}
                      py={py}
                      pr={PR[1]}
                      position={boxPositions[1]}
                    />

                    {/* Top holder */}
                    <BoxHolder
                      pos="top"
                      activeIndex={activeIndex}
                      imgs={IMAGE_SETS[2]}
                      tw={tw[2]}
                      px={px}
                      py={py}
                      pr={PR[2]}
                      position={boxPositions[2]}
                    />
                  </div>
                </div>
              </section>
            </div>

            {/* Scoped styles for the image boxes */}
            <style>{`
              .img-box img{width:100%;height:100%;object-fit:cover;border-radius:0.5rem;mix-blend-mode:plus-lighter;opacity:0;transition:opacity .25s ease}
              .img-box{display:grid;isolation:isolate;box-shadow:0 1px 2px hsl(0 0% 0% / .2), 0 10px 20px hsl(0 0% 0% / .2)}
            `}</style>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function BoxHolder({ pos, activeIndex, imgs, tw, px, py, pr, position }) {
  // Usar la posición calculada sin solapamiento
  const [currentPosition, setCurrentPosition] = useState(position);

  useEffect(() => {
    if (activeIndex !== null && position) {
      // Usar la posición calculada que no se superpone
      setCurrentPosition(position);
    }
  }, [activeIndex, position]);

  // position classes per holder - ahora con posiciones dinámicas
  const base = "pointer-events-none absolute -translate-x-1/2 -translate-y-1/2";
  const holderCls = base;

  // size responsive
  const size = "w-44 aspect-square sm:w-52 md:w-60";

  // computed transform with parallax + random tweaks
  const tx = tw?.x ?? 0;
  const ty = tw?.y ?? 0;
  const tr = tw?.r ?? 0;
  const offX = (px || 0) * (pr?.prx ?? 0) * 100; // convert to %
  const offY = (py || 0) * (pr?.pry ?? 0) * 100;
  const transform = `translate(${tx + offX}%, ${ty + offY}%) rotate(${tr}deg)`;

  return (
    <motion.div 
      className={`${holderCls} ${size}`}
      initial={{ scale: 0, left: '50%', top: '50%' }}
      animate={{ 
        scale: activeIndex !== null ? 1 : 0, // Se desaparece cuando no hay hover activo
        left: currentPosition?.left || '50%',
        top: currentPosition?.top || '50%'
      }}
      transition={{ 
        scale: { 
          type: "spring", 
          stiffness: 400, 
          damping: 40,
          duration: 0.25
        },
        left: { 
          type: "spring", 
          stiffness: 200, 
          damping: 35, 
          mass: 0.8,
          duration: 0.6
        },
        top: { 
          type: "spring", 
          stiffness: 200, 
          damping: 35, 
          mass: 0.8,
          duration: 0.6
        }
      }}
      style={{ position: 'absolute', zIndex: 1 }} // z-index bajo para no interferir
    >
      <motion.div
        className="img-box w-full h-full"
        animate={{ transform }}
        transition={{ type: "tween", ease: [0.25, 0.46, 0.45, 0.94], duration: 0.4 }}
      >
        {imgs.map((src, i) => (
          <img
            key={src}
            src={src}
            alt=""
            style={{ opacity: activeIndex === i ? 1 : 0, gridArea: "1 / 1" }}
            draggable={false}
          />)
        )}
      </motion.div>
    </motion.div>
  );
}
