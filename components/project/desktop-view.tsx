import { Github, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BreakpointGate, DESKTOP_QUERY } from "./breakpoint-gate";
import type { ProjectViewProps } from "./types";

function YoutubeEmbed({ id, title }: { id: string; title: string }) {
  return (
    <div className="relative w-full aspect-video rounded-xl overflow-hidden border shadow-lg">
      <BreakpointGate query={DESKTOP_QUERY}>
        <iframe
          className="w-full h-full"
          src={`https://www.youtube.com/embed/${id}`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </BreakpointGate>
    </div>
  );
}

export function DesktopProjectView({ project, link, repo }: ProjectViewProps) {
  return (
    <section className="max-w-5xl mx-auto px-6 py-8 grow w-full">
      <div className="space-y-6">
        <div className="space-y-4">
          <h1 className="text-5xl font-bold tracking-tight">{project.title}</h1>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        {link.type === "youtube" && (
          <div className="space-y-4">
            <YoutubeEmbed id={link.value} title={project.title} />

            {(link.githubRepo || link.liveUrl) && (
              <div className="flex items-center justify-center gap-3 flex-wrap">
                {link.liveUrl && (
                  <Button asChild size="lg">
                    <a
                      href={link.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="gap-2"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Visit Live Site
                    </a>
                  </Button>
                )}
                {link.githubRepo && (
                  <Button asChild variant="outline" size="lg">
                    <a
                      href={link.githubRepo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="gap-2"
                    >
                      <Github className="w-5 h-5" />
                      View Source Code on GitHub
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </Button>
                )}
              </div>
            )}
          </div>
        )}

        {link.type === "github" && repo && (
          <div className="space-y-4">
            <div className="flex items-center justify-between gap-4 p-4 rounded-lg border bg-muted/50">
              <div className="flex items-center gap-3 min-w-0">
                <Github className="w-5 h-5 shrink-0" />
                <span className="font-mono text-sm truncate">{repo}</span>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                {link.liveUrl && (
                  <Button asChild size="sm">
                    <a
                      href={link.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="gap-2"
                    >
                      <ExternalLink className="w-3 h-3" />
                      Visit Live Site
                    </a>
                  </Button>
                )}
                <Button asChild variant="outline" size="sm">
                  <a
                    href={link.value}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="gap-2"
                  >
                    Open in GitHub
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </Button>
              </div>
            </div>

            <div
              className="relative w-full rounded-xl overflow-hidden border shadow-lg bg-card"
              style={{ height: "700px" }}
            >
              <BreakpointGate query={DESKTOP_QUERY}>
                <iframe
                  className="w-full h-full"
                  src={`https://github1s.com/${repo}`}
                  title={project.title}
                  style={{ border: "none" }}
                />
              </BreakpointGate>
            </div>

            <p className="text-sm text-muted-foreground text-center">
              Browse the code above with VS Code interface, or{" "}
              <a
                href={link.value}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                open in GitHub
              </a>
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
