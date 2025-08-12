import React, { useEffect, useRef } from 'react';
import './LiquidBackground.css';

/**
 * Componente que crea un efecto de fondo líquido suave y animado con blur
 * @param {Object} props - Propiedades del componente
 * @param {string} props.color - Color principal del efecto (por defecto #4a00e0)
 * @param {string} props.secondaryColor - Color secundario del efecto (por defecto #8e2de2)
 * @param {number} props.speed - Velocidad de la animación (1-10, por defecto 3)
 * @param {number} props.complexity - Complejidad del efecto (3-10, por defecto 5)
 * @param {number} props.blurAmount - Cantidad de desenfoque (0-20, por defecto 5)
 * @param {string} props.className - Clases CSS adicionales
 */
const LiquidBackground = ({ 
  color = '#4a00e0', 
  secondaryColor = '#8e2de2',
  speed = 3,
  complexity = 5,
  blurAmount = 5,
  className = '' 
}) => {
  const canvasRef = useRef(null);
  const blurCanvasRef = useRef(null);
  const animationRef = useRef(null);
  const time = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const blurCanvas = blurCanvasRef.current;
    const ctx = canvas.getContext('2d');
    const blurCtx = blurCanvas.getContext('2d');
    
    let width, height;
    let metaballs = [];
    let normalizedSpeed = speed * 0.0005;
    
    // Función para redimensionar los canvas
    const setCanvasSize = () => {
      const parent = canvas.parentElement;
      width = parent.clientWidth;
      height = parent.clientHeight;
      
      canvas.width = width;
      canvas.height = height;
      
      // El canvas para blur es ligeramente más pequeño para rendimiento
      blurCanvas.width = width * 0.5;
      blurCanvas.height = height * 0.5;
      blurCanvas.style.filter = `blur(${blurAmount}px) contrast(1.5) brightness(0.9)`;
      
      // Reinicializar las metaballs con el nuevo tamaño
      initMetaballs();
    };
    
    // Inicializar metaballs para el efecto líquido con propiedades adicionales
    const initMetaballs = () => {
      metaballs = [];
      const count = Math.max(4, Math.min(12, complexity * 2));
      
      for (let i = 0; i < count; i++) {
        metaballs.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * normalizedSpeed * width,
          vy: (Math.random() - 0.5) * normalizedSpeed * height,
          r: Math.random() * (width/6) + (width/12), // Radio aleatorio proporcionado al tamaño
          phase: Math.random() * Math.PI * 2, // Fase para movimiento sinusoidal
          amplitude: Math.random() * 30 + 10 // Amplitud para movimiento sinusoidal
        });
      }
    };
    
    // Función para dibujar el efecto de fondo líquido con metaballs
    const drawFluidBackground = () => {
      time.current += 0.005 * speed;
      
      // Limpiar ambos canvas
      ctx.clearRect(0, 0, width, height);
      blurCtx.clearRect(0, 0, blurCanvas.width, blurCanvas.height);
      
      // Actualizar posiciones con movimiento sinusoidal y circular
      metaballs.forEach((ball, index) => {
        // Movimiento normal
        ball.x += ball.vx;
        ball.y += ball.vy;
        
        // Añadir movimiento sinusoidal adicional para mayor fluidez
        ball.x += Math.sin(time.current + ball.phase) * ball.amplitude * 0.05;
        ball.y += Math.cos(time.current + ball.phase) * ball.amplitude * 0.05;
        
        // Rebotar en los bordes
        if (ball.x < 0 || ball.x > width) ball.vx *= -1;
        if (ball.y < 0 || ball.y > height) ball.vy *= -1;
        
        // Mantener dentro de los límites
        ball.x = Math.max(0, Math.min(width, ball.x));
        ball.y = Math.max(0, Math.min(height, ball.y));
      });
      
      // Crear gradientes para los metaballs
      const primaryGradient = ctx.createRadialGradient(width/2, height/2, 0, width/2, height/2, Math.max(width, height) * 0.7);
      primaryGradient.addColorStop(0, color);
      primaryGradient.addColorStop(1, secondaryColor);
      
      // Dibujar metaballs con degradados en el canvas principal
      ctx.globalAlpha = 0.7;
      drawMetaballs(ctx, metaballs, primaryGradient, width, height);
      
      // Dibujar en el canvas de blur (escalado)
      blurCtx.globalAlpha = 0.8;
      drawMetaballs(blurCtx, metaballs, primaryGradient, blurCanvas.width, blurCanvas.height, 0.5);
      
      // Continuar la animación
      animationRef.current = requestAnimationFrame(drawFluidBackground);
    };
    
    // Función para dibujar metaballs con efecto fluido
    const drawMetaballs = (context, balls, gradient, canvasWidth, canvasHeight, scale = 1) => {
      // Escalar los valores si es necesario
      const scaledBalls = balls.map(ball => ({
        x: ball.x * scale,
        y: ball.y * scale,
        r: ball.r * scale
      }));
      
      // Dibujar cada metaball
      context.fillStyle = gradient;
      
      // Usar compositing para crear el efecto de metaball fluido
      context.globalCompositeOperation = 'source-over';
      scaledBalls.forEach(ball => {
        context.beginPath();
        context.arc(ball.x, ball.y, ball.r, 0, Math.PI * 2);
        context.fill();
      });
      
      // Añadir efecto de brillo y mezcla
      context.globalCompositeOperation = 'screen';
      scaledBalls.forEach(ball => {
        const ballGradient = context.createRadialGradient(
          ball.x, ball.y, 0,
          ball.x, ball.y, ball.r
        );
        ballGradient.addColorStop(0, 'rgba(255, 255, 255, 0.4)');
        ballGradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.1)');
        ballGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
        
        context.fillStyle = ballGradient;
        context.beginPath();
        context.arc(ball.x, ball.y, ball.r * 1.2, 0, Math.PI * 2);
        context.fill();
      });
      
      // Restaurar modo de composición normal
      context.globalCompositeOperation = 'source-over';
    };
    
    // Configurar el canvas y comenzar la animación
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);
    drawFluidBackground();
    
    // Limpieza al desmontar
    return () => {
      window.removeEventListener('resize', setCanvasSize);
      cancelAnimationFrame(animationRef.current);
    };
  }, [color, secondaryColor, speed, complexity, blurAmount]);
  
  return (
    <div className={`liquid-background ${className}`}>
      {/* Canvas para el efecto principal */}
      <canvas ref={canvasRef} className="liquid-canvas"></canvas>
      {/* Canvas para el efecto con blur */}
      <canvas ref={blurCanvasRef} className="liquid-canvas blur"></canvas>
    </div>
  );
};

export default LiquidBackground;
