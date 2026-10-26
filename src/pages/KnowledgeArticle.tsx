import { Navigate, useParams, Link } from "react-router-dom";
import KnowledgeLayout from "@/components/KnowledgeLayout";
import { KnowledgeIcon } from "@/components/KnowledgeCard";
import { getArticle, knowledgeArticles } from "@/data/knowledge";

const SITE = "https://mautone.com.br";

const KnowledgeArticle = () => {
  const { slug } = useParams();
  const article = slug ? getArticle(slug) : undefined;

  if (!article) {
    return <Navigate to="/conhecimentos" replace />;
  }

  const url = `${SITE}/conhecimentos/${article.slug}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TechArticle",
        headline: article.title,
        description: article.description,
        dateModified: article.updated,
        inLanguage: "pt-BR",
        author: {
          "@type": "Person",
          name: "Anderson Mautone",
          url: SITE,
        },
        publisher: {
          "@type": "Person",
          name: "Anderson Mautone",
          url: SITE,
        },
        keywords: article.keywords,
        url,
        mainEntityOfPage: url,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE },
          {
            "@type": "ListItem",
            position: 2,
            name: "Conhecimentos",
            item: `${SITE}/conhecimentos`,
          },
          { "@type": "ListItem", position: 3, name: article.title, item: url },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: article.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
      },
    ],
  };

  const related = knowledgeArticles.filter((item) => item.slug !== article.slug);

  return (
    <KnowledgeLayout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article>
        <header className="mb-10">
          <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-secondary text-primary">
            <KnowledgeIcon name={article.icon} className="w-6 h-6" />
          </div>
          <p className="text-sm uppercase tracking-[0.16em] text-primary mb-2">
            Conhecimento técnico
          </p>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{article.title}</h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {article.summary}
          </p>
          <p className="text-xs text-muted-foreground mt-3">
            Atualizado em {article.updated} · Anderson Mautone
          </p>
        </header>

        {article.sections.map((section) => (
          <section key={section.heading} className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">{section.heading}</h2>
            {section.paragraphs.map((paragraph) => (
              <p
                key={paragraph.slice(0, 48)}
                className="text-muted-foreground leading-relaxed mb-4"
              >
                {paragraph}
              </p>
            ))}
            {section.bullets ? (
              <ul className="space-y-2 mb-4">
                {section.bullets.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 text-muted-foreground leading-relaxed"
                  >
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            ) : null}
          </section>
        ))}

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Perguntas frequentes</h2>
          <div className="space-y-4">
            {article.faqs.map((faq) => (
              <div key={faq.question} className="surface-card rounded-xl p-5">
                <h3 className="font-semibold mb-2">{faq.question}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">Continue lendo</h2>
          <div className="flex flex-wrap gap-3">
            {related.map((item) => (
              <Link
                key={item.slug}
                to={`/conhecimentos/${item.slug}`}
                className="surface-card px-4 py-2 rounded-md text-sm text-muted-foreground hover:text-primary"
              >
                {item.title}
              </Link>
            ))}
          </div>
        </section>
      </article>
    </KnowledgeLayout>
  );
};

export default KnowledgeArticle;
