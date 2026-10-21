import { Link } from "react-router-dom";
import { Cpu, Wrench, Gauge, Shield, ArrowRight, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { serviceCategories, getServicesForCategory } from "@/data/service-categories";
import { AnimatedSection } from "./AnimatedSection";
import { localZones } from "@/data/local-zones";

const servicePath = (title: string) => `/servicios/${title.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}`;

const iconMap: Record<string, React.ElementType> = {
  Cpu,
  Wrench,
  Gauge,
  Shield,
};

export const ServiceCategories = () => (
  <section id="servicios" className="section-padding bg-background scroll-mt-24">
    <div className="container-custom">
      <AnimatedSection>
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
      </AnimatedSection>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {serviceCategories.map((cat, index) => {
          const Icon = iconMap[cat.icon] || Cpu;
          const catServices = getServicesForCategory(cat);
          return (
            <AnimatedSection key={cat.id} delay={index * 150}>
              <div className="group relative bg-card border border-border/50 rounded-xl p-8 hover:border-accent/40 transition-all duration-300 hover:shadow-lg h-full">
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
                        <Link
                          key={s.title}
                          to={servicePath(s.title)}
                          className="inline-block text-xs bg-secondary text-secondary-foreground px-3 py-1 rounded-full font-medium hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        >
                          {s.title}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          );
        })}
      </div>

      <div className="mt-12 border-t border-border pt-8">
        <h2 className="text-2xl font-display font-bold text-foreground mb-3">Electricistas en Lima y el Sur Chico</h2>
        <p className="text-muted-foreground mb-5">Servicios de electricidad para industrias, comercios e instituciones en toda Lima Metropolitana, Callao y el Sur Chico.</p>
        <nav aria-label="Servicios eléctricos por zona" className="flex flex-wrap gap-x-6 gap-y-3">
          {localZones.map((zone) => (
            <Link key={zone.slug} to={`/servicios-zona/${zone.slug}`} className="inline-flex items-center gap-2 text-foreground underline underline-offset-4 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
              {zone.city}{zone.slug === "pisco" ? " y Paracas" : ""}<ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          ))}
        </nav>
      </div>

      <AnimatedSection delay={600}>
        <div className="text-center mt-12">
          <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold">
            <Link to="/contacto">
              Solicitar Información Técnica
              <ArrowRight className="h-5 w-5 ml-2" />
            </Link>
          </Button>
        </div>
      </AnimatedSection>
    </div>
  </section>
);
