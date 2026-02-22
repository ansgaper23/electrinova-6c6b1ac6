import { Link } from "react-router-dom";
import { Cpu, Wrench, Gauge, Shield, ArrowRight, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { serviceCategories, getServicesForCategory } from "@/data/service-categories";

const iconMap: Record<string, React.ElementType> = {
  Cpu,
  Wrench,
  Gauge,
  Shield,
};

export const ServiceCategories = () => (
  <section className="section-padding bg-background">
    <div className="container-custom">
      <div className="text-center mb-16">
        <span className="inline-flex items-center gap-2 text-accent font-semibold mb-4">
          <Zap className="h-5 w-5" />
          Servicios Especializados
        </span>
        <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
          Soluciones Eléctricas por Especialidad
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Organizamos nuestras capacidades en cuatro áreas de especialización para atender proyectos de cualquier escala
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {serviceCategories.map((cat) => {
          const Icon = iconMap[cat.icon] || Cpu;
          const catServices = getServicesForCategory(cat);
          return (
            <div
              key={cat.id}
              className="group relative bg-card border border-border/50 rounded-xl p-8 hover:border-accent/40 transition-all duration-300 hover:shadow-lg"
            >
              <div className="flex items-start gap-5">
                <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-primary flex items-center justify-center">
                  <Icon className="h-7 w-7 text-accent" strokeWidth={1.5} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-xl font-display font-bold text-foreground mb-2 group-hover:text-accent transition-colors">
                    {cat.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                    {cat.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {catServices.map((s) => (
                      <span
                        key={s.title}
                        className="inline-block text-xs bg-secondary text-secondary-foreground px-3 py-1 rounded-full font-medium"
                      >
                        {s.title}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="text-center mt-12">
        <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold">
          <Link to="/contacto">
            Solicitar Información Técnica
            <ArrowRight className="h-5 w-5 ml-2" />
          </Link>
        </Button>
      </div>
    </div>
  </section>
);
