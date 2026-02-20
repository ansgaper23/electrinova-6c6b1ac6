import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

// Logo served from /public with a stable URL so it can be <link rel="preload"> in index.html
const LOGO_URL = "/logo-electrinova.png";

const navLinks = [
  { href: "/", label: "Inicio" },
  { href: "/proyectos", label: "Proyectos" },
  { href: "/socios", label: "Socios Comerciales" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/contacto", label: "Contacto" },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || isMenuOpen
          ? "bg-primary shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="container-custom">
        <nav className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center group flex-shrink-0">
            <img
              src={LOGO_URL}
              alt="ELECTRINOVA PERÚ"
              width={120}
              height={40}
              fetchPriority="high"
              className="h-10 w-auto transition-transform duration-300 group-hover:scale-105"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`relative text-sm font-medium transition-colors duration-300 hover:text-accent ${
                  location.pathname === link.href
                    ? "text-accent"
                    : "text-primary-foreground"
                }`}
              >
                {link.label}
                {location.pathname === link.href && (
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-accent rounded-full" />
                )}
              </Link>
            ))}
          </div>

          {/* CTA Button - Desktop */}
          <div className="hidden lg:flex items-center gap-3">
            <a href="tel:+51934014639" className="flex items-center gap-1.5 text-primary-foreground hover:text-accent transition-colors text-sm">
              <Phone className="h-4 w-4" />
              <span className="font-medium">934 014 639</span>
            </a>
            <Button asChild size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold">
              <Link to="/contacto">
                <Zap className="h-4 w-4 mr-1" />
                Cotizar
              </Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 text-primary-foreground hover:text-accent transition-colors"
            aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </nav>

        {/* Mobile Navigation */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ${
            isMenuOpen ? "max-h-[400px] pb-6" : "max-h-0"
          }`}
        >
          <div className="flex flex-col gap-4 pt-4 border-t border-primary-foreground/20">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`font-medium py-2 transition-colors duration-300 hover:text-accent ${
                  location.pathname === link.href
                    ? "text-accent"
                    : "text-primary-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex flex-col gap-3 pt-4 border-t border-primary-foreground/20">
              <a href="tel:+51934014639" className="flex items-center gap-2 text-primary-foreground hover:text-accent transition-colors">
                <Phone className="h-4 w-4" />
                <span className="font-medium">+51 934 014 639</span>
              </a>
              <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold w-full">
                <Link to="/contacto">
                  <Zap className="h-4 w-4 mr-2" />
                  Cotizar Ahora
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
