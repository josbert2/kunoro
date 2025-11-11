# GradientBackground Component

Componente de fondo con gradientes animados diseñado para temas light. Proporciona múltiples variantes de color, niveles de intensidad y efectos de animación.

## 📦 Instalación y Uso

```jsx
import GradientBackground from '@/components/GradientBackground';

function MyPage() {
  return (
    <div className="relative min-h-screen">
      <GradientBackground 
        variant="purpleBlue" 
        intensity="medium" 
        animation="blend"
      />
      {/* Tu contenido aquí */}
    </div>
  );
}
```

## 🎨 Props

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `variant` | `string` | `'default'` | Variante de color del gradiente |
| `intensity` | `string` | `'medium'` | Nivel de intensidad/saturación |
| `animation` | `string` | `'none'` | Tipo de animación |
| `className` | `string` | `''` | Clases CSS adicionales |

## 🎨 Variantes de Color

### `default` - Rosa y Naranja
Combinación cálida de tonos rosa y naranja pastel.

```jsx
<GradientBackground variant="default" />
```

### `purpleBlue` - Púrpura y Azul
Gradiente de púrpura a azul, ideal para diseños modernos.

```jsx
<GradientBackground variant="purpleBlue" />
```

### `mintGreen` - Verde Menta
Tonos verdes menta y azul cielo, perfecto para temas frescos.

```jsx
<GradientBackground variant="mintGreen" />
```

### `peachLavender` - Durazno y Lavanda
Combinación suave de durazno y lavanda.

```jsx
<GradientBackground variant="peachLavender" />
```

### `cyanViolet` - Cyan y Violeta
Mezcla vibrante de cyan y violeta.

```jsx
<GradientBackground variant="cyanViolet" />
```

## 🎚️ Niveles de Intensidad

Cada variante está disponible en 4 niveles de intensidad:

### `soft` - Suave
Colores muy claros y sutiles.
```jsx
<GradientBackground intensity="soft" />
```

### `medium` - Medio (Default)
Balance perfecto entre visibilidad y sutileza.
```jsx
<GradientBackground intensity="medium" />
```

### `strong` - Fuerte
Colores más saturados y visibles.
```jsx
<GradientBackground intensity="strong" />
```

### `veryStrong` - Muy Fuerte
Máxima saturación de color.
```jsx
<GradientBackground intensity="veryStrong" />
```

## 🎬 Animaciones

### `none` - Sin Animación (Default)
Gradiente estático sin movimiento.
```jsx
<GradientBackground animation="none" />
```

### `blend` - Mezcla
Efecto de pulso suave con cambios de opacidad y escala (8s).
```jsx
<GradientBackground animation="blend" />
```

### `rotate` - Rotación
Rotación continua de 360° (15s).
```jsx
<GradientBackground animation="rotate" />
```

### `shift` - Desplazamiento
Movimiento en diferentes direcciones (10s).
```jsx
<GradientBackground animation="shift" />
```

### `wave` - Onda
Movimiento ondulatorio vertical suave (12s).
```jsx
<GradientBackground animation="wave" />
```

## 💡 Ejemplos Completos

### Ejemplo 1: Landing Page Moderna
```jsx
<div className="min-h-screen relative">
  <GradientBackground 
    variant="purpleBlue" 
    intensity="strong" 
    animation="shift"
  />
  <div className="relative z-10">
    <h1>Mi Landing Page</h1>
  </div>
</div>
```

### Ejemplo 2: Sección Hero Sutil
```jsx
<section className="relative py-20">
  <GradientBackground 
    variant="mintGreen" 
    intensity="soft" 
    animation="wave"
  />
  <div className="container relative z-10">
    <h2>Hero Section</h2>
  </div>
</section>
```

### Ejemplo 3: Dashboard con Animación
```jsx
<div className="min-h-screen relative bg-white">
  <GradientBackground 
    variant="peachLavender" 
    intensity="veryStrong" 
    animation="blend"
  />
  <div className="relative z-10 p-8">
    {/* Dashboard content */}
  </div>
</div>
```

## 🎯 Combinaciones Recomendadas

| Uso | Variante | Intensidad | Animación |
|-----|----------|------------|-----------|
| Landing Page | `purpleBlue` | `strong` | `shift` |
| Dashboard | `default` | `medium` | `blend` |
| Portfolio | `peachLavender` | `veryStrong` | `wave` |
| Documentación | `mintGreen` | `soft` | `none` |
| App Moderna | `cyanViolet` | `strong` | `rotate` |

## ⚡ Optimización

El componente incluye optimizaciones de performance:

- **`willChange`**: Prepara la GPU para animaciones suaves
- **`backfaceVisibility`**: Optimiza el rendering durante transformaciones
- **Delays escalonados**: Cada gradiente tiene un delay diferente para efecto orgánico
- **Blur controlado**: Usa valores de blur optimizados para balance entre calidad y performance

## 🔧 Personalización

### Agregar Nueva Variante

Edita `GRADIENT_VARIANTS` en el archivo del componente:

```javascript
const GRADIENT_VARIANTS = {
  // ...variantes existentes
  
  myCustomVariant: {
    soft: { color1: '#color1', color2: '#color2', color3: '#color3' },
    medium: { color1: '#color1', color2: '#color2', color3: '#color3' },
    strong: { color1: '#color1', color2: '#color2', color3: '#color3' },
    veryStrong: { color1: '#color1', color2: '#color2', color3: '#color3' }
  }
};
```

### Agregar Nueva Animación

Edita `ANIMATION_STYLES` y añade el `@keyframes`:

```javascript
const ANIMATION_STYLES = {
  // ...animaciones existentes
  
  myAnimation: {
    animation: 'myKeyframes 10s ease-in-out infinite'
  }
};

// En el JSX, agregar:
@keyframes myKeyframes {
  0% { /* estado inicial */ }
  100% { /* estado final */ }
}
```

## 📊 Total de Combinaciones

- **5 variantes** × **4 intensidades** × **5 animaciones** = **100 combinaciones únicas**

## 🐛 Notas Importantes

1. El componente usa `z-index: -10` por defecto, asegúrate de que el contenido tenga `z-index` mayor.
2. Requiere un contenedor con `position: relative` para posicionamiento correcto.
3. Las animaciones pueden afectar el performance en dispositivos de baja gama, usa `animation="none"` si es necesario.
4. El blur pesado puede causar lag en navegadores antiguos.

## 📝 Licencia

Parte del proyecto Kunoro.
