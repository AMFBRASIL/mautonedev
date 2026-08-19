import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { BookOpen } from "lucide-react";
import { knowledgeArticles } from "@/data/knowledge";
import { KnowledgeCard } from "@/components/KnowledgeCard";

const KnowledgeSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="conhecimentos" className="py-24 relative" ref={ref}>
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/30 to-background" />
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <div className="flex justify-center mb-5">
            <Link
              to="/conhecimentos"
              aria-label="Abrir conteúdos de conhecimentos em GenAI"
              className="w-16 h-16 rounded-2xl flex items-center justify-center glow-primary hover:scale-105 transition-transform"
              style={{ background: "var(--gradient-primary)" }}
            >
              <BookOpen className="w-8 h-8 text-primary-foreground" />
            </Link>
          </div>
          <p className="text-sm uppercase tracking-[0.2em] text-primary mb-3">
            Base de conhecimento
          </p>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Conhecimentos de <span className="gradient-text">GenAI</span>
          </h2>
          <div
            className="w-24 h-1 mx-auto rounded-full"
            style={{ background: "var(--gradient-primary)" }}
          />
          <p className="text-muted-foreground mt-6 max-w-2xl mx-auto">
            Guias sobre RAG, Semantic Search, Hybrid Search, Go, Python, n8n e
            como aplicar IA em projetos grandes. Toque no ícone ou escolha um
            tema.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {knowledgeArticles.map((article, index) => (
            <motion.div
              key={article.slug}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.06 * index }}
            >
              <KnowledgeCard article={article} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default KnowledgeSection;
