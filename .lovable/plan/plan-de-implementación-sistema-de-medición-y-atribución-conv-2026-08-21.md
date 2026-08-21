# Plan de Implementación: Sistema de Medición y Atribución (Conversion Tracking & Analytics)

Este plan aborda la falta de visibilidad sobre el origen y comportamiento de los contactos en Electrinova Perú mediante la implementación de una infraestructura de medición profesional, priorizando canales B2B y cumplimiento normativo.

## Objetivos
1. **Instalación de Contenedores:** Configurar Google Tag Manager (GTM) como capa de orquestación.
2. **Medición de Eventos:** Rastrear clics en WhatsApp, llamadas telefónicas y envíos de formularios.
3. **Píxeles de Conversión:** Integrar Google Ads y LinkedIn Insight Tag (prioritarios) y Meta Pixel (secundario).
4. **Cumplimiento Legal:** Implementar un banner de consentimiento de cookies real con bloqueo preventivo.
5. **Validación:** Asegurar la calidad de los datos mediante herramientas de depuración antes del despliegue final.

## Detalles Técnicos

### 1. Infraestructura de Medición (Frontend)
- **GTM & GA4:** Se integrarán mediante el componente `AnalyticsProvider.tsx`.
- **Consentimiento Real:** Implementación de un `CookieBanner.tsx` que bloquea scripts de rastreo hasta que el usuario dé su aprobación explícita.
- **Data Layer:** Implementación de `window.dataLayer.push` para eventos críticos:
  - `generate_lead` (Envío de formulario exitoso)
  - `whatsapp_click` (Clic en el widget de WhatsApp)
  - `phone_call_click` (Clic en números de teléfono)

### 2. Atribución en Backend (Edge Functions)
- **Lead Enrichment:** Modificar la función de contacto para capturar `utm_source`, `utm_medium` y `gclid` (Google Click ID).
- **Notificaciones con Contexto:** Los correos de notificación de contacto ahora incluirán "Origen del Lead".

### 3. Validación y Debugging
- **GTM Preview Mode:** Validación de triggers y variables en tiempo real.
- **GA4 DebugView:** Verificación de que los eventos llegan con los parámetros correctos.

## Pasos de Implementación

1. **Fase 1: Capa de Rastreo y Consentimiento**
   - Crear `src/components/analytics/Analytics.tsx`.
   - Implementar `src/components/analytics/CookieBanner.tsx` para cumplimiento legal.
   - Configurar IDs de Google Ads y LinkedIn Insight Tag.

2. **Fase 2: Medición de Conversiones y Atribución**
   - Añadir triggers de eventos en `ContactForm.tsx`.
   - Rastrear clics en botones de contacto (WhatsApp/Llamada).
   - Integrar captura de UTMs en el backend.

3. **Fase 3: Optimización y Validación**
   - Implementar `blog_engagement` (rastreo de scroll y tiempo en página para el blog).
   - Pruebas finales con GTM Preview / GA4 DebugView.
   - Configurar reporte de ROI por canal en GA4.

---
**¿Deseas que comience con la Fase 1: Creación del componente de Analytics y el Banner de Consentimiento Real?**

