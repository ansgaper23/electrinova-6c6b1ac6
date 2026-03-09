

# Plan de Mejoras para la Web de Electrinova Peru

Tras revisar toda la web, estas son las mejoras de mayor impacto organizadas por prioridad:

---

## 1. Pagina individual por servicio (SEO + Conversion)

Actualmente los servicios solo aparecen como tarjetas en el home. Crear una pagina `/servicios/:slug` para cada servicio (pozos a tierra, tableros electricos, subestaciones, etc.) con:
- Descripcion detallada, caracteristicas tecnicas y galeria de imagenes
- Schema.org `Service` con JSON-LD
- CTA de cotizacion integrado
- Breadcrumbs para navegacion

Esto mejoraria drasticamente el SEO para busquedas como "pozos a tierra Lima" o "tableros electricos industriales Peru".

## 2. Blog / Articulos tecnicos

Crear seccion `/blog` con articulos sobre temas electricos industriales:
- "Como saber si tu pozo a tierra necesita mantenimiento"
- "Normativa electrica industrial en Peru 2026"
- Esto atrae trafico organico de busqueda informacional y posiciona como autoridad

## 3. Animaciones de entrada en scroll

Agregar animaciones `fade-in` y `slide-up` con Intersection Observer a las secciones del home (servicios, stats, testimonios, proyectos). Actualmente las secciones aparecen estaticas al hacer scroll.

## 4. Contador animado en estadisticas

La seccion de StatsSection muestra numeros estaticos ("5+", "50+", "30+"). Implementar un contador animado que incremente los numeros cuando la seccion entra en viewport.

## 5. Galeria de fotos en proyectos

La pagina de proyectos muestra tarjetas pero no tiene un lightbox para ver las imagenes en detalle. Agregar un modal/lightbox al hacer clic en las imagenes.

## 6. FAQ con Schema.org

Agregar seccion de Preguntas Frecuentes en el home o como pagina independiente con datos estructurados `FAQPage` para aparecer en los snippets de Google.

## 7. Google Maps embed mejorado en Contacto

El mapa actual usa coordenadas genericas. Verificar que apunte exactamente a la direccion real y agregar un pin personalizado con el nombre de la empresa.

---

## Implementacion tecnica

| Mejora | Archivos nuevos/modificados | Complejidad |
|--------|---------------------------|-------------|
| Paginas de servicio | Nueva ruta, nuevo componente `ServicioDetalle.tsx`, datos en `services.ts` | Media |
| Blog | Nuevas paginas, tabla en BD para articulos, componentes de listado/detalle | Alta |
| Animaciones scroll | Hook `useInView`, clases CSS en `index.css`, aplicar en secciones home | Baja |
| Contador animado | Hook `useCountUp` en `StatsSection.tsx` | Baja |
| Lightbox proyectos | Componente modal en `Proyectos.tsx` | Baja |
| FAQ + Schema | Nuevo componente `FAQ.tsx`, JSON-LD en `Index.tsx` | Baja |
| Mapa mejorado | Actualizar iframe en `Contacto.tsx` | Baja |

Las mejoras 3, 4, 5 y 6 son rapidas y de alto impacto visual/SEO. Las mejoras 1 y 2 requieren mas trabajo pero tienen el mayor impacto en posicionamiento.

