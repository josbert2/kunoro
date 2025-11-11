/**
 * DarkGradientBackground Component
 * 
 * Componente de fondo con gradientes oscuros animados para secciones dark/footer.
 * Combina diferentes variantes de color oscuro con niveles de intensidad y animaciones.
 * 
 * @component
 * @example
 * // Uso básico con valores por defecto
 * <DarkGradientBackground />
 * 
 * @example
 * // Con variante, intensidad y animación personalizada
 * <DarkGradientBackground 
 *   variant="purpleBlue" 
 *   intensity="strong" 
 *   animation="blend"
 * />
 */

/**
 * Variantes de color oscuro predefinidas
 * Cada variante incluye 4 niveles de intensidad: soft, medium, strong, veryStrong
 * 
 * @constant {Object} DARK_GRADIENT_VARIANTS
 */
const DARK_GRADIENT_VARIANTS = {
  default: {
    base: '#070707',
    soft: { color1: '#1A1A1A', color2: '#151515', color3: '#0A0A0A' },
    medium: { color1: '#2D1B3D', color2: '#1B2D3D', color3: '#070707' },
    strong: { color1: '#3D2550', color2: '#253D50', color3: '#0D0D0D' },
    veryStrong: { color1: '#4D2F60', color2: '#2F4D60', color3: '#101010' }
  },
  
  purpleBlue: {
    base: '#070707',
    soft: { color1: '#1A1525', color2: '#15192A', color3: '#0A0A0A' },
    medium: { color1: '#2D1B3D', color2: '#1B2A3D', color3: '#070707' },
    strong: { color1: '#3D2550', color2: '#253550', color3: '#0D0D0D' },
    veryStrong: { color1: '#4D2F60', color2: '#2F4060', color3: '#101010' }
  },
  
  redOrange: {
    base: '#070707',
    soft: { color1: '#251515', color2: '#251A15', color3: '#0A0A0A' },
    medium: { color1: '#3D1B1B', color2: '#3D2A1B', color3: '#070707' },
    strong: { color1: '#502525', color2: '#503525', color3: '#0D0D0D' },
    veryStrong: { color1: '#602F2F', color2: '#604030', color3: '#101010' }
  },
  
  greenTeal: {
    base: '#070707',
    soft: { color1: '#15251A', color2: '#152520', color3: '#0A0A0A' },
    medium: { color1: '#1B3D2A', color2: '#1B3D35', color3: '#070707' },
    strong: { color1: '#255035', color2: '#255045', color3: '#0D0D0D' },
    veryStrong: { color1: '#2F6040', color2: '#2F6055', color3: '#101010' }
  },
  
  neutral: {
    base: '#070707',
    soft: { color1: '#1A1A1A', color2: '#1C1C1C', color3: '#0A0A0A' },
    medium: { color1: '#252525', color2: '#2A2A2A', color3: '#070707' },
    strong: { color1: '#303030', color2: '#353535', color3: '#0D0D0D' },
    veryStrong: { color1: '#3A3A3A', color2: '#404040', color3: '#101010' }
  }
};

/**
 * Estilos de animación CSS para los gradientes oscuros
 * 
 * @constant {Object} DARK_ANIMATION_STYLES
 */
const DARK_ANIMATION_STYLES = {
  none: {},
  blend: {
    animation: 'darkPulseBlend 10s ease-in-out infinite'
  },
  rotate: {
    animation: 'darkRotateColors 20s linear infinite'
  },
  shift: {
    animation: 'darkShiftGradient 12s ease-in-out infinite'
  },
  wave: {
    animation: 'darkWaveMotion 15s ease-in-out infinite'
  }
};

/**
 * Componente DarkGradientBackground
 * 
 * Renderiza un fondo oscuro con gradientes difuminados que pueden animarse.
 * Ideal para footers, secciones hero oscuras, o cualquier sección con tema dark.
 * 
 * @param {Object} props - Propiedades del componente
 * @param {('default'|'purpleBlue'|'redOrange'|'greenTeal'|'neutral')} [props.variant='default'] 
 *        - Variante de color del gradiente
 * @param {('soft'|'medium'|'strong'|'veryStrong')} [props.intensity='medium'] 
 *        - Nivel de intensidad/saturación de los colores
 * @param {('none'|'blend'|'rotate'|'shift'|'wave')} [props.animation='none'] 
 *        - Tipo de animación a aplicar
 * @param {string} [props.className=''] - Clases CSS adicionales
 * 
 * @returns {JSX.Element} Elemento de fondo con gradientes oscuros animados
 */
export default function DarkGradientBackground({ 
  variant = 'default', 
  intensity = 'medium',
  animation = 'none',
  className = '' 
}) {
  // Obtener la variante seleccionada con fallback a default
  const selectedVariant = DARK_GRADIENT_VARIANTS[variant] || DARK_GRADIENT_VARIANTS.default;
  
  // Obtener los colores según la intensidad dentro de la variante con fallback a medium
  const colors = selectedVariant[intensity] || selectedVariant.medium;
  
  // Obtener el estilo de animación con fallback a none
  const animationStyle = DARK_ANIMATION_STYLES[animation] || DARK_ANIMATION_STYLES.none;
  
  return (
    <>
      <style>{`
        @keyframes darkPulseBlend {
          0%, 100% { 
            opacity: 0.6; 
            transform: scale(1); 
          }
          50% { 
            opacity: 0.9; 
            transform: scale(1.08); 
          }
        }
        
        @keyframes darkRotateColors {
          0% { 
            transform: rotate(0deg) scale(1); 
          }
          50% {
            transform: rotate(180deg) scale(1.04);
          }
          100% { 
            transform: rotate(360deg) scale(1); 
          }
        }
        
        @keyframes darkShiftGradient {
          0%, 100% { 
            transform: translateX(0) translateY(0); 
          }
          25% { 
            transform: translateX(8%) translateY(-6%); 
          }
          50% { 
            transform: translateX(-8%) translateY(6%); 
          }
          75% { 
            transform: translateX(-6%) translateY(-8%); 
          }
        }
        
        @keyframes darkWaveMotion {
          0%, 100% { 
            transform: translateY(0) scale(1); 
          }
          33% { 
            transform: translateY(-4%) scale(1.02); 
          }
          66% { 
            transform: translateY(4%) scale(0.98); 
          }
        }
      `}</style>
      
      <div className={`absolute w-full pt-[0rem] -z-10 ${className}`}
        style={{
          background: 'linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(220,220,220,1) 15%, rgba(120,120,120,0.9) 45%, rgba(30,30,30,0.95) 75%, rgba(7,7,7,1) 100%)'
        }}
      >
        <div 
          className="absolute right-[-150%] md:right-[-10%] blur-[180px] w-[1710px] h-[1367px] rounded-[1710px]"
          style={{ 
            backgroundColor: colors.color1, 
            ...animationStyle,
            willChange: animation !== 'none' ? 'transform, opacity' : 'auto',
            backfaceVisibility: 'hidden'
          }}
        ></div>
        <div 
          className="absolute mt-[-10%] md:mt-0 left-[-200%] md:left-[-25%] blur-[200px] w-[1537.615px] md:w-[1809px] h-[1444px] rounded-[1537.615px] md:rounded-[1809px]"
          style={{ 
            backgroundColor: colors.color2, 
            ...animationStyle, 
            animationDelay: '3s',
            willChange: animation !== 'none' ? 'transform, opacity' : 'auto',
            backfaceVisibility: 'hidden'
          }}
        ></div>
        <div 
          className="ml-[-90%] md:ml-[-50%] lg:ml-[-32%] mt-[10%] md:mt-[7%] blur-[160px] w-[1502px] md:w-[2774px] h-[1174px] md:h-[1444px] rounded-[1502px] md:rounded-[2774px]"
          style={{ 
            backgroundColor: colors.color3, 
            ...animationStyle, 
            animationDelay: '6s',
            willChange: animation !== 'none' ? 'transform, opacity' : 'auto',
            backfaceVisibility: 'hidden'
          }}
        ></div>
      </div>
    </>
  );
}
