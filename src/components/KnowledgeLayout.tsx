import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const KnowledgeLayout = ({ children }: { children: React.ReactNode }) => (
  <div className="min-h-screen bg-background">
    <Header />
    <main className="pt-32 pb-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <Link
          to="/conhecimentos"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Todos os conhecimentos
        </Link>
        {children}
      </div>
    </main>
    <Footer />
  </div>
);

export default KnowledgeLayout;
