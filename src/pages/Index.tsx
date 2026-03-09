import { Layout } from "@/components/layout/Layout";
import { SEO } from "@/components/seo/SEO";
import { HeroSection } from "@/components/home/HeroSection";
import { AlliancesBar } from "@/components/home/AlliancesBar";
import { ServiceCategories } from "@/components/home/ServiceCategories";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { FeaturedProjects } from "@/components/home/FeaturedProjects";
import { WorkProcess } from "@/components/home/WorkProcess";
import { Certifications } from "@/components/home/Certifications";
import { StatsSection } from "@/components/home/StatsSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { FAQSection, faqJsonLd } from "@/components/home/FAQSection";
import { CTASection } from "@/components/home/CTASection";

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
      <ServiceCategories />
      <WhyChooseUs />
      <FeaturedProjects />
      <WorkProcess />
      <Certifications />
      <StatsSection />
      <TestimonialsSection />
      <FAQSection />
      <CTASection />
    </Layout>
  );
};

export default Index;
