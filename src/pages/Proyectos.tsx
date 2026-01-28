import { useState } from "react";
import { Zap, Filter, ArrowRight, MapPin, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Layout } from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { projects, sectors, type Sector } from "@/data/projects";

const Proyectos = () => {
  const [activeFilter, setActiveFilter] = useState<Sector>("Todos");

  const filteredProjects = activeFilter === "Todos" 
    ? projects 
    : projects.filter(project => project.sector === activeFilter);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-32 pb-16 gradient-hero">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-flex items-center gap-2 text-accent font-semibold mb-4">
              <Zap className="h-5 w-5" />
              Portafolio de Proyectos
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
              Nuestros <span className="text-gradient-accent">Proyectos</span> Realizados
            </h1>
            <p className="text-lg text-primary-foreground/80">
              Conoce algunos de los proyectos que hemos realizado para clientes como 
              Aceros Arequipa, SUNEDU, Nestlé y Cruz del Sur.
            </p>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 bg-background border-b border-border">
        <div className="container-custom">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Filter className="h-5 w-5 text-muted-foreground" />
            <span className="text-muted-foreground mr-2">Filtrar por:</span>
            {sectors.map((sector) => (
              <Button
                key={sector}
                variant={activeFilter === sector ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveFilter(sector)}
                className={activeFilter === sector ? "bg-accent text-accent-foreground" : ""}
              >
                {sector}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="section-padding bg-secondary/30">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <Card 
                key={project.id} 
                className="group overflow-hidden border-0 shadow-md card-hover bg-card"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative overflow-hidden aspect-video">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <Badge className="absolute top-4 left-4 bg-accent text-accent-foreground">
                    {project.sector}
                  </Badge>
                </div>
                <CardContent className="p-6">
                  <Badge variant="outline" className="mb-3">
                    {project.service}
                  </Badge>
                  <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-accent transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                    {project.description}
                  </p>
                  {project.activities && (
                    <ul className="text-xs text-muted-foreground mb-4 space-y-1">
                      {project.activities.slice(0, 2).map((activity, i) => (
                        <li key={i} className="flex items-start gap-1">
                          <span className="text-accent">•</span>
                          {activity}
                        </li>
                      ))}
                    </ul>
                  )}
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {project.location}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {project.year}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">
                No hay proyectos disponibles para este filtro.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-primary">
        <div className="container-custom text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground">
              ¿Tienes un Proyecto en Mente?
            </h2>
            <p className="text-lg text-primary-foreground/80">
              Cuéntanos sobre tu proyecto y te ayudaremos a hacerlo realidad. 
              Solicita una cotización sin compromiso.
            </p>
            <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold text-lg px-8 py-6 glow-accent">
              <Link to="/contacto">
                Solicitar Cotización
                <ArrowRight className="h-5 w-5 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Proyectos;
