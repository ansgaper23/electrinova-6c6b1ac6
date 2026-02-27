import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Facebook, Zap } from "lucide-react";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";

const LOGO_URL = "/logo-electrinova.png";

const services = [
  "Mantenimiento de Sub Estaciones",
  "Pozos a Tierra",
  "Tableros MT - BT",
  "Automatización",
  "Instalaciones Eléctricas",
  "Cableado Estructurado",
];

const quickLinks = [
  { href: "/", label: "Inicio" },
  { href: "/proyectos", label: "Proyectos" },
  { href: "/socios", label: "Socios Comerciales" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/contacto", label: "Contacto" },
];

export function Footer() {
  const currentYear = new Date().getFullYear();
  const phoneNumber = "51938852610";
  const message = encodeURIComponent(
    "Hola, me gustaría solicitar información sobre los servicios eléctricos de ELECTRINOVA PERÚ."
  );
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Main Footer */}
      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="space-y-6">
            <Link to="/" className="inline-block">
              <img
                src={LOGO_URL}
                alt="ELECTRINOVA PERÚ"
                width={120}
                height={64}
                loading="lazy"
                className="h-16 w-auto"
              />
            </Link>
            <p className="text-primary-foreground/80 leading-relaxed">
              Energía que Innova, Soluciones que Perduran. Especialistas en servicios 
              eléctricos para los sectores industrial, residencial y comercial.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://fb.com/electrinovaperu"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-primary-foreground/10 rounded-full hover:bg-accent hover:text-accent-foreground transition-all duration-300"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://www.tiktok.com/@electrinova"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-primary-foreground/10 rounded-full hover:bg-accent hover:text-accent-foreground transition-all duration-300"
                aria-label="TikTok"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                </svg>
              </a>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-green-500 rounded-full hover:bg-green-600 transition-all duration-300"
                aria-label="WhatsApp"
              >
                <WhatsAppIcon className="h-5 w-5 text-white" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <Zap className="h-5 w-5 text-accent" />
              Enlaces Rápidos
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-primary-foreground/80 hover:text-accent transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <Zap className="h-5 w-5 text-accent" />
              Nuestros Servicios
            </h3>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service}>
                  <span className="text-primary-foreground/80">{service}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <Zap className="h-5 w-5 text-accent" />
              Contáctanos
            </h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="tel:+51938852610"
                  className="flex items-start gap-3 text-primary-foreground/80 hover:text-accent transition-colors duration-300"
                >
                  <Phone className="h-5 w-5 mt-0.5 flex-shrink-0" />
                  <span>938 852 610</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:ventas@electrinovaperu.com"
                  className="flex items-start gap-3 text-primary-foreground/80 hover:text-accent transition-colors duration-300"
                >
                  <Mail className="h-5 w-5 mt-0.5 flex-shrink-0" />
                  <span className="break-all">ventas@electrinovaperu.com</span>
                </a>
              </li>
              <li>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 text-primary-foreground/80 hover:text-green-400 transition-colors duration-300"
                >
                  <WhatsAppIcon className="h-5 w-5 mt-0.5 flex-shrink-0" />
                  <span>WhatsApp: 938 852 610</span>
                </a>
              </li>
              <li>
                <a
                  href="https://maps.google.com/?q=Pje+Laburre+158,+Cercado+de+Lima,+Peru"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 text-primary-foreground/80 hover:text-accent transition-colors duration-300"
                >
                  <MapPin className="h-5 w-5 mt-0.5 flex-shrink-0" />
                  <span>Pje Laburre 158, Cercado de Lima, Perú</span>
                </a>
              </li>
            </ul>
            <div className="mt-6 p-4 bg-primary-foreground/10 rounded-lg">
              <p className="text-sm font-medium">Horario de Atención:</p>
              <p className="text-sm text-primary-foreground/80">
                Lunes - Viernes: 8:00 AM - 6:00 PM<br />
                Sábado: 9:00 AM - 1:00 PM
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-foreground/20">
        <div className="container-custom py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left">
              <p className="text-sm text-primary-foreground/70">
                © {currentYear} ELECTRINOVA PERÚ S.A.C. Todos los derechos reservados.
              </p>
              <p className="text-xs text-primary-foreground/50 mt-1">
                RUC: 20615527590 · Registrado en SUNAT/SUNARP
              </p>
            </div>
            <div className="flex items-center gap-6 text-sm text-primary-foreground/70">
              <Link to="/politica-privacidad" className="hover:text-accent transition-colors">
                Política de Privacidad
              </Link>
              <Link to="/terminos-servicio" className="hover:text-accent transition-colors">
                Términos de Servicio
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
