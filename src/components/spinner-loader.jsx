import React, { useEffect, useRef } from "react";

import CurtainSVG from "./curtain-svg";

export default function SpinnerLoader() {
    const svgRef = useRef(null);

    useEffect(() => {
      const tl = gsap.timeline();
      const curve = "M0 502S175 272 500 272s500 230 500 230V0H0Z";
      const flat = "M0 2S175 1 500 1s500 1 500 1V0H0Z";
  
      tl.from(".loader-wrap-heading h1", {
        y: 200,
        skewY: 10,
      })
        .to(".loader-wrap-heading h1", {
          delay: 1.5,
          y: -200,
          skewY: 10,
          ease: "power2.in",
        })
        .to(svgRef.current, {
          duration: 0.8,
          attr: { d: curve },
          ease: "power2.in",
        })
        .to(svgRef.current, {
          duration: 0.8,
          attr: { d: flat },
          ease: "power2.out",
        })
        .set(".loader-wrap", {
          zIndex: -1,
          display: "none",
        });
  
      const buttons = document.querySelectorAll("button");
      buttons.forEach((btn) =>
        btn.addEventListener("click", () => {
          console.log("button clicked");
        })
      );
  
      // Cleanup
      return () => {
        buttons.forEach((btn) =>
          btn.removeEventListener("click", () => {
            console.log("button clicked");
          })
        );
      };
    }, []);

    return (
        <div data-barba="wrapper">
            <CurtainSVG />
        </div>
    )
}
