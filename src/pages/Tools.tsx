import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Zap, Calculator, FileText, BarChart3, ArrowRight, MessageSquare } from "lucide-react";

const tools = [
  {
    icon: Calculator,
    title: "Calculadora Eléctrica",
    description: "Dimensionamiento de conductores, caída de tensión y protecciones basado en el Código Nacional de Electricidad (CNE) del Perú.",
    href: "/tools/calculadora-electrica",
    cta: "Calcular ahora",
  },
  {
    icon: FileText,
    title: "Generador de Protocolos",
    description: "Documentación técnica estandarizada para entrega de proyectos: aislamiento, pozo a tierra y continuidad eléctrica. Exporta en PDF profesional.",
    href: "/tools/generador-protocolos",
    cta: "Generar protocolo",
  },
  {
    icon: BarChart3,
    title: "Diagnóstico Energético",
    description: "Análisis de consumo y recomendaciones de eficiencia energética para instalaciones industriales. Gráficos comparativos y ahorro estimado.",
    href: "/tools/diagnostico-energetico",
    cta: "Diagnosticar",
  },
];

export default function Tools() {
  return (
    <Layout>
      <Helmet>
        <title>Herramientas de Ingeniería Eléctrica | Electrinova Tools Perú</title>
        <meta name="description" content="Herramientas digitales gratuitas para ingeniería eléctrica: calculadora de conductores CNE, generador de protocolos PDF y diagnóstico energético industrial. Electrinova Perú S.A.C." />
        <link rel="canonical" href="https://electrinovaperu.com/tools" />
      </Helmet>

      <section className="pt-24 pb-16 section-padding bg-secondary/30">
        <div className="container-custom">
          {/* Hero */}
          <div className="max-w-2xl mb-12">
            <span className="inline-flex items-center gap-2 text-accent font-semibold mb-4">
              <Zap className="h-5 w-5" />
              Innovación Tecnológica
            </span>
            <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              Electrinova Tools
            </h1>
            <p className="text-muted-foreground leading-relaxed">
              Nuestra plataforma de herramientas digitales para la industria eléctrica.
              Soluciones que optimizan el diseño, ejecución y documentación de proyectos.
              Las herramientas proporcionan diagnósticos referenciales —&nbsp;nuestro equipo
              de ingenieros ejecuta el proyecto real.
            </p>
          </div>

          {/* Tools grid */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {tools.map((tool) => (
              <div
                key={tool.title}
                className="bg-background border border-border/50 rounded-xl p-6 flex flex-col hover:border-accent/30 hover:shadow-md transition-all"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <tool.icon className="h-6 w-6 text-primary" strokeWidth={1.5} />
                </div>
                <h2 className="text-lg font-semibold text-foreground mb-2">{tool.title}</h2>
                <p className="text-sm text-muted-foreground mb-6 flex-1">{tool.description}</p>
                <Button asChild className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold">
                  <Link to={tool.href}>
                    {tool.cta} <ArrowRight className="h-4 w-4 ml-2" />
                  </Link>
                </Button>
              </div>
            ))}
          </div>

          {/* CTA corporativo */}
          <div className="bg-primary/5 border border-primary/10 rounded-xl p-6 md:p-8 text-center max-w-2xl mx-auto">
            <h2 className="text-xl font-display font-bold text-foreground mb-2">
              ¿Necesitas un proyecto completo?
            </h2>
            <p className="text-muted-foreground text-sm mb-4">
              Estas herramientas ofrecen diagnósticos iniciales. Para diseños detallados, cotizaciones formales y ejecución de obras eléctricas, contacta a nuestro equipo de ingenieros.
            </p>
            <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold">
              <Link to="/contacto">
                <MessageSquare className="h-4 w-4 mr-2" /> Contactar a un Ingeniero
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
