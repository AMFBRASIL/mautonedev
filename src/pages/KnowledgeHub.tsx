import { Link } from "react-router-dom";
import { BookOpen } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { KnowledgeCard } from "@/components/KnowledgeCard";
import { knowledgeArticles, knowledgeHub } from "@/data/knowledge";

const SITE = "https://mautone.com.br";

const hubJsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: knowledgeHub.title,
  description: knowledgeHub.description,
  url: `${SITE}${knowledgeHub.path}`,
  inLanguage: "pt-BR",
  author: { "@type": "Person", name: "Anderson Mautone", url: SITE },
  hasPart: knowledgeArticles.map((article) => ({
    "@type": "TechArticle",
    headline: article.title,
    description: article.description,
    url: `${SITE}/conhecimentos/${article.slug}`,
  })),
};

const KnowledgeHub = () => (
  <div className="min-h-screen bg-background">
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(hubJsonLd) }}
    />
    <Header />
    <main className="pt-32 pb-20">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6"
            style={{ background: "var(--gradient-primary)" }}
          >
            <BookOpen className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            Conhecimentos de <span className="gradient-text">GenAI</span>
          </h1>
          <p className="text-muted-foreground text-lg leading-relaxed">
            {knowledgeHub.description}
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
          {knowledgeArticles.map((article) => (
            <KnowledgeCard key={article.slug} article={article} />
          ))}
        </div>
        <p className="text-center mt-12">
          <Link to="/" className="text-sm text-muted-foreground hover:text-primary">
            Voltar à home
          </Link>
        </p>
      </div>
    </main>
    <Footer />
  </div>
);

export default KnowledgeHub;
