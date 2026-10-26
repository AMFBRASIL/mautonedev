import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const groups = [
  {
    title: "Inteligência Artificial",
    items: [
      "RAG",
      "Hybrid Search",
      "Semantic Search",
      "Embeddings",
      "AI Agents",
      "n8n",
      "LLMs (OpenAI, Gemini, Claude)",
      "pgvector",
    ],
  },
  {
    title: "Backend & APIs",
    items: [
      "Go / Golang",
      "Python / FastAPI",
      "Node.js",
      "TypeScript",
      "PHP / Laravel",
      "REST APIs",
      "Microservices",
      "Webhooks",
    ],
  },
  {
    title: "Frontend & Produto",
    items: [
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "TanStack",
      "HTML5 / CSS3",
      "Aplicações responsivas",
    ],
  },
  {
    title: "Dados, Cloud & Ops",
    items: [
      "PostgreSQL",
      "MongoDB",
      "MySQL / Oracle",
      "Docker",
      "Kubernetes / GCP",
      "CI/CD",
      "Nginx",
      "Monitoramento",
    ],
  },
];

const SkillsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="stacks" className="py-24 relative" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          className="max-w-2xl mb-12"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary mb-3">
            Stack
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Tecnologias que usamos em produção
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Escolhemos a stack pelo problema — e temos profundidade nas
            linguagens e plataformas que sua equipe precisa auditar.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {groups.map((group, index) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 18 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.06 * index }}
              className="surface-card rounded-xl p-6"
            >
              <h3 className="font-display text-base font-semibold mb-4">
                {group.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-md bg-secondary px-3 py-1.5 text-sm text-secondary-foreground"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
