"use client";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Terminal, Github, ExternalLink } from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

interface Project {
  emoji: string;
  title: string;
  description: string;
  tags: string[];
  categories: string[];
  slug: string;
}

const projectLinks: Record<
  string,
  {
    type: "youtube" | "redirect" | "github";
    value: string;
    githubRepo?: string;
  }
> = {
  occasion: {
    type: "youtube",
    value: "pw8qAaRDEaw",
    githubRepo: "https://github.com/enesdemirelus/occasion",
  },
  "masters-tracker": { type: "youtube", value: "aqs_lUsFdGQ" },
  "enes-ml-lab": { type: "redirect", value: "/enes-ml-lab" },
  "ai-movie-recommender": {
    type: "youtube",
    value: "gcFaCIdtQUY",
    githubRepo: "https://github.com/enesdemirelus/movie-recommender-AI",
  },
  "telegram-habit-tracker-bot": {
    type: "github",
    value: "https://github.com/enesdemirelus/Telegram-Habit-Tracker-Bot",
  },
  "ai-age-estimator": {
    type: "youtube",
    value: "w_g_y8mQuu0",
    githubRepo: "https://github.com/enesdemirelus/ai-age-estimator",
  },
  "turkish-name-classifier": {
    type: "youtube",
    value: "U1I49a3URWw",
    githubRepo: "https://github.com/enesdemirelus/turkish-name-classifier",
  },
  "biometric-attribute-classifier": {
    type: "youtube",
    value: "hJq4nrujeUc",
    githubRepo:
      "https://github.com/enesdemirelus/ML-Biometric-Attribute-Classification",
  },
  "image-editor": {
    type: "youtube",
    value: "2uD828U2_5w",
    githubRepo: "https://github.com/enesdemirelus/imageEditor",
  },
  "chat-app": {
    type: "youtube",
    value: "8E6c6BAzsyo",
    githubRepo: "https://github.com/enesdemirelus/chatApp",
  },
  "library-management-system": {
    type: "youtube",
    value: "b5RazIDovmw",
    githubRepo: "https://github.com/enesdemirelus/library_management_system",
  },
};

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

function page() {
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
              <Link href="/#projects" className="hover:underline hidden sm:inline">
                projects
              </Link>
              <Link href="/#about" className="hover:underline hidden sm:inline">
                about
              </Link>
              <Link href="/#contact" className="hover:underline hidden sm:inline">
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
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Project not found</h1>
            <Link href="/projects" className="text-primary hover:underline">
              Back to projects
            </Link>
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

  if (projectLink.type === "redirect") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground">Redirecting...</p>
        </div>
      </div>
    );
  }

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
            <Link href="/#projects" className="hover:underline hidden sm:inline">
              projects
            </Link>
            <Link href="/#about" className="hover:underline hidden sm:inline">
              about
            </Link>
            <Link href="/#contact" className="hover:underline hidden sm:inline">
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

              {projectLink.githubRepo && (
                <div className="flex items-center justify-center">
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
                    enesdemirelus/Telegram-Habit-Tracker-Bot
                  </span>
                </div>
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

              <div
                className="relative w-full rounded-xl overflow-hidden border shadow-lg bg-card"
                style={{ height: "700px" }}
              >
                <iframe
                  className="w-full h-full"
                  src="https://github1s.com/enesdemirelus/Telegram-Habit-Tracker-Bot"
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

export default page;
