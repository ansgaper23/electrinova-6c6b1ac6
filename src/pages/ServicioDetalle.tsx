import { useParams, Link, Navigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { SEO } from "@/components/seo/SEO";
import { Button } from "@/components/ui/button";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { Zap, ArrowRight, CheckCircle2, Phone, FileText } from "lucide-react";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { services } from "@/data/services";
import { AnimatedSection } from "@/components/home/AnimatedSection";

function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

const ServicioDetalle = () => {
  const { slug } = useParams<{ slug: string }>();
  const service = services.find((s) => slugify(s.title) === slug);

  if (!service) return <Navigate to="/" replace />;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": service.title,
    "description": service.description,
    "provider": {
      "@type": "ElectricalContractor",
      "name": "ELECTRINOVA PERÚ S.A.C.",
      "telephone": "+51938852610",
      "url": "https://electrinovaperu.com",
      "logo": "https://electrinovaperu.com/logo.png",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Pje Laburre 158",
        "addressLocality": "Cercado de Lima",
        "addressRegion": "Lima",
        "addressCountry": "PE"
      }
    },
    "areaServed": {
      "@type": "City",
      "name": "Lima"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Servicios Eléctricos Industriales",
      "itemListElement": service.features?.map((f, i) => ({
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": f
        }
      }))
    }
  };

  return (
    <Layout>
      <SEO
        title={`${service.title} | Electrinova Perú`}
        description={`${service.description} Servicio profesional con certificación en Lima. Cotiza gratis: 938 852 610.`}
        path={`/servicios/${slug}`}
        jsonLd={jsonLd}
      />

      {/* Hero */}
      <section className="pt-32 pb-16 gradient-hero">
        <div className="container-custom">
          <Breadcrumb className="mb-6">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/" className="text-primary-foreground/60 hover:text-accent">Inicio</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="text-primary-foreground/40" />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-accent">{service.title}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 text-accent font-semibold mb-4">
              <Zap className="h-5 w-5" />
              Servicio Especializado
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
              {service.title}
            </h1>
            <p className="text-lg text-primary-foreground/80 max-w-2xl">
              {service.description}
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Image */}
            <AnimatedSection animation="fade-left">
              <div className="rounded-xl overflow-hidden shadow-lg">
                <img
                  src={service.image}
                  alt={service.title}
                  width={800}
                  height={600}
                  loading="eager"
                  className="w-full h-auto object-cover aspect-[4/3]"
                />
              </div>
            </AnimatedSection>

            {/* Details */}
            <AnimatedSection animation="fade-right" delay={200}>
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-4">
                    Características del Servicio
                  </h2>
                  {service.features && (
                    <ul className="space-y-3">
                      {service.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <CheckCircle2 className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                          <span className="text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className="mt-8 p-6 bg-accent/10 rounded-xl border border-accent/20">
                  <h3 className="font-bold text-foreground mb-3 flex items-center gap-2">
                    <FileText className="h-5 w-5 text-accent" />
                    Recurso Útil
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    ¿Sabes cómo prepararte para una inspección? Lee nuestra guía detallada.
                  </p>
                  <Button asChild variant="link" className="p-0 h-auto text-accent font-bold hover:no-underline hover:text-accent/80 group">
                    <Link to="/blog/guia-levantamiento-observaciones-itse-indeci" className="flex items-center gap-2">
                      Guía ITSE 2024
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </div>

                <div className="bg-secondary/50 rounded-xl p-6 space-y-4">
                  <h3 className="text-lg font-bold text-foreground">¿Necesitas este servicio?</h3>
                  <p className="text-sm text-muted-foreground">
                    Solicita una cotización sin compromiso. Respondemos en menos de 24 horas.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold">
                      <Link to="/contacto">
                        <Zap className="h-4 w-4 mr-2" />
                        Solicitar Cotización
                      </Link>
                    </Button>
                    <Button asChild variant="outline">
                      <a href="https://wa.me/51938852610" target="_blank" rel="noopener noreferrer">
                        <WhatsAppIcon className="h-4 w-4 mr-2" />
                        WhatsApp
                      </a>
                    </Button>
                    <Button asChild variant="outline">
                      <a href="tel:+51938852610">
                        <Phone className="h-4 w-4 mr-2" />
                        Llamar
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ServicioDetalle;