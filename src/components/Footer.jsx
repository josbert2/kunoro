import React, { useEffect, useState, useRef } from 'react';
import './Footer.css';
import DarkGradientBackground from './DarkGradientBackground';

const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);
  const triggerRef = useRef(null);
  const footerRef = useRef(null);

  useEffect(() => {
    // Función para mostrar/ocultar el footer mediante clase CSS
    const toggleFooter = (isIntersecting) => {
      setIsVisible(isIntersecting);
      console.log('Footer visibility:', isIntersecting);
    };
    
    // Configuración del Intersection Observer
    const options = {
      root: null, // Observa relativo al viewport
      rootMargin: '0px', // Sin margen
      threshold: 0.1 // Activa cuando al menos 10% del elemento es visible
    };

    // Crea el observer para el footer trigger
    const observer = new IntersectionObserver((entries) => {
      const [entry] = entries;
      toggleFooter(entry.isIntersecting);
    }, options);
    
    // Busca el elemento trigger (ya sea por ID o el último elemento del documento)
    const triggerElement = document.getElementById('footer-trigger') || 
                           document.querySelector('.h-\[1000px\]');
    
    if (triggerElement) {
      observer.observe(triggerElement);
      console.log('Observando el elemento trigger del footer');
    } else {
      // Si no se encuentra el trigger específico, observa el último div de la página
      const allDivs = document.querySelectorAll('div');
      const lastDiv = allDivs[allDivs.length - 1];
      if (lastDiv) {
        observer.observe(lastDiv);
        console.log('Observando el último div como trigger del footer');
      }
    }
    
    // Limpia el observer cuando el componente se desmonta
    return () => {
      if (triggerElement) observer.unobserve(triggerElement);
    };
  }, []);
  
  // Eliminado el timer que forzaba la visibilidad al inicio

  return (
    <div className={`overlap-footer ${isVisible ? 'visible' : ''}`}>
      {/* Gradiente de fondo oscuro animado */}
   
      
      {/* Texto gigante KUNORO de fondo con efecto de fill */}
      <div className="footer-brand-bg">
        <h1 className="footer-brand-text syne-font">
          <span className="text-fill">KUNORO</span>
        </h1>
      </div>
      
      <div className="footer-container ">
        <div className='flex gap-2'>
          <div className="footer-left pr-10 syne-font">
            <h2 className="footer-logo">KUNORO</h2>
            <p className="footer-description">We are committed to helping you succeed, and we will work with you every step of the way.</p>
            <div className="social-links">
              <a href="#" className="social-link">
                <svg width="10" height="16" viewBox="0 0 10 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 1h-2.5C5.1 1 4 2.1 4 3.5V6H1v3h3v6h3V9h2.5L10 6H7V3.5c0-.3.2-.5.5-.5H9V1z"/>
                </svg>
              </a>
              <a href="#" className="social-link">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16 3c-.6.3-1.2.4-1.9.5.7-.4 1.2-1 1.4-1.8-.6.4-1.3.6-2.1.8-.6-.6-1.5-1-2.4-1-1.7 0-3.2 1.5-3.2 3.3 0 .3 0 .5.1.7-2.7-.1-5.2-1.4-6.8-3.4-.3.5-.4 1-.4 1.7 0 1.1.6 2.1 1.5 2.7-.5 0-1-.2-1.5-.4 0 1.6 1.1 2.9 2.6 3.2-.3.1-.6.1-.9.1-.2 0-.4 0-.6-.1.4 1.3 1.6 2.3 3.1 2.3-1.1.9-2.5 1.4-4.1 1.4H0c1.5.9 3.2 1.5 5 1.5 6 0 9.3-5 9.3-9.3v-.4C15 4.3 15.6 3.7 16 3z"/>
                </svg>
              </a>
              <a href="#" className="social-link">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 1.5h8A1.5 1.5 0 0112.5 3v8a1.5 1.5 0 01-1.5 1.5H3A1.5 1.5 0 011.5 11V3A1.5 1.5 0 013 1.5zm8 10a.5.5 0 00.5-.5V3a.5.5 0 00-.5-.5H3a.5.5 0 00-.5.5v8a.5.5 0 00.5.5h8z"/>
                  <path d="M7 9.5A2.5 2.5 0 104.5 7 2.5 2.5 0 007 9.5zM7 5a2 2 0 11-2 2 2 2 0 012-2zM10.5 3.75a.75.75 0 10-1.5 0 .75.75 0 001.5 0z"/>
                </svg>
              </a>
              <a href="#" className="social-link">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13 0H1a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V1a1 1 0 00-1-1zM4.2 11.8H2.1V5.2h2.1v6.6zm-1-7.5a1.2 1.2 0 110-2.4 1.2 1.2 0 010 2.4zm8.7 7.5h-2.1V8.6c0-.8 0-1.8-1.1-1.8s-1.3.9-1.3 1.8v3.2h-2V5.2h1.9v.9c.3-.5.9-.9 1.9-.9 2 0 2.4 1.3 2.4 3v3.6z"/>
                </svg>
              </a>
            </div>
          </div>
          
          <div className="footer-middle">
            <div className="footer-column syne-font">
              <h3 className="footer-title ">Service</h3>
              <ul className="footer-menu flex flex-col">
                <li><a href="#">UI/UX Design</a></li>
                <li><a href="#">Web Design</a></li>
                <li><a href="#">Branding</a></li>
                <li><a href="#">Webflow</a></li>
                <li><a href="#">Development</a></li>
              </ul>
            </div>
            
            <div className="footer-column syne-font">
              <h3 className="footer-title">Company</h3>
              <ul className="footer-menu  flex flex-col">
                <li><a href="#">Home</a></li>
                <li><a href="#">Agency</a></li>
                <li><a href="#">Achievement</a></li>
                <li><a href="#">Webflow</a></li>
                <li><a href="#">Contact Us</a></li>
              </ul>
            </div>
          </div>
          
          <div className="footer-right">
            <h3 className="footer-title syne-font">Newsletter</h3>
            <p className="newsletter-text syne-font">Subscribe our newsletter to get the latest news and updates!</p>
            
            <div className="newsletter-form">
              <input type="email" placeholder="Enter your email" />
              <button type="submit">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 12H19" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 5L19 12L12 19" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div className="footer-bottom syne-font">
          <div className="footer-copyright">
            <p>© 2025 KUNORO. All Rights Reserved.</p>
          </div>
          <div className="footer-legal">
            <a href="#">Privacy policy</a>
            <a href="#">Terms and conditions</a>
          </div>
        </div>
      </div>
      
      
    </div>
  );
};


export default Footer;
