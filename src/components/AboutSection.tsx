import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="sobre" className="py-20 border-y border-border bg-secondary/40" ref={ref}>
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55 }}
          >
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary mb-3">
              Quem somos
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-5">
              Express Dev: engenharia sob medida para empresas
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-4">
              Liderada por{" "}
              <span className="text-foreground font-semibold">
                Anderson Mautone
              </span>
              , com 28 anos de experiência em software, arquitetura e — nos
              últimos anos — GenAI aplicada a operações reais (RAG, Hybrid
              Search, agentes e automações).
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Já entregamos para operações como Microsoft, Cargill, Simpress e
              CADBRASIL, além de ERPs, CRMs e produtos SaaS. O foco é claro:
              entender o problema do negócio e construir a solução que escala.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="grid grid-cols-2 gap-4"
          >
            {[
              { value: "28+", label: "Anos de engenharia" },
              { value: "100+", label: "Projetos entregues" },
              { value: "GenAI", label: "RAG · Agents · n8n" },
              { value: "Full Stack", label: "Go · Python · React" },
            ].map((item) => (
              <div
                key={item.label}
                className="surface-card rounded-xl p-5"
              >
                <div className="font-display text-2xl font-bold text-primary mb-1">
                  {item.value}
                </div>
                <div className="text-sm text-muted-foreground">{item.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
