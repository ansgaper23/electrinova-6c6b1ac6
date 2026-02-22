import { Zap, ArrowRight, Calculator, FileText, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";

const tools = [
  {
    icon: Calculator,
    title: "Calculadora Eléctrica",
    description: "Dimensionamiento de conductores, caídas de tensión y protecciones.",
  },
  {
    icon: FileText,
    title: "Generador de Protocolos",
    description: "Documentación técnica estandarizada para entrega de proyectos.",
  },
  {
    icon: BarChart3,
    title: "Diagnóstico Energético",
    description: "Análisis de consumo y recomendaciones de eficiencia energética.",
  },
];

export const ElectrinovaTools = () => (
  <section className="section-padding bg-secondary/50">
    <div className="container-custom">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <span className="inline-flex items-center gap-2 text-accent font-semibold mb-4">
            <Zap className="h-5 w-5" />
            Innovación Tecnológica
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
            Electrinova Tools
          </h2>
          <p className="text-muted-foreground mb-6 leading-relaxed">
            Nuestra plataforma de herramientas digitales para la industria eléctrica. 
            Soluciones que optimizan el diseño, ejecución y documentación de proyectos.
          </p>
          <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold">
            Próximamente
            <ArrowRight className="h-5 w-5 ml-2" />
          </Button>
        </div>

        <div className="grid gap-4">
          {tools.map((tool) => (
            <div
              key={tool.title}
              className="flex items-start gap-4 bg-background border border-border/50 rounded-xl p-5 hover:border-accent/30 transition-colors"
            >
              <div className="flex-shrink-0 w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center">
                <tool.icon className="h-5 w-5 text-primary" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">{tool.title}</h3>
                <p className="text-sm text-muted-foreground">{tool.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);
