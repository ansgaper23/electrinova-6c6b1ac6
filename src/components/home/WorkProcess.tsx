import { Zap, MessageSquare, FileText, Wrench, CheckCircle2 } from "lucide-react";
import { AnimatedSection } from "./AnimatedSection";

const steps = [
  {
    icon: MessageSquare,
    step: "01",
    title: "Consulta",
    description: "Cuéntanos tu necesidad eléctrica y te asesoramos sin compromiso.",
  },
  {
    icon: FileText,
    step: "02",
    title: "Cotización",
    description: "Recibe una propuesta detallada con precios transparentes.",
  },
  {
    icon: Wrench,
    step: "03",
    title: "Ejecución",
    description: "Nuestro equipo ejecuta el proyecto con los más altos estándares.",
  },
  {
    icon: CheckCircle2,
    step: "04",
    title: "Entrega",
    description: "Entregamos con protocolos, certificaciones y garantía.",
  },
];

export const WorkProcess = () => (
  <section className="section-padding bg-secondary/50">
    <div className="container-custom">
      <AnimatedSection>
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 text-accent font-semibold mb-4">
            <Zap className="h-5 w-5" />
            Nuestro Proceso
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            ¿Cómo Trabajamos?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Un proceso claro y profesional de inicio a fin
          </p>
        </div>
      </AnimatedSection>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
        {steps.map((step, index) => (
          <AnimatedSection key={step.step} delay={index * 150}>
            <div className="text-center relative">
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-10 left-[60%] w-[80%] h-px bg-border" />
              )}
              <div className="relative inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary text-primary-foreground mb-4">
                <step.icon className="h-8 w-8" />
                <span className="absolute -top-1 -right-1 w-7 h-7 rounded-full bg-accent text-accent-foreground text-xs font-bold flex items-center justify-center">
                  {step.step}
                </span>
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">{step.title}</h3>
              <p className="text-sm text-muted-foreground">{step.description}</p>
            </div>
          </AnimatedSection>
        ))}
      </div>
    </div>
  </section>
);
