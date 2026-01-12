"use client";

import Link from "next/link";
import { Terminal, ArrowUpRight, Github, Youtube } from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";
import { useState } from "react";

interface Project {
  emoji: string;
  title: string;
  description: string;
  tags: string[];
  categories: string[];
  slug: string;
}

const CATEGORIES = [
  "Machine Learning",
  "Next.js",
  "React",
  "Python",
  "C",
  "C++",
  "Java",
  "C#",
  "Automation",
];

const projects: Project[] = [
  {
    emoji: "📆",
    title: "occasion",
    description:
      "full-stack event management platform with user authentication, real-time event creation, category filtering, and collaborative planning features. built with modern web technologies and deployed on vercel.",
    tags: [
      "next.js",
      "typescript",
      "shadcn/ui",
      "prisma",
      "railway / mySQL",
      "clerk auth",
      "tailwind",
    ],
    categories: ["Web Development", "Next.js", "React"],
    slug: "occasion",
  },
  {
    emoji: "🤖",
    title: "enes' ml lab",
    description:
      "personal machine learning portfolio showcasing various ai/ml projects.",
    tags: ["python", "tensorflow", "next.js", "keras", "numpy"],
    categories: [
      "Machine Learning",
      "Web Development",
      "Next.js",
      "React",
      "Python",
    ],
    slug: "enes-ml-lab",
  },
  {
    emoji: "📊",
    title: "masters tracker",
    description:
      "comprehensive grad school application tracker with database management, deadline tracking, and program comparison features. includes password-protected personal tracker and demo mode for showcasing.",
    tags: [
      "next.js 15",
      "typescript",
      "mantine ui",
      "prisma",
      "postgresql",
      "vercel",
    ],
    categories: ["Web Development", "Next.js", "React"],
    slug: "masters-tracker",
  },
  {
    emoji: "🎥",
    title: "Movie Recommender AI",
    description:
      "A Next.js movie recommender that encodes each movie's metadata/overview using a pretrained SentenceTransformer (all-MiniLM-L6-v2) into embedding vectors, then recommends similar movies by cosine similarity computed as a dot product on normalized embeddings.",
    tags: [
      "react",
      "node.js",
      "next.js",
      "tensorflow",
      "transformers",
      "embedding",
      "python",
      "numpy",
      "pandas",
      "keras",
    ],
    categories: [
      "Machine Learning",
      "Web Development",
      "Next.js",
      "React",
      "Python",
    ],
    slug: "ai-movie-recommender",
  },
  {
    emoji: "🤖",
    title: "Telegram Habit Tracker Bot",
    description:
      "telegram bot for tracking daily/weekly habits with a simple command-based UX. supports habit dashboard, add/delete/update habits, weekly goals, and streak updates. data is stored in supabase.",
    tags: [
      "python",
      "python-telegram-bot",
      "supabase",
      "postgresql",
      "python-dotenv",
    ],
    categories: ["Python", "Automation"],
    slug: "telegram-habit-tracker-bot",
  },
  {
    emoji: "👤",
    title: "AI Age Estimator",
    description:
      "web app that estimates age from photos using face detection and a pre-trained neural network. built with Next.js frontend and Flask backend serving an EfficientNet-based Keras model for accurate age prediction.",
    tags: [
      "next.js",
      "react",
      "face-api.js",
      "flask",
      "keras",
      "efficientnet",
      "python",
      "neural networks",
    ],
    categories: ["Machine Learning", "Next.js", "React", "Python"],
    slug: "ai-age-estimator",
  },
  {
    emoji: "🇹🇷",
    title: "Turkish Name Classifier",
    description:
      "neural network that classifies Turkish vs non-Turkish names using character-level tokenization and bidirectional LSTM. built to identify Turkish students from the dean's list for Turkish Student Association event invitations.",
    tags: [
      "python",
      "tensorflow",
      "keras",
      "LSTM",
      "neural networks",
      "pandas",
      "scikit-learn",
    ],
    categories: ["Machine Learning", "Python"],
    slug: "turkish-name-classifier",
  },
  {
    emoji: "🔍",
    title: "Biometric Attribute Classifier",
    description:
      "real-time facial attribute classification using a neural network. uses OpenCV for face detection with Haar Cascades and a trained Keras model for binary classification with live camera feed and confidence scores.",
    tags: [
      "python",
      "tensorflow",
      "keras",
      "opencv",
      "computer vision",
      "neural networks",
    ],
    categories: ["Machine Learning", "Python"],
    slug: "biometric-attribute-classifier",
  },
  {
    emoji: "🖼️",
    title: "Image Editor",
    description:
      "desktop image editor with real-time adjustments for brightness, contrast, sharpness, and color. built with Tkinter GUI framework and PIL for image processing, featuring live preview and save functionality.",
    tags: ["python", "tkinter", "PIL", "pillow", "ttkbootstrap", "GUI"],
    categories: ["Python"],
    slug: "image-editor",
  },
  {
    emoji: "💬",
    title: "Chat Application",
    description:
      "real-time messaging application with socket-based server-client architecture. features username selection, user count display, message/nudge/image sharing, chat history persistence, macOS notifications, and sound effects.",
    tags: [
      "python",
      "tkinter",
      "sockets",
      "networking",
      "playsound",
      "imgur API",
    ],
    categories: ["Python"],
    slug: "chat-app",
  },
  {
    emoji: "📚",
    title: "Library Management System",
    description:
      "full-featured library management software with role-based access for admins and users. includes book inventory management, rental tracking with SQLite database, email notifications for returns, and comprehensive authentication system.",
    tags: ["python", "tkinter", "sqlite3", "database", "GUI"],
    categories: ["Python"],
    slug: "library-management-system",
  },
];

export default function Projects() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const filteredProjects =
    selectedCategories.length === 0
      ? projects
      : projects.filter((project) =>
          selectedCategories.every((category) =>
            project.categories.includes(category)
          )
        );

  return (
    <div className="min-h-screen flex flex-col">
      <div className="fixed inset-0 -z-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

      <header className="border-b">
        <nav className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link
            href="/"
            className="flex items-center gap-2 font-mono text-sm hover:opacity-80 transition-opacity"
          >
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
            <Link href="/you-should-really-watch" className="hover:underline">
              YSRW
            </Link>
            <ModeToggle />
          </div>
        </nav>
      </header>

      <section className="max-w-5xl mx-auto px-6 py-8 flex-grow w-full">
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
                <span className="ml-1.5">
                  ({selectedCategories.join(" + ")})
                </span>
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
                        <div className="text-3xl">{project.emoji}</div>
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
                  <h3 className="text-lg font-bold text-center">
                    Explore More
                  </h3>
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

      <footer className="border-t mt-8">
        <div className="max-w-5xl mx-auto px-6 py-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4" />
              <span>© {new Date().getFullYear()} enes demirel</span>
            </div>
            <p className="font-mono text-xs">
              <Link
                href="/you-should-really-watch"
                className="underline hover:opacity-80"
              >
                you should really watch
              </Link>{" "}
              <a
                href="https://www.imdb.com/title/tt1839578/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:opacity-80"
              >
                person of interest
              </a>
              .
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
