import { Layout } from "@/components/layout/Layout";
import { SEO } from "@/components/seo/SEO";
import { AnimatedSection } from "@/components/home/AnimatedSection";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ShieldCheck, FileText, Zap } from "lucide-react";
import { Link } from "react-router-dom";

const BlogPostITSE = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": "Guía Definitiva para el Levantamiento de Observaciones ITSE en Perú (2024)",
    "description": "Aprenda cómo pasar la inspección de Defensa Civil (ITSE/INDECI) sin observaciones. Consejos de ingenieros expertos en seguridad eléctrica.",
    "author": {
      "@type": "Organization",
      "name": "ELECTRINOVA PERÚ"
    },
    "publisher": {
      "@type": "Organization",
      "name": "ELECTRINOVA PERÚ E.I.R.L.",
      "logo": {
        "@type": "ImageObject",
        "url": "https://electrinovaperu.com/logo-electrinova.png"
      }
    },
    "datePublished": "2024-06-11"
  };

  return (
    <Layout>
      <SEO 
        title="Cómo levantar observaciones ITSE/INDECI en Perú | Electrinova"
        description="Guía paso a paso para cumplir con las normas de seguridad de Defensa Civil. Evite multas y clausuras de su local comercial o industria."
        path="/blog/guia-levantamiento-observaciones-itse-indeci"
        jsonLd={jsonLd}
      />
      
      <article className="pt-32 pb-16 bg-background">
        <div className="container-custom max-w-4xl">
          <AnimatedSection>
            <span className="text-accent font-semibold mb-4 inline-block">Seguridad Industrial</span>
            <h1 className="text-4xl md:text-5xl font-bold mb-8 text-foreground leading-tight">
              Guía Definitiva para el Levantamiento de Observaciones ITSE en Perú
            </h1>
            
            <div className="aspect-video rounded-2xl overflow-hidden mb-12 shadow-xl">
              <img 
                src="/assets/services/indeci-itse.jpg" 
                alt="Inspección técnica de seguridad en edificaciones ITSE" 
                className="w-full h-full object-cover"
              />
            </div>

            <div className="prose prose-lg max-w-none text-muted-foreground">
              <p className="lead text-xl text-foreground font-medium mb-8 italic border-l-4 border-accent pl-6">
                ¿Recibió una visita de la municipalidad y tiene observaciones de seguridad? No se preocupe, es un proceso estándar que busca garantizar la integridad de las personas.
              </p>

              <h2 className="text-2xl font-bold text-foreground mt-12 mb-6">¿Qué es el ITSE (ex-INDECI)?</h2>
              <p>
                La Inspección Técnica de Seguridad en Edificaciones (ITSE) es el proceso mediante el cual se verifica que una edificación cumple con las normas de seguridad. Este certificado es requisito indispensable para la Licencia de Funcionamiento en cualquier distrito del Perú.
              </p>

              <h2 className="text-2xl font-bold text-foreground mt-12 mb-6">Principales Observaciones Eléctricas</h2>
              <p>Basados en nuestra experiencia, estas son las deficiencias más comunes:</p>
              <ul className="space-y-4 my-8">
                <li className="flex items-start gap-3 bg-secondary/30 p-4 rounded-lg border border-border">
                  <ShieldCheck className="text-accent h-6 w-6 shrink-0 mt-1" />
                  <div>
                    <strong className="text-foreground">Pozos a Tierra sin Certificación:</strong> El protocolo de medición debe ser menor a 25 ohmios para servicios generales y menor a 5 ohmios para sistemas críticos.
                  </div>
                </li>
                <li className="flex items-start gap-3 bg-secondary/30 p-4 rounded-lg border border-border">
                  <ShieldCheck className="text-accent h-6 w-6 shrink-0 mt-1" />
                  <div>
                    <strong className="text-foreground">Tableros sin Directorio:</strong> Cada llave térmica debe estar debidamente identificada y el tablero debe contar con un diagrama unifilares actualizado.
                  </div>
                </li>
                <li className="flex items-start gap-3 bg-secondary/30 p-4 rounded-lg border border-border">
                  <ShieldCheck className="text-accent h-6 w-6 shrink-0 mt-1" />
                  <div>
                    <strong className="text-foreground">Cableado Expuesto:</strong> El uso de cables mellizos está prohibido en áreas comerciales e industriales por su alto riesgo de incendio.
                  </div>
                </li>
              </ul>

              <h2 className="text-2xl font-bold text-foreground mt-12 mb-6">Cómo levantar las observaciones con éxito</h2>
              <ol className="list-decimal pl-6 space-y-4">
                <li><strong>Solicite un Diagnóstico:</strong> Antes de la visita oficial, realice una auditoría preventiva.</li>
                <li><strong>Elabore el Expediente:</strong> Asegúrese de tener planos de arquitectura, eléctricos y de seguridad vigentes.</li>
                <li><strong>Certifique sus Equipos:</strong> Realice mantenimientos preventivos a sus tableros y pozos a tierra.</li>
              </ol>

              <div className="bg-primary text-primary-foreground rounded-2xl p-8 my-16 flex flex-col md:flex-row items-center gap-8 shadow-2xl border-2 border-accent/20">
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-4">¿Necesita ayuda con su certificado ITSE?</h3>
                  <p className="text-primary-foreground/80 mb-0">
                    En Electrinova contamos con ingenieros colegiados expertos en el levantamiento de observaciones para riesgo alto y muy alto.
                  </p>
                </div>
                <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 shrink-0 font-bold px-8 py-6 h-auto text-lg uppercase tracking-wider shadow-lg hover:scale-105 transition-transform">
                  <Link to="/contacto">Consultar Ahora</Link>
                </Button>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </article>
    </Layout>
  );
};

export default BlogPostITSE;