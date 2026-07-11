import Link from "next/link";
import { ChevronRight, ArrowLeft } from "lucide-react";
import { BlogMarkdown } from "@/components/blog-markdown";
import { Button } from "@/components/ui/button";
import { getAllTilEntries, TIL_META } from "@/lib/til";
import { formatDate } from "@/lib/utils";

export const metadata = {
  title: "today I learned... | Enes Demirel",
};

export default function TodayILearned() {
  const entries = getAllTilEntries();

  return (
    <main className="max-w-3xl mx-auto px-6 py-8 grow w-full">
      <Button variant="ghost" asChild className="mb-8 -ml-4">
        <Link href="/blog">
          <ArrowLeft className="w-4 h-4" />
          back to blog
        </Link>
      </Button>

      <div className="space-y-6 mb-8">
        <div className="text-6xl">{TIL_META.emoji}</div>

        <div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {TIL_META.title}
          </h1>
          <p className="text-xl text-muted-foreground">{TIL_META.excerpt}</p>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground pb-6 border-b">
          <span className="font-mono">
            {entries.length} {entries.length === 1 ? "fact" : "facts"}
          </span>
        </div>
      </div>

      <div className="space-y-3">
        {entries.map((entry) => (
          <details key={entry.slug} className="til-entry">
            <summary className="til-summary">
              <ChevronRight className="til-chevron w-4 h-4 flex-shrink-0 text-muted-foreground" />
              <span className="text-xs font-mono text-muted-foreground flex-shrink-0">
                {formatDate(entry.date, "long")}
              </span>
              <span className="font-semibold">{entry.title}</span>
            </summary>
            <article className="blog-content px-5 pb-4 pt-1">
              <BlogMarkdown>{entry.content}</BlogMarkdown>
            </article>
          </details>
        ))}
      </div>
    </main>
  );
}
