"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Terminal, ArrowLeft, ArrowUpRight } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Project {
  emoji: string;
  title: string;
  description: string;
  tags: string[];
  slug: string;
}

const projects: Project[] = [
  {
    emoji: "🎮",
    title: "game hub",
    description:
      "multiplayer gaming platform with real-time matchmaking, player statistics tracking, and integrated voice chat. features custom game modes and tournament support.",
    tags: ["react", "node.js", "socket.io", "mongodb", "redis"],
    slug: "game-hub",
  },
];

import { ModeToggle } from "@/components/mode-toggle";

export default function Projects() {
  return (
    <div className="min-h-screen">
      <div className="fixed inset-0 -z-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

      <header className="border-b">
        <nav className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2 font-mono text-sm hover:opacity-80 transition-opacity">
            <Terminal className="w-4 h-4" />
            <span>enesdemirel</span>
          </Link>
          <div className="flex gap-6 text-sm items-center">
            <Link href="/#projects" className="hover:underline">
              projects
            </Link>
            <Link href="/#about" className="hover:underline">
              about
            </Link>
            <Link href="/#contact" className="hover:underline">
              contact
            </Link>
            <ModeToggle />
          </div>
        </nav>
      </header>

      <section className="max-w-5xl mx-auto px-6 py-8">
        <div className="space-y-8">
          <div>
            <h1 className="text-4xl font-bold mb-4">all projects</h1>
            <p className="text-muted-foreground">
              collection of my projects and experiments
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 pt-8">
            {projects.map((project) => (
              <Link
                key={project.title}
                href={`/projects/${project.slug}`}
                className="group"
              >
                <Card className="h-full transition-all hover:shadow-lg hover:border-foreground/20">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="text-3xl">{project.emoji}</div>
                      <ArrowUpRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <CardTitle className="text-xl">{project.title}</CardTitle>
                    <CardDescription className="line-clamp-3">
                      {project.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <Badge key={tag} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t mt-8">
        <div className="max-w-5xl mx-auto px-6 py-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4" />
              <span>© {new Date().getFullYear()} enes demirel</span>
            </div>
            <p className="font-mono text-xs">
              you should really watch person of interest.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
