
import React, { useRef, useEffect } from "react";
import "./textMaskVideo.css";


const TextMaskVideo = ({ text, videoSrc }) => {
  const videoRef = useRef(null);
  const svgId = `text-mask-${Math.random().toString(36).substring(2, 9)}`;

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  }, []);

  return (
    <div className="text-mask-container">
      <svg 
        width="100%" 
        height="100%" 
        viewBox="0 0 300 200" 
        preserveAspectRatio="xMidYMid meet"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%'
        }}
      >
        <defs>
          <mask id={svgId}>
            <text 
              textAnchor="middle" 
              x="100" 
              y="50" 
              dy="0.35em"
              fontSize="0" 
              fontWeight="900"
              fontFamily="Geist, sans-serif"
              fill="white"
              style={{
                letterSpacing: "-78px"
              }}
            >
              {text.split('').map((letter, index) => (
                <tspan 
                  key={index}
                  className="animated-letter"
                  fontSize="65"
                  dx={index === 0 ? "0" : "1.2em"}  
                  
                  style={{
                    animation: "letterUp 1s ease-out forwards",
                    animationDelay: `${index * 0.1}s`
                  }}
                >
                  {letter}
                </tspan>
              ))}
            </text>
          </mask>
        </defs>
        
        <foreignObject 
          width="100%" 
          height="100%"
          mask={`url(#${svgId})`}
        >
          <div style={{ width: '100%', height: '100%' }}>
            <video 
              ref={videoRef} 
              style={{ 
                objectFit: 'cover', 
                width: '100%', 
                height: '100%' 
              }}
              autoPlay 
              muted 
              loop 
              playsInline
            >
              <source src={videoSrc} type="video/mp4" />
            </video>
          </div>
        </foreignObject>
      </svg>
      
      <div className="text-container ">
        <h1>{text}</h1>
      </div>
      
      <style jsx>{`
        .text-mask-container {
          position: relative;
          width: 100%;
          height: 100vh;
          overflow: hidden;
          display: flex;
          justify-content: center;
          align-items: center;
     
        }
        
        .text-container {
          position: relative;
          z-index: -1;
          opacity: 0;
          font-family: 'Geist', sans-serif;
          --font-selector: R0Y7R2Vpc3QtOTAw;
        --framer-font-family: "Geist", sans-serif;
        --framer-font-size: 540px;
        --framer-font-weight: 900;
        --framer-letter-spacing: -0.05em;
        --framer-line-height: 90%;
        --framer-text-transform: uppercase;
        --framer-text-alignment: center;
          font-family: var(--framer-blockquote-font-family, var(--framer-font-family, Inter, Inter Placeholder, sans-serif));
          font-style: var(--framer-blockquote-font-style, var(--framer-font-style, normal));
          font-weight: var(--framer-blockquote-font-weight, var(--framer-font-weight, 400));
          color: var(--framer-blockquote-text-color, var(--framer-text-color, #000));
          font-size: calc(var(--framer-blockquote-font-size, var(--framer-font-size, 16px)) * var(--framer-font-size-scale, 1));
          letter-spacing: var(--framer-blockquote-letter-spacing, var(--framer-letter-spacing, 0));
          text-transform: var(--framer-blockquote-text-transform, var(--framer-text-transform, none));
          text-decoration-line: var(--framer-blockquote-text-decoration, var(--framer-text-decoration, initial));
          text-decoration-style: var(--framer-blockquote-text-decoration-style, var(--framer-text-decoration-style, initial));
          text-decoration-color: var(--framer-blockquote-text-decoration-color, var(--framer-text-decoration-color, initial));
          text-decoration-thickness: var(--framer-blockquote-text-decoration-thickness, var(--framer-text-decoration-thickness, initial));
          text-decoration-skip-ink: var(--framer-blockquote-text-decoration-skip-ink, var(--framer-text-decoration-skip-ink, initial));
          text-underline-offset: var(--framer-blockquote-text-decoration-offset, var(--framer-text-decoration-offset, initial));
          line-height: var(--framer-blockquote-line-height, var(--framer-line-height, 1.2em));
          text-align: var(--framer-blockquote-text-alignment, var(--framer-text-alignment, start));
          -webkit-text-stroke-width: var(--framer-text-stroke-width, initial);
          -webkit-text-stroke-color: var(--framer-text-stroke-color, initial);
          font-feature-settings: var(--framer-font-open-type-features, initial);
          font-variation-settings: var(--framer-font-variation-axes, normal);
          text-wrap: var(--framer-text-wrap-override, var(--framer-text-wrap));
          
        }
        
        .text-container h1 {
          font-size: 20vw;
          font-weight: 900;
          text-transform: uppercase;
          margin: 0;
          padding: 0;
        }
      `}</style>
    </div>
  );
};

export default TextMaskVideo;