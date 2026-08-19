import { Link } from "react-router-dom";
import {
  Brain,
  Search,
  Combine,
  Code2,
  Workflow,
  Building2,
  type LucideIcon,
} from "lucide-react";
import type { KnowledgeArticle } from "@/data/knowledge";

const iconMap: Record<KnowledgeArticle["icon"], LucideIcon> = {
  brain: Brain,
  search: Search,
  hybrid: Combine,
  code: Code2,
  workflow: Workflow,
  building: Building2,
};

export function KnowledgeIcon({
  name,
  className = "w-6 h-6",
}: {
  name: KnowledgeArticle["icon"];
  className?: string;
}) {
  const Icon = iconMap[name];
  return <Icon className={className} />;
}

export function KnowledgeCard({ article }: { article: KnowledgeArticle }) {
  return (
    <Link
      to={`/conhecimentos/${article.slug}`}
      className="glass rounded-xl p-6 group hover:border-primary/50 transition-all duration-300 block h-full"
    >
      <div
        className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
        style={{ background: "var(--gradient-primary)" }}
      >
        <KnowledgeIcon name={article.icon} className="w-6 h-6 text-primary-foreground" />
      </div>
      <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
        {article.title}
      </h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{article.summary}</p>
    </Link>
  );
}
