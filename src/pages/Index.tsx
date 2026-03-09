import { lazy, Suspense } from "react";
import { Layout } from "@/components/layout/Layout";
import { SEO } from "@/components/seo/SEO";
import { HeroSection } from "@/components/home/HeroSection";
import { AlliancesBar } from "@/components/home/AlliancesBar";

// Lazy-load below-fold sections to reduce initial JS
const ServiceCategories = lazy(() => import("@/components/home/ServiceCategories").then(m => ({ default: m.ServiceCategories })));
const WhyChooseUs = lazy(() => import("@/components/home/WhyChooseUs").then(m => ({ default: m.WhyChooseUs })));
const FeaturedProjects = lazy(() => import("@/components/home/FeaturedProjects").then(m => ({ default: m.FeaturedProjects })));
const WorkProcess = lazy(() => import("@/components/home/WorkProcess").then(m => ({ default: m.WorkProcess })));
const Certifications = lazy(() => import("@/components/home/Certifications").then(m => ({ default: m.Certifications })));
const StatsSection = lazy(() => import("@/components/home/StatsSection").then(m => ({ default: m.StatsSection })));
const TestimonialsSection = lazy(() => import("@/components/home/TestimonialsSection").then(m => ({ default: m.TestimonialsSection })));
const FAQSection = lazy(() => import("@/components/home/FAQSection").then(m => ({ default: m.FAQSection })));
const CTASection = lazy(() => import("@/components/home/CTASection").then(m => ({ default: m.CTASection })));

// Import FAQ JSON-LD statically (tiny data, needed for SEO)
import { faqJsonLd } from "@/components/home/FAQSection";

const SectionFallback = () => <div className="min-h-[200px]" />;

const Index = () => {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Electricista industrial en Lima",
      url: "https://electrinovaperu.com/",
      inLanguage: "es-PE",
      description:
        "Servicios eléctricos industriales en Lima: pozos a tierra, subestaciones, tableros MT/BT, automatización y mantenimiento.",
    },
    faqJsonLd,
  ];

  return (
    <Layout>
      <SEO
        title="Electricista industrial en Lima | Electrinova Perú"
        description="Instalaciones eléctricas industriales, pozos a tierra certificados, subestaciones, tableros MT/BT y automatización en Lima. Cotiza gratis: 938 852 610."
        path="/"
        jsonLd={jsonLd}
      />
      <HeroSection />
      <AlliancesBar />
      <Suspense fallback={<SectionFallback />}>
        <ServiceCategories />
        <WhyChooseUs />
        <FeaturedProjects />
        <WorkProcess />
        <Certifications />
        <StatsSection />
        <TestimonialsSection />
        <FAQSection />
        <CTASection />
      </Suspense>
    </Layout>
  );
};

export default Index;
