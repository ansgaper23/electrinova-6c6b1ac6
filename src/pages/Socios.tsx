import { Zap, Award, Handshake, CheckCircle2, ArrowRight, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Layout } from "@/components/layout/Layout";
import { SEO } from "@/components/seo/SEO";
import { Link } from "react-router-dom";
import { clients, partners, certifications, benefits } from "@/data/partners";

const Socios = () => {
  return (
    <Layout>
      <SEO
        title="Clientes y socios comerciales | Electrinova Perú"
        description="Empresas que confían en Electrinova: alianzas, marcas y certificaciones para proyectos eléctricos industriales en Lima y todo el Perú."
        path="/socios"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Clientes y socios comerciales",
          url: "https://electrinovaperu.com/socios",
          inLanguage: "es-PE",
          description:
            "Clientes destacados, proveedores y certificaciones de Electrinova Perú para servicios eléctricos industriales.",
        }}
      />

      {/* Hero Section */}
      <section className="pt-32 pb-16 gradient-hero">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-flex items-center gap-2 text-accent font-semibold mb-4">
              <Handshake className="h-5 w-5" />
              Alianzas Estratégicas
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
              Nuestros <span className="text-gradient-accent">Clientes</span> y Socios
            </h1>
            <p className="text-lg text-primary-foreground/80">
              Trabajamos con empresas líderes y utilizamos equipos de las mejores marcas
              para garantizar la calidad de nuestros servicios.
            </p>
          </div>
        </div>
      </section>

      {/* Clients Section */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 text-accent font-semibold mb-4">
              <Building2 className="h-5 w-5" />
              Clientes Destacados
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Empresas que Confían en Nosotros
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Hemos trabajado con empresas líderes en diversos sectores de la industria peruana
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {clients.map((client, index) => (
              <Card
                key={client.name}
                className="group border border-border/50 hover:border-accent/50 card-hover bg-card"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <CardContent className="p-6 text-center">
                  <div className="w-full h-24 rounded-lg mb-4 flex items-center justify-center overflow-hidden bg-white p-3">
                    <img
                      src={client.logo}
                      alt={`Logo de ${client.name}`}
                      className="max-w-full max-h-full object-contain"
                      loading={index < 4 ? "eager" : "lazy"}
                      decoding="async"
                    />
                  </div>
                  <h3 className="font-semibold text-foreground mb-1">{client.name}</h3>
                  <p className="text-sm text-muted-foreground">{client.category}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Partners Grid */}
      <section className="section-padding bg-secondary/30">
        <div className="container-custom">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 text-accent font-semibold mb-4">
              <Zap className="h-5 w-5" />
              Marcas de Confianza
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Equipos y Proveedores
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Trabajamos con equipos y materiales de marcas reconocidas mundialmente
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {partners.map((partner, index) => (
              <Card
                key={partner.name}
                className="group border border-border/50 hover:border-accent/50 card-hover bg-card"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <CardContent className="p-6 text-center">
                  <div className="w-full h-16 bg-muted rounded-lg mb-4 flex items-center justify-center overflow-hidden">
                    <div className="text-xl font-bold text-primary group-hover:text-accent transition-colors">
                      {partner.name}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{partner.category}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 text-accent font-semibold mb-4">
              <Zap className="h-5 w-5" />
              Nuestras Ventajas
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              ¿Por Qué Trabajar con Nosotros?
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
      <section className="section-padding bg-secondary/30">
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
              ¿Listo para Trabajar con Nosotros?
            </h2>
            <p className="text-lg text-primary-foreground/80">
              Únete a empresas como Aceros Arequipa, SUNEDU, Nestlé y Cruz del Sur
              que ya confían en nuestros servicios eléctricos.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold text-lg px-8 py-6 glow-accent"
            >
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
