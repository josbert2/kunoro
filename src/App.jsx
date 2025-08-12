// src/App.tsx
import React, { useState, useRef, useEffect} from "react";
import CurtainSVG from "./components/curtain-svg";
import TextMaskVideo from "./components/TextMaskVideo";
import Header from "./components/header";

import { TextAnimate } from "./components/text-blur";
import SmoothScroll from "./components/smooth-scroll";
import InfinityLoopDOM from "./components/InfinityLoopDOM";
import ScrollFillWord from "./components/ScrollFillWord";
import ScrollFillWordCSS from "./components/ScrollFillWordCSS";
import Lenis from "@studio-freight/lenis";
import ProductsMenu from "./components/ProductsMenuNew";
import OverlapStackStrict from "./components/card-stack";
import Footer from "./components/Footer";

export default function App() {
  
  const lenis = useRef(null);

  useEffect(() => {
    // Initialize Lenis
    lenis.current = new Lenis({
      duration: .6, // Control the duration of the scroll
      easing: (t) => 1 - Math.pow(1 - t, 3), // Cubic easing for smooth stop
      smooth: true,
      smoothTouch: true, // Enable smooth scrolling on touch devices
    });
    const animate = (time) => {
      lenis.current.raf(time);
      requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);

    // Cleanup on unmount
    return () => {
      lenis.current.destroy();
    };
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    lenis.current.scrollTo(element);
  };

  const contentRef = useRef(null);

  // URL de ejemplo para el video - reemplazar con la ruta correcta a tu video
  const videoSrc = "https://framerusercontent.com/assets/f2KpBvL8NEdg3mMuHN7FP9fRv4.mp4";

  return (
    <>
      <div className="w-full">
       
        <button style={{
              top: 28,
              left: 17,
        }} className="trigger fixed z-100 !bg-transparent !border-none" popovertarget="index" popovertargetaction="toggle">
          <div className="trigger__details">
            {/* Ícono a la izquierda si quieres */}
            {/* <YourIcon /> */}
            <div style={{ width: 190, height: 44 }}>
              <ScrollFillWordCSS
                text="KUNORO"
                height={44}
                base="#7f7f7f"      
                fill="#2a2a2a"
              />
            </div>
            {/* Chevron, progreso, etc. */}
            <span className="progress" />
          </div>
        </button>
        <ProductsMenu />
   
        
            <Header />
            
        
            {/* Sección con el efecto de video a través del texto */}

            <section className="framer-rqqsrm z-10">
              
              <div className="framer-jcul6d" style={{
                outline: "none",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                flexShrink: 0,
                transform: "rotate(-4deg)"
              }}>
                <TextMaskVideo text="STUDIO" videoSrc={videoSrc} />
              </div>
            </section>
            
            
            <main className="relative">
                <div className="framer-3y1b7i">
                  <div className="flex flex-wrap items-center gap-2 framer-text font-playfair">
                    <TextAnimate animation="blurInUp" by="character" once>
                      Let´s create
                    </TextAnimate>

                    <TextAnimate
                      animation="blurInUp"
                      by="character"
                      colors={['#2563eb', '#dc2626', '#16a34a', '#9333ea']}
                      loopWords={['design', 'development', 'marketing', 'brands', 'products']}
                      rotateInterval={5000}
                      delay={0.5}
                    />
                  </div>
                  <div className="framer-1kfwg09">
                    <div className="framer-dnb8d0">
                      <p style={{
                        "--font-selector": "R0Y7Q2F2ZWF0LXJlZ3VsYXI=",
                        "--framer-font-family": "Caveat", 
                        "--framer-font-size": "170px",
                        "--framer-letter-spacing": "-0.07em",
                        "--framer-line-height": "70%",
                        "--framer-text-alignment": "center",
                        "--framer-text-color": "var(--token-a52a650f-fdc2-43f9-93f7-15f9ca573529, rgb(0, 0, 0))"
                      }} class="framer-text">together.</p>
                    </div>
                    <div class="framer-su7jo2">
                      <p class="framer-text framer-styles-preset-l27xre font-family-kanit" data-styles-preset="pobGLBR7U" 
                        style={{
                          "line-height": "25px",
                          "--framer-font-family": "Geist", 
                          "--framer-font-family-bold": "Geist",
                          "--framer-font-size": "16px",
                          "--framer-text-color": "var(--token-d44e6e98-b203-46a0-934d-afe776b534e5, rgb(136, 136, 136))"
                          
                        }}>
                          We help businesses find their voice, shape their identity, and&nbsp;connect with their audience.
                          <span style={{
                            "font-size": "18px",
                        
                            "font-weight": "600",
                            "--framer-font-family": "Geist",
                            "--framer-font-family-bold": "Geist",
                            "--framer-font-size": "16px",
                            "--framer-text-color": "var(--token-a52a650f-fdc2-43f9-93f7-15f9ca573529, rgb(0, 0, 0))"
                          }} ><strong >Less talk. More craft.</strong></span>
                      </p>
                    </div>
                  </div>
                </div>
      
              <div className="min-h-screen w-full relative bg-white">
                  <div
                    className="absolute inset-0"
                    style={{
                      background: "#ffffff",
                      backgroundImage: `
                        radial-gradient(
                          circle at top right,
                          rgba(173, 109, 244, 0.5),
                          transparent 70%
                        )
                      `,
                      filter: "blur(80px)",
                      backgroundRepeat: "no-repeat",
                    }}
                  />
                {/* <CurtainSVG /> */}
              </div>
              

            
              
            </main>

            <div className="framer-10adajc-container" style={{
              transform: "rotate(-90deg)",
            }}>
              <div class="framer-1dby7vq" 
                style={{
                  height: "100%",
                  width: "100%",
                  opacity: 1,
                  willChange: "transform",
                }}>
                <a class="framer-19davu6 framer-1pslf9m" data-framer-name="Menu Item" style={{ 
                  opacity: 1,
                  willChange: "transform",
                  
                }} href="./work" data-highlight="true">
                  <div
                      class="framer-1vt5zq3"
                      data-framer-appear-id="1vt5zq3"
                      data-framer-cursor="vuwtv9"
                      style={{
                          outline: "none",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "flex-start",
                          flexShrink: 0,
                          willChange: "auto",
                          opacity: 1,
                          transform: "none",
                      }}
                      data-framer-component-type="RichTextContainer"
                  >
                      <p
                        
                          className="framer-text menu-framer-text"
                      >
                          Work (8)
                      </p>
                  </div>
                </a>

                <a class="framer-19davu6 framer-1pslf9m" data-framer-name="Menu Item" style={{ 
                  opacity: 1,
                  willChange: "transform",
                  
                }} href="./about" data-highlight="true">
                  <div
                      class="framer-1vt5zq3"
                      data-framer-appear-id="1vt5zq3"
                      data-framer-cursor="vuwtv9"
                      style={{
                          outline: "none",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "flex-start",
                          flexShrink: 0,
                          willChange: "auto",
                          opacity: 1,
                          transform: "none",
                      }}
                      data-framer-component-type="RichTextContainer"
                  >
                      <p
                        
                          className="framer-text menu-framer-text"
                      >
                          About
                      </p>
                  </div>
                </a>


                <a class="framer-19davu6 framer-1pslf9m" data-framer-name="Menu Item" style={{ 
                  opacity: 1,
                  willChange: "transform",
                  
                }} href="./contact" data-highlight="true">
                  <div
                      class="framer-1vt5zq3"
                      data-framer-appear-id="1vt5zq3"
                      data-framer-cursor="vuwtv9"
                      style={{
                          outline: "none",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "flex-start",
                          flexShrink: 0,
                          willChange: "auto",
                          opacity: 1,
                          transform: "none",
                      }}
                      data-framer-component-type="RichTextContainer"
                  >
                      <p
                        
                          className="framer-text menu-framer-text"
                      >
                          Contact
                      </p>
                  </div>
                </a>



              </div>
            </div>
            
        
      
          {/* Brands Section */}
          <section className="py-20 px-8 bg-white"  ref={contentRef}>
            <div className="max-w-6xl mx-auto text-center">
              <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-12">
                WE WORKED WITH GLOBAL LARGEST BRANDS
              </h2>
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center justify-items-center opacity-60">
                {/* Creative Logo */}
                <div className="flex items-center justify-center h-16">
                  <div className="text-2xl font-bold text-gray-800">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full border-2 border-gray-800"></div>
                      <span>CREATIVE</span>
                    </div>
                  </div>
                </div>

                {/* Triangle Logo */}
                <div className="flex items-center justify-center h-16">
                  <div className="text-xl font-bold text-gray-800">
                    <div className="flex flex-col items-center">
                      <div className="w-0 h-0 border-l-4 border-r-4 border-b-8 border-l-transparent border-r-transparent border-b-gray-800 mb-1"></div>
                      <span className="text-sm">CREATIVE</span>
                    </div>
                  </div>
                </div>

                {/* Innovate Logo */}
                <div className="flex items-center justify-center h-16">
                  <div className="text-lg font-bold text-gray-800">
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-gray-800 rounded-full"></div>
                        <div className="w-2 h-2 bg-gray-800 rounded-full"></div>
                        <div className="w-2 h-2 bg-gray-800 rounded-full"></div>
                      </div>
                      <span>Innovate</span>
                    </div>
                  </div>
                </div>

                {/* Express Logo */}
                <div className="flex items-center justify-center h-16">
                  <div className="text-xl font-bold text-gray-800">
                    <div className="flex items-center gap-2">
                      <div className="text-3xl">✕</div>
                      <span>Express</span>
                    </div>
                  </div>
                </div>

                {/* Brand Name Logo */}
                <div className="flex items-center justify-center h-16">
                  <div className="text-xl font-bold text-gray-800">
                    <div className="flex flex-col items-center">
                      <div className="text-2xl font-bold">7A</div>
                      <span className="text-xs">BRANDNAME</span>
                    </div>
                  </div>
                </div>

                {/* Name Logo */}
                <div className="flex items-center justify-center h-16">
                  <div className="text-xl font-bold text-gray-800 italic">
                    <span className="font-serif">Name</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <InfinityLoopDOM />
          <OverlapStackStrict />
        </div >
        {/* Div para activar la visibilidad del footer */}
        <div id="footer-trigger" className="h-[150px] relative"></div>
        
        {/* Footer a pantalla completa */}
        <Footer />
    </>
  
  );
}
