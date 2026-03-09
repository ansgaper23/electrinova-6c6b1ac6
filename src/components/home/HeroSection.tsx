import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Zap, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ResponsiveImage } from "@/components/media/ResponsiveImage";

// Responsive hero images
import hero1Url from "@/assets/hero/hero-slide-1.jpg?url";
import hero1Meta from "@/assets/hero/hero-slide-1.jpg?as=meta";
import hero1SrcSetWebp from "@/assets/hero/hero-slide-1.jpg?w=640;960;1280;1536;1920&format=webp&as=srcset";
import hero1SrcSetAvif from "@/assets/hero/hero-slide-1.jpg?w=640;960;1280;1536;1920&format=avif&as=srcset";

import hero2Url from "@/assets/hero/hero-slide-2.jpg?url";
import hero2Meta from "@/assets/hero/hero-slide-2.jpg?as=meta";
import hero2SrcSetWebp from "@/assets/hero/hero-slide-2.jpg?w=640;960;1280;1536;1920&format=webp&as=srcset";
import hero2SrcSetAvif from "@/assets/hero/hero-slide-2.jpg?w=640;960;1280;1536;1920&format=avif&as=srcset";

import hero3Url from "@/assets/hero/hero-slide-3.jpg?url";
import hero3Meta from "@/assets/hero/hero-slide-3.jpg?as=meta";
import hero3SrcSetWebp from "@/assets/hero/hero-slide-3.jpg?w=640;960;1280;1536;1920&format=webp&as=srcset";
import hero3SrcSetAvif from "@/assets/hero/hero-slide-3.jpg?w=640;960;1280;1536;1920&format=avif&as=srcset";

const slides = [
  {
    image: hero1Url,
    imageWidth: hero1Meta.width,
    imageHeight: hero1Meta.height,
    imageSrcSetWebp: hero1SrcSetWebp,
    imageSrcSetAvif: hero1SrcSetAvif,
    alt: "ELECTRINOVA PERÚ – Instalaciones eléctricas industriales en Lima",
    title: "Soluciones Eléctricas Integrales",
    subtitle: "para la Industria y el Comercio",
    description:
      "Diseñamos, ejecutamos y mantenemos proyectos eléctricos de alta envergadura para empresas líderes en el Perú.",
  },
  {
    image: hero2Url,
    imageWidth: hero2Meta.width,
    imageHeight: hero2Meta.height,
    imageSrcSetWebp: hero2SrcSetWebp,
    imageSrcSetAvif: hero2SrcSetAvif,
    alt: "ELECTRINOVA PERÚ – Subestaciones eléctricas y automatización industrial",
    title: "Ingeniería de Alta Potencia",
    subtitle: "con Estándares Internacionales",
    description:
      "Salas eléctricas, sub estaciones y sistemas de automatización con certificaciones y protocolos de conformidad.",
  },
  {
    image: hero3Url,
    imageWidth: hero3Meta.width,
    imageHeight: hero3Meta.height,
    imageSrcSetWebp: hero3SrcSetWebp,
    imageSrcSetAvif: hero3SrcSetAvif,
    alt: "ELECTRINOVA PERÚ – Mantenimiento eléctrico industrial y proyectos llave en mano",
    title: "Socios Estratégicos",
    subtitle: "de su Infraestructura Eléctrica",
    description:
      "Más de 50 proyectos ejecutados para Nestlé, Aceros Arequipa, ABB, UTP y consorcios industriales.",
  },
];

export const HeroSection = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const slide = slides[current];

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background images */}
      {slides.map((s, i) => (
        <div
          key={i}
          className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
          style={{ opacity: i === current ? 1 : 0 }}
        >
          <ResponsiveImage
            src={s.image}
            srcSetWebp={s.imageSrcSetWebp}
            srcSetAvif={s.imageSrcSetAvif}
            sizes="100vw"
            width={s.imageWidth}
            height={s.imageHeight}
            alt={s.alt}
            pictureClassName="w-full h-full"
            className="w-full h-full object-cover"
            loading={i === 0 ? "eager" : "lazy"}
            decoding={i === 0 ? "sync" : "async"}
            fetchPriority={i === 0 ? "high" : "low"}
          />
        </div>
      ))}

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/80 to-primary/50" />

      {/* Content */}
      <div className="container-custom relative z-10 pt-20 pb-16">
        <div className="max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 bg-accent/20 backdrop-blur-sm border border-accent/30 px-4 py-2 rounded-full">
            <Zap className="h-4 w-4 text-accent" />
            <span className="text-sm font-medium text-accent">ELECTRINOVA PERÚ S.A.C.</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-primary-foreground leading-[1.1]">
            {slide.title}
            <br />
            <span className="text-accent">{slide.subtitle}</span>
          </h1>

          <p className="text-lg md:text-xl text-primary-foreground/80 max-w-xl leading-relaxed">
            {slide.description}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <Button
              asChild
              size="lg"
              className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold text-lg px-8 py-6 glow-accent btn-electric"
            >
              <Link to="/contacto">
                <Zap className="h-5 w-5 mr-2" />
                Solicitar Cotización
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              className="bg-primary-foreground/10 backdrop-blur-sm border-2 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/20 font-semibold text-lg px-8 py-6"
            >
              <Link to="/proyectos">
                Ver Proyectos
                <ArrowRight className="h-5 w-5 ml-2" />
              </Link>
            </Button>
          </div>

          {/* Slide indicators */}
          <div className="flex gap-2 pt-4">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-1 rounded-full transition-all duration-500 ${
                  i === current ? "w-10 bg-accent" : "w-6 bg-primary-foreground/30"
                }`}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Side stats strip */}
      <div className="hidden lg:flex absolute right-0 top-0 bottom-0 w-px bg-primary-foreground/10" />
    </section>
  );
};

