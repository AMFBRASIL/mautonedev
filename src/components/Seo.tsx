import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const SITE = "https://mautone.com.br";

const pages: Record<
  string,
  { title: string; description: string; path: string }
> = {
  "/": {
    title:
      "Anderson Mautone | Software Architect, GenAI Engineer e Full Stack",
    description:
      "Senior Software Architect, AI & GenAI Engineer e Senior Full Stack Developer. RAG, Hybrid Search, embeddings, AI Agents, n8n, Go, Python, MongoDB e integração de IA em sistemas corporativos. 28 anos de experiência.",
    path: "/",
  },
  "/curriculo": {
    title: "Currículo | Anderson Mautone — Architect, GenAI e Full Stack",
    description:
      "Currículo de Anderson Mautone: Software Architect, GenAI Engineer, RAG, Hybrid Search, n8n, AI Agents, Go, Python, PostgreSQL/pgvector e Full Stack.",
    path: "/curriculo",
  },
};

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
  const page = pages[pathname] ?? pages["/"];
  const url = `${SITE}${page.path}`;

  useEffect(() => {
    document.title = page.title;
    document.documentElement.lang = "pt-BR";
    upsertMeta("name", "description", page.description);
    upsertMeta(
      "name",
      "keywords",
      "Anderson Mautone, Software Architect, GenAI Engineer, RAG, Hybrid Search, embeddings, AI Agents, n8n, Go, Golang, Python, FastAPI, MongoDB, PostgreSQL, pgvector, Semantic Search, Vector Search, Next.js, React, Full Stack, CADBRASIL"
    );
    upsertMeta("name", "author", "Anderson Mautone");
    upsertMeta("name", "robots", "index, follow, max-image-preview:large");
    upsertMeta("property", "og:title", page.title);
    upsertMeta("property", "og:description", page.description);
    upsertMeta("property", "og:url", url);
    upsertMeta("property", "og:locale", "pt_BR");
    upsertMeta("name", "twitter:title", page.title);
    upsertMeta("name", "twitter:description", page.description);
    upsertLink("canonical", url);
  }, [page.description, page.title, url]);

  return null;
};

export default Seo;
