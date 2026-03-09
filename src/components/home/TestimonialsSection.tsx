import { Zap, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { AnimatedSection } from "./AnimatedSection";

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

export const TestimonialsSection = () => (
  <section className="section-padding bg-background">
    <div className="container-custom">
      <AnimatedSection>
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 text-accent font-semibold mb-4">
            <Zap className="h-5 w-5" />
            Testimonios
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
            Lo Que Dicen Nuestros Clientes
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            La satisfacción de nuestros clientes corporativos es nuestra mejor carta de presentación
          </p>
        </div>
      </AnimatedSection>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((t, index) => (
          <AnimatedSection key={t.name} delay={index * 150}>
            <Card className="border border-border/50 bg-card hover:shadow-lg transition-shadow duration-300 h-full">
              <CardContent className="p-8">
                <Quote className="h-8 w-8 text-accent/30 mb-4" />
                <p className="text-foreground mb-6 leading-relaxed">"{t.text}"</p>
                <div className="border-t border-border pt-4 flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-foreground">{t.name}</p>
                    <p className="text-sm text-muted-foreground">{t.company}</p>
                  </div>
                  <span className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full font-medium">
                    {t.sector}
                  </span>
                </div>
              </CardContent>
            </Card>
          </AnimatedSection>
        ))}
      </div>
    </div>
  </section>
);
