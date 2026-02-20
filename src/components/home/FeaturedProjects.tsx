import { Link } from "react-router-dom";
import { Zap, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { projects } from "@/data/projects";

export const FeaturedProjects = () => {
  const featured = projects.slice(0, 4);

  return (
    <section className="section-padding bg-background">
      <div className="container-custom">
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 text-accent font-semibold mb-4">
            <Zap className="h-5 w-5" />
            Proyectos Destacados
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Trabajos que Nos Respaldan
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Conoce algunos de los proyectos que hemos ejecutado para empresas líderes en el Perú
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((project, index) => (
            <Card
              key={project.id}
              className="group border-0 overflow-hidden card-hover"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  width={400}
                  height={192}
                  loading={index === 0 ? "eager" : "lazy"}
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3">
                  <span className="inline-block text-xs bg-accent text-accent-foreground px-2 py-1 rounded-full font-medium mb-1">
                    {project.sector}
                  </span>
                  <h3 className="text-white font-semibold text-sm leading-tight">{project.title}</h3>
                </div>
              </div>
              <CardContent className="p-4">
                <p className="text-xs text-muted-foreground line-clamp-2">{project.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button asChild size="lg" variant="outline">
            <Link to="/proyectos">
              Ver Todos los Proyectos
              <ArrowRight className="h-5 w-5 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
