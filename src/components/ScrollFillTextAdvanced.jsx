import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';


const ScrollFillTextAdvanced = ({ 
  lines = [
    "We are a creative digital agency",
    "specializing in innovative design", 
    "and cutting-edge development."
  ],
  className = "",
  fillColor = "#ffffff",
  strokeColor = "#666666",
  blurAmount = 8
}) => {
  const containerRef = useRef(null);
  const [isInView, setIsInView] = useState(false);
  

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.3 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 20%"]
  });

  const fillProgress = useTransform(scrollYProgress, [0, 1], [0, 100]);
  
  // Debug scroll progress
  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      console.log('Scroll progress:', latest);
    });
    return unsubscribe;
  }, [scrollYProgress]);
  
  useEffect(() => {
    const unsubscribe = fillProgress.on('change', (latest) => {
      console.log('Fill progress:', latest);
    });
    return unsubscribe;
  }, [fillProgress]);

  return (
    <div 
      ref={containerRef}
      className={`w-full  ${className}`}
      style={{ paddingTop: '2rem', paddingBottom: '2rem' }}
    >
      <motion.div
        className="w-full text-center"
        initial={{ opacity: 0, filter: `blur(${blurAmount}px)` }}
        animate={isInView ? { 
          opacity: 1, 
          filter: "blur(0px)" 
        } : { 
          opacity: 0, 
          filter: `blur(${blurAmount}px)` 
        }}
        transition={{ 
          duration: 0.8,
          ease: [0.25, 0.46, 0.45, 0.94]
        }}
      >
        {lines.map((line, index) => {
          // Calculate individual line progress
          const lineStart = index / lines.length;
          const lineEnd = (index + 1) / lines.length;
          const lineProgress = useTransform(
            fillProgress, 
            [lineStart * 100, lineEnd * 100], 
            [0, 100]
          );
          const lineClipPath = useTransform(lineProgress, (v) => `inset(0 ${100 - v}% 0 0)`);
          
          return (
            <div key={index} className="relative leading-tight">
              {/* Base stroke text */}
              <div 
                className="whitespace-nowrap text-center"
                style={{
                  fontSize: 'clamp(1.5rem, 4vw, 4rem)',
                  fontFamily: 'Impact, Haettenschweiler, Arial Narrow Bold, sans-serif',
                  WebkitTextStroke: `2px ${strokeColor}`,
                  WebkitTextFillColor: 'transparent',
                  color: 'transparent',
                  zIndex: 1
                }}
              >
                {line}
              </div>
              
              <div className="absolute top-0 left-2/4 transform -translate-x-2/4 w-full h-full">
                {/* Fill text - clips over the stroke */}
                <div
                  className="absolute top-0 left-2/4 transform -translate-x-2/4 overflow-hidden"
                  style={{ 
                    zIndex: 2,
                    height: '100%'
                  }}
                >
                  <motion.div
                    className="whitespace-nowrap text-center"
                    style={{
                      fontSize: 'clamp(1.5rem, 4vw, 4rem)',
                      fontFamily: 'Impact, Haettenschweiler, Arial Narrow Bold, sans-serif',
                      color: fillColor,
                      clipPath: lineClipPath
                    }}
                  >
                    {line}
                  </motion.div>
                </div>
              </div>
            </div>
          );
        })}
      </motion.div>

      
    </div>
  );
};

export default ScrollFillTextAdvanced;
