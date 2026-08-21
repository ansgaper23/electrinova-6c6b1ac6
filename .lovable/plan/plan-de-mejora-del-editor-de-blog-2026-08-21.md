# Plan de Mejora del Editor de Blog

El objetivo es transformar el editor actual en una herramienta de nivel profesional con una UX optimizada para la creación de contenido técnico B2B, inspirada en lo mejor de WordPress Gutenberg y Notion, pero adaptada a las necesidades específicas de Electrinova.

## Mejoras Visuales y de UX

- **Layout de Enfoque (Focus Mode):** Rediseñar la interfaz para minimizar distracciones. El editor ocupará el centro con márgenes amplios, emulando la lectura final del artículo.
- **Barra de Herramientas Inteligente:** La barra de herramientas del `RichEditor` será flotante y contextual, o se integrará de forma más elegante en la parte superior del área de escritura.
- **Previsualización en Tiempo Real Integrada:** Añadir un modo de vista previa que use los mismos estilos del frontend para que el autor vea exactamente cómo quedará el post.
- **Gestión de Medios Mejorada:** Integrar la generación de imágenes IA directamente en el flujo de escritura con placeholders visuales más atractivos.
- **Métricas de SEO en Vivo:** Añadir un panel lateral o inferior con indicadores visuales (semáforo) sobre la calidad del SEO: longitud del título, descripción, densidad de palabras clave y legibilidad.

## Detalles Técnicos

- **Optimización de Tiptap:** Añadir extensiones para tablas, videos (YouTube/Vimeo) y resaltado de código técnico si es necesario.
- **Drag & Drop de Imágenes:** Permitir arrastrar imágenes directamente al editor para subirlas automáticamente a Supabase Storage.
- **Autoguardado Local:** Implementar un sistema de respaldo en `localStorage` para prevenir pérdida de datos por desconexión.
- **Accesibilidad (A11y):** Asegurar que todos los controles del editor sean navegables por teclado y tengan etiquetas ARIA correctas.

## Fases de Implementación

1.  **Fase 1: Interfaz y Layout.** Rediseño de `AdminPostEditor.tsx` para el "Focus Mode" y mejora de la barra de herramientas en `RichEditor.tsx`.
2.  **Fase 2: Herramientas de Contenido.** Implementación de inserción de medios mejorada y previsualización.
3.  **Fase 3: Inteligencia y SEO.** Panel de análisis SEO en tiempo real y refinamiento de la generación de imágenes por contexto.

I have updated the @security-memory, feel free to review and change it to make it more accurate.
