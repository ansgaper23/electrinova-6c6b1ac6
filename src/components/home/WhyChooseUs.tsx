import { Shield, Clock, Award, CheckCircle2, Zap, Wrench, FileCheck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const reasons = [
  {
    icon: Award,
    title: "Ingenieros Colegiados",
    description: "Personal con habilitación del Colegio de Ingenieros del Perú (CIP) que garantiza profesionalismo.",
  },
  {
    icon: FileCheck,
    title: "Protocolos Certificados",
    description: "Entregamos protocolos de conformidad firmados por Ingeniero Electricista habilitado.",
  },
  {
    icon: Wrench,
    title: "Equipos FLUKE Certificados",
    description: "Utilizamos equipos de medición FLUKE y telurómetros digitales debidamente certificados.",
  },
  {
    icon: Shield,
    title: "Garantía Total",
    description: "Respaldamos todos nuestros trabajos con garantía y materiales de primera calidad.",
  },
  {
    icon: Clock,
    title: "Atención Rápida",
    description: "Respuesta inmediata y cumplimiento de plazos en cada proyecto que ejecutamos.",
  },
  {
    icon: CheckCircle2,
    title: "Normativas Vigentes",
    description: "Todos los trabajos se realizan cumpliendo las normativas eléctricas vigentes en Perú.",
  },
];

export const WhyChooseUs = () => (
  <section className="section-padding bg-secondary/50">
    <div className="container-custom">
      <div className="text-center mb-16">
        <span className="inline-flex items-center gap-2 text-accent font-semibold mb-4">
          <Zap className="h-5 w-5" />
          ¿Por Qué Elegirnos?
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          Profesionalismo que Marca la Diferencia
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Más de 5 años respaldando a las empresas más exigentes del Perú con servicios eléctricos de calidad certificada
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {reasons.map((reason, index) => (
          <Card
            key={reason.title}
            className="border border-border/50 bg-card card-hover"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <CardContent className="p-6 flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <reason.icon className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">{reason.title}</h3>
                <p className="text-sm text-muted-foreground">{reason.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  </section>
);
