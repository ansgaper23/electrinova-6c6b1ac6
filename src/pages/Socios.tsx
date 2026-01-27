import { Zap, Award, Handshake, CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Layout } from "@/components/layout/Layout";
import { Link } from "react-router-dom";

// Socios comerciales (placeholders)
const partners = [
  {
    name: "ABB",
    category: "Automatización y Energía",
    logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=200&h=100&fit=crop",
  },
  {
    name: "Schneider Electric",
    category: "Gestión de Energía",
    logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=200&h=100&fit=crop",
  },
  {
    name: "Siemens",
    category: "Tecnología Industrial",
    logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=200&h=100&fit=crop",
  },
  {
    name: "General Electric",
    category: "Equipos Eléctricos",
    logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=200&h=100&fit=crop",
  },
  {
    name: "Legrand",
    category: "Infraestructura Eléctrica",
    logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=200&h=100&fit=crop",
  },
  {
    name: "Phoenix Contact",
    category: "Conectores Industriales",
    logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=200&h=100&fit=crop",
  },
  {
    name: "Eaton",
    category: "Gestión de Energía",
    logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=200&h=100&fit=crop",
  },
  {
    name: "LS Electric",
    category: "Soluciones Eléctricas",
    logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=200&h=100&fit=crop",
  },
];

// Certificaciones
const certifications = [
  {
    name: "ISO 9001:2015",
    description: "Certificación de Sistema de Gestión de Calidad",
    icon: Award,
  },
  {
    name: "OSCE Registrado",
    description: "Proveedor del Estado Peruano",
    icon: CheckCircle2,
  },
  {
    name: "INDECI Autorizado",
    description: "Autorización para trabajos de seguridad",
    icon: Award,
  },
  {
    name: "Colegio de Ingenieros",
    description: "Empresa con profesionales colegiados",
    icon: CheckCircle2,
  },
];

// Beneficios
const benefits = [
  {
    title: "Productos Originales",
    description: "Trabajamos exclusivamente con productos originales y certificados de marcas reconocidas mundialmente.",
  },
  {
    title: "Garantía Extendida",
    description: "Nuestros socios comerciales nos respaldan con garantías extendidas en todos los productos instalados.",
  },
  {
    title: "Soporte Técnico",
    description: "Acceso a soporte técnico especializado directo de fabricantes para resolver cualquier eventualidad.",
  },
  {
    title: "Precios Competitivos",
    description: "Alianzas estratégicas que nos permiten ofrecer los mejores precios del mercado sin sacrificar calidad.",
  },
];

const Socios = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-32 pb-16 gradient-hero">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-flex items-center gap-2 text-accent font-semibold mb-4">
              <Handshake className="h-5 w-5" />
              Alianzas Estratégicas
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
              Nuestros <span className="text-gradient-accent">Socios</span> Comerciales
            </h1>
            <p className="text-lg text-primary-foreground/80">
              Trabajamos con las mejores marcas del mercado para garantizar 
              la calidad y durabilidad de nuestras instalaciones eléctricas.
            </p>
          </div>
        </div>
      </section>

      {/* Partners Grid */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 text-accent font-semibold mb-4">
              <Zap className="h-5 w-5" />
              Marcas de Confianza
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Marcas que Respaldan Nuestro Trabajo
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Contamos con alianzas comerciales con los principales fabricantes de equipos eléctricos a nivel mundial
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {partners.map((partner, index) => (
              <Card 
                key={partner.name}
                className="group border border-border/50 hover:border-accent/50 card-hover bg-card"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <CardContent className="p-6 text-center">
                  <div className="w-full h-20 bg-muted rounded-lg mb-4 flex items-center justify-center overflow-hidden">
                    <div className="text-2xl font-bold text-primary group-hover:text-accent transition-colors">
                      {partner.name.charAt(0)}
                    </div>
                  </div>
                  <h3 className="font-semibold text-foreground mb-1">{partner.name}</h3>
                  <p className="text-sm text-muted-foreground">{partner.category}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <p className="text-center text-muted-foreground mt-8 text-sm">
            * Los logos mostrados son representativos. Contáctanos para más información sobre nuestros socios comerciales.
          </p>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="section-padding bg-secondary/30">
        <div className="container-custom">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 text-accent font-semibold mb-4">
              <Zap className="h-5 w-5" />
              Ventajas
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Beneficios de Nuestras Alianzas
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {benefits.map((benefit, index) => (
              <Card 
                key={benefit.title}
                className="border border-border/50 bg-card card-hover"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
                      <CheckCircle2 className="h-6 w-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-foreground mb-2">{benefit.title}</h3>
                      <p className="text-muted-foreground">{benefit.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 text-accent font-semibold mb-4">
              <Award className="h-5 w-5" />
              Reconocimientos
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Certificaciones y Acreditaciones
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Contamos con las certificaciones necesarias que avalan la calidad de nuestros servicios
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {certifications.map((cert, index) => (
              <Card 
                key={cert.name}
                className="border border-border/50 bg-card text-center card-hover"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
                    <cert.icon className="h-8 w-8" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{cert.name}</h3>
                  <p className="text-sm text-muted-foreground">{cert.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding gradient-hero">
        <div className="container-custom text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground">
              ¿Quieres Ser Nuestro Socio Comercial?
            </h2>
            <p className="text-lg text-primary-foreground/80">
              Si representas una marca de equipos eléctricos y estás interesado en 
              establecer una alianza comercial, contáctanos.
            </p>
            <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold text-lg px-8 py-6 glow-accent">
              <Link to="/contacto">
                Contactar
                <ArrowRight className="h-5 w-5 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Socios;
