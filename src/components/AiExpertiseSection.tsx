import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import {
  Brain,
  Search,
  Workflow,
  Bot,
  Database,
  Link2,
} from "lucide-react";

const pillars = [
  {
    icon: <Brain className="w-6 h-6" />,
    title: "RAG & Embeddings",
    description:
      "Pipelines de chunking, embeddings e retrieval para assistentes que consultam bases corporativas com respostas contextualizadas.",
  },
  {
    icon: <Search className="w-6 h-6" />,
    title: "Hybrid Search",
    description:
      "Busca híbrida avançada: semantic search + keyword/vector search, ranking e relevância em conhecimento documental.",
  },
  {
    icon: <Bot className="w-6 h-6" />,
    title: "AI Agents",
    description:
      "Agentes com tool/function calling, orquestração de tarefas e integração de LLMs com APIs e sistemas internos.",
  },
  {
    icon: <Workflow className="w-6 h-6" />,
    title: "n8n & Automação",
    description:
      "Fluxos de automação com n8n conectando RAG, webhooks, CRMs, ERPs e camadas de IA em produção.",
  },
  {
    icon: <Database className="w-6 h-6" />,
    title: "Go, Python & MongoDB",
    description:
      "Microservices em Go e Python (FastAPI), persistência em MongoDB e PostgreSQL/pgvector para busca vetorial.",
  },
  {
    icon: <Link2 className="w-6 h-6" />,
    title: "Integração com IA",
    description:
      "LLM APIs (OpenAI, Gemini, Claude), knowledge bases e GenAI acoplada a produtos corporativos existentes.",
  },
];

const AiExpertiseSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="ia" className="py-24 relative" ref={ref} aria-labelledby="ia-heading">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary mb-3">
            Inteligência Artificial
          </p>
          <h2 id="ia-heading" className="font-display text-3xl md:text-4xl font-bold mb-4">
            GenAI que a empresa consegue operar
          </h2>
          <p className="text-muted-foreground mt-4 max-w-3xl mx-auto text-lg leading-relaxed">
            RAG, Hybrid Search, embeddings, AI Agents, n8n, Go, Python e MongoDB —
            da ingestão documental à resposta do modelo, integrada aos seus sistemas.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {pillars.map((item, index) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, delay: 0.08 * index }}
              className="surface-card rounded-xl p-6 hover:border-primary/30 transition-all"
            >
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-secondary text-primary">
                {item.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {item.description}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AiExpertiseSection;
