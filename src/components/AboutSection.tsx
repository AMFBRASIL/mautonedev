import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Code2, Database, Brain, Server } from "lucide-react";

const highlights = [
  {
    icon: <Brain className="w-6 h-6" />,
    title: "GenAI & RAG",
    description:
      "RAG, Hybrid Search, embeddings, AI Agents, n8n e integração de LLMs com sistemas corporativos.",
  },
  {
    icon: <Code2 className="w-6 h-6" />,
    title: "Go, Python & Full Stack",
    description:
      "Microservices em Go e Python/FastAPI, React, Next.js, TypeScript, Node.js e PHP em produção.",
  },
  {
    icon: <Database className="w-6 h-6" />,
    title: "Dados & Vector Search",
    description:
      "MongoDB, PostgreSQL/pgvector, Semantic Search, modelagem e otimização de consultas.",
  },
  {
    icon: <Server className="w-6 h-6" />,
    title: "Arquitetura de Sistemas",
    description:
      "Design de sistemas distribuídos, microserviços, Cloud e integrações de alta complexidade.",
  },
];

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="sobre" className="py-24 relative" ref={ref}>
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/30 to-background" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Sobre <span className="gradient-text">Mim</span>
          </h2>
          <div
            className="w-24 h-1 mx-auto rounded-full"
            style={{ background: "var(--gradient-primary)" }}
          />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              Com <span className="text-primary font-semibold">28 anos</span> de
              experiência em software, atuo como arquiteto e engenheiro Full
              Stack — e, nos últimos anos, como profissional de{" "}
              <span className="text-accent font-medium">
                Inteligência Artificial Generativa
              </span>
              : RAG, Hybrid Search, embeddings, agentes e automações com n8n.
            </p>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              Entreguei projetos para{" "}
              <span className="text-foreground font-medium">
                Microsoft, Cargill, Simpress, CADBRASIL
              </span>{" "}
              e outras operações de grande porte, além de ERPs, CRMs e produtos
              SaaS ponta a ponta.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Combino <span className="text-primary">Go</span>,{" "}
              <span className="text-primary">Python</span>,{" "}
              <span className="text-primary">MongoDB</span>, React, Next.js e
              Node.js com arquitetura de software clássica — para colocar IA
              dentro de processos reais de negócio, não apenas em demos.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-4">
            {highlights.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                className="glass rounded-xl p-6 group hover:border-primary/50 transition-all duration-300"
                whileHover={{ y: -5 }}
              >
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center mb-4 text-primary group-hover:glow-primary transition-all"
                  style={{ background: "var(--gradient-primary)" }}
                >
                  <div className="text-primary-foreground">{item.icon}</div>
                </div>
                <h3 className="text-lg font-semibold mb-2 text-foreground">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16"
        >
          {[
            { number: "28+", label: "Anos de Experiência" },
            { number: "100+", label: "Projetos Entregues" },
            { number: "GenAI", label: "RAG · Agents · n8n" },
            { number: "Full Stack", label: "Go · Python · React" },
          ].map((stat) => (
            <motion.div
              key={stat.label}
              className="text-center p-6 glass rounded-xl"
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">
                {stat.number}
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
