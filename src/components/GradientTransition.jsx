/**
 * GradientTransition Component
 * 
 * Componente de transición gradual de blanco a oscuro con gradientes animados.
 * Ideal para secciones que conectan áreas light con áreas dark.
 * 
 * @component
 */

const TRANSITION_VARIANTS = {
  default: {
    soft: { 
      overlay1: 'rgba(45, 27, 61, 0.3)', 
      overlay2: 'rgba(27, 42, 61, 0.3)',
      baseGradient: 'linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(239,235,229,1) 20%, rgba(150,150,150,0.8) 50%, rgba(50,50,50,0.9) 80%, rgba(7,7,7,1) 100%)'
    },
    medium: { 
      overlay1: 'rgba(45, 27, 61, 0.5)', 
      overlay2: 'rgba(27, 42, 61, 0.5)',
      baseGradient: 'linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(220,220,220,1) 15%, rgba(120,120,120,0.9) 45%, rgba(30,30,30,0.95) 75%, rgba(7,7,7,1) 100%)'
    },
    strong: { 
      overlay1: 'rgba(61, 37, 80, 0.6)', 
      overlay2: 'rgba(37, 53, 80, 0.6)',
      baseGradient: 'linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(200,200,200,1) 10%, rgba(100,100,100,1) 40%, rgba(20,20,20,1) 70%, rgba(7,7,7,1) 100%)'
    }
  },
  
  purpleBlue: {
    soft: { 
      overlay1: 'rgba(45, 27, 61, 0.4)', 
      overlay2: 'rgba(27, 42, 61, 0.4)',
      baseGradient: 'linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(240,235,250,1) 20%, rgba(150,140,180,0.8) 50%, rgba(40,30,60,0.9) 80%, rgba(7,7,7,1) 100%)'
    },
    medium: { 
      overlay1: 'rgba(61, 37, 80, 0.5)', 
      overlay2: 'rgba(37, 53, 80, 0.5)',
      baseGradient: 'linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(230,220,240,1) 15%, rgba(130,110,160,0.9) 45%, rgba(35,25,55,0.95) 75%, rgba(7,7,7,1) 100%)'
    },
    strong: { 
      overlay1: 'rgba(77, 47, 96, 0.7)', 
      overlay2: 'rgba(47, 64, 96, 0.7)',
      baseGradient: 'linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(220,210,235,1) 10%, rgba(110,90,150,1) 40%, rgba(30,20,50,1) 70%, rgba(7,7,7,1) 100%)'
    }
  },
  
  neutral: {
    soft: { 
      overlay1: 'rgba(30, 30, 30, 0.2)', 
      overlay2: 'rgba(35, 35, 35, 0.2)',
      baseGradient: 'linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(245,245,245,1) 25%, rgba(160,160,160,0.7) 55%, rgba(60,60,60,0.85) 82%, rgba(7,7,7,1) 100%)'
    },
    medium: { 
      overlay1: 'rgba(40, 40, 40, 0.3)', 
      overlay2: 'rgba(45, 45, 45, 0.3)',
      baseGradient: 'linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(230,230,230,1) 20%, rgba(140,140,140,0.85) 50%, rgba(50,50,50,0.9) 78%, rgba(7,7,7,1) 100%)'
    },
    strong: { 
      overlay1: 'rgba(50, 50, 50, 0.5)', 
      overlay2: 'rgba(55, 55, 55, 0.5)',
      baseGradient: 'linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(210,210,210,1) 15%, rgba(120,120,120,0.95) 45%, rgba(40,40,40,1) 72%, rgba(7,7,7,1) 100%)'
    }
  }
};

const ANIMATION_STYLES = {
  none: {},
  blend: {
    animation: 'transitionPulse 12s ease-in-out infinite'
  },
  shift: {
    animation: 'transitionShift 15s ease-in-out infinite'
  },
  wave: {
    animation: 'transitionWave 18s ease-in-out infinite'
  }
};

/**
 * GradientTransition Component
 * 
 * @param {Object} props
 * @param {('default'|'purpleBlue'|'neutral')} [props.variant='default']
 * @param {('soft'|'medium'|'strong')} [props.intensity='medium']
 * @param {('none'|'blend'|'shift'|'wave')} [props.animation='none']
 * @param {string} [props.height='500px'] - Altura de la transición
 * @param {string} [props.className='']
 */
export default function GradientTransition({ 
  variant = 'default', 
  intensity = 'medium',
  animation = 'none',
  height = '500px',
  className = '' 
}) {
  const selectedVariant = TRANSITION_VARIANTS[variant] || TRANSITION_VARIANTS.default;
  const colors = selectedVariant[intensity] || selectedVariant.medium;
  const animationStyle = ANIMATION_STYLES[animation] || ANIMATION_STYLES.none;
  
  return (
    <>
      <style>{`
        @keyframes transitionPulse {
          0%, 100% { 
            opacity: 0.7; 
            transform: scale(1); 
          }
          50% { 
            opacity: 1; 
            transform: scale(1.05); 
          }
        }
        
        @keyframes transitionShift {
          0%, 100% { 
            transform: translateX(0) translateY(0); 
          }
          25% { 
            transform: translateX(6%) translateY(-4%); 
          }
          50% { 
            transform: translateX(-6%) translateY(4%); 
          }
          75% { 
            transform: translateX(-4%) translateY(-6%); 
          }
        }
        
        @keyframes transitionWave {
          0%, 100% { 
            transform: translateY(0) scale(1); 
          }
          33% { 
            transform: translateY(-3%) scale(1.02); 
          }
          66% { 
            transform: translateY(3%) scale(0.98); 
          }
        }
      `}</style>
      
      <div 
        className={`relative w-full overflow-hidden ${className}`}
        style={{ height }}
      >
        {/* Gradiente base de blanco a negro */}
        <div 
          className="absolute inset-0 w-full h-full"
          style={{ 
            background: colors.baseGradient
          }}
        />
        
        {/* Overlays de color animados */}
        <div 
          className="absolute top-[20%] right-[-100%] md:right-[-5%] blur-[120px] w-[1200px] h-[800px] rounded-full"
          style={{ 
            backgroundColor: colors.overlay1,
            ...animationStyle,
            willChange: animation !== 'none' ? 'transform, opacity' : 'auto',
            backfaceVisibility: 'hidden'
          }}
        />
        <div 
          className="absolute top-[40%] left-[-150%] md:left-[-20%] blur-[140px] w-[1400px] h-[900px] rounded-full"
          style={{ 
            backgroundColor: colors.overlay2,
            ...animationStyle,
            animationDelay: '4s',
            willChange: animation !== 'none' ? 'transform, opacity' : 'auto',
            backfaceVisibility: 'hidden'
          }}
        />
      </div>
    </>
  );
}
