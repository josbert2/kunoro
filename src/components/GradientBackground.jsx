/**
 * GradientBackground Component
 * 
 * Componente de fondo con gradientes animados para temas light.
 * Combina diferentes variantes de color con niveles de intensidad y animaciones.
 * 
 * @component
 * @example
 * // Uso básico con valores por defecto
 * <GradientBackground />
 * 
 * @example
 * // Con variante, intensidad y animación personalizada
 * <GradientBackground 
 *   variant="purpleBlue" 
 *   intensity="strong" 
 *   animation="blend"
 * />
 */

/**
 * Variantes de color predefinidas
 * Cada variante incluye 4 niveles de intensidad: soft, medium, strong, veryStrong
 * 
 * @constant {Object} GRADIENT_VARIANTS
 * @property {Object} default - Rosa y Naranja suave
 * @property {Object} purpleBlue - Púrpura y Azul
 * @property {Object} mintGreen - Verde Menta y Azul cielo
 * @property {Object} peachLavender - Durazno y Lavanda
 * @property {Object} cyanViolet - Cyan y Violeta
 */
const GRADIENT_VARIANTS = {
  default: {
    base: { color1: '#FF', color2: '#FF', prefix1: 'FF', prefix2: 'FF' }, // Rosa y Naranja
    soft: { color1: '#FFF0F5', color2: '#FFF5EB', color3: '#FAFAFA' },
    medium: { color1: '#FFE5F0', color2: '#FFE8D4', color3: '#F5F5F5' },
    strong: { color1: '#FFD4E8', color2: '#FFDCC4', color3: '#F0F0F0' },
    veryStrong: { color1: '#FFC4E0', color2: '#FFD0B0', color3: '#EBEBEB' }
  },
  
  purpleBlue: {
    base: { color1: '#E5', color2: '#D4' },
    soft: { color1: '#F0E5FF', color2: '#E8F2FF', color3: '#FAFAFA' },
    medium: { color1: '#E5D4FF', color2: '#D4E4FF', color3: '#F5F5F5' },
    strong: { color1: '#D9C4FF', color2: '#C4D9FF', color3: '#F0F0F0' },
    veryStrong: { color1: '#CCB0FF', color2: '#B0CCFF', color3: '#EBEBEB' }
  },
  
  mintGreen: {
    base: { color1: '#D4', color2: '#D4' },
    soft: { color1: '#E8FFF5', color2: '#E8F5FF', color3: '#FAFAFA' },
    medium: { color1: '#D4F5E8', color2: '#D4EBFF', color3: '#F5F5F5' },
    strong: { color1: '#C4EBDC', color2: '#C4E0FF', color3: '#F0F0F0' },
    veryStrong: { color1: '#B0E0D0', color2: '#B0D6FF', color3: '#EBEBEB' }
  },
  
  peachLavender: {
    base: { color1: '#F5', color2: '#FF' },
    soft: { color1: '#FAF0FF', color2: '#FFF5F0', color3: '#FAFAFA' },
    medium: { color1: '#F5E5FF', color2: '#FFE8E0', color3: '#F5F5F5' },
    strong: { color1: '#EBD9FF', color2: '#FFDCD0', color3: '#F0F0F0' },
    veryStrong: { color1: '#E0CCFF', color2: '#FFD0C0', color3: '#EBEBEB' }
  },
  
  cyanViolet: {
    base: { color1: '#E0', color2: '#D4' },
    soft: { color1: '#EBE5FF', color2: '#E8FCFF', color3: '#FAFAFA' },
    medium: { color1: '#E0D4FF', color2: '#D4F8FF', color3: '#F5F5F5' },
    strong: { color1: '#D4C4FF', color2: '#C4F0FF', color3: '#F0F0F0' },
    veryStrong: { color1: '#C8B0FF', color2: '#B0E8FF', color3: '#EBEBEB' }
  }
};

/**
 * Estilos de animación CSS para los gradientes
 * 
 * @constant {Object} ANIMATION_STYLES
 * @property {Object} none - Sin animación
 * @property {Object} blend - Mezcla suave con pulso y escala (8s)
 * @property {Object} rotate - Rotación continua de 360° (15s)
 * @property {Object} shift - Desplazamiento en direcciones variadas (10s)
 * @property {Object} wave - Movimiento ondulatorio vertical (12s)
 */
const ANIMATION_STYLES = {
  none: {},
  blend: {
    animation: 'pulseBlend 8s ease-in-out infinite'
  },
  rotate: {
    animation: 'rotateColors 15s linear infinite'
  },
  shift: {
    animation: 'shiftGradient 10s ease-in-out infinite'
  },
  wave: {
    animation: 'waveMotion 12s ease-in-out infinite'
  }
};

/**
 * Componente GradientBackground
 * 
 * Renderiza un fondo con gradientes de colores difuminados que pueden animarse.
 * Los gradientes están posicionados de manera absoluta y usan blur para crear
 * un efecto suave y moderno.
 * 
 * @param {Object} props - Propiedades del componente
 * @param {('default'|'purpleBlue'|'mintGreen'|'peachLavender'|'cyanViolet')} [props.variant='default'] 
 *        - Variante de color del gradiente
 * @param {('soft'|'medium'|'strong'|'veryStrong')} [props.intensity='medium'] 
 *        - Nivel de intensidad/saturación de los colores
 * @param {('none'|'blend'|'rotate'|'shift'|'wave')} [props.animation='none'] 
 *        - Tipo de animación a aplicar
 * @param {string} [props.className=''] - Clases CSS adicionales
 * 
 * @returns {JSX.Element} Elemento de fondo con gradientes animados
 * 
 * @example
 * // Gradiente simple sin animación
 * <GradientBackground variant="default" intensity="medium" />
 * 
 * @example
 * // Gradiente púrpura-azul con animación shift
 * <GradientBackground 
 *   variant="purpleBlue" 
 *   intensity="strong" 
 *   animation="shift"
 * />
 */
export default function GradientBackground({ 
  variant = 'default', 
  intensity = 'medium',
  animation = 'none',
  className = '' 
}) {
  // Obtener la variante seleccionada con fallback a default
  const selectedVariant = GRADIENT_VARIANTS[variant] || GRADIENT_VARIANTS.default;
  
  // Obtener los colores según la intensidad dentro de la variante con fallback a medium
  const colors = selectedVariant[intensity] || selectedVariant.medium;
  
  // Obtener el estilo de animación con fallback a none
  const animationStyle = ANIMATION_STYLES[animation] || ANIMATION_STYLES.none;
  
  return (
    <>
      <style>{`
        @keyframes pulseBlend {
          0%, 100% { 
            opacity: 0.7; 
            transform: scale(1); 
          }
          50% { 
            opacity: 1; 
            transform: scale(1.1); 
          }
        }
        
        @keyframes rotateColors {
          0% { 
            transform: rotate(0deg) scale(1); 
          }
          50% {
            transform: rotate(180deg) scale(1.05);
          }
          100% { 
            transform: rotate(360deg) scale(1); 
          }
        }
        
        @keyframes shiftGradient {
          0%, 100% { 
            transform: translateX(0) translateY(0); 
          }
          25% { 
            transform: translateX(10%) translateY(-8%); 
          }
          50% { 
            transform: translateX(-10%) translateY(8%); 
          }
          75% { 
            transform: translateX(-8%) translateY(-10%); 
          }
        }
        
        @keyframes waveMotion {
          0%, 100% { 
            transform: translateY(0) scale(1); 
          }
          33% { 
            transform: translateY(-5%) scale(1.03); 
          }
          66% { 
            transform: translateY(5%) scale(0.97); 
          }
        }
      `}</style>
      
      <div className={`absolute w-full bg-white pt-[0rem] -z-10 ${className}`}>
        <div 
          className="absolute right-[-150%] md:right-[-10%] blur-[150px] w-[1710px] h-[1367px] rounded-[1710px]"
          style={{ 
            backgroundColor: colors.color1, 
            ...animationStyle,
            willChange: animation !== 'none' ? 'transform, opacity' : 'auto',
            backfaceVisibility: 'hidden'
          }}
        ></div>
        <div 
          className="absolute mt-[-10%] md:mt-0 left-[-200%] md:left-[-25%] blur-[180px] w-[1537.615px] md:w-[1809px] h-[1444px] rounded-[1537.615px] md:rounded-[1809px]"
          style={{ 
            backgroundColor: colors.color2, 
            ...animationStyle, 
            animationDelay: '2s',
            willChange: animation !== 'none' ? 'transform, opacity' : 'auto',
            backfaceVisibility: 'hidden'
          }}
        ></div>
        <div 
          className="ml-[-90%] md:ml-[-50%] lg:ml-[-32%] mt-[10%] md:mt-[7%] blur-[142px] w-[1502px] md:w-[2774px] h-[1174px] md:h-[1444px] rounded-[1502px] md:rounded-[2774px]"
          style={{ 
            backgroundColor: colors.color3, 
            ...animationStyle, 
            animationDelay: '4s',
            willChange: animation !== 'none' ? 'transform, opacity' : 'auto',
            backfaceVisibility: 'hidden'
          }}
        ></div>
      </div>
    </>
  );
}
