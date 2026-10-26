import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import AboutSection from "@/components/AboutSection";
import AiExpertiseSection from "@/components/AiExpertiseSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import KnowledgeSection from "@/components/KnowledgeSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import SeoJsonLd from "@/components/SeoJsonLd";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <SeoJsonLd />
      <Header />
      <main>
        <HeroSection />
        <ServicesSection />
        <AboutSection />
        <AiExpertiseSection />
        <SkillsSection />
        <ProjectsSection />
        <KnowledgeSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
