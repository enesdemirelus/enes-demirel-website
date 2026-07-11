"use client";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Github, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { projects, projectLinks } from "@/lib/projects";

function ProjectPage() {
  const params = useParams();
  const router = useRouter();
  const projectSlug = params.project as string;
  const projectData = projects.find((p) => p.slug === projectSlug);
  const projectLink = projectLinks[projectSlug];

  useEffect(() => {
    if (projectLink?.type === "redirect") {
      router.push(projectLink.value);
    }
  }, [projectLink, router]);

  if (!projectData || !projectLink) {
    return (
      <section className="max-w-5xl mx-auto px-6 py-8 grow w-full">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Project not found</h1>
          <Link href="/projects" className="text-primary hover:underline">
            Back to projects
          </Link>
        </div>
      </section>
    );
  }

  if (projectLink.type === "redirect") {
    return (
      <div className="grow flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground">Redirecting...</p>
        </div>
      </div>
    );
  }

  return (
    <section className="max-w-5xl mx-auto px-6 py-8 grow w-full">
      <div className="space-y-6">
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            {projectData.title}
          </h1>
          <div className="flex flex-wrap gap-2">
            {projectData.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        {projectLink.type === "youtube" && (
          <div className="space-y-4">
            <div className="relative w-full aspect-video rounded-xl overflow-hidden border shadow-lg">
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${projectLink.value}`}
                title={projectData.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>

            {(projectLink.githubRepo || projectLink.liveUrl) && (
              <div className="flex items-center justify-center gap-3 flex-wrap">
                {projectLink.liveUrl && (
                  <Button asChild size="lg">
                    <a
                      href={projectLink.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="gap-2"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Visit Live Site
                    </a>
                  </Button>
                )}
                {projectLink.githubRepo && (
                  <Button asChild variant="outline" size="lg">
                    <a
                      href={projectLink.githubRepo}
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

        {projectLink.type === "github" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-lg border bg-muted/50">
              <div className="flex items-center gap-3">
                <Github className="w-5 h-5" />
                <span className="font-mono text-sm">
                  {projectLink.value.replace("https://github.com/", "")}
                </span>
              </div>
              <div className="flex items-center gap-2">
                {projectLink.liveUrl && (
                  <Button asChild size="sm">
                    <a
                      href={projectLink.liveUrl}
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
                    href={projectLink.value}
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
              <iframe
                className="w-full h-full"
                src={`https://github1s.com/${projectLink.value.replace("https://github.com/", "")}`}
                title={projectData.title}
                style={{ border: "none" }}
              />
            </div>

            <p className="text-sm text-muted-foreground text-center">
              Browse the code above with VS Code interface, or{" "}
              <a
                href={projectLink.value}
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

export default ProjectPage;
