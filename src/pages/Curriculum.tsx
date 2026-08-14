import { useCallback } from "react";
import { Link } from "react-router-dom";
import { Printer, ArrowLeft } from "lucide-react";

const skillBlocks = [
  {
    title: "Inteligência Artificial & GenAI",
    items:
      "Generative AI • LLMs • RAG • AI Agents • Embeddings • Vector Search • Vector Databases • Hybrid Search • Semantic Search • Prompt Engineering • Tool Calling • Function Calling • LLM API Integration • AI Automation • n8n • Knowledge Bases",
    note: "OpenAI API • GPT • Google Gemini • Vertex AI • Claude • PostgreSQL/pgvector • Supabase • LangChain • LlamaIndex",
  },
  {
    title: "Backend & APIs",
    items:
      "Python • FastAPI • Django / Flask • Go / Golang • Node.js • Express.js • PHP • Laravel • WordPress • Java / Spring • C# • REST APIs • GraphQL • WebServices • Microservices • Webhooks • API Integration • Asynchronous Processing",
    note: "Go / Golang: microservices, APIs, cloud-native services, concorrência e processamento assíncrono em ambiente corporativo.",
  },
  {
    title: "Frontend",
    items:
      "React • Next.js • Vue.js • TypeScript • JavaScript • HTML5 • CSS3 / SCSS • TanStack • Responsive Applications • REST API Integration",
  },
  {
    title: "Mobile",
    items: "Swift • Kotlin • Web Mobile • Integração mobile com plataformas corporativas e BI",
  },
  {
    title: "Cloud & Containers",
    items:
      "Google Cloud Platform (GCP) • Google Kubernetes Engine (GKE) • Kubernetes • Docker • Linux • AWS • Azure • Nginx • Apache",
    note: "Conceitos: Containerization • Cloud-Native Architecture • Deployments • Pods • Services • Ingress • ConfigMaps • Secrets • Horizontal Scaling • High Availability",
  },
  {
    title: "GCP / Google Cloud — Conhecimento Técnico",
    items:
      "GKE • Vertex AI • Gemini • Cloud Run • Cloud Storage • Cloud SQL • Pub/Sub • Artifact Registry • IAM • Secret Manager • Cloud Logging / Monitoring",
  },
  {
    title: "Bancos de Dados & BI",
    items:
      "PostgreSQL • MySQL • MongoDB • Oracle • SQL Server • Firebase • Supabase • pgvector • Vector Databases • SQL • Database Modeling • Query Optimization • Data Warehouse • ETL • SSIS • Power BI • Tableau • MicroStrategy",
    note: "Destaque: Semantic Search & Vector Search com PostgreSQL / pgvector",
  },
  {
    title: "Arquitetura",
    items:
      "Software Architecture • Solution Architecture • Distributed Systems • Microservices • REST Architecture • Cloud-Native Architecture • Event-Driven Architecture • API Design • System Integration • Scalability • High Availability • Security • Performance Optimization",
    note: "Technical Leadership • System Design • Requirements Analysis • Technology Definition • Legacy Modernization",
  },
  {
    title: "DevOps / Engenharia",
    items:
      "Git • GitHub / GitLab • Docker • CI/CD • Linux • Nginx • Apache • Containers • Deployment • Monitoring • Logging • Infrastructure • SCRUM",
  },
];

const differentiators = [
  "28 anos de experiência em desenvolvimento de software",
  "Formação internacional — Université de Liège (Bélgica)",
  "Projetos para Microsoft, Cargill, Simpress e grandes corporações",
  "Arquitetura e desenvolvimento de sistemas corporativos, SaaS e ERP",
  "Experiência Full Stack e visão end-to-end de produtos",
  "GenAI aplicada a problemas reais de negócio",
  "Experiência com ERP/CRM, BI e integrações complexas",
  "Inglês e Francês avançados; Espanhol intermediário",
];

const experiences = [
  {
    title: "Desenvolvedor Avançado / Full Stack — CADBR Licitações",
    period: "Jun/2008 — Atual",
    location: "São Paulo, Brasil",
    description:
      "Atuação de longa data na CADBR Licitações no desenvolvimento Full Stack de soluções corporativas de alta complexidade. No ciclo atual (2026), criação de microservices em Go (Golang) e Python (FastAPI), frontend de relatórios em React, backend com Next.js e TanStack, e soluções de GenAI / LLM / RAG com stack poliglota — aplicando TypeScript, Node.js, PHP, Laravel, PostgreSQL/pgvector, Docker, Kubernetes/GCP, APIs REST, Cloud e integrações corporativas. Histórico inclui ERPs, plataformas SaaS, módulos financeiros/operacionais e evolução contínua da arquitetura de software.",
    tech: "Go • Golang • Python • FastAPI • React • Next.js • TanStack • TypeScript • Node.js • PHP • Laravel • GenAI • LLM • RAG • Microservices • REST APIs • PostgreSQL • Docker • Cloud",
  },
  {
    title: "CEO — CADBR Consultoria em Licitações",
    period: "Nov/2016 — Jan/2026",
    location: "São Paulo, Brasil",
    description:
      "Liderança executiva e técnica da consultoria, alinhando estratégia de negócio, definição de arquitetura, desenvolvimento de produtos digitais e entrega de soluções de tecnologia para o ecossistema de licitações e operações corporativas.",
  },
  {
    title: "Diretor Executivo — Certificadora AMF",
    period: "Jan/2015 — Nov/2016",
    location: "São Paulo, Brasil",
    description:
      "Direção executiva e tecnológica da certificadora digital, com responsabilidade sobre produtos, operações e soluções de software associadas à certificação e serviços digitais.",
  },
  {
    title: "Analista de Negócios e Desenvolvedor — Zanthus Tecnologia",
    period: "Fev/2014 — Jan/2015",
    location: "São Paulo, Brasil",
    description:
      "Responsável pelo ciclo do sistema ERP da solução Zanthus, atuando na análise de negócios, desenvolvimento, evolução de módulos e suporte à operação da plataforma.",
  },
  {
    title: "Arquiteto de Softwares Web — Serasa Experian",
    period: "Fev/2013 — Fev/2014",
    location: "São Paulo, Brasil",
    description:
      "Desenvolvimento avançado em PHP, jQuery, MySQL, Oracle e tecnologias proprietárias. Construção de robôs de monitoramento e integração automática com sistemas de pagamento e e-mail. Modelagem OO, SCRUM, processos de carga para Data Warehouse (SSIS), levantamento de requisitos e modelagem multidimensional. Relatórios, dashboards e scorecards com MicroStrategy; administração de bancos MySQL, SQL Server e Oracle; ETL, data mining e KPIs estratégicos.",
    tech: "PHP • jQuery • MySQL • Oracle • SQL Server • SSIS • MicroStrategy • ETL • Data Warehouse • SCRUM",
  },
  {
    title:
      "Engenheiro de Software Web / Mobile — Titans Group Empresa de Participação em Negócios Ltda",
    period: "Mar/2011 — Fev/2013",
    location: "São Paulo, Brasil",
    description:
      "Desenvolvimento avançado de módulos, plugins e widgets (Social Engine, Zend Framework, jQuery, MySQL). Robôs de monitoramento e integrações com pagamento e e-mail. BI com MicroStrategy (relatórios, dashboards, scorecards), ETL/SSIS, modelagem multidimensional, administração de Intelligence Server e bancos (MySQL, SQL Server, Oracle). Implantação de ambiente mobile para acompanhamento de vendas em tempo real (Blackberry, iPhone e iPad).",
    tech: "Zend Framework • PHP • jQuery • MySQL • MicroStrategy • SSIS • SQL Server • Oracle • Mobile BI",
  },
  {
    title: "Analista BI Sênior — Soluções de A-Z",
    period: "Abr/2009 — Jul/2010",
    location: "São Paulo, Brasil",
    description:
      "Atuação em Business Intelligence e soluções digitais para e-commerce / loja virtual, com foco em sistemas, integração de dados e suporte analítico ao negócio.",
  },
  {
    title: "Desenvolvedor PHP Sênior — JEW Informática",
    period: "Dez/2005 — Abr/2009",
    location: "São Paulo, Brasil",
    description:
      "Desenvolvimento e manutenção de features em plataformas PHP/MySQL e ASP/SQL Server. Análise e projeto de relatórios BI para gerência e diretoria. Data Builder / administração avançada de SQL, MySQL e Oracle.",
    tech: "PHP • MySQL • ASP • SQL Server • Oracle • BI",
  },
];

const Curriculum = () => {
  const handlePrint = useCallback(() => {
    window.print();
  }, []);

  return (
    <div className="cv-page min-h-screen bg-slate-100 text-slate-900">
      <div className="cv-toolbar no-print sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-[210mm] items-center justify-between gap-4 px-4 py-3">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition-colors hover:text-slate-900"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar ao site
          </Link>
          <button
            type="button"
            onClick={handlePrint}
            className="inline-flex items-center gap-2 rounded-md bg-sky-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-sky-700"
          >
            <Printer className="h-4 w-4" />
            Imprimir / Salvar PDF
          </button>
        </div>
      </div>

      <main className="cv-sheet mx-auto my-6 max-w-[210mm] bg-white px-8 py-10 shadow-lg print:my-0 print:max-w-none print:px-[14mm] print:py-[12mm] print:shadow-none sm:px-12 sm:py-12">
        <header className="cv-section border-b-2 border-slate-800 pb-5">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-[2rem]">
            Anderson Mautone
          </h1>
          <p className="mt-2 text-[0.95rem] font-semibold leading-snug text-sky-800 sm:text-base">
            Senior Software Architect | AI & GenAI Engineer | Senior Full Stack
            Developer
          </p>
          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[0.8rem] text-slate-600">
            <span>São Paulo, Brasil</span>
            <span className="hidden sm:inline print:inline">•</span>
            <a
              href="mailto:contato@mautone.com.br"
              className="hover:text-sky-700"
            >
              contato@mautone.com.br
            </a>
            <span className="hidden sm:inline print:inline">•</span>
            <span>+55 (11) 9.8440-1158</span>
            <span className="hidden sm:inline print:inline">•</span>
            <span>mautone.com.br</span>
            <span className="hidden sm:inline print:inline">•</span>
            <a
              href="https://www.linkedin.com/in/anderson-mautone-a005b9a/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-sky-700"
            >
              LinkedIn
            </a>
          </div>
        </header>

        <section className="cv-section mt-6">
          <h2 className="cv-heading">Resumo Profissional</h2>
          <div className="space-y-2.5 text-[0.82rem] leading-relaxed text-slate-700">
            <p>
              Desenvolvedor e Arquiteto de Softwares Web com 28 anos de
              experiência em criação de soluções corporativas, sistemas SaaS,
              ERPs, Business Intelligence e integração de dados complexos.
              Formação e experiência profissional internacional na Europa
              (Université de Liège — Bélgica). Especialista em Software
              Architecture, Solution Architecture, Full Stack, APIs, Cloud e
              infraestrutura.
            </p>
            <p>
              Ao longo da carreira, atuou em projetos de grande porte para
              empresas como Microsoft, Cargill Agrícola, Simpress Logísticas,
              CADBRASIL, Global Nexus Latam Group e Studio Business Tramontano,
              entregando sistemas robustos, escaláveis e eficientes — do
              planejamento à implementação.
            </p>
            <p>
              Experiência no desenvolvimento e evolução de ERP, CRM e plataformas
              corporativas de alta complexidade, integrando módulos financeiros,
              logísticos e operacionais. Projetos de BI e Data Analytics com
              dashboards, relatórios estratégicos e pipelines de dados (ETL / Data
              Warehouse).
            </p>
            <p>
              Nos últimos anos, atuação focada em Artificial Intelligence,
              Generative AI (GenAI), integração de LLMs, RAG, AI Agents,
              embeddings, bancos vetoriais (Vector Database), tool/function
              calling, automações e integração de IA com sistemas corporativos —
              combinando engenharia de software tradicional, Cloud, APIs,
              containers (Docker / Kubernetes) e Inteligência Artificial.
            </p>
          </div>
        </section>

        <section className="cv-section mt-5">
          <h2 className="cv-heading">Diferenciais</h2>
          <ul className="grid gap-1 text-[0.82rem] text-slate-700 sm:grid-cols-2 print:grid-cols-2">
            {differentiators.map((item) => (
              <li key={item} className="flex gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-sky-700" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="cv-section mt-5">
          <h2 className="cv-heading">Experiência Profissional</h2>
          {experiences.map((job) => (
            <article key={job.title + job.period} className="cv-avoid-break mt-3.5">
              <div className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between">
                <h3 className="text-[0.88rem] font-bold text-slate-900">
                  {job.title}
                </h3>
                <span className="shrink-0 text-[0.75rem] font-medium text-slate-500">
                  {job.period}
                </span>
              </div>
              {job.location ? (
                <p className="text-[0.72rem] text-slate-500">{job.location}</p>
              ) : null}
              <p className="mt-1 text-[0.8rem] leading-relaxed text-slate-700">
                {job.description}
              </p>
              {job.tech ? (
                <p className="mt-1 text-[0.72rem] text-slate-600">
                  <span className="font-semibold text-slate-700">
                    Tecnologias:
                  </span>{" "}
                  {job.tech}
                </p>
              ) : null}
            </article>
          ))}
        </section>

        <section className="cv-section mt-5">
          <h2 className="cv-heading">Projetos Relevantes</h2>

          <article className="cv-avoid-break mt-3">
            <div className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between">
              <h3 className="text-[0.9rem] font-bold text-slate-900">
                CADBRASIL — Hybrid Search avançado com RAG e n8n
              </h3>
              <span className="text-[0.75rem] font-medium text-slate-500">
                GenAI · Hybrid Search
              </span>
            </div>
            <p className="mt-1.5 text-[0.82rem] leading-relaxed text-slate-700">
              Projeto de busca híbrida avançada para a CADBRASIL, combinando
              Semantic Search (embeddings) e retrieval tradicional, pipeline RAG
              e automações em n8n. A solução permite consultar bases documentais
              corporativas e produzir respostas contextualizadas, com integração
              de LLMs, Go, Python e MongoDB no ecossistema de dados.
            </p>
            <p className="mt-1.5 text-[0.75rem] text-slate-600">
              <span className="font-semibold text-slate-700">Tecnologias:</span>{" "}
              Hybrid Search • RAG • n8n • Embeddings • Semantic Search • Python •
              Go • MongoDB • LLM
            </p>
          </article>

          <article className="cv-avoid-break mt-4">
            <div className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between">
              <h3 className="text-[0.9rem] font-bold text-slate-900">
                Plataforma RAG / Inteligência Artificial Corporativa
              </h3>
              <span className="text-[0.75rem] font-medium text-slate-500">
                GenAI · Arquitetura & Desenvolvimento
              </span>
            </div>
            <p className="mt-1.5 text-[0.82rem] leading-relaxed text-slate-700">
              Arquitetura e desenvolvimento de solução de IA Generativa baseada
              em RAG, permitindo que assistentes de IA consultem bases
              documentais corporativas e produzam respostas contextualizadas.
              Implementação de pipeline de processamento documental, chunking,
              geração de embeddings, armazenamento vetorial com PostgreSQL /
              pgvector, busca semântica (Semantic Search / Vector Search) e
              integração com LLMs. Desenvolvimento de automações e integração da
              camada de IA com APIs e sistemas corporativos.
            </p>
            <p className="mt-1.5 text-[0.75rem] text-slate-600">
              <span className="font-semibold text-slate-700">Tecnologias:</span>{" "}
              GenAI • LLM • RAG • Embeddings • PostgreSQL • pgvector • Supabase •
              APIs • Vector Search • Semantic Search • Automation
            </p>
          </article>

          <article className="cv-avoid-break mt-4">
            <div className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between">
              <h3 className="text-[0.9rem] font-bold text-slate-900">
                Arquitetura e Desenvolvimento de ERP/CRM Corporativo
              </h3>
              <span className="text-[0.75rem] font-medium text-slate-500">
                Grupo Sorrisos · Odontologia
              </span>
            </div>
            <p className="mt-1.5 text-[0.82rem] leading-relaxed text-slate-700">
              Atuação no desenvolvimento e evolução de plataforma completa de ERP
              e CRM para o Grupo Sorrisos, no segmento odontológico, envolvendo
              Software Architecture, regras de negócio, módulos corporativos,
              REST APIs, integrações, banco de dados, frontend e backend.
              Participação em todo o ciclo de desenvolvimento e evolução da
              plataforma — System Design, Requirements Analysis e Legacy
              Modernization.
            </p>
          </article>
        </section>

        <section className="cv-section mt-5">
          <h2 className="cv-heading">Formação Acadêmica</h2>
          <article className="cv-avoid-break mt-2">
            <div className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between">
              <h3 className="text-[0.88rem] font-bold text-slate-900">
                ULg – Université de Liège (Bélgica)
              </h3>
              <span className="text-[0.75rem] font-medium text-slate-500">
                2000 — 2004
              </span>
            </div>
            <p className="mt-1 text-[0.8rem] text-slate-700">
              Arquitetura de Softwares e Processos — Bacharel em Arquitetura de
              Sistemas / Software Technology.
            </p>
          </article>
        </section>

        <section className="cv-section mt-5">
          <h2 className="cv-heading">Idiomas</h2>
          <ul className="mt-1 grid gap-1 text-[0.82rem] text-slate-700 sm:grid-cols-3 print:grid-cols-3">
            <li>
              <span className="font-semibold">Inglês</span> — Avançado
            </li>
            <li>
              <span className="font-semibold">Francês</span> — Avançado
            </li>
            <li>
              <span className="font-semibold">Espanhol</span> — Básico a
              intermediário
            </li>
          </ul>
        </section>

        <section className="cv-section mt-5">
          <h2 className="cv-heading">Competências Técnicas</h2>
          <div className="mt-2 space-y-3">
            {skillBlocks.map((block) => (
              <div key={block.title} className="cv-avoid-break">
                <h3 className="text-[0.82rem] font-bold text-slate-900">
                  {block.title}
                </h3>
                <p className="mt-0.5 text-[0.78rem] leading-relaxed text-slate-700">
                  {block.items}
                </p>
                {block.note ? (
                  <p className="mt-0.5 text-[0.75rem] italic leading-relaxed text-slate-600">
                    {block.note}
                  </p>
                ) : null}
              </div>
            ))}
          </div>
        </section>

        <section className="cv-section mt-5 border-t border-slate-200 pt-4">
          <h2 className="cv-heading">Palavras-chave</h2>
          <p className="text-[0.72rem] leading-relaxed text-slate-500">
            Artificial Intelligence • Generative AI • GenAI • LLM • RAG • AI
            Agents • Python • FastAPI • Go • Golang • GCP • Google Cloud • Vertex
            AI • Gemini • Kubernetes • GKE • Docker • Microservices • REST API •
            GraphQL • PostgreSQL • pgvector • Vector Database • React • Next.js •
            TypeScript • Node.js • PHP • Laravel • Oracle • Power BI • ETL • Data
            Warehouse • Software Architecture • Solution Architecture • Cloud
            Architecture • SaaS • ERP • Business Intelligence
          </p>
        </section>
      </main>

      <p className="no-print mx-auto max-w-[210mm] px-4 pb-8 text-center text-xs text-slate-500">
        Dica: use o botão acima e escolha &quot;Salvar como PDF&quot; nas opções
        de impressão do navegador (margens padrão / A4). Conteúdo alinhado ao
        perfil LinkedIn.
      </p>
    </div>
  );
};

export default Curriculum;
