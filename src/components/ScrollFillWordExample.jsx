import { useRef } from "react";
import ScrollFillWord from "./ScrollFillWord";

export default function ScrollFillWordExample() {
  const contentRef = useRef(null);

  return (
    <div className="scroll-fill-demo">
    

      {/* Botón trigger con la palabra que se llena */}
      <div className="trigger fixed top-4 left-4 z-50 bg-black/80 backdrop-blur-sm rounded-lg p-4">
        <div className="trigger__details flex items-center gap-4">
          {/* Componente ScrollFillWord */}
          <div style={{ width: 190, height: 44 }}>
            <ScrollFillWord
              text="KUNORO"
              height={44}
              base="#777"         // oscuro
              fill="#fff"         // claro
              container={contentRef}
              direction="ltr"     // izquierda a derecha
              fontFamily="'After', Impact, sans-serif"
            />
          </div>
          
          {/* Indicador de progreso opcional */}
          <div className="progress w-2 h-2 bg-white/50 rounded-full" />
        </div>
      </div>

      {/* Contenedor que scrollea */}
      <div 
        className="content overflow-auto" 
        ref={contentRef}
        style={{ height: '100svh' }}
      >
        <div className="p-8 space-y-8">
          <h1 className="text-4xl font-bold mb-8">Scroll Fill Word Demo</h1>
          
          {/* Contenido de ejemplo para generar scroll */}
          {Array.from({ length: 20 }, (_, i) => (
            <div key={i} className="bg-gray-100 p-6 rounded-lg">
              <h2 className="text-2xl font-semibold mb-4">Sección {i + 1}</h2>
              <p className="text-gray-700 leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod 
                tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, 
                quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo 
                consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse 
                cillum dolore eu fugiat nulla pariatur.
              </p>
              <p className="text-gray-700 leading-relaxed mt-4">
                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia 
                deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste 
                natus error sit voluptatem accusantium doloremque laudantium.
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Ejemplos adicionales con diferentes configuraciones */}
      <div className="fixed top-4 right-4 z-50 space-y-4">
        {/* RTL Example */}
        <div className="bg-blue-900/80 backdrop-blur-sm rounded-lg p-3">
          <div style={{ width: 150, height: 32 }}>
            <ScrollFillWord
              text="RTL"
              height={32}
              base="#334155"
              fill="#60a5fa"
              container={contentRef}
              direction="rtl"     // derecha a izquierda
            />
          </div>
        </div>

        {/* Different font example */}
        <div className="bg-green-900/80 backdrop-blur-sm rounded-lg p-3">
          <div style={{ width: 120, height: 28 }}>
            <ScrollFillWord
              text="DEMO"
              height={28}
              base="#374151"
              fill="#34d399"
              container={contentRef}
              fontFamily="Arial Black, sans-serif"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
