import Link from "next/link";
import {
  ArrowLeft,
  BookOpen,
  Clock,
  ExternalLink,
  Github,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ReadmeMarkdown } from "@/components/readme-markdown";
import { formatDate } from "@/lib/utils";
import { BreakpointGate, MOBILE_QUERY } from "./breakpoint-gate";
import type { ProjectViewProps } from "./types";

// The page already shows the project title, so drop a README's leading H1.
function stripLeadingTitle(markdown: string): string {
  return markdown.replace(/^\s*#\s+[^\n]*\n+/, "");
}

export function MobileProjectView({
  project,
  link,
  repoUrl,
  repo,
  info,
  readme,
}: ProjectViewProps) {
  const [owner, name] = repo?.split("/") ?? [];
  const hasActions = Boolean(repoUrl || link.liveUrl);

  return (
    <section className="w-full grow flex flex-col">
      <div className="px-4 pt-4 pb-8 space-y-6 grow">
        <Link
          href="/projects"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground"
        >
          <ArrowLeft className="w-4 h-4" />
          projects
        </Link>

        <header className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 shrink-0 rounded-xl border bg-muted/50 flex items-center justify-center text-2xl">
              {project.logo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={project.logo} alt="" className="w-8 h-8 object-contain" />
              ) : (
                project.emoji || <Github className="w-6 h-6" />
              )}
            </div>
            <h1 className="text-2xl font-bold tracking-tight leading-tight">
              {project.title}
            </h1>
          </div>
          <p className="text-[15px] leading-relaxed text-muted-foreground">
            {project.description}
          </p>
        </header>

        {/* One swipeable row instead of wrapping onto several lines. */}
        <div className="-mx-4 px-4 flex gap-2 overflow-x-auto no-scrollbar">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="shrink-0 rounded-full border bg-muted/40 px-3 py-1 text-xs font-medium"
            >
              {tag}
            </span>
          ))}
        </div>

        {link.type === "youtube" && (
          <div className="-mx-4 aspect-video bg-muted">
            <BreakpointGate query={MOBILE_QUERY}>
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${link.value}`}
                title={project.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </BreakpointGate>
          </div>
        )}

        {repo && (
          <div className="rounded-xl border divide-y text-sm">
            <div className="flex items-center gap-2 px-4 py-3 min-w-0 font-mono">
              <Github className="w-4 h-4 shrink-0" />
              <span className="truncate">
                <span className="text-muted-foreground">{owner}/</span>
                <span className="font-semibold">{name}</span>
              </span>
            </div>
            {info && (
              <div className="grid grid-cols-3 divide-x text-center">
                <div className="py-3 px-2 min-w-0">
                  <div className="text-[11px] uppercase tracking-wide text-muted-foreground">
                    language
                  </div>
                  <div className="font-medium truncate">
                    {info.language ?? "—"}
                  </div>
                </div>
                <div className="py-3 px-2">
                  <div className="text-[11px] uppercase tracking-wide text-muted-foreground">
                    stars
                  </div>
                  <div className="font-medium flex items-center justify-center gap-1">
                    <Star className="w-3.5 h-3.5" />
                    {info.stars}
                  </div>
                </div>
                <div className="py-3 px-2 min-w-0">
                  <div className="text-[11px] uppercase tracking-wide text-muted-foreground">
                    updated
                  </div>
                  <div className="font-medium flex items-center justify-center gap-1 truncate">
                    <Clock className="w-3.5 h-3.5 shrink-0" />
                    {formatDate(info.pushedAt).replace(/, \d{4}$/, "")}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {readme && repo && (
          <div className="space-y-3">
            <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              <BookOpen className="w-4 h-4" />
              about this project
            </h2>
            <article className="blog-content readme-content text-[15px]">
              <ReadmeMarkdown
                repo={repo}
                branch={info?.defaultBranch ?? "main"}
              >
                {stripLeadingTitle(readme)}
              </ReadmeMarkdown>
            </article>
          </div>
        )}
      </div>

      {/* Thumb-reachable actions, pinned while scrolling the project. */}
      {hasActions && (
        <div className="sticky bottom-0 z-10 border-t bg-background/85 backdrop-blur-md px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
          <div className="flex gap-2">
            {repoUrl && (
              <Button
                asChild
                size="lg"
                variant={link.liveUrl ? "outline" : "default"}
                className="flex-1"
              >
                <a href={repoUrl} target="_blank" rel="noopener noreferrer">
                  <Github className="w-4 h-4" />
                  GitHub
                </a>
              </Button>
            )}
            {link.liveUrl && (
              <Button asChild size="lg" className="flex-1">
                <a href={link.liveUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4" />
                  Live site
                </a>
              </Button>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
