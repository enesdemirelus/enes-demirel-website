import Link from "next/link";
import Image from "next/image";
import { projects } from "@/lib/projects";

export function ProjectTicker() {
  const items = [...projects, ...projects];

  return (
    <div className="max-w-5xl mx-auto px-6 pt-6">
      <div className="ticker flex items-stretch border bg-muted/30 shadow-sm overflow-hidden">
        <Link
          href="/projects"
          className="shrink-0 flex items-center px-6 py-3 border-r bg-card font-mono text-xs uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors"
        >
          my projects
        </Link>

        <div className="relative flex-1 overflow-hidden">
          <div className="flex w-max animate-marquee">
            {items.map((project, i) => (
              <span key={`${project.slug}-${i}`} className="flex items-center">
                <Link
                  href={`/projects/${project.slug}`}
                  className="flex items-center px-4 py-3 text-sm whitespace-nowrap hover:text-primary transition-colors"
                >
                  {project.logo ? (
                    <Image
                      src={project.logo}
                      alt=""
                      width={16}
                      height={16}
                      className="mr-1.5 rounded-sm object-contain"
                    />
                  ) : (
                    <span className="mr-1.5">{project.emoji}</span>
                  )}
                  <span className="capitalize">{project.title}</span>
                </Link>
                <span className="text-muted-foreground/40">•</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
