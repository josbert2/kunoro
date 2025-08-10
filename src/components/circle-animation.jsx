import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const FullPreloader = () => {
  const svgRef = useRef(null);
  const loaderWrapRef = useRef(null);
  const loaderHeadingRef = useRef(null);
  const containerHeadingRef = useRef(null);

  const counterRef = useRef(null);
  const headingRef = useRef(null);
  const sublineRef = useRef(null);
  const circleRef = useRef(null);
  const circularRef = useRef(null);

  useEffect(() => {
    const circle = circleRef.current;
    const radius = circle.r.baseVal.value;
    const circumference = 2 * Math.PI * radius;

    circle.style.strokeDasharray = `${circumference}`;
    circle.style.strokeDashoffset = `${circumference}`;

    const counter = { value: 0 };

    const tl = gsap.timeline();

    // Paso 1: contador y trazo circular
    tl.to(counter, {
      value: 100,
      duration: 1.4,
      ease: "power4.out",
      onUpdate: () => {
        const progress = counter.value;
        const offset = circumference - (progress / 100) * circumference;
        circle.style.strokeDashoffset = offset;
        if (counterRef.current) {
          counterRef.current.textContent = `${Math.round(progress)}`;
        }
      },
    });

    // Paso 2: textos del loader circular
    tl.from(headingRef.current, { opacity: 0, y: 40, duration: 0.8 }, "-=1");
    tl.from(sublineRef.current, { opacity: 0, y: 20, duration: 0.6 }, "-=0.7");

    // Paso 3: achicar el círculo, NO ocultarlo
    tl.to(circularRef.current, {
      scale: 0.3,
      duration: 0.6,
      ease: "power4.inOut",
      transformOrigin: "center center",
    }, "+=0.2");

    // Paso 4: animación cortina SVG
    const curve = "M0 502S175 272 500 272s500 230 500 230V0H0Z";
    const flat = "M0 2S175 1 500 1s500 1 500 1V0H0Z";

    tl.from(loaderHeadingRef.current, {
      y: 200,
      skewY: 10,
      duration: 0.6,
    })
      .to(loaderHeadingRef.current, {
        y: -200,
        skewY: 10,
        duration: 0.6,
      })
      .to(svgRef.current, {
        duration: 0.6,
        attr: { d: curve },
        ease: "power2.in",
      })
      .to(svgRef.current, {
        duration: 0.6,
        attr: { d: flat },
        ease: "power2.out",
      })
      .to(loaderWrapRef.current, {
        y: -1500,
        duration: 0.8,
      })
      .to(loaderWrapRef.current, {
        zIndex: -1,
        display: "none",
      });

    // Paso 5: mostrar contenido principal
    tl.from(containerHeadingRef.current, {
      y: 100,
      opacity: 0,
      duration: 1,
    }, "-=1");
  }, []);

  return (
    <>
      {/* Loader circular con contador */}
      <div
        ref={circularRef}
        style={{
          backgroundColor: "#141414",
          color: "#fff",
          height: "100vh",
          width: "100vw",
          position: "fixed",
          zIndex: 10000,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          fontFamily: "serif",
        }}
      >
        <svg width="320" height="320">
          <circle
            cx="160"
            cy="160"
            r="150"
            stroke="#333"
            strokeWidth="1"
            fill="none"
          />
          <circle
            ref={circleRef}
            cx="160"
            cy="160"
            r="150"
            stroke="#fff"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            transform="rotate(-90 160 160)"
          />
        </svg>

        <div
          style={{
            position: "absolute",
            textAlign: "center",
          }}
        >
          <h1 ref={headingRef} style={{ fontSize: "36px", marginBottom: "0.3em" }}>
            Rhye Kinsey
          </h1>
          <div
            ref={sublineRef}
            style={{
              fontSize: "14px",
              color: "#888",
              textTransform: "uppercase",
              letterSpacing: "1px",
            }}
          >
            Creative Developer
          </div>
          <div style={{ marginTop: "1.5em", fontSize: "16px" }}>
            <span ref={counterRef}>0</span> / 100
          </div>
        </div>
      </div>

      {/* Cortina SVG */}
      <div className="loader-wrap" ref={loaderWrapRef}>
        <svg viewBox="0 0 1000 1000" preserveAspectRatio="none">
          <path
            ref={svgRef}
            d="M0,1005S175,995,500,995s500,5,500,5V0H0Z"
          />
        </svg>
        <div className="loader-wrap-heading">
          <span>
            <h1 ref={loaderHeadingRef}>Loading</h1>
          </span>
        </div>
      </div>

      {/* Contenido final */}
      <div className="container">
        <span>
          <h1 ref={containerHeadingRef}>Taimoor Shahzada</h1>
        </span>
      </div>
    </>
  );
};

export default FullPreloader;
