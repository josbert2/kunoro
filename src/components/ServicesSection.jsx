import React, { useState, useMemo } from "react";
import { motion } from "motion/react";

// ✅ Componente listo para pegar y usar (Tailwind + motion)
// - Al pasar el mouse por un servicio (derecha), aparece su preview en el "monitor" (izquierda)
// - Incluye soporte para teclado (focus/blur)
// - Puedes personalizar título, descripción e ícono por servicio

const ServicesSection = () => {
  const services = useMemo(
    () => [
      {
        id: "01",
        key: "branding",
        title: "Branding",
        description:
          "We create impactful brand identity that differentiates your business and connects with your audience.",
        icon: (
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 7h18M3 12h18M3 17h18" />
          </svg>
        ),
      },
      {
        id: "02",
        key: "dev",
        title: "Development",
        description:
          "Custom web development built with modern stacks, performance budgets, and best practices.",
        icon: (
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M8 7l-5 5 5 5M16 7l5 5-5 5" />
          </svg>
        ),
      },
      {
        id: "03",
        key: "websites",
        title: "Websites",
        description:
          "Responsive, accessible and fast sites designed to convert visitors into customers.",
        icon: (
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="4" width="18" height="14" rx="2" />
            <path d="M3 9h18" />
          </svg>
        ),
      },
      {
        id: "04",
        key: "uiux",
        title: "UI/UX Design",
        description:
          "User‑centered design and research to craft intuitive, delightful experiences.",
        icon: (
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="9" />
            <path d="M9 10h6M8 15h8" />
          </svg>
        ),
      },
      {
        id: "05",
        key: "mobile",
        title: "Mobile Apps",
        description:
          "Native and cross-platform mobile applications built for iOS and Android.",
        icon: (
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
            <path d="M12 18h.01" />
          </svg>
        ),
      },
      {
        id: "06",
        key: "ecommerce",
        title: "E-commerce",
        description:
          "Complete online stores with payment integration and inventory management.",
        icon: (
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="9" cy="21" r="1" />
            <circle cx="20" cy="21" r="1" />
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
          </svg>
        ),
      },
      {
        id: "07",
        key: "seo",
        title: "SEO Optimization",
        description:
          "Search engine optimization to improve visibility and organic traffic.",
        icon: (
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" />
            <path d="M11 15l2-2-2-2" />
          </svg>
        ),
      },
    ],
    []
  );

  // Estado de servicio activo para sincronizar hover → preview
  const [activeKey, setActiveKey] = useState(services[0].key);
  const activeService = services.find((s) => s.key === activeKey) ?? services[0];

  // Para iluminar un bloque del grid según servicio (índices 0..8)
  const highlightIndexByKey = {
    branding: 0,
    dev: 4,
    websites: 8,
    uiux: 3,
    mobile: 1,
    ecommerce: 5,
    seo: 2,
  };
  const highlightIndex = highlightIndexByKey[activeService.key] ?? 4;

  return (
    <section
      className="bg-[#0a0a0a] text-white py-20 px-6 relative overflow-hidden"
      style={{
        background:
          "url('https://orvio-html.netlify.app/orvio-html/assets/images/services/services-bg.png')",
      }}
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-green-500/10 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-tr from-gray-800/20 via-transparent to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex justify-between items-center mb-16">
          <h2 className="text-xl font-medium syne-font  text-gray-400 tracking-wider">// OUR SERVICES</h2>

          <motion.button
            className="flex items-center gap-2 syne-font text-white/70 border border-white/15 px-6 py-3 rounded-full font-semibold text-sm hover:bg-[#8cff00] hover:text-black transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
         >
            ALL SERVICES
            <div className="bg-[#8cff00] ml-3 rounded-full w-10 h-10 flex items-center justify-center">
              <motion.svg
                width="26"
                height="26"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="text-black"
                whileHover={{ x: 2 }}
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </motion.svg>
            </div>
          </motion.button>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left side - Monitor and dynamic preview */}
          <div className="space-y-8">
            <motion.div
              className="relative group"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              {/* Monitor container with glow */}
              <div className="relative">
                
               

                    {/* Overlay con datos del servicio activo */}
                  
                      <motion.div
                        key={activeService.key}
                        className="text-white text-center bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl px-6 py-5 max-w-md w-full shadow-xl"
                        initial={{ y: 16, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 8, opacity: 0 }}
                        transition={{ duration: 0.35 }}
                      >
                        <div className="mx-auto mb-4 w-14 h-14 rounded-full bg-[#8cff00] flex items-center justify-center text-black">
                          {activeService.icon}
                        </div>
                        <h3 className="text-xl font-bold syne-font">{activeService.title}</h3>
                        <p className="text-sm text-gray-300 mt-1 leading-relaxed">
                          {activeService.description}
                        </p>
                      </motion.div>
                
                
              </div>
            </motion.div>

            {/* Texto bajo el monitor (puedes cambiarlo si quieres) */}
            <motion.p
              className="text-gray-300 text-lg leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
            >
              We create impactful brand identity that differentiates your business and connects with your audience.
            </motion.p>
          </div>

          {/* Right side - Services list (hover → setActiveKey) */}
          <div className="space-y-2">
            {services.map((service, index) => {
              const isActive = activeKey === service.key;
              return (
                <motion.button
                  type="button"
                  aria-current={isActive}
                  key={service.id}
                  className={`group w-full text-left border-b transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8cff00] border-white/20 hover:border-[#8cff00] ${
                    isActive ? "border-[#8cff00]" : ""
                  }`}
                  initial={{ opacity: 0, x: 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.15 }}
                  viewport={{ once: true }}
                  whileHover={{ x: 6 }}
                  onMouseEnter={() => setActiveKey(service.key)}
                  onFocus={() => setActiveKey(service.key)}
                >
                  <div className="flex items-center gap-6 py-8">
                    {/* Número */}
                    <span className="text-white text-xl font-bold syne-font">
                      <em className="text-[#8cff00] mr-1">{'{'}</em>
                      {service.id}
                      <em className="text-[#8cff00] ml-1">{'}'}</em>
                    </span>

                    {/* Título */}
                    <div className="flex-1 min-w-0">
                      <h3
                        className={`text-4xl lg:text-5xl font-bold syne-font transition-colors ${
                          isActive ? "text-[#8cff00]" : "text-white group-hover:text-[#8cff00]"
                        }`}
                      >
                        {service.title}
                      </h3>
                    </div>

                    {/* Indicador flecha */}
                    <motion.div
                      className={`flex-shrink-0 rounded-full flex items-center justify-center border border-white/15 w-11 h-11 transition-all ${
                        isActive ? "bg-white" : "bg-white/0 group-hover:bg-white"
                      }`}
                      animate={{ 
                        x: isActive ? 3 : 0, 
                        opacity: isActive ? 1 : 0,
                        scale: isActive ? 1 : 0.8
                      }}
                      whileHover={{ opacity: 1, scale: 1 }}
                    >
                      <svg
                        width="22"
                        height="22"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className={isActive ? "text-black" : "text-white"}
                      >
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </motion.div>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
