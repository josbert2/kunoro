import React, { useEffect, useRef, useState } from 'react';
import './AnimatedContactHero.css';

export default function AnimatedContactHero() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const splitTextIntoLetters = (text) => {
    return text.split('').map((char, index) => (
      <span
        key={index}
        className={`animated-letter ${isVisible ? 'animate' : ''}`}
        style={{ animationDelay: `${index * 0.05}s` }}
      >
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));
  };

  return (
    <section ref={sectionRef} className="animated-contact-hero">
      <div className="animated-contact-hero-container">
        {/* Breadcrumb */}
        <div className="contact-breadcrumb syne-font">
          <span>INICIO</span>
          <span className="breadcrumb-separator">—</span>
          <span>CONTACTO</span>
        </div>

        {/* Decorative Circle */}
        <div className="decorative-circle">
          <div className="circle-pattern"></div>
        </div>

        {/* Animated Text */}
        <div className="animated-text-container">
          <h1 className="animated-title syne-font">
            <div className="title-line">
              {splitTextIntoLetters('GET IN TOUCH')}
            </div>
            <div className="title-line">
              {splitTextIntoLetters('WITH US')}
            </div>
          </h1>
        </div>

        {/* Animated Background Elements */}
        <div className="background-grid"></div>
        <div className="floating-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
          <div className="shape shape-4"></div>
          <div className="shape shape-5"></div>
          <div className="shape shape-6"></div>
        </div>
        <div className="animated-particles">
          <div className="particle particle-1"></div>
          <div className="particle particle-2"></div>
          <div className="particle particle-3"></div>
          <div className="particle particle-4"></div>
          <div className="particle particle-5"></div>
        </div>
      </div>
    </section>
  );
}
