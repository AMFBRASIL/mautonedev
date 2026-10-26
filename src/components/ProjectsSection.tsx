import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink, Folder } from "lucide-react";

const projects = [
  {
    title: "CADBRASIL — Hybrid Search + RAG no n8n",
    description:
      "Busca híbrida avançada para a CADBRASIL: semantic search + retrieval tradicional, pipeline RAG com embeddings e automações em n8n para consultar bases documentais e gerar respostas contextualizadas com IA.",
    tech: ["Hybrid Search", "RAG", "n8n", "Embeddings", "Python", "Go", "MongoDB"],
    category: "GenAI · CADBRASIL",
  },
  {
    title: "Plataforma RAG Corporativa",
    description:
      "Arquitetura de GenAI com chunking, embeddings, PostgreSQL/pgvector, semantic search e integração com LLMs. Assistentes que consultam knowledge bases e APIs corporativas.",
    tech: ["RAG", "pgvector", "LLMs", "Python", "FastAPI", "Semantic Search"],
    category: "GenAI",
  },
  {
    title: "AI Agents & Integração de IA",
    description:
      "Agentes com tool/function calling, orquestração de fluxos e integração de IA com ERPs, CRMs, webhooks e microservices em Go e Python.",
    tech: ["AI Agents", "n8n", "Go", "Python", "REST APIs"],
    category: "GenAI",
  },
  {
    title: "ERP/CRM Grupo Sorrisos",
    description:
      "Arquitetura e evolução de plataforma ERP/CRM odontológica: regras de negócio, APIs, frontend/backend e ciclo completo de produto.",
    tech: ["Software Architecture", "APIs", "PostgreSQL", "Full Stack"],
    category: "ERP / CRM",
  },
  {
    title: "GooDesk",
    description:
      "Sistema completo de Suporte e Help Desk com conversão automática de Email para Ticket, gestão de SLA e dashboard analítico.",
    tech: ["React", "Node.js", "PostgreSQL", "Email API"],
    category: "Help Desk",
    url: "https://goodesk.com.br",
  },
  {
    title: "UniStays",
    description:
      "PMS (Property Management System) completo para hotelaria com gestão de reservas, check-in/out, housekeeping e relatórios financeiros.",
    tech: ["React", "Node.js", "PostgreSQL", "Stripe"],
    category: "Hospitality",
    url: "https://unistays.com.br",
  },
  {
    title: "WeJob",
    description:
      "Portal de busca de mão de obra qualificada por proximidade, com sistema de avaliação por estrelas e validação de documentação via portal de prestadores.",
    tech: ["React", "Node.js", "MongoDB", "Google Maps API"],
    category: "Marketplace",
    url: "https://wejob.com.br",
  },
  {
    title: "Selfmart",
    description:
      "Projeto de Mini Mercados Autônomos com aplicativo mobile para compras, controle de estoque em tempo real e gestão automatizada.",
    tech: ["React Native", "Node.js", "PostgreSQL", "IoT"],
    category: "Retail Tech",
    url: "https://selfmart.com.br",
  },
  {
    title: "Desenvolve Bem",
    description:
      "Plataforma de testes psicológicos e neuropsicológicos incluindo TDL, TDAH e outros transtornos, com laudos automatizados.",
    tech: ["React", "Python", "PostgreSQL", "AI/ML"],
    category: "Health Tech",
    url: "https://desenvolvebem.com.br",
  },
  {
    title: "Investin",
    description:
      "Portal de investimentos em aplicativos web e outros ativos financeiros, com análise de portfólio e acompanhamento de rendimentos.",
    tech: ["React", "Node.js", "PostgreSQL", "Financial APIs"],
    category: "FinTech",
    url: "https://investin.com.br",
  },
  {
    title: "Sistema de Gestão Empresarial",
    description:
      "ERP completo com módulos de vendas, estoque, financeiro e RH. Integração com diversos sistemas externos via API REST.",
    tech: ["React", "Node.js", "PostgreSQL", "Docker"],
    category: "Web Application",
  },
  {
    title: "Plataforma de Business Intelligence",
    description:
      "Dashboard analítico com ETL automatizado, data warehouse otimizado e visualizações interativas em tempo real.",
    tech: ["Power BI", "SQL Server", "Python", "Azure"],
    category: "BI & Analytics",
  },
];

const clients = [
  "CADBRASIL",
  "Selfmart",
  "Global Nexus Latam Group",
  "Studio Business Tramontano",
  "Cargill Agrícola",
  "Simpress Logísticas",
  "Microsoft",
];

const ProjectsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projetos" className="py-24 relative bg-secondary/30" ref={ref}>
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          className="max-w-2xl mb-12"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary mb-3">
            Cases
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Projetos entregues em produção
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            GenAI (RAG, Hybrid Search, n8n), ERP/CRM e produtos digitais para
            operações reais.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {projects.map((project, index) => {
            const CardWrapper = project.url ? 'a' : 'div';
            const cardProps = project.url ? { href: project.url, target: "_blank", rel: "noopener noreferrer" } : {};
            
            return (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 * Math.min(index, 5) }}
                whileHover={{ y: -5 }}
              >
                <CardWrapper
                  {...cardProps}
                  className="surface-card rounded-xl p-6 group hover:border-primary/30 transition-all duration-300 cursor-pointer block h-full"
                >
                  <div className="flex items-center justify-between mb-4">
                    <Folder className="text-primary w-8 h-8" />
                    <ExternalLink className={`w-5 h-5 transition-colors ${project.url ? 'text-primary' : 'text-muted-foreground group-hover:text-primary'}`} />
                  </div>

                  <span className="text-xs text-primary font-semibold uppercase tracking-wider">
                    {project.category}
                  </span>

                  <h3 className="text-lg font-semibold mt-2 mb-3 text-foreground group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs px-2 py-1 bg-secondary rounded text-muted-foreground"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </CardWrapper>
              </motion.div>
            );
          })}
        </div>

        {/* Clients Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center"
        >
          <h3 className="font-display text-lg font-semibold mb-6 text-foreground">
            Empresas e operações atendidas
          </h3>
          <div className="flex flex-wrap gap-3">
            {clients.map((client) => (
              <div
                key={client}
                className="surface-card px-5 py-2.5 rounded-md text-sm text-muted-foreground"
              >
                {client}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;