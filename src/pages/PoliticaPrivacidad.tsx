import { Layout } from "@/components/layout/Layout";
import { Shield } from "lucide-react";

const PoliticaPrivacidad = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-32 pb-16 gradient-hero">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-flex items-center gap-2 text-accent font-semibold mb-4">
              <Shield className="h-5 w-5" />
              Privacidad
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
              Política de <span className="text-gradient-accent">Privacidad</span>
            </h1>
            <p className="text-lg text-primary-foreground/80">
              Tu privacidad es importante para nosotros. Conoce cómo protegemos tu información.
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding bg-background">
        <div className="container-custom max-w-4xl">
          <div className="prose prose-lg max-w-none">
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">1. Información que Recopilamos</h2>
                <p className="text-muted-foreground leading-relaxed">
                  En ELECTRINOVA PERÚ, recopilamos información personal que nos proporcionas voluntariamente 
                  al completar formularios de contacto, solicitar cotizaciones o comunicarte con nosotros. 
                  Esta información puede incluir:
                </p>
                <ul className="list-disc list-inside text-muted-foreground mt-4 space-y-2">
                  <li>Nombre completo</li>
                  <li>Dirección de correo electrónico</li>
                  <li>Número de teléfono</li>
                  <li>Información sobre tu proyecto o consulta</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">2. Uso de la Información</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Utilizamos la información recopilada para:
                </p>
                <ul className="list-disc list-inside text-muted-foreground mt-4 space-y-2">
                  <li>Responder a tus consultas y solicitudes de cotización</li>
                  <li>Brindarte información sobre nuestros servicios</li>
                  <li>Mejorar la calidad de nuestros servicios</li>
                  <li>Enviarte comunicaciones relacionadas con tu proyecto</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">3. Protección de Datos</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Implementamos medidas de seguridad técnicas y organizativas para proteger tu información 
                  personal contra el acceso no autorizado, la alteración, divulgación o destrucción. 
                  Limitamos el acceso a tu información personal a aquellos empleados que necesitan conocerla 
                  para procesar tu solicitud.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">4. Compartir Información</h2>
                <p className="text-muted-foreground leading-relaxed">
                  No vendemos, comercializamos ni transferimos tu información personal a terceros sin tu 
                  consentimiento, excepto cuando sea necesario para cumplir con la ley o proteger nuestros derechos.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">5. Cookies</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Nuestro sitio web puede utilizar cookies para mejorar tu experiencia de navegación. 
                  Las cookies son pequeños archivos que se almacenan en tu dispositivo y nos ayudan a 
                  recordar tus preferencias y entender cómo interactúas con nuestro sitio.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">6. Tus Derechos</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Tienes derecho a:
                </p>
                <ul className="list-disc list-inside text-muted-foreground mt-4 space-y-2">
                  <li>Acceder a tu información personal</li>
                  <li>Solicitar la corrección de datos inexactos</li>
                  <li>Solicitar la eliminación de tu información</li>
                  <li>Oponerte al procesamiento de tu información</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">7. Contacto</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Si tienes preguntas sobre esta política de privacidad o deseas ejercer tus derechos, 
                  puedes contactarnos a través de:
                </p>
                <ul className="list-none text-muted-foreground mt-4 space-y-2">
                  <li><strong>Email:</strong> ventas@electrinovaperu.com</li>
                  <li><strong>Teléfono:</strong> 934 014 639</li>
                  <li><strong>Dirección:</strong> Pje Laburre 158, Cercado de Lima, Perú</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">8. Actualizaciones</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Nos reservamos el derecho de actualizar esta política de privacidad en cualquier momento. 
                  Te notificaremos sobre cualquier cambio publicando la nueva política en esta página con 
                  una fecha de actualización.
                </p>
                <p className="text-muted-foreground mt-4">
                  <strong>Última actualización:</strong> Febrero 2026
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default PoliticaPrivacidad;
