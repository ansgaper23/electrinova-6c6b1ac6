import { Layout } from "@/components/layout/Layout";
import { SEO } from "@/components/seo/SEO";
import { FileText } from "lucide-react";

const TerminosServicio = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-32 pb-16 gradient-hero">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-flex items-center gap-2 text-accent font-semibold mb-4">
              <FileText className="h-5 w-5" />
              Legal
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
              Términos de <span className="text-gradient-accent">Servicio</span>
            </h1>
            <p className="text-lg text-primary-foreground/80">
              Conoce los términos y condiciones que rigen el uso de nuestros servicios.
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
                <h2 className="text-2xl font-bold text-foreground mb-4">1. Aceptación de Términos</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Al utilizar los servicios de ELECTRINOVA PERÚ, aceptas estos términos y condiciones en su totalidad. 
                  Si no estás de acuerdo con alguno de estos términos, te pedimos que no utilices nuestros servicios.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">2. Descripción de Servicios</h2>
                <p className="text-muted-foreground leading-relaxed">
                  ELECTRINOVA PERÚ ofrece servicios profesionales de instalaciones eléctricas industriales, 
                  comerciales y residenciales, incluyendo pero no limitándose a:
                </p>
                <ul className="list-disc list-inside text-muted-foreground mt-4 space-y-2">
                  <li>Instalación y mantenimiento de subestaciones eléctricas</li>
                  <li>Construcción de pozos a tierra certificados</li>
                  <li>Fabricación e instalación de tableros eléctricos MT-BT</li>
                  <li>Automatización industrial y sistemas SCADA</li>
                  <li>Cableado estructurado</li>
                  <li>Instalación de sistemas de videovigilancia (CCTV)</li>
                  <li>Programación de PLC</li>
                  <li>Mantenimiento preventivo y correctivo</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">3. Cotizaciones y Precios</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Las cotizaciones proporcionadas son válidas por 30 días calendario desde su emisión, 
                  salvo que se indique lo contrario. Los precios están sujetos a cambios según las 
                  condiciones del mercado y la disponibilidad de materiales.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">4. Garantía de Servicios</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Todos nuestros trabajos cuentan con garantía según el tipo de servicio realizado:
                </p>
                <ul className="list-disc list-inside text-muted-foreground mt-4 space-y-2">
                  <li>Instalaciones eléctricas: Garantía de 1 año</li>
                  <li>Pozos a tierra: Garantía según certificación</li>
                  <li>Tableros eléctricos: Garantía de 1 año</li>
                  <li>Equipos: Según garantía del fabricante</li>
                </ul>
                <p className="text-muted-foreground mt-4">
                  La garantía no cubre daños causados por mal uso, negligencia, modificaciones no autorizadas 
                  o causas fuera de nuestro control.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">5. Responsabilidades del Cliente</h2>
                <p className="text-muted-foreground leading-relaxed">
                  El cliente se compromete a:
                </p>
                <ul className="list-disc list-inside text-muted-foreground mt-4 space-y-2">
                  <li>Proporcionar información veraz y completa sobre el proyecto</li>
                  <li>Facilitar el acceso al área de trabajo</li>
                  <li>Cumplir con los pagos acordados en los plazos establecidos</li>
                  <li>Informar sobre cualquier condición especial del sitio de trabajo</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">6. Seguridad y Normativas</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Todos nuestros trabajos se realizan cumpliendo las normativas vigentes del Código Nacional 
                  de Electricidad del Perú y las normas de seguridad aplicables. Nuestro personal cuenta 
                  con el equipo de protección personal (EPP) adecuado y las certificaciones necesarias.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">7. Confidencialidad</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Nos comprometemos a mantener la confidencialidad de toda la información técnica y 
                  comercial proporcionada por nuestros clientes, salvo cuando sea requerido por ley 
                  o con autorización expresa del cliente.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">8. Limitación de Responsabilidad</h2>
                <p className="text-muted-foreground leading-relaxed">
                  ELECTRINOVA PERÚ no será responsable por daños indirectos, incidentales o consecuentes 
                  que surjan del uso de nuestros servicios. Nuestra responsabilidad máxima se limita al 
                  valor del servicio contratado.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">9. Resolución de Disputas</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Cualquier disputa relacionada con estos términos será resuelta mediante negociación 
                  directa entre las partes. En caso de no llegar a un acuerdo, se someterá a los 
                  tribunales competentes de Lima, Perú.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">10. Modificaciones</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Nos reservamos el derecho de modificar estos términos en cualquier momento. 
                  Los cambios entrarán en vigor desde su publicación en nuestro sitio web.
                </p>
                <p className="text-muted-foreground mt-4">
                  <strong>Última actualización:</strong> Febrero 2026
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">11. Contacto</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Para consultas sobre estos términos de servicio:
                </p>
                <ul className="list-none text-muted-foreground mt-4 space-y-2">
                  <li><strong>Email:</strong> ventas@electrinovaperu.com</li>
                  <li><strong>Teléfono:</strong> 938 852 610</li>
                  <li><strong>Dirección:</strong> Pje Laburre 158, Cercado de Lima, Perú</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default TerminosServicio;
