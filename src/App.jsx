// src/App.tsx
import React, { useState, useRef, useEffect} from "react";


import Header from "./components/header";


import InfinityLoopDOM from "./components/InfinityLoopDOM";

import ScrollFillWordCSS from "./components/ScrollFillWordCSS";
import Lenis from "@studio-freight/lenis";
import ProductsMenu from "./components/ProductsMenuNew";
import OverlapStackStrict from "./components/card-stack";
import Footer from "./components/Footer";

import ServicesSection from './components/ServicesSection';
import ParallaxSection from './components/ParallaxSection';
import PortfolioGrid from './components/PortfolioGrid';


// PAGES

import TextVideo from './components/pages/textVideo';
import AboutUs from './components/pages/AboutUs';
import MenuLateral from './components/pages/MenuLateral';
import Main from './components/pages/Main';
import Brand from './components/pages/Brand';


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
        <TextVideo />
            
            
          <Main />  
     

          <MenuLateral />  
            
                      
          {/* about */}
          <AboutUs />

           {/* Portfolio Grid Section */}
           <PortfolioGrid />

          {/* Services Section */}
          <ServicesSection />
    
         
          {/*
          <Brand />
          <InfinityLoopDOM />
          <OverlapStackStrict />
          */}
          
        </div >
        {/* Div para activar la visibilidad del footer */}
        <div id="footer-trigger" className="h-[150px] relative"></div>
        
        {/* Footer a pantalla completa */}
        <Footer />
    </>
  
  );
}


