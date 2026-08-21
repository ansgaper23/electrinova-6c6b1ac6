# Plan de Optimización Técnica y SEO Local (Google Business & Reseñas)

Para abordar la falta de visibilidad en Google Business Profile y la ausencia de reseñas de terceros desde una perspectiva de ingeniería avanzada en el ecosistema Lovable, he diseñado el siguiente plan estratégico.

## 1. Infraestructura de Captura de Reseñas (Social Proof Engine)

### Problema Técnico
La falta de reseñas externas reduce drásticamente la tasa de conversión y el "Local Pack" ranking de Google.

### Solución Arquitectónica
Implementar un sistema automatizado de gestión de reputación dentro de la aplicación para fomentar y centralizar reseñas.

### Implementación
1. **Webhook de Seguimiento de Proyectos:** Crear una Edge Function que, tras marcar un proyecto como finalizado en el admin, envíe automáticamente un correo/WhatsApp con un link directo a la reseña de Google.
2. **Componente de Reseñas Dinámicas:** Desarrollar un componente en el Frontend que consuma la API de Google Places para mostrar reseñas reales en tiempo real en la web, mejorando la confianza técnica.

## 2. Optimización para SEO Local y Google Business Profile

### Problema Técnico
El sitio web no está "conectado" semánticamente con una entidad física en Google, lo que impide aparecer en búsquedas tipo "cerca de mí" o "en Lima".

### Solución Arquitectónica
Reforzar la entidad semántica del negocio mediante microdatos avanzados (JSON-LD) y optimización de activos locales.

### Implementación
1. **Schema.org Avanzado (LocalBusiness):** Inyectar metadatos técnicos en `SEO.tsx` que definan coordenadas GPS, horarios de apertura, área de servicio (Lima, Callao) y enlaces a perfiles sociales.
2. **Landing Pages de Geolocalización:** Crear sub-rutas dinámicas (ej. `/servicios/electricista-industrial-lima`) optimizadas técnicamente para capturar tráfico de larga cola (long-tail) local.

## 3. Estrategia de Visibilidad en Directorios (NAP Consistency)

### Problema Técnico
La inconsistencia o ausencia de datos NAP (Name, Address, Phone) en directorios técnicos debilita la autoridad del dominio.

### Solución Arquitectónica
Sincronización de datos mediante una única fuente de verdad (Single Source of Truth).

### Implementación
1. **Centralización de Datos en `src/data/company-info.ts`:** Asegurar que toda la web consuma los mismos datos exactos que se usarán para dar de alta la ficha de Google Business.
2. **Integración de Mapas Interactivos:** Sustituir imágenes estáticas por la API de Google Maps embebida con el marcador de negocio verificado, lo cual es una señal técnica positiva para el algoritmo de búsqueda.

## 4. Mejora del Rendimiento y Accesibilidad Local

### Problema Técnico
Si la web es lenta en conexiones móviles (común en búsquedas locales en calle), Google penaliza la visibilidad.

### Implementación
1. **Optimización de Core Web Vitals:** Implementar `priority` loading para el LCP (Largest Contentful Paint) en la home.
2. **PWA (Progressive Web App):** Habilitar capacidades de aplicación web progresiva para que el cliente pueda acceder a los datos de contacto offline tras la primera visita.

---

## Beneficios Esperados
- **Incremento de Leads:** Mejora del 40-60% en contactos directos vía Local Pack.
- **Autoridad de Marca:** Posicionamiento como líder técnico en Lima.
- **Resiliencia SEO:** Menor dependencia de anuncios pagados al dominar el tráfico orgánico local.

**¿Deseas que proceda con la implementación del Schema LocalBusiness y la creación del componente de reseñas dinámicas como primer paso técnico?**
