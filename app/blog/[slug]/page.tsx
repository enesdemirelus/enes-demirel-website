import Link from "next/link";
import { Terminal, Calendar, Clock, ArrowLeft } from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { getBlogPost } from "@/lib/blog-data";

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
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
              <Link
                href="/#projects"
                className="hover:underline hidden sm:inline"
              >
                projects
              </Link>
              <Link href="/#about" className="hover:underline hidden sm:inline">
                about
              </Link>
              <Link
                href="/#contact"
                className="hover:underline hidden sm:inline"
              >
                contact
              </Link>
              <Link href="/blog" className="hover:underline hidden sm:inline">
                blog
              </Link>
              <ModeToggle />
            </div>
          </nav>
        </header>

        <main className="max-w-3xl mx-auto px-6 py-16 grow">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold">post not found</h1>
            <p className="text-muted-foreground">
              the blog post you're looking for doesn't exist.
            </p>
            <Button asChild>
              <Link href="/blog">
                <ArrowLeft className="w-4 h-4" />
                back to blog
              </Link>
            </Button>
          </div>
        </main>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
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
            <Link
              href="/#projects"
              className="hover:underline hidden sm:inline"
            >
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

      <main className="max-w-3xl mx-auto px-6 py-8 grow w-full">
        <Button variant="ghost" asChild className="mb-8 -ml-4">
          <Link href="/blog">
            <ArrowLeft className="w-4 h-4" />
            back to blog
          </Link>
        </Button>

        <div className="space-y-6 mb-8">
          <div className="text-6xl">{post.emoji}</div>

          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {post.title}
            </h1>
            <p className="text-xl text-muted-foreground">{post.excerpt}</p>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground pb-6 border-b">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              <span>{formatDate(post.date)}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              <span>{post.readTime} read</span>
            </div>
          </div>
        </div>

        <article className="blog-content">{post.content()}</article>
      </main>

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
