import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin, Zap } from "lucide-react";
import logoElectrinova from "@/assets/logo-electrinova.png";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";

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
  const phoneNumber = "51930519248";
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
                src={logoElectrinova}
                alt="ELECTRINOVA PERÚ"
                className="h-16 w-auto"
              />
            </Link>
            <p className="text-primary-foreground/80 leading-relaxed">
              Energía que Innova, Soluciones que Perduran. Especialistas en servicios 
              eléctricos para los sectores industrial, residencial y comercial.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-primary-foreground/10 rounded-full hover:bg-accent hover:text-accent-foreground transition-all duration-300"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-primary-foreground/10 rounded-full hover:bg-accent hover:text-accent-foreground transition-all duration-300"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-primary-foreground/10 rounded-full hover:bg-accent hover:text-accent-foreground transition-all duration-300"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
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
            <h4 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <Zap className="h-5 w-5 text-accent" />
              Enlaces Rápidos
            </h4>
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
            <h4 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <Zap className="h-5 w-5 text-accent" />
              Nuestros Servicios
            </h4>
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
            <h4 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <Zap className="h-5 w-5 text-accent" />
              Contáctanos
            </h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="tel:+51930519248"
                  className="flex items-start gap-3 text-primary-foreground/80 hover:text-accent transition-colors duration-300"
                >
                  <Phone className="h-5 w-5 mt-0.5 flex-shrink-0" />
                  <span>930 519 248 / 992 324 121</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:ingenieria@factiminperu.com"
                  className="flex items-start gap-3 text-primary-foreground/80 hover:text-accent transition-colors duration-300"
                >
                  <Mail className="h-5 w-5 mt-0.5 flex-shrink-0" />
                  <span>ingenieria@factiminperu.com</span>
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
                  <span>WhatsApp: 930 519 248</span>
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3 text-primary-foreground/80">
                  <MapPin className="h-5 w-5 mt-0.5 flex-shrink-0" />
                  <span>Lima, Perú</span>
                </div>
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
            <p className="text-sm text-primary-foreground/70 text-center md:text-left">
              © {currentYear} ELECTRINOVA PERÚ. Todos los derechos reservados.
            </p>
            <div className="flex items-center gap-6 text-sm text-primary-foreground/70">
              <Link to="/contacto" className="hover:text-accent transition-colors">
                Política de Privacidad
              </Link>
              <Link to="/contacto" className="hover:text-accent transition-colors">
                Términos de Servicio
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
