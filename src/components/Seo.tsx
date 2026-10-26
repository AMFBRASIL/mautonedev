import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getArticle, knowledgeHub } from "@/data/knowledge";

const SITE = "https://mautone.com.br";

const pages: Record<
  string,
  { title: string; description: string; path: string; keywords?: string }
> = {
  "/": {
    title:
      "Express Dev | Desenvolvimento de software e GenAI para empresas",
    description:
      "Express Dev — desenvolvimento sob medida, arquitetura, APIs, ERP/CRM e GenAI (RAG, Hybrid Search, AI Agents, n8n). Go, Python, React e Full Stack para a sua empresa. Liderado por Anderson Mautone.",
    path: "/",
  },
  "/curriculo": {
    title: "Currículo | Anderson Mautone — Architect, GenAI e Full Stack",
    description:
      "Currículo de Anderson Mautone: Software Architect, GenAI Engineer, RAG, Hybrid Search, n8n, AI Agents, Go, Python, PostgreSQL/pgvector e Full Stack.",
    path: "/curriculo",
  },
  [knowledgeHub.path]: {
    title: knowledgeHub.title,
    description: knowledgeHub.description,
    path: knowledgeHub.path,
    keywords: knowledgeHub.keywords,
  },
};

const defaultKeywords =
  "Express Dev, desenvolvimento de software, GenAI, RAG, Hybrid Search, AI Agents, n8n, Go, Golang, Python, FastAPI, React, Next.js, ERP, CRM, Anderson Mautone, software para empresas";

function resolvePage(pathname: string) {
  if (pages[pathname]) return pages[pathname];
  if (pathname.startsWith("/conhecimentos/")) {
    const slug = pathname.split("/")[2];
    const article = getArticle(slug);
    if (article) {
      return {
        title: article.seoTitle,
        description: article.description,
        path: `/conhecimentos/${article.slug}`,
        keywords: article.keywords,
      };
    }
  }
  return pages["/"];
}

function upsertMeta(attr: "name" | "property", key: string, content: string) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function upsertLink(rel: string, href: string) {
  let el = document.head.querySelector(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

const Seo = () => {
  const { pathname } = useLocation();
  const page = resolvePage(pathname);
  const url = `${SITE}${page.path}`;

  useEffect(() => {
    document.title = page.title;
    document.documentElement.lang = "pt-BR";
    upsertMeta("name", "description", page.description);
    upsertMeta("name", "keywords", page.keywords ?? defaultKeywords);
    upsertMeta("name", "author", "Anderson Mautone");
    upsertMeta("name", "robots", "index, follow, max-image-preview:large");
    upsertMeta("name", "ai-content-declaration", "human-authored technical documentation");
    upsertMeta("property", "og:title", page.title);
    upsertMeta("property", "og:description", page.description);
    upsertMeta("property", "og:url", url);
    upsertMeta("property", "og:type", pathname === "/" ? "website" : "article");
    upsertMeta("property", "og:locale", "pt_BR");
    upsertMeta("name", "twitter:title", page.title);
    upsertMeta("name", "twitter:description", page.description);
    upsertLink("canonical", url);
    upsertLink("alternate", url);
  }, [page, pathname, url]);

  return null;
};

export default Seo;
