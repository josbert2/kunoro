import React, { useRef, useEffect, useState, useMemo } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';

const ScrollFillText = ({ 
  text = "We are a creative digital agency specializing in innovative design and cutting-edge development.",
  className = "",
  fillColor = "#ffffff",
  strokeColor = "#666666",
  strokeWidth = 1,
  fontSize = "clamp(2rem, 8vw, 8rem)",
  fontWeight = 900,
  letterSpacing = "-0.02em",
  lineHeight = 1.1,
  blurAmount = 10,
  animationDuration = 0.8
}) => {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const [isInView, setIsInView] = useState(false);
  
  // Memoize text processing to avoid recalculation
  const processedText = useMemo(() => {
    return text.split(' ').map((word, wordIndex) => ({
      word,
      letters: word.split('').map((letter, letterIndex) => ({
        letter,
        id: `${wordIndex}-${letterIndex}`
      }))
    }));
  }, [text]);

  // Optimized scroll tracking with Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { 
        threshold: 0.3,
        rootMargin: '-10% 0px -10% 0px'
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Smooth scroll progress with spring physics
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 20%"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Transform scroll progress to fill percentage
  const fillProgress = useTransform(smoothProgress, [0, 1], [0, 100]);

  return (
    <div 
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      style={{
        minHeight: '50vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem'
      }}
    >
      <motion.div
        ref={textRef}
        initial={{ opacity: 0, filter: `blur(${blurAmount}px)` }}
        animate={isInView ? { 
          opacity: 1, 
          filter: "blur(0px)" 
        } : { 
          opacity: 0, 
          filter: `blur(${blurAmount}px)` 
        }}
        transition={{ 
          duration: animationDuration,
          ease: [0.25, 0.46, 0.45, 0.94]
        }}
        style={{
          fontSize,
          fontWeight,
          letterSpacing,
          lineHeight,
          textAlign: 'center',
          maxWidth: '90%',
          willChange: 'transform, opacity, filter'
        }}
      >
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 1000 400"
          preserveAspectRatio="xMidYMid meet"
          style={{
            overflow: 'visible',
            filter: 'drop-shadow(0 4px 20px rgba(0,0,0,0.1))'
          }}
        >
          <defs>
            <linearGradient id="fillGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <motion.stop 
                offset={useTransform(fillProgress, v => `${Math.max(0, v - 10)}%`)}
                stopColor={fillColor}
                stopOpacity="1"
              />
              <motion.stop 
                offset={useTransform(fillProgress, v => `${v}%`)}
                stopColor={fillColor}
                stopOpacity="0.8"
              />
              <motion.stop 
                offset={useTransform(fillProgress, v => `${Math.min(100, v + 5)}%`)}
                stopColor="transparent"
                stopOpacity="0"
              />
            </linearGradient>
            
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          {processedText.map((wordObj, wordIndex) => (
            <g key={wordIndex}>
              {wordObj.letters.map((letterObj, letterIndex) => {
                const totalLetterIndex = processedText
                  .slice(0, wordIndex)
                  .reduce((acc, w) => acc + w.letters.length, 0) + letterIndex;
                
                const letterDelay = totalLetterIndex * 0.05;
                const xPosition = 50 + (totalLetterIndex * 25); // Approximate positioning
                
                return (
                  <motion.text
                    key={letterObj.id}
                    x={xPosition}
                    y="200"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    style={{
                      fontSize: '48px',
                      fontWeight: fontWeight,
                      letterSpacing: letterSpacing,
                      fill: 'url(#fillGradient)',
                      stroke: strokeColor,
                      strokeWidth: strokeWidth,
                      filter: 'url(#glow)',
                      willChange: 'transform, opacity'
                    }}
                    initial={{ 
                      opacity: 0, 
                      y: 20,
                      filter: `blur(${blurAmount}px)`
                    }}
                    animate={isInView ? { 
                      opacity: 1, 
                      y: 0,
                      filter: "blur(0px)"
                    } : {
                      opacity: 0, 
                      y: 20,
                      filter: `blur(${blurAmount}px)`
                    }}
                    transition={{ 
                      duration: animationDuration,
                      delay: letterDelay,
                      ease: [0.25, 0.46, 0.45, 0.94]
                    }}
                  >
                    {letterObj.letter}
                  </motion.text>
                );
              })}
              {/* Add space after each word except the last */}
              {wordIndex < processedText.length - 1 && (
                <text
                  x={50 + ((processedText.slice(0, wordIndex + 1).reduce((acc, w) => acc + w.letters.length, 0)) * 25)}
                  y="200"
                  style={{ fontSize: '48px', fill: 'transparent' }}
                >
                  {' '}
                </text>
              )}
            </g>
          ))}
        </svg>
      </motion.div>

      {/* Progress indicator (optional) */}
      <motion.div
        className="absolute bottom-4 left-1/2 transform -translate-x-1/2"
        style={{
          width: '100px',
          height: '2px',
          backgroundColor: 'rgba(255,255,255,0.2)',
          borderRadius: '1px'
        }}
      >
        <motion.div
          style={{
            height: '100%',
            backgroundColor: fillColor,
            borderRadius: '1px',
            width: useTransform(fillProgress, v => `${v}%`)
          }}
        />
      </motion.div>
    </div>
  );
};

export default ScrollFillText;
