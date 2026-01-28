import { Link } from "react-router-dom";
import { 
  Zap, 
  Factory, 
  Home, 
  Building2, 
  ArrowRight, 
  CheckCircle2,
  Users,
  Award,
  Clock,
  Shield,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Layout } from "@/components/layout/Layout";
import logoElectrinova from "@/assets/logo-electrinova.png";
import { services } from "@/data/services";

// Sectores
const sectors = [
  {
    icon: Factory,
    title: "Industrial",
    description: "Soluciones eléctricas de alta potencia para plantas y fábricas",
    color: "from-blue-600 to-blue-800",
  },
  {
    icon: Home,
    title: "Residencial",
    description: "Instalaciones seguras y eficientes para hogares",
    color: "from-green-600 to-green-800",
  },
  {
    icon: Building2,
    title: "Comercial",
    description: "Sistemas eléctricos para comercios y oficinas",
    color: "from-purple-600 to-purple-800",
  },
];

// Estadísticas
const stats = [
  { number: "15+", label: "Años de Experiencia", icon: Clock },
  { number: "500+", label: "Proyectos Completados", icon: CheckCircle2 },
  { number: "200+", label: "Clientes Satisfechos", icon: Users },
  { number: "50+", label: "Profesionales", icon: Award },
];

// Testimonios con clientes reales
const testimonials = [
  {
    name: "Aceros Arequipa",
    company: "Sector Industrial",
    text: "Excelente trabajo en automatización de sistemas de iluminación LED y fabricación de CCM. Profesionalismo y cumplimiento de plazos.",
    sector: "Industrial",
  },
  {
    name: "SUNEDU",
    company: "Sector Institucional",
    text: "Realizaron el cableado estructurado completo, pruebas de fibra óptica y montaje de grupo electrógeno. Trabajo impecable.",
    sector: "Institucional",
  },
  {
    name: "Nestlé",
    company: "Sector Industrial",
    text: "Mantenimiento integral de nuestra sub estación eléctrica con todos los protocolos y certificaciones requeridas.",
    sector: "Industrial",
  },
];

// Por qué elegirnos
const whyUs = [
  { icon: Shield, text: "Garantía en todos nuestros trabajos" },
  { icon: Clock, text: "Atención rápida y eficiente" },
  { icon: Award, text: "Técnicos certificados y capacitados" },
  { icon: CheckCircle2, text: "Materiales de primera calidad" },
];

const Index = () => {
  // Mostrar solo 8 servicios en el home
  const featuredServices = services.slice(0, 8);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center gradient-hero overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23FFD700' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        {/* Electric lines animation */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent animate-pulse" />
          <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent animate-pulse delay-100" />
          <div className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent animate-pulse delay-200" />
        </div>

        <div className="container-custom relative z-10 text-center pt-20">
          <div className="max-w-4xl mx-auto space-y-8 animate-fade-in-up">
            {/* Logo - Sin animación flotante */}
            <div className="flex justify-center mb-6">
              <img 
                src={logoElectrinova} 
                alt="ELECTRINOVA PERÚ"
                className="h-28 md:h-36 w-auto drop-shadow-2xl"
              />
            </div>

            {/* Headline */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight">
              Energía que <span className="text-gradient-accent">Innova</span>,
              <br />
              Soluciones que <span className="text-gradient-accent">Perduran</span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto">
              Servicios eléctricos profesionales para el sector industrial, residencial y comercial.
              Más de 15 años de experiencia garantizan la calidad de nuestro trabajo.
            </p>

            {/* CTAs - Botones con texto visible */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold text-lg px-8 py-6 glow-accent btn-electric">
                <Link to="/contacto">
                  <Zap className="h-5 w-5 mr-2" />
                  Solicitar Cotización
                </Link>
              </Button>
              <Button asChild size="lg" className="bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white hover:bg-white/20 font-semibold text-lg px-8 py-6">
                <Link to="/proyectos">
                  Ver Proyectos
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Link>
              </Button>
            </div>

            {/* Quick badges */}
            <div className="flex flex-wrap items-center justify-center gap-4 pt-8">
              {whyUs.map((item, index) => (
                <div key={index} className="flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm px-4 py-2 rounded-full">
                  <item.icon className="h-4 w-4 text-accent" />
                  <span className="text-sm text-primary-foreground/90">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-primary-foreground/30 rounded-full flex justify-center">
            <div className="w-1.5 h-3 bg-accent rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </section>

      {/* Sectors Section */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 text-accent font-semibold mb-4">
              <Zap className="h-5 w-5" />
              Sectores que Atendemos
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Soluciones para Cada Necesidad
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Ofrecemos servicios especializados adaptados a las necesidades específicas de cada sector
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {sectors.map((sector, index) => (
              <Card 
                key={sector.title} 
                className="group relative overflow-hidden border-0 card-hover"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${sector.color} opacity-90`} />
                <CardContent className="relative z-10 p-8 text-center text-white">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm mb-6 group-hover:scale-110 transition-transform duration-300">
                    <sector.icon className="h-10 w-10" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{sector.title}</h3>
                  <p className="text-white/80">{sector.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section with Real Images */}
      <section className="section-padding bg-secondary/50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 text-accent font-semibold mb-4">
              <Zap className="h-5 w-5" />
              Nuestros Servicios
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Soluciones Eléctricas Integrales
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Contamos con un equipo de profesionales altamente capacitados para brindar servicios de calidad
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredServices.map((service, index) => (
              <Card 
                key={service.title} 
                className="group border border-border/50 bg-card hover:border-accent/50 card-hover overflow-hidden"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative h-40 overflow-hidden">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
                <CardContent className="p-4">
                  <h3 className="text-sm font-semibold text-foreground mb-2 group-hover:text-accent transition-colors line-clamp-2">
                    {service.title}
                  </h3>
                  <p className="text-xs text-muted-foreground line-clamp-2">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Link to="/contacto">
                Solicitar Información
                <ArrowRight className="h-5 w-5 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-primary">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div 
                key={stat.label} 
                className="text-center"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/20 text-accent mb-4">
                  <stat.icon className="h-8 w-8" />
                </div>
                <div className="text-4xl md:text-5xl font-bold text-accent mb-2">{stat.number}</div>
                <div className="text-primary-foreground/80">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 text-accent font-semibold mb-4">
              <Zap className="h-5 w-5" />
              Testimonios
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Lo Que Dicen Nuestros Clientes
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              La satisfacción de nuestros clientes es nuestra mejor carta de presentación
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card 
                key={testimonial.name} 
                className="border border-border/50 bg-card card-hover"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6">
                  <div className="flex items-center gap-1 text-accent mb-4">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-foreground mb-6 italic">"{testimonial.text}"</p>
                  <div className="border-t border-border pt-4">
                    <p className="font-semibold text-foreground">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.company}</p>
                    <span className="inline-block mt-2 text-xs bg-primary/10 text-primary px-3 py-1 rounded-full">
                      {testimonial.sector}
                    </span>
                  </div>
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
              ¿Listo para Tu Próximo Proyecto Eléctrico?
            </h2>
            <p className="text-lg text-primary-foreground/80">
              Contáctanos hoy y recibe una cotización sin compromiso. Nuestro equipo de expertos 
              está listo para ayudarte con todas tus necesidades eléctricas.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold text-lg px-8 py-6 glow-accent">
                <Link to="/contacto">
                  <Zap className="h-5 w-5 mr-2" />
                  Solicitar Cotización Gratis
                </Link>
              </Button>
              <Button asChild size="lg" className="bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white hover:bg-white/20 font-semibold text-lg px-8 py-6">
                <a href="tel:+51930519248">
                  Llamar Ahora
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
