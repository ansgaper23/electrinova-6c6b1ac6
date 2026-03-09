import { Award, CheckCircle2, Zap } from "lucide-react";
import { AnimatedSection } from "./AnimatedSection";

const certifications = [
  {
    icon: Award,
    name: "ISO 9001:2015",
    description: "Sistema de Gestión de Calidad",
  },
  {
    icon: CheckCircle2,
    name: "OSCE Registrado",
    description: "Proveedor del Estado Peruano",
  },
  {
    icon: Award,
    name: "Ingenieros CIP",
    description: "Personal habilitado por el CIP",
  },
  {
    icon: CheckCircle2,
    name: "Técnicos Certificados",
    description: "Electricistas certificados y capacitados",
  },
];

export const Certifications = () => (
  <section className="py-16 bg-background">
    <div className="container-custom">
      <AnimatedSection>
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 text-accent font-semibold mb-4">
            <Zap className="h-5 w-5" />
            Certificaciones y Garantías
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Respaldo Profesional Certificado
          </h2>
        </div>
      </AnimatedSection>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
        {certifications.map((cert, index) => (
          <AnimatedSection key={cert.name} animation="scale" delay={index * 100}>
            <div className="text-center p-6 rounded-xl border border-border/50 bg-card card-hover h-full">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-accent/15 text-accent mb-4">
                <cert.icon className="h-7 w-7" />
              </div>
              <h3 className="font-bold text-foreground text-sm mb-1">{cert.name}</h3>
              <p className="text-xs text-muted-foreground">{cert.description}</p>
            </div>
          </AnimatedSection>
        ))}
      </div>
    </div>
  </section>
);
