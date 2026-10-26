import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { BookOpen, ArrowRight } from "lucide-react";
import { knowledgeArticles } from "@/data/knowledge";
import { KnowledgeCard } from "@/components/KnowledgeCard";

const KnowledgeSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const preview = knowledgeArticles.slice(0, 6);

  return (
    <section id="conhecimentos" className="py-24 relative" ref={ref}>
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12"
        >
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary mb-3">
              Conteúdo técnico
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Base de conhecimentos GenAI
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Guias para sua equipe entender RAG, busca híbrida, Go em produção
              e como a Express Dev estrutura IA em projetos grandes.
            </p>
          </div>
          <Link
            to="/conhecimentos"
            className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-5 py-3 text-sm font-semibold hover:border-primary/40 transition-colors"
          >
            <BookOpen className="h-4 w-4 text-primary" />
            Ver todos os guias
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {preview.map((article, index) => (
            <motion.div
              key={article.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.05 * index }}
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
