import { Zap, Target, Eye, Heart, Users, Award, Shield, Clock, CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Layout } from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import equipoTrabajoImg from "@/assets/about/equipo-trabajo.png";

// Valores de la empresa
const values = [
  {
    icon: Shield,
    title: "Seguridad",
    description: "Priorizamos la seguridad en cada proyecto, cumpliendo con todas las normativas eléctricas vigentes.",
  },
  {
    icon: Award,
    title: "Calidad",
    description: "Utilizamos materiales de primera calidad y técnicas actualizadas para garantizar resultados duraderos.",
  },
  {
    icon: Clock,
    title: "Puntualidad",
    description: "Cumplimos con los plazos establecidos porque entendemos la importancia del tiempo para nuestros clientes.",
  },
  {
    icon: Heart,
    title: "Compromiso",
    description: "Nos comprometemos con cada proyecto como si fuera propio, brindando atención personalizada.",
  },
];

// Por qué elegirnos
const whyUs = [
  "Más de 5 años de experiencia en el mercado",
  "Equipo de ingenieros y técnicos certificados",
  "Garantía en todos nuestros trabajos",
  "Atención personalizada 24/7 para emergencias",
  "Precios competitivos sin sacrificar calidad",
  "Materiales de marcas reconocidas mundialmente",
  "Cumplimiento de normativas OSINERGMIN",
  "Seguros de responsabilidad civil vigentes",
];

// Equipo (placeholders)
const team = [
  {
    name: "Ing. Carlos Mendoza",
    role: "Gerente General",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop",
  },
  {
    name: "Ing. María Rodríguez",
    role: "Jefa de Proyectos",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop",
  },
  {
    name: "Ing. Roberto Sánchez",
    role: "Supervisor de Operaciones",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
  },
  {
    name: "Ing. Ana Torres",
    role: "Coordinadora Técnica",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop",
  },
];

const Nosotros = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-32 pb-16 gradient-hero">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-flex items-center gap-2 text-accent font-semibold mb-4">
              <Users className="h-5 w-5" />
              Conócenos
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
              Sobre <span className="text-gradient-accent">ELECTRINOVA</span> PERÚ
            </h1>
            <p className="text-lg text-primary-foreground/80">
              Somos una empresa peruana especializada en servicios eléctricos, 
              comprometidos con la excelencia y la satisfacción de nuestros clientes.
            </p>
          </div>
        </div>
      </section>

      {/* Historia Section */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-flex items-center gap-2 text-accent font-semibold mb-4">
                <Zap className="h-5 w-5" />
                Nuestra Historia
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Más de 5 Años Iluminando el Perú
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  ELECTRINOVA PERÚ nació con la visión de transformar el sector 
                  de servicios eléctricos en el país. Desde nuestros inicios, nos hemos 
                  dedicado a brindar soluciones eléctricas de alta calidad para los 
                  sectores industrial, residencial y comercial.
                </p>
                <p>
                  A lo largo de estos años, hemos completado más de 50 proyectos 
                  exitosos, desde pequeñas instalaciones residenciales hasta complejos 
                  sistemas de media tensión para grandes industrias.
                </p>
                <p>
                  Nuestro equipo está conformado por ingenieros electricistas colegiados 
                  y técnicos altamente capacitados, comprometidos con la excelencia y 
                  la innovación constante.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden">
                <img 
                  src={equipoTrabajoImg}
                  alt="Equipo ELECTRINOVA trabajando en mantenimiento de subestación"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-accent text-accent-foreground p-6 rounded-xl shadow-lg">
                <div className="text-4xl font-bold">5+</div>
                <div className="text-sm">Años de Experiencia</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission, Vision Section */}
      <section className="section-padding bg-secondary/30">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Misión */}
            <Card className="border-0 shadow-lg bg-card overflow-hidden">
              <div className="h-2 bg-accent" />
              <CardContent className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                    <Target className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground">Misión</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  Brindar servicios eléctricos de alta calidad que superen las expectativas 
                  de nuestros clientes, garantizando seguridad, eficiencia y durabilidad 
                  en cada proyecto. Nos comprometemos a utilizar las mejores prácticas 
                  y tecnologías disponibles para contribuir al desarrollo del país.
                </p>
              </CardContent>
            </Card>

            {/* Visión */}
            <Card className="border-0 shadow-lg bg-card overflow-hidden">
              <div className="h-2 bg-primary" />
              <CardContent className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-full bg-accent/20 flex items-center justify-center">
                    <Eye className="h-7 w-7 text-accent" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground">Visión</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  Ser reconocidos como la empresa líder en servicios eléctricos del Perú, 
                  destacando por nuestra excelencia técnica, innovación constante y 
                  compromiso con la satisfacción del cliente. Aspiramos a expandir 
                  nuestras operaciones a nivel nacional e internacional.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 text-accent font-semibold mb-4">
              <Zap className="h-5 w-5" />
              Nuestros Principios
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Valores que Nos Definen
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card 
                key={value.title}
                className="border border-border/50 bg-card text-center card-hover"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
                    <value.icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Us Section */}
      <section className="section-padding bg-primary">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-flex items-center gap-2 text-accent font-semibold mb-4">
                <Zap className="h-5 w-5" />
                Diferenciadores
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
                ¿Por Qué Elegirnos?
              </h2>
              <p className="text-primary-foreground/80 mb-8">
                En ELECTRINOVA PERÚ nos distinguimos por nuestro compromiso con la 
                excelencia y la satisfacción del cliente. Estos son algunos de los 
                beneficios de trabajar con nosotros:
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {whyUs.map((item, index) => (
                <div 
                  key={index} 
                  className="flex items-start gap-3 bg-primary-foreground/10 rounded-lg p-4"
                >
                  <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <span className="text-primary-foreground text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* CTA Section */}
      <section className="section-padding gradient-hero">
        <div className="container-custom text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground">
              ¿Quieres Formar Parte de Nuestro Equipo?
            </h2>
            <p className="text-lg text-primary-foreground/80">
              Si eres un profesional del sector eléctrico y buscas crecer profesionalmente, 
              nos encantaría conocerte.
            </p>
            <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold text-lg px-8 py-6 glow-accent">
              <Link to="/contacto">
                Contáctanos
                <ArrowRight className="h-5 w-5 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Nosotros;
