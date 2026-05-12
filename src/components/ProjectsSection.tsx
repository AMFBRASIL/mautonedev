import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink, Folder } from "lucide-react";

const projects = [
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
  {
    title: "E-commerce Marketplace",
    description:
      "Plataforma multi-vendor com gateway de pagamento, gestão de logística e sistema de avaliações.",
    tech: ["PHP", "MySQL", "JavaScript", "Redis"],
    category: "E-commerce",
  },
  {
    title: "Sistema de Integração B2B",
    description:
      "Middleware para integração entre sistemas ERP, CRM e plataformas de e-commerce de grandes corporações.",
    tech: ["Node.js", "RabbitMQ", "MongoDB", "AWS"],
    category: "Integration",
  },
  {
    title: "Portal de Autoatendimento",
    description:
      "Aplicação self-service para clientes com área restrita, gestão de tickets e base de conhecimento.",
    tech: ["React", "TypeScript", "Express", "PostgreSQL"],
    category: "Web Portal",
  },
  {
    title: "Sistema de Logística",
    description:
      "Gestão completa de frotas, rastreamento em tempo real e otimização de rotas com algoritmos avançados.",
    tech: ["React", "Node.js", "MongoDB", "Google Maps API"],
    category: "Logistics",
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
    <section id="projetos" className="py-24 relative" ref={ref}>
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/30 to-background" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Projetos & <span className="gradient-text">Portfólio</span>
          </h2>
          <div className="w-24 h-1 mx-auto rounded-full" style={{ background: "var(--gradient-primary)" }} />
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
                  className="glass rounded-xl p-6 group hover:border-primary/50 transition-all duration-300 cursor-pointer block h-full"
                >
                  <div className="flex items-center justify-between mb-4">
                    <Folder className="text-primary w-8 h-8" />
                    <ExternalLink className={`w-5 h-5 transition-colors ${project.url ? 'text-primary' : 'text-muted-foreground group-hover:text-primary'}`} />
                  </div>

                  <span className="text-xs text-accent font-medium uppercase tracking-wider">
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
          <h3 className="text-xl font-semibold mb-8 text-muted-foreground">
            Clientes & Empresas Atendidas
          </h3>
          <div className="flex flex-wrap justify-center gap-4 md:gap-8">
            {clients.map((client, index) => (
              <motion.div
                key={client}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.3, delay: 0.7 + index * 0.1 }}
                className="glass px-6 py-3 rounded-lg text-sm md:text-base text-muted-foreground hover:text-foreground hover:border-primary/50 transition-all cursor-default"
                whileHover={{ scale: 1.05 }}
              >
                {client}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;