import Link from "next/link";
import { Calendar, Clock, ArrowLeft } from "lucide-react";
import { BlogMarkdown } from "@/components/blog-markdown";
import { Button } from "@/components/ui/button";
import { getBlogPost, getAllBlogPosts } from "@/lib/blog";
import { formatDate } from "@/lib/utils";

export function generateStaticParams() {
  return getAllBlogPosts().map((post) => ({ slug: post.slug }));
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    return (
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
    );
  }

  return (
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
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{post.title}</h1>
          <p className="text-xl text-muted-foreground">{post.excerpt}</p>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground pb-6 border-b">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4" />
            <span>{formatDate(post.date, "long")}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4" />
            <span>{post.readTime} read</span>
          </div>
        </div>
      </div>

      <article className="blog-content">
        <BlogMarkdown>{post.content}</BlogMarkdown>
      </article>
    </main>
  );
}
