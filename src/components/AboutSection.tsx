import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Code2, Database, BarChart3, Server } from "lucide-react";

const highlights = [
  {
    icon: <Code2 className="w-6 h-6" />,
    title: "Desenvolvimento Web",
    description:
      "React, Node.js, TypeScript, PHP e arquiteturas modernas para aplicações escaláveis.",
  },
  {
    icon: <Database className="w-6 h-6" />,
    title: "Banco de Dados",
    description:
      "Expertise em SQL, NoSQL, modelagem de dados e otimização de performance.",
  },
  {
    icon: <BarChart3 className="w-6 h-6" />,
    title: "Business Intelligence",
    description:
      "Data Warehouse, ETL, dashboards analíticos e tomada de decisão baseada em dados.",
  },
  {
    icon: <Server className="w-6 h-6" />,
    title: "Arquitetura de Sistemas",
    description:
      "Design de sistemas distribuídos, microserviços e integrações complexas.",
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
          <div className="w-24 h-1 mx-auto rounded-full" style={{ background: "var(--gradient-primary)" }} />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              Com <span className="text-primary font-semibold">28 anos</span> de
              experiência no desenvolvimento de software, construí uma carreira
              sólida focada em criar soluções tecnológicas que realmente fazem a
              diferença nos negócios.
            </p>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              Minha jornada inclui projetos para{" "}
              <span className="text-foreground font-medium">
                grandes corporações
              </span>{" "}
              como Microsoft, Cargill e Simpress, além de startups e empresas de
              médio porte, sempre entregando soluções de alta qualidade e
              performance.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Especializado em{" "}
              <span className="text-accent font-medium">
                arquitetura de sistemas web
              </span>
              , combino tecnologias modernas como React, Node.js e TypeScript
              com profundo conhecimento em bancos de dados e Business
              Intelligence para criar aplicações completas e escaláveis.
            </p>
          </motion.div>

          {/* Highlight Cards */}
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
                <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4 text-primary group-hover:glow-primary transition-all" style={{ background: "var(--gradient-primary)" }}>
                  <div className="text-primary-foreground">{item.icon}</div>
                </div>
                <h3 className="text-lg font-semibold mb-2 text-foreground">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16"
        >
          {[
            { number: "28+", label: "Anos de Experiência" },
            { number: "100+", label: "Projetos Entregues" },
            { number: "50+", label: "Clientes Satisfeitos" },
            { number: "15+", label: "Tecnologias Dominadas" },
          ].map((stat, index) => (
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
