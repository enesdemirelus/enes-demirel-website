import Link from "next/link";
import { Terminal, ArrowUpRight, Calendar, Clock } from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";
import { getAllBlogPosts } from "@/lib/blog-data";

export default function Blog() {
  const posts = getAllBlogPosts();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

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
            <Link href="/blog" className="hover:underline hidden sm:inline">
              blog
            </Link>
            <ModeToggle />
          </div>
        </nav>
      </header>

      <section className="max-w-5xl mx-auto px-6 py-8 flex-grow w-full">
        <div className="space-y-8">
          <div>
            <h1 className="text-4xl font-bold mb-4">blog</h1>
            <p className="text-muted-foreground">
              thoughts on tech, math, and life.
            </p>
          </div>

          <div className="space-y-4">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group block"
              >
                <div className={`border rounded-lg p-6 transition-all hover:border-foreground/40 hover:shadow-lg backdrop-blur-sm ${
                  post.pinned 
                    ? 'bg-background/50 border-2' 
                    : 'bg-background/50'
                }`}>
                  <div className="flex items-start gap-4">
                    <div className="text-4xl flex-shrink-0">{post.emoji}</div>
                    <div className="flex-grow min-w-0">
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <h2 className="text-2xl font-bold group-hover:text-foreground/80 transition-colors">
                          {post.title}
                        </h2>
                        <ArrowUpRight className="w-5 h-5 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>

                      <p className="text-muted-foreground mb-4">
                        {post.excerpt}
                      </p>

                      <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                        {post.pinned && (
                          <div className="flex items-center gap-1.5 text-primary">
                            <span className="font-medium">Pinned</span>
                          </div>
                        )}
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>{formatDate(post.date)}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5" />
                          <span>{post.readTime} read</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
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

