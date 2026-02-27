import { Link } from "react-router-dom";
import { Zap, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";

export const CTASection = () => (
  <section className="section-padding gradient-hero">
    <div className="container-custom text-center">
      <div className="max-w-3xl mx-auto space-y-6">
        <h2 className="text-3xl md:text-4xl font-display font-bold text-primary-foreground">
          ¿Tiene un Proyecto Eléctrico en Mente?
        </h2>
        <p className="text-lg text-primary-foreground/80">
          Somos su socio estratégico. Contáctenos para una evaluación técnica 
          y cotización sin compromiso.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold text-lg px-8 py-6 glow-accent">
            <Link to="/contacto">
              <Zap className="h-5 w-5 mr-2" />
              Solicitar Cotización
            </Link>
          </Button>
          <Button asChild size="lg" className="bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold text-lg px-8 py-6">
            <a href="https://wa.me/51938852610?text=Hola%2C%20me%20interesa%20solicitar%20una%20cotización" target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon className="h-5 w-5 mr-2" />
              WhatsApp Directo
            </a>
          </Button>
          <Button asChild size="lg" className="bg-primary-foreground/10 backdrop-blur-sm border-2 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/20 font-semibold text-lg px-8 py-6">
            <a href="tel:+51938852610">
              <Phone className="h-5 w-5 mr-2" />
              Llamar Ahora
            </a>
          </Button>
        </div>
      </div>
    </div>
  </section>
);
