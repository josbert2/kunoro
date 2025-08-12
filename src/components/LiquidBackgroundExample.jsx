import React from 'react';
import LiquidBackground from './LiquidBackground';
import './LiquidBackgroundExample.css';

/**
 * Componente de ejemplo que muestra el efecto de LiquidBackground en acción
 */
const LiquidBackgroundExample = () => {
  return (
    <div className="liquid-example">
      {/* El fondo líquido llena todo el contenedor */}
      <LiquidBackground 
        color="#0a0a0a"
        secondaryColor="#2a2a2a"
        speed={2}
        complexity={6}
      />
      
      {/* Contenido superpuesto sobre el fondo líquido */}
      <div className="liquid-content">
        <h1>Smooth Liquid Effect</h1>
        <p>Este fondo líquido crea un efecto visual atractivo y moderno</p>
        <button className="liquid-btn">Explorar</button>
      </div>
    </div>
  );
};

export default LiquidBackgroundExample;
