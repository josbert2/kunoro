# DarkGradientBackground Component

Componente de fondo con gradientes oscuros animados diseñado para secciones dark, footers y áreas con temas oscuros. Proporciona múltiples variantes de color, niveles de intensidad y efectos de animación.

## 📦 Instalación y Uso

```jsx
import DarkGradientBackground from '@/components/DarkGradientBackground';

function Footer() {
  return (
    <footer className="relative min-h-screen bg-[#070707]">
      <DarkGradientBackground 
        variant="purpleBlue" 
        intensity="medium" 
        animation="shift"
      />
      {/* Tu contenido aquí */}
    </footer>
  );
}
```

## 🎨 Props

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `variant` | `string` | `'default'` | Variante de color del gradiente oscuro |
| `intensity` | `string` | `'medium'` | Nivel de intensidad/saturación |
| `animation` | `string` | `'none'` | Tipo de animación |
| `className` | `string` | `''` | Clases CSS adicionales |

## 🎨 Variantes de Color Oscuro

### `default` - Púrpura y Azul Oscuro
Combinación de tonos púrpura y azul sobre base negra (#070707).

```jsx
<DarkGradientBackground variant="default" />
```

### `purpleBlue` - Púrpura y Azul Intenso
Gradiente de púrpura a azul más saturado, ideal para diseños modernos.

```jsx
<DarkGradientBackground variant="purpleBlue" />
```

### `redOrange` - Rojo y Naranja Oscuro
Tonos cálidos de rojo y naranja sobre fondo negro.

```jsx
<DarkGradientBackground variant="redOrange" />
```

### `greenTeal` - Verde y Teal
Combinación de verde oscuro y teal.

```jsx
<DarkGradientBackground variant="greenTeal" />
```

### `neutral` - Grises Neutros
Gradiente de grises sin color, perfecto para diseños minimalistas.

```jsx
<DarkGradientBackground variant="neutral" />
```

## 🎚️ Niveles de Intensidad

### `soft` - Suave
Tonos muy sutiles, apenas perceptibles sobre el fondo negro.
```jsx
<DarkGradientBackground intensity="soft" />
```

### `medium` - Medio (Default)
Balance perfecto entre visibilidad y sutileza.
```jsx
<DarkGradientBackground intensity="medium" />
```

### `strong` - Fuerte
Colores más visibles y saturados.
```jsx
<DarkGradientBackground intensity="strong" />
```

### `veryStrong` - Muy Fuerte
Máxima saturación de color manteniendo el tema oscuro.
```jsx
<DarkGradientBackground intensity="veryStrong" />
```

## 🎬 Animaciones

### `none` - Sin Animación (Default)
Gradiente estático sin movimiento.
```jsx
<DarkGradientBackground animation="none" />
```

### `blend` - Mezcla
Efecto de pulso suave con cambios de opacidad y escala (10s).
```jsx
<DarkGradientBackground animation="blend" />
```

### `rotate` - Rotación
Rotación continua de 360° (20s).
```jsx
<DarkGradientBackground animation="rotate" />
```

### `shift` - Desplazamiento
Movimiento en diferentes direcciones (12s).
```jsx
<DarkGradientBackground animation="shift" />
```

### `wave` - Onda
Movimiento ondulatorio vertical suave (15s).
```jsx
<DarkGradientBackground animation="wave" />
```

## 💡 Ejemplos Completos

### Ejemplo 1: Footer Moderno
```jsx
<footer className="relative min-h-screen bg-[#070707]">
  <DarkGradientBackground 
    variant="purpleBlue" 
    intensity="medium" 
    animation="shift"
  />
  <div className="relative z-10 container py-20">
    <div className="grid grid-cols-4 gap-8 text-white">
      {/* Footer content */}
    </div>
  </div>
</footer>
```

### Ejemplo 2: Hero Section Oscura
```jsx
<section className="relative min-h-screen bg-[#070707]">
  <DarkGradientBackground 
    variant="redOrange" 
    intensity="strong" 
    animation="blend"
  />
  <div className="relative z-10 flex items-center justify-center h-screen">
    <h1 className="text-white text-6xl">Hero Title</h1>
  </div>
</section>
```

### Ejemplo 3: Sección CTA Oscura
```jsx
<section className="relative py-32 bg-[#070707]">
  <DarkGradientBackground 
    variant="greenTeal" 
    intensity="soft" 
    animation="wave"
  />
  <div className="relative z-10 text-center">
    <h2 className="text-white text-4xl mb-8">Ready to get started?</h2>
    <button className="bg-white text-black px-8 py-3 rounded-full">
      Contact Us
    </button>
  </div>
</section>
```

## 🎯 Combinaciones Recomendadas

| Uso | Variante | Intensidad | Animación |
|-----|----------|------------|-----------|
| Footer Principal | `purpleBlue` | `medium` | `shift` |
| Hero Oscuro | `redOrange` | `strong` | `blend` |
| Sección CTA | `greenTeal` | `soft` | `wave` |
| About Section | `default` | `medium` | `none` |
| Contact Section | `neutral` | `strong` | `rotate` |

## ⚡ Optimización

El componente incluye optimizaciones de performance:

- **`willChange`**: Prepara la GPU para animaciones suaves
- **`backfaceVisibility`**: Optimiza el rendering durante transformaciones
- **Delays escalonados**: 3s, 6s para efecto orgánico
- **Blur más intenso**: blur-[180px], blur-[200px], blur-[160px] para efecto dramático

## 🔧 Diferencias con GradientBackground

| Característica | GradientBackground | DarkGradientBackground |
|----------------|-------------------|------------------------|
| Tema | Light | Dark |
| Fondo base | `bg-white` | `bg-[#070707]` |
| Blur | 150px, 180px, 142px | 180px, 200px, 160px |
| Animaciones | 8s, 15s, 10s, 12s | 10s, 20s, 12s, 15s |
| Delays | 2s, 4s | 3s, 6s |
| Colores | Pasteles claros | Oscuros saturados |

## 🎨 Personalización

### Agregar Nueva Variante Oscura

```javascript
const DARK_GRADIENT_VARIANTS = {
  // ...variantes existentes
  
  myDarkVariant: {
    base: '#070707',
    soft: { color1: '#hex1', color2: '#hex2', color3: '#hex3' },
    medium: { color1: '#hex1', color2: '#hex2', color3: '#hex3' },
    strong: { color1: '#hex1', color2: '#hex2', color3: '#hex3' },
    veryStrong: { color1: '#hex1', color2: '#hex2', color3: '#hex3' }
  }
};
```

**Tip:** Usa colores oscuros con baja luminosidad para mantener el tema dark.

## 📊 Total de Combinaciones

- **5 variantes** × **4 intensidades** × **5 animaciones** = **100 combinaciones únicas**

## 🐛 Notas Importantes

1. El componente usa `bg-[#070707]` como fondo base, asegúrate de que tu contenedor padre también use un fondo oscuro.
2. El contenido necesita `z-index` mayor que `-10` y `text-white` o colores claros para ser visible.
3. Las animaciones son más lentas que en `GradientBackground` para un efecto más sutil.
4. El blur es más intenso para crear profundidad en temas oscuros.
5. Ideal para combinarlo con `text-white`, `text-gray-100`, etc.

## 💡 Tips de Uso

### Contraste del Texto
```jsx
<div className="relative z-10 text-white">
  {/* Contenido siempre visible sobre el gradiente oscuro */}
</div>
```

### Combinar con Overlay
```jsx
<DarkGradientBackground variant="purpleBlue" intensity="strong" />
<div className="absolute inset-0 bg-black/20 -z-5"></div>
```

### Sección Completa
```jsx
<section className="relative min-h-screen bg-[#070707]">
  <DarkGradientBackground 
    variant="default" 
    intensity="medium" 
    animation="shift"
  />
  <div className="relative z-10">
    {/* Tu contenido aquí */}
  </div>
</section>
```

## 📝 Integración con Footer

Ya está integrado en el componente `Footer.jsx`:

```jsx
import DarkGradientBackground from './DarkGradientBackground';

function Footer() {
  return (
    <div className="overlap-footer">
      <DarkGradientBackground 
        variant="purpleBlue" 
        intensity="medium" 
        animation="shift"
      />
      {/* Resto del footer */}
    </div>
  );
}
```

## 📝 Licencia

Parte del proyecto Kunoro.
