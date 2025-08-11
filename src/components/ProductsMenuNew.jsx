import React, { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";

const PRODUCT_LABELS = ["Air Force 1","Air Jordan 1","Huarache","Dunk","Air Max"];

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
  const [activeIndex, setActiveIndex] = useState(null);
  const stageRef = useRef(null);

  // random transforms for the three boxes per activation
  const [tw, setTw] = useState([
    { x: 0, y: 0, r: 0 },
    { x: 0, y: 0, r: 0 },
    { x: 0, y: 0, r: 0 },
  ]);

  // parallax offsets from pointer (normalized -0.5 .. 0.5)
  const [px, setPx] = useState(0);
  const [py, setPy] = useState(0);

  useEffect(() => {
    if (activeIndex !== null) {
      // new random transforms when a product becomes active - valores más suaves
      setTw([
        { x: rand(-10, 10), y: rand(-10, 10), r: rand(-5, 5) },
        { x: rand(-10, 10), y: rand(-10, 10), r: rand(-5, 5) },
        { x: rand(-10, 10), y: rand(-10, 10), r: rand(-5, 5) },
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

  const onPointerMove = (e) => {
    if (!stageRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    
    // Suavizar el parallax con requestAnimationFrame para evitar temblores
    requestAnimationFrame(() => {
      setPx(nx);
      setPy(ny);
    });
  };

  // Parallax ranges per holder - valores más suaves para menos temblor
  const PR = useMemo(
    () => [
      { prx: -0.2, pry: 0.05 }, // left box - reducido significativamente
      { prx: 0.1, pry: -0.1 }, // right box - reducido significativamente
      { prx: 0.1, pry: 0.1 }, // top box - reducido significativamente
    ],
    []
  );

  const closeMenu = () => {
    setOpen(false);
    setActiveIndex(null);
  };

  return (
    <div className="relative">
      {/* Hamburger Button */}
      <button
        className="inline-flex items-center gap-2 rounded-2xl border px-4 py-2 text-sm font-medium shadow-sm hover:shadow transition"
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />} 
        <span>Menu</span>
      </button>

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

            {/* Panel */}
            <motion.div
              className="absolute inset-0 grid place-items-center"
              initial={{ scale: 0.98, opacity: 0 }}
              animate={{ scale: 1, opacity: 1, transition: spring }}
              exit={{ scale: 0.98, opacity: 0, transition: { duration: 0.15 } }}
            >
              <section className="fluid w-full max-w-5xl text-center">
                <div className="mb-6 flex items-center justify-between px-4">
                  <h2 className="text-xl font-extrabold uppercase tracking-tight text-white">Products</h2>
                  <button
                    className="rounded-full border border-white/20 p-2 shadow hover:shadow-md transition text-white hover:bg-white/10"
                    onClick={closeMenu}
                    aria-label="Cerrar"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <div className="relative" ref={stageRef} onPointerMove={onPointerMove}>
                  {/* List */}
                  <ul className="relative z-10 mx-auto flex w-full max-w-xs flex-col items-stretch gap-2 text-2xl font-extrabold uppercase">
                    {PRODUCT_LABELS.map((label, i) => (
                      <li key={label}>
                        <button
                          type="button"
                          onMouseEnter={() => setActiveIndex(i)}
                          onFocus={() => setActiveIndex(i)}
                          onClick={() => setActiveIndex((prev) => (prev === i ? null : i))}
                          onMouseLeave={() => setActiveIndex(null)}
                          onBlur={(e) => {
                            if (!e.currentTarget.contains(e.relatedTarget)) setActiveIndex(null);
                          }}
                          className="w-full rounded-xl px-3 py-2 text-left tracking-wide text-white/80 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 transition"
                        >
                          <span className={`inline-block transition ${activeIndex === i ? "scale-y-110 text-white" : "opacity-70"}`}>
                            {label}
                          </span>
                        </button>
                      </li>
                    ))}
                  </ul>

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
                    />
                  </div>
                </div>
              </section>
            </motion.div>

            {/* Scoped styles for the image boxes */}
            <style>{`
              .img-box { 
                display: grid; 
                isolation: isolate; 
                box-shadow: 0 1px 2px hsl(0 0% 0% / .2), 0 10px 20px hsl(0 0% 0% / .2);
              }
              .img-box img { 
                width: 100%; 
                height: 100%; 
                object-fit: cover; 
                border-radius: 0.5rem; 
                mix-blend-mode: plus-lighter; 
                opacity: 0; 
                transition: opacity .25s ease;
              }
            `}</style>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function BoxHolder({ pos, activeIndex, imgs, tw, px, py, pr }) {
  // position classes per holder
  const base = "pointer-events-none absolute";
  const holderCls =
    pos === "left"
      ? `${base} left-[8%] top-1/2 -translate-y-1/2`
      : pos === "right"
      ? `${base} right-[8%] top-1/2 -translate-y-1/2`
      : `${base} left-1/2 top-[16%] -translate-x-1/2`;

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
      initial={{ scale: 0 }}
      animate={{ scale: activeIndex !== null ? 1 : 0 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
    >
      <motion.div
        className="img-box w-full h-full"
        animate={{ transform }}
        transition={{ type: "spring", stiffness: 100, damping: 30, mass: 0.8 }}
      >
        {imgs.map((src, i) => (
          <img
            key={src}
            src={src}
            alt=""
            style={{ opacity: activeIndex === i ? 1 : 0, gridArea: "1 / 1" }}
            draggable={false}
          />
        ))}
      </motion.div>
    </motion.div>
  );
}
