# Plan de Implementación: Sistema de Medición y Atribución (Conversion Tracking & Analytics)

Este plan aborda la falta de visibilidad sobre el origen y comportamiento de los contactos en Electrinova Perú mediante la implementación de una infraestructura de medición profesional.

## Objetivos
1. **Instalación de Contenedores:** Configurar Google Tag Manager (GTM) como capa de orquestación.
2. **Medición de Eventos:** Rastrear clics en WhatsApp, llamadas telefónicas y envíos de formularios.
3. **Píxeles de Conversión:** Integrar Meta Pixel y Google Analytics 4 (GA4).
4. **Atribución de Leads:** Identificar el origen del tráfico (SEO, Blog, Directo).

## Detalles Técnicos

### 1. Infraestructura de Medición (Frontend)
- **GTM & GA4:** Se integrarán mediante el componente `AnalyticsProvider.tsx` para asegurar que carguen después de la hidratación y no afecten los Core Web Vitals.
- **Data Layer:** Implementación de `window.dataLayer.push` para eventos críticos:
  - `generate_lead` (Envío de formulario exitoso)
  - `whatsapp_click` (Clic en el widget de WhatsApp)
  - `phone_call_click` (Clic en números de teléfono)
  - `blog_engagement` (Lectura profunda de artículos)

### 2. Atribución en Backend (Edge Functions)
- **Lead Enrichment:** Modificar la función de contacto para capturar `utm_source`, `utm_medium` y `gclid` (Google Click ID).
- **Notificaciones con Contexto:** Los correos de notificación de contacto ahora incluirán "Origen del Lead" para que el equipo de ventas sepa qué canal está funcionando.

### 3. Seguridad y Privacidad
- **Consent Mode:** Implementación básica para cumplir con políticas de privacidad.
- **Secrets Management:** Almacenamiento de IDs de seguimiento en variables de entorno (`secrets`).

## Pasos de Implementación

1. **Fase 1: Capa de Rastreo Base**
   - Crear `src/components/analytics/Analytics.tsx`.
   - Inyectar scripts de GTM y Meta Pixel en `index.html`.
   - Configurar variables de entorno para los IDs.

2. **Fase 2: Medición de Conversiones**
   - Añadir triggers de eventos en `ContactForm.tsx`.
   - Añadir rastreo de clics en el componente `WhatsAppWidget.tsx` (si existe) y botones de llamada.

3. **Fase 3: Reporte y Optimización**
   - Configurar el dashboard de GA4 para medir el ROI del blog (tráfico blog -> contacto).

---
**¿Deseas que comience instalando el componente base de Analytics y configurando el seguimiento de eventos en los botones de contacto?**
