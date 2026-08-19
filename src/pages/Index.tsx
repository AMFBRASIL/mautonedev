import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import AiExpertiseSection from "@/components/AiExpertiseSection";
import KnowledgeSection from "@/components/KnowledgeSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
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
        <AboutSection />
        <AiExpertiseSection />
        <KnowledgeSection />
        <SkillsSection />
        <ProjectsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
