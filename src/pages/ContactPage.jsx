import React, { useRef, useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import Contact from "../components/pages/Contact";
import PageFooter from "../components/PageFooter";
import PageHeader from "../components/PageHeader";
import ProductsMenu from "../components/ProductsMenuNew";

export default function ContactPage() {
  const lenis = useRef(null);

  useEffect(() => {
    // Initialize Lenis
    lenis.current = new Lenis({
      duration: .6,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      smooth: true,
      smoothTouch: true,
    });
    const animate = (time) => {
      lenis.current.raf(time);
      requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);

    return () => {
      lenis.current.destroy();
    };
  }, []);

  return (
    <>
      <PageHeader />
      <ProductsMenu />
      <div className="w-full pt-20">
        <Contact />
      </div>
      
      <PageFooter />
    </>
  );
}
