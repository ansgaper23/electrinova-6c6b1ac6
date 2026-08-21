# Plan de Mejora de Diseño del Blog

Mejoraremos la estética y la experiencia de usuario del blog para que sea más profesional, técnico y visualmente atractivo, alineado con la identidad B2B de Electrinova Perú.

## Cambios propuestos

### 1. Rediseño de la Página de Listado del Blog (`src/pages/Blog.tsx`)
- **Hero Section**: Introducción de un fondo con partículas sutiles o un gradiente más sofisticado. Mejora de la tipografía del título.
- **Tarjetas de Artículos**:
    - Efecto de hover más suave con elevación sutil.
    - Mejora de la jerarquía visual: mayor énfasis en el título y uso de una paleta cromática más cohesiva.
    - Introducción de etiquetas de categoría más visibles con colores semánticos.
- **Post Destacado**: Rediseño del layout para que ocupe el ancho completo de forma más armónica en pantallas grandes, con una imagen de mayor impacto.
- **Filtros**: Modernización de la barra de categorías y búsqueda.

### 2. Rediseño del Artículo de Blog (`src/pages/BlogPost.tsx`)
- **Lectura**: Mejora del ancho de línea y espaciado para facilitar la lectura técnica.
- **Elementos de Contenido**:
    - Estilización de bloques de código (si los hubiera) y citas.
    - Mejora de las imágenes dentro del cuerpo con sombras suaves y bordes redondeados consistentes.
    - Introducción de una barra de progreso de lectura (opcional, evaluando rendimiento).
- **Sidebar/Footer del Post**: Rediseño de la sección "Sigue leyendo" con tarjetas más compactas y elegantes.

### 3. Optimizaciones Técnicas
- Implementación de `Skeleton` más precisos para evitar el layout shift.
- Refinamiento de las animaciones `animate-fade-in-up` para que sean más fluidas.

## Detalles técnicos
- **Estilos**: Uso estricto de los tokens de diseño de `index.css` y `tailwind.config.ts`.
- **Componentes**: Utilización de componentes de `shadcn/ui` para consistencia.
- **SEO**: Mantenimiento de toda la estructura de JSON-LD y metadatos ya implementada.

---
*Este plan se enfoca exclusivamente en la mejora visual y de experiencia de usuario solicitada.*
