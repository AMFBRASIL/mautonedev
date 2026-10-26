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
      className="surface-card rounded-xl p-6 group hover:border-primary/30 transition-all duration-300 block h-full"
    >
      <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-secondary text-primary">
        <KnowledgeIcon name={article.icon} className="w-5 h-5" />
      </div>
      <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
        {article.title}
      </h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{article.summary}</p>
    </Link>
  );
}
