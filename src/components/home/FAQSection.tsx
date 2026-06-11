import { Zap } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { AnimatedSection } from "./AnimatedSection";

const faqs = [
  {
    question: "¿Qué tipos de instalaciones eléctricas realizan?",
    answer: "Realizamos instalaciones eléctricas industriales, comerciales e institucionales. Incluye montaje de tableros de fuerza y control, cableado estructurado, subestaciones eléctricas, sistemas de iluminación industrial y automatización con PLC Allen Bradley y Siemens.",
  },
  {
    question: "¿Emiten certificados y protocolos de sus trabajos?",
    answer: "Sí, entregamos protocolos de conformidad firmados por Ingeniero Electricista habilitado por el Colegio de Ingenieros del Perú (CIP). Incluye mediciones con equipos FLUKE certificados y telurómetro digital.",
  },
  {
    question: "¿Realizan mantenimiento de pozos a tierra?",
    answer: "Sí, ofrecemos mantenimiento, reactivación, diseño y construcción de pozos a tierra. Realizamos mediciones con telurómetro digital certificado y emitimos protocolos firmados por Ingeniero Electricista habilitado.",
  },
  {
    question: "¿En qué zonas de Lima ofrecen sus servicios?",
    answer: "Atendemos toda Lima Metropolitana y también ejecutamos proyectos a nivel nacional. Hemos trabajado en Arequipa, Callao y otras ciudades del Perú para clientes como Aceros Arequipa, Nestlé, SUNEDU y Cruz del Sur.",
  },
  {
    question: "¿Cómo puedo solicitar una cotización?",
    answer: "Puede solicitar una cotización sin compromiso llamando al 938 852 610, escribiendo a ventas@electrinovaperu.com, por WhatsApp o completando el formulario en nuestra página de contacto. Respondemos en menos de 24 horas.",
  },
  {
    question: "¿Qué es el ITSE y por qué es importante para mi empresa?",
    answer: "La Inspección Técnica de Seguridad en Edificaciones (ITSE), antes conocida como INDECI/Defensa Civil, es obligatoria para obtener la licencia de funcionamiento. Garantiza que su local cumple con las normas de seguridad estructural, eléctrica y contra incendios para proteger la vida de sus trabajadores y clientes.",
  },
  {
    question: "¿En qué consiste el servicio de levantamiento de observaciones ITSE?",
    answer: "Nuestro servicio incluye el diagnóstico preventivo, la elaboración del expediente técnico (planos eléctricos, certificación de pozos a tierra, diagramas unifilares) y la ejecución de las mejoras físicas necesarias para subsanar cualquier deficiencia detectada en la inspección municipal.",
  },
];

export const FAQSection = () => (
  <section className="section-padding bg-secondary/50">
    <div className="container-custom">
      <AnimatedSection>
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 text-accent font-semibold mb-4">
            <Zap className="h-5 w-5" />
            Preguntas Frecuentes
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
            Resolvemos tus Dudas
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Las consultas más comunes sobre nuestros servicios eléctricos industriales
          </p>
        </div>
      </AnimatedSection>

      <AnimatedSection delay={200}>
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`faq-${index}`}
                className="bg-card border border-border/50 rounded-xl px-6 data-[state=open]:shadow-md transition-shadow"
              >
                <AccordionTrigger className="text-left font-semibold text-foreground hover:text-accent py-5">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </AnimatedSection>
    </div>
  </section>
);

// Export FAQ data for JSON-LD
export const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};
