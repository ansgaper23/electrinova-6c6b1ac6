import { useState } from "react";
import { Zap, Filter, ArrowRight, MapPin, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Layout } from "@/components/layout/Layout";
import { Link } from "react-router-dom";

// Tipos de proyectos
type Sector = "Todos" | "Industrial" | "Residencial" | "Comercial";
type ServiceType = "Media Tensión" | "Pozos a Tierra" | "Transformadores" | "Tableros Eléctricos" | "Instalaciones Eléctricas" | "CCTV" | "Mantenimiento";

interface Project {
  id: number;
  title: string;
  description: string;
  sector: Sector;
  service: ServiceType;
  location: string;
  year: string;
  image: string;
}

// Proyectos de ejemplo
const projects: Project[] = [
  {
    id: 1,
    title: "Planta Industrial Metalúrgica",
    description: "Instalación completa de sistema de media tensión y tableros de distribución para planta metalúrgica de 5000m².",
    sector: "Industrial",
    service: "Media Tensión",
    location: "Callao, Lima",
    year: "2024",
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&h=600&fit=crop",
  },
  {
    id: 2,
    title: "Condominio Los Jardines",
    description: "Sistema de pozos a tierra certificado para 120 viviendas, garantizando la seguridad eléctrica de todo el complejo.",
    sector: "Residencial",
    service: "Pozos a Tierra",
    location: "La Molina, Lima",
    year: "2024",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop",
  },
  {
    id: 3,
    title: "Centro Comercial Plaza Sur",
    description: "Mantenimiento preventivo y correctivo de transformadores y tableros eléctricos del centro comercial.",
    sector: "Comercial",
    service: "Transformadores",
    location: "San Juan de Miraflores",
    year: "2023",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop",
  },
  {
    id: 4,
    title: "Fábrica de Alimentos SAC",
    description: "Instalación de tableros eléctricos de control y potencia para línea de producción automatizada.",
    sector: "Industrial",
    service: "Tableros Eléctricos",
    location: "Ate, Lima",
    year: "2023",
    image: "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=800&h=600&fit=crop",
  },
  {
    id: 5,
    title: "Edificio Corporativo Tower",
    description: "Instalación eléctrica completa de 15 pisos, incluyendo sistemas de emergencia y respaldo.",
    sector: "Comercial",
    service: "Instalaciones Eléctricas",
    location: "San Isidro, Lima",
    year: "2023",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop",
  },
  {
    id: 6,
    title: "Residencial Vista Hermosa",
    description: "Sistema de videovigilancia CCTV con 48 cámaras HD y monitoreo centralizado 24/7.",
    sector: "Residencial",
    service: "CCTV",
    location: "Surco, Lima",
    year: "2024",
    image: "https://images.unsplash.com/photo-1558002038-1055907df827?w=800&h=600&fit=crop",
  },
  {
    id: 7,
    title: "Planta Textil del Norte",
    description: "Mantenimiento industrial integral de sistemas eléctricos y reparación de motores trifásicos.",
    sector: "Industrial",
    service: "Mantenimiento",
    location: "Los Olivos, Lima",
    year: "2024",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&h=600&fit=crop",
  },
  {
    id: 8,
    title: "Supermercados MegaPlaza",
    description: "Sistema de media tensión y backup de energía para cadena de 5 supermercados.",
    sector: "Comercial",
    service: "Media Tensión",
    location: "Lima Norte",
    year: "2023",
    image: "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=800&h=600&fit=crop",
  },
];

const sectors: Sector[] = ["Todos", "Industrial", "Residencial", "Comercial"];

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
              Conoce algunos de los proyectos que hemos realizado para nuestros clientes 
              en los sectores industrial, residencial y comercial.
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
