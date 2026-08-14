import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const skillGroups = [
  {
    title: "Inteligência Artificial & GenAI",
    accent: "bg-primary",
    items: [
      { name: "RAG / Retrieval Augmented Generation", level: 95 },
      { name: "Hybrid Search & Semantic Search", level: 94 },
      { name: "Embeddings & Vector Search", level: 93 },
      { name: "AI Agents / Tool Calling", level: 90 },
      { name: "n8n & AI Automation", level: 92 },
      { name: "LLM Integration (OpenAI, Gemini, Claude)", level: 92 },
    ],
  },
  {
    title: "Linguagens & Backend",
    accent: "bg-accent",
    items: [
      { name: "Python / FastAPI", level: 94 },
      { name: "Go / Golang", level: 90 },
      { name: "Node.js / TypeScript", level: 95 },
      { name: "React / Next.js", level: 95 },
      { name: "MongoDB", level: 90 },
      { name: "PostgreSQL / pgvector", level: 93 },
    ],
  },
];

const extraTags = [
  "JavaScript",
  "PHP / Laravel",
  "REST APIs",
  "Microservices",
  "TanStack",
  "Supabase",
  "Docker",
  "Kubernetes",
  "GCP",
  "SQL",
  "Oracle",
  "MySQL",
  "ETL",
  "Power BI",
  "Software Architecture",
];

const SkillBar = ({
  name,
  level,
  delay,
  isInView,
}: {
  name: string;
  level: number;
  delay: number;
  isInView: boolean;
}) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={isInView ? { opacity: 1, x: 0 } : {}}
    transition={{ duration: 0.5, delay }}
    className="mb-4"
  >
    <div className="flex justify-between mb-2">
      <span className="text-sm font-medium text-foreground">{name}</span>
      <span className="text-sm text-muted-foreground">{level}%</span>
    </div>
    <div className="h-2 bg-secondary rounded-full overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        animate={isInView ? { width: `${level}%` } : {}}
        transition={{ duration: 1, delay: delay + 0.2, ease: "easeOut" }}
        className="h-full rounded-full"
        style={{ background: "var(--gradient-primary)" }}
      />
    </div>
  </motion.div>
);

const SkillsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="py-24 relative" ref={ref}>
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Skills</span> & Tecnologias
          </h2>
          <div
            className="w-24 h-1 mx-auto rounded-full"
            style={{ background: "var(--gradient-primary)" }}
          />
          <p className="text-muted-foreground mt-6 max-w-2xl mx-auto">
            Profissional nas linguagens e plataformas usadas em arquitetura
            corporativa e em produtos de IA: Go, Python, TypeScript, MongoDB e
            o ecossistema RAG / Hybrid Search.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {skillGroups.map((group, gIndex) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + gIndex * 0.15 }}
              className="glass rounded-2xl p-8"
            >
              <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
                <span className={`w-3 h-3 rounded-full ${group.accent}`} />
                {group.title}
              </h3>
              {group.items.map((skill, index) => (
                <SkillBar
                  key={skill.name}
                  name={skill.name}
                  level={skill.level}
                  delay={0.3 + index * 0.05}
                  isInView={isInView}
                />
              ))}
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-wrap justify-center gap-2 mt-12"
        >
          {extraTags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1.5 text-xs md:text-sm rounded-lg glass text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;
