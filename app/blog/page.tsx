import Link from "next/link";
import { ArrowUpRight, Calendar, Clock } from "lucide-react";
import { getAllBlogPosts } from "@/lib/blog-data";
import { formatDate } from "@/lib/utils";

export default function Blog() {
  const posts = getAllBlogPosts();

  return (
    <section className="max-w-5xl mx-auto px-6 py-8 grow w-full">
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
              <div
                className={`border rounded-lg p-6 transition-all hover:border-foreground/40 hover:shadow-lg backdrop-blur-sm ${
                  post.pinned ? "bg-background/50 border-2" : "bg-background/50"
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className="text-4xl flex-shrink-0">{post.emoji}</div>
                  <div className="flex-grow min-w-0">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <h2 className="text-2xl font-bold group-hover:text-foreground/80 transition-colors">
                        {post.title}
                      </h2>
                      <ArrowUpRight className="w-5 h-5 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>

                    <p className="text-muted-foreground mb-4">{post.excerpt}</p>

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
  );
}
