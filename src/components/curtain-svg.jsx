import { useEffect, useRef } from "react";
import { gsap } from "gsap";

import Logo from "../assets/meow.png";

const CurtainSVG = () => {
  const svgRef = useRef(null);
  const loaderWrapRef = useRef(null);
  const loaderHeadingRef = useRef(null);
  const containerHeadingRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();
    const curve = "M0 502S175 272 500 272s500 230 500 230V0H0Z";
    const flat = "M0 2S175 1 500 1s500 1 500 1V0H0Z";

    // Make the logo visible immediately
    // Mostrar el logo con opacidad inicial
    tl.set(loaderHeadingRef.current, { opacity: 0.3 })
      .to(loaderHeadingRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power2.out"
      })
      .to(svgRef.current, {
        duration: 0.8,
        attr: { d: curve },
        ease: "power2.in",
      }, "<")
      .to(loaderHeadingRef.current, {
        opacity: 0,
        duration: 0.3,
      }, "<")
      .to(svgRef.current, {
        duration: 0.8,
        attr: { d: flat },
        ease: "power2.out",
      })
      .to(loaderWrapRef.current, {
        y: -1500,
      })
      .to(loaderWrapRef.current, {
        zIndex: -1,
        display: "none",
      })
      .from(
        containerHeadingRef.current,
        {
          y: 100,
          opacity: 0,
        },
        "-=1.5"
      );
  }, []);

  return (
    <>
      <div className="loader-wrap" ref={loaderWrapRef}>
        <svg viewBox="0 0 1000 1000" preserveAspectRatio="none">
          <path ref={svgRef} d="M0,1005S175,995,500,995s500,5,500,5V0H0Z" />
        </svg>
        <div className="loader-wrap-heading">
          <span>
            <img src={Logo} alt="Logo" className="z-50"/>
      
          </span>
        </div>
      </div>

    
    </>
  );
};

export default CurtainSVG;
