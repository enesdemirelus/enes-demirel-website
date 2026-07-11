"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Github, Youtube } from "lucide-react";
import { useState } from "react";
import { CATEGORIES, projects } from "@/lib/projects";

export default function Projects() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category],
    );
  };

  const filteredProjects =
    selectedCategories.length === 0
      ? projects
      : projects.filter((project) =>
          selectedCategories.every((category) =>
            project.categories.includes(category),
          ),
        );

  return (
    <section className="max-w-5xl mx-auto px-6 py-8 grow w-full">
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold mb-4">all projects</h1>
          <p className="text-muted-foreground">collection of my projects</p>
        </div>

        <div>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={(e) => {
                  e.preventDefault();
                  toggleCategory(category);
                }}
                type="button"
                className={`px-2.5 py-1 text-xs font-medium rounded-md border transition-all whitespace-nowrap ${
                  selectedCategories.includes(category)
                    ? "bg-foreground text-background border-foreground"
                    : "bg-background border-border hover:border-foreground/40"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="text-xs text-muted-foreground mt-2">
            {filteredProjects.length} project
            {filteredProjects.length !== 1 ? "s" : ""}
            {selectedCategories.length > 0 && (
              <span className="ml-1.5">({selectedCategories.join(" + ")})</span>
            )}
          </div>
        </div>

        <div className="min-h-[400px]">
          {filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredProjects.map((project) => (
                <Link
                  key={project.title}
                  href={`/projects/${project.slug}`}
                  className="group block h-full"
                >
                  <div className="border rounded-lg p-4 transition-all hover:border-foreground/40 hover:shadow-md bg-background/50 backdrop-blur-sm h-full flex flex-col">
                    <div className="flex items-start justify-between mb-3">
                      {project.logo ? (
                        <Image
                          src={project.logo}
                          alt={project.title}
                          width={36}
                          height={36}
                          className="rounded-sm object-contain"
                        />
                      ) : (
                        <div className="text-3xl">{project.emoji}</div>
                      )}
                      <ArrowUpRight className="w-4 h-4 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>

                    <h3 className="text-lg font-bold mb-2 group-hover:text-foreground/80 transition-colors">
                      {project.title}
                    </h3>

                    <p className="text-xs text-muted-foreground leading-relaxed mb-4 flex-grow">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 text-[10px] font-medium bg-secondary text-secondary-foreground rounded-full whitespace-nowrap inline-block"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              ))}

              <div className="border-dashed border-2 rounded-lg p-4 bg-background/50 backdrop-blur-sm h-full flex flex-col justify-center items-center gap-4">
                <h3 className="text-lg font-bold text-center">Explore More</h3>
                <p className="text-xs text-muted-foreground text-center">
                  Check out my YouTube channel and GitHub for more projects
                </p>
                <div className="flex gap-3">
                  <a
                    href="https://www.youtube.com/@demirelnes"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-lg border hover:border-foreground/40 transition-all hover:shadow-md bg-background group"
                  >
                    <Youtube className="w-6 h-6 group-hover:text-red-500 transition-colors" />
                  </a>
                  <a
                    href="https://github.com/enesdemirelus?tab=repositories"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-lg border hover:border-foreground/40 transition-all hover:shadow-md bg-background group"
                  >
                    <Github className="w-6 h-6 group-hover:text-foreground/80 transition-colors" />
                  </a>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <p className="text-muted-foreground text-sm mb-2">
                no projects match the selected filters
              </p>
              <button
                onClick={() => setSelectedCategories([])}
                className="text-xs text-foreground hover:underline"
              >
                clear filters
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
