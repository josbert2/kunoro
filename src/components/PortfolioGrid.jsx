import React, { useEffect, useMemo, useRef } from 'react';


import gourm from '../assets/gourm.jpeg';

// ====== TUNING ======
const GAP_X = '3.5rem';  // ≈ gap-x-14
const GAP_Y = '9rem';    // ≈ gap-y-36 (separación vertical grande)
const CARD_H = 520;      // alto en px (md+). En mobile se ajusta con CSS abajo.
const PARALLAX_PX = 28;  // intensidad del translateY
const ACTIVE_SPLIT = 0.5; // línea (0.5 = mitad del viewport)
const ACTIVE_OFFSET = 0;  // desplazar esa línea en px (negativo = más arriba)
// =====================

const PortfolioGrid = () => {
  const itemsRefs = useRef(new Map());
  const ioRef = useRef(null);

  const portfolioItems = useMemo(() => ([
    { id: 1,  title: "Gourm App",   year: 2025, category: "Branding",  image: gourm },
    { id: 2,  title: "Saudi Lime Green", year: 2025, category: "Marketing", image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=1600&h=1200&fit=crop" },
    { id: 3,  title: "Mobile App",       year: 2025, category: "Development", image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1600&h=1200&fit=crop" },
    { id: 4,  title: "E-commerce",       year: 2025, category: "Digital",     image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1600&h=1200&fit=crop" },
    { id: 5,  title: "Logo Design",      year: 2025, category: "Branding",    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1600&h=1200&fit=crop" },
    { id: 6,  title: "Marketing Suite",  year: 2025, category: "Strategy",    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1600&h=1200&fit=crop" },
  ]), []);

  // Guardar refs
  const setItemRef = (id) => (el) => {
    if (!el) itemsRefs.current.delete(id);
    else itemsRefs.current.set(id, el);
  };

  // Parallax SOLO translateY y se detiene al cruzar la mitad del viewport
  useEffect(() => {
    const update = () => {
      const vh = window.innerHeight;
      const activeY = vh * ACTIVE_SPLIT + ACTIVE_OFFSET;

      itemsRefs.current.forEach((el, idx) => {
        const rect = el.getBoundingClientRect();
        const center = rect.top + rect.height / 2;

        if (center <= activeY) {
          el.style.transform = 'translate3d(0, 0, 0)';
          return;
        }

        const d = (center - activeY) / (vh - ACTIVE_SPLIT * vh); // 0..1+
        const intensity = Math.min(Math.max(d, 0), 1);
        const vary = 0.9 + (idx % 2) * 0.18 + Math.floor(idx / 2) * 0.04;
        const translateY = -(intensity * PARALLAX_PX * vary);

        el.style.transform = `translate3d(0, ${translateY}px, 0)`;
      });
    };

    let raf;
    const onScrollOrResize = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

    window.addEventListener('scroll', onScrollOrResize, { passive: true });
    window.addEventListener('resize', onScrollOrResize, { passive: true });
    onScrollOrResize();
    return () => {
      window.removeEventListener('scroll', onScrollOrResize);
      window.removeEventListener('resize', onScrollOrResize);
      cancelAnimationFrame(raf);
    };
  }, []);

  // Fade-in sutil
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return;
    ioRef.current = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.style.opacity = '1';
          ioRef.current?.unobserve(e.target);
        }
      }),
      { threshold: 0.05, rootMargin: '0px 0px -5% 0px' }
    );
    itemsRefs.current.forEach((el) => {
      el.style.opacity = '0.94';
      ioRef.current?.observe(el);
    });
    return () => ioRef.current?.disconnect();
  }, [portfolioItems.length]);

  return (
    <section className="bg-white text-black py-24 md:py-28 overflow-hidden">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        {/* Header */}
        <div className="text-left md:text-center mb-14 md:mb-20">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight syne-font">Nuestro Portfolio</h2>
          <p className="mt-3 text-neutral-400 max-w-2xl md:mx-auto">Un seleccion de branding y trabajo digital.</p>
        </div>

        {/* Grid separada como la referencia */}
        <div
          className="grid grid-cols-1 md:grid-cols-2"
          style={{ columnGap: GAP_X, rowGap: GAP_Y }}
        >
          {portfolioItems.map((item) => (
            <article key={item.id} className="w-full">
              {/* Card */}
              <div
                ref={setItemRef(item.id)}
                className="group relative w-full overflow-hidden rounded-[28px] md:rounded-[36px] will-change-transform ring-1 ring-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.35)]"
                style={{
                  height: CARD_H,
                  transform: 'translate3d(0,0,0)',
                  transition: 'opacity 300ms ease',
                }}
              >
                {/* Imagen */}
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${item.image})` }}
                />

                {/* Gradiente inferior sutil para legibilidad del caption si lo pones encima */}
                <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />

                {/* Botón pill como en la referencia */}
                <button
                  className="absolute left-6 top-6 md:left-8 md:top-8 bg-white text-neutral-900 text-sm md:text-base font-medium rounded-full px-4 py-2 shadow-lg opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300"
                >
                  View Project
                </button>
              </div>

              {/* Meta debajo, bien separado */}
              <div className="px-1 mt-5 md:mt-7">
                <h3 className="text-2xl md:text-3xl font-semibold tracking-tight syne-font">
                  {item.title}
                </h3>
                <p className="mt-1 text-neutral-400">
                  {item.year} — {item.category}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Reduce motion */}
      <style>{`
        @media (max-width: 768px) {
          /* Cards más bajas en mobile para respirar */
          .${'rounded-[28px]'} { height: auto; } /* no afecta, sólo placeholder */
        }
        @media (prefers-reduced-motion: reduce) {
          .will-change-transform { transform: none !important; }
        }
      `}</style>
    </section>
  );
};

export default PortfolioGrid;
