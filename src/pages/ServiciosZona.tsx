import { useParams, Navigate, Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { SEO } from "@/components/seo/SEO";
import { localZones } from "@/data/local-zones";
import { companyInfo } from "@/data/company-info";
import { services } from "@/data/services";
import { MapPin, Phone, CheckCircle2, Factory, ArrowRight } from "lucide-react";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { trackEvent } from "@/components/analytics/Analytics";

const slugify = (text: string) =>
  text.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const ServiciosZona = () => {
  const { zona } = useParams<{ zona: string }>();
  const zone = localZones.find((z) => z.slug === zona);

  if (!zone) return <Navigate to="/" replace />;

  const whatsappUrl = `https://wa.me/${companyInfo.contact.whatsapp}?text=${encodeURIComponent(
    `Hola, necesito servicios eléctricos en ${zone.city}. ¿Me pueden ayudar con una cotización?`
  )}`;

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: `Servicios eléctricos industriales en ${zone.city}`,
      provider: {
        "@type": "ElectricalContractor",
        name: companyInfo.name,
        url: companyInfo.url,
        telephone: companyInfo.contact.phone,
      },
      areaServed: {
        "@type": "City",
        name: zone.city,
        containedInPlace: { "@type": "AdministrativeArea", name: zone.region },
      },
      serviceType: services.map((s) => s.title),
      url: `${companyInfo.url}/servicios-zona/${zone.slug}`,
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Inicio", item: companyInfo.url },
        { "@type": "ListItem", position: 2, name: `Servicios en ${zone.city}` },
      ],
    },
  ];

  return (
    <Layout>
      <SEO
        title={zone.title}
        description={zone.metaDescription}
        path={`/servicios-zona/${zone.slug}`}
        jsonLd={jsonLd}
      />

      {/* Hero */}
      <section className="bg-primary text-primary-foreground section-padding">
        <div className="container-custom">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 bg-primary-foreground/10 px-4 py-2 rounded-full text-sm">
              <MapPin className="h-4 w-4 text-accent" />
              Cobertura directa en {zone.city} · {zone.region}
            </div>
            <h1 className="text-3xl md:text-5xl font-bold leading-tight">{zone.heroHeading}</h1>
            <p className="text-lg text-primary-foreground/80 leading-relaxed">{zone.intro}</p>
            <div className="flex flex-wrap gap-4 pt-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent("whatsapp_click", { location: `zona_${zone.slug}` })}
                className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
              >
                <WhatsAppIcon className="h-5 w-5" />
                Cotizar por WhatsApp
              </a>
              <a
                href={`tel:${companyInfo.contact.phone}`}
                onClick={() => trackEvent("phone_call_click", { location: `zona_${zone.slug}` })}
                className="inline-flex items-center gap-2 border border-primary-foreground/30 hover:border-accent hover:text-accent font-semibold px-6 py-3 rounded-lg transition-colors"
              >
                <Phone className="h-5 w-5" />
                938 852 610
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Servicios disponibles en la zona */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Servicios que ejecutamos en {zone.city}
          </h2>
          <p className="text-muted-foreground mb-10 max-w-2xl">
            Trasladamos nuestras cuadrillas y equipos desde Lima sin costo oculto. Todos los
            trabajos incluyen garantía y documentación técnica.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.slice(0, 9).map((service) => (
              <Link
                key={service.title}
                to={`/servicios/${slugify(service.title)}`}
                className="group border border-border rounded-xl p-6 hover:border-accent hover:shadow-lg transition-all duration-300"
              >
                <h3 className="font-semibold text-lg mb-2 group-hover:text-accent transition-colors">
                  {service.title}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2">{service.description}</p>
                <span className="inline-flex items-center gap-1 text-sm text-accent mt-4 font-medium">
                  Ver detalle <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Distritos e industrias */}
      <section className="section-padding bg-secondary/50">
        <div className="container-custom grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <MapPin className="h-6 w-6 text-accent" />
              Distritos que atendemos
            </h2>
            <ul className="space-y-3">
              {zone.districts.map((d) => (
                <li key={d} className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0" />
                  <span>{d}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Factory className="h-6 w-6 text-accent" />
              Sectores que atendemos en {zone.city}
            </h2>
            <ul className="space-y-3">
              {zone.industries.map((i) => (
                <li key={i} className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0" />
                  <span>{i}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="section-padding bg-primary text-primary-foreground text-center">
        <div className="container-custom max-w-2xl space-y-6">
          <h2 className="text-2xl md:text-3xl font-bold">
            ¿Tienes un proyecto eléctrico en {zone.city}?
          </h2>
          <p className="text-primary-foreground/80">
            Visita técnica y cotización sin compromiso. Respondemos el mismo día.
          </p>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent("whatsapp_click", { location: `zona_${zone.slug}_cta` })}
            className="inline-flex items-center gap-2 bg-accent text-accent-foreground font-semibold px-8 py-4 rounded-lg hover:opacity-90 transition-opacity"
          >
            <WhatsAppIcon className="h-5 w-5" />
            Solicitar cotización en {zone.city}
          </a>
        </div>
      </section>
    </Layout>
  );
};

export default ServiciosZona;
