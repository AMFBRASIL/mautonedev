import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Building2,
  Brain,
  Workflow,
  Layers3,
  ShieldCheck,
  MessageSquare,
} from "lucide-react";

const services = [
  {
    icon: Building2,
    title: "Sistemas corporativos",
    description:
      "ERP, CRM, portais e plataformas sob medida — arquitetura, regras de negócio, integrações e evolução contínua.",
  },
  {
    icon: Brain,
    title: "GenAI para o negócio",
    description:
      "RAG, Hybrid Search, embeddings, AI Agents e automações com n8n para consultar documentos e acelerar operações.",
  },
  {
    icon: Layers3,
    title: "APIs e microservices",
    description:
      "Backend em Go, Python e Node.js; contratos REST, filas, alta disponibilidade e integração com o que sua empresa já usa.",
  },
  {
    icon: Workflow,
    title: "Automação de processos",
    description:
      "Fluxos que conectam sistemas, e-mail, CRM e IA — menos trabalho manual, mais rastreabilidade e escala.",
  },
  {
    icon: ShieldCheck,
    title: "Arquitetura e modernização",
    description:
      "Diagnóstico técnico, definição de stack, cloud/containers e modernização de legado sem parar a operação.",
  },
  {
    icon: MessageSquare,
    title: "Produto digital Full Stack",
    description:
      "Do frontend (React/Next.js) ao banco e deploy: times enxutos com visão end-to-end e entrega previsível.",
  },
];

const ServicesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="servicos" className="py-24 relative" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          className="max-w-2xl mb-14"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary mb-3">
            Para empresas
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            O que a Express Dev entrega
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Serviços claros para quem precisa de tecnologia que resolva
            problema de negócio — não só código.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service, index) => (
            <motion.article
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.05 * index }}
              className="surface-card rounded-xl p-6 hover:border-primary/30 transition-colors"
            >
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-primary/15 text-primary ring-1 ring-primary/30">
                <service.icon className="h-5 w-5" />
              </div>
              <h3 className="font-display text-lg font-semibold mb-2">
                {service.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {service.description}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
