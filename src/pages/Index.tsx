import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/home/HeroSection";
import { AlliancesBar } from "@/components/home/AlliancesBar";
import { ServiceCategories } from "@/components/home/ServiceCategories";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { FeaturedProjects } from "@/components/home/FeaturedProjects";
import { WorkProcess } from "@/components/home/WorkProcess";
import { Certifications } from "@/components/home/Certifications";
import { StatsSection } from "@/components/home/StatsSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { ElectrinovaTools } from "@/components/home/ElectrinovaTools";
import { CTASection } from "@/components/home/CTASection";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <AlliancesBar />
      <ServiceCategories />
      <WhyChooseUs />
      <FeaturedProjects />
      <WorkProcess />
      <ElectrinovaTools />
      <Certifications />
      <StatsSection />
      <TestimonialsSection />
      <CTASection />
    </Layout>
  );
};

export default Index;
