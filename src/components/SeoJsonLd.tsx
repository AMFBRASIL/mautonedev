const personJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://mautone.com.br/#person",
      name: "Anderson Mautone",
      url: "https://mautone.com.br/",
      image: "https://mautone.com.br/profile.jpg",
      jobTitle: "Senior Software Architect | AI & GenAI Engineer | Senior Full Stack Developer",
      description:
        "Arquiteto de software e engenheiro de GenAI com 28 anos de experiência. Especialista em RAG, Hybrid Search, embeddings, AI Agents, n8n, Go, Python, MongoDB e integração de IA em sistemas corporativos.",
      email: "mailto:contato@mautone.com.br",
      telephone: "+55-11-98440-1158",
      address: {
        "@type": "PostalAddress",
        addressLocality: "São Paulo",
        addressCountry: "BR",
      },
      sameAs: ["https://www.linkedin.com/in/anderson-mautone-a005b9a/"],
      knowsAbout: [
        "Retrieval Augmented Generation",
        "Hybrid Search",
        "Semantic Search",
        "Embeddings",
        "AI Agents",
        "n8n",
        "Generative AI",
        "Go",
        "Python",
        "MongoDB",
        "PostgreSQL",
        "pgvector",
        "React",
        "Next.js",
        "Software Architecture",
      ],
      knowsLanguage: ["Portuguese", "English", "French", "Spanish"],
      alumniOf: {
        "@type": "CollegeOrUniversity",
        name: "Université de Liège",
      },
    },
    {
      "@type": "ProfessionalService",
      "@id": "https://mautone.com.br/#service",
      name: "Anderson Mautone — Arquitetura de Software e GenAI",
      url: "https://mautone.com.br/",
      areaServed: "BR",
      serviceType: [
        "Software Architecture",
        "Generative AI",
        "RAG platforms",
        "Hybrid Search",
        "AI Agents",
        "Full Stack Development",
      ],
      provider: { "@id": "https://mautone.com.br/#person" },
    },
    {
      "@type": "WebSite",
      "@id": "https://mautone.com.br/#website",
      url: "https://mautone.com.br/",
      name: "Anderson Mautone",
      inLanguage: "pt-BR",
      publisher: { "@id": "https://mautone.com.br/#person" },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Quais tecnologias de IA Anderson Mautone utiliza?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "RAG, Hybrid Search, Semantic Search, embeddings, Vector Databases, AI Agents, tool/function calling, n8n, integração com LLMs (OpenAI, Gemini, Claude), Go, Python/FastAPI, MongoDB e PostgreSQL/pgvector.",
          },
        },
        {
          "@type": "Question",
          name: "Qual projeto de Hybrid Search foi desenvolvido para a CADBRASIL?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Plataforma de Hybrid Search avançado combinando busca semântica (embeddings) e busca tradicional, com pipeline RAG e automações em n8n para consultar bases documentais e produzir respostas contextualizadas.",
          },
        },
      ],
    },
  ],
};

const SeoJsonLd = () => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
  />
);

export default SeoJsonLd;
