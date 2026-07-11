import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { BlogPost } from "@/lib/blog";

export interface TilEntry {
  slug: string;
  title: string;
  date: string;
  content: string;
}

export const TIL_SLUG = "today-i-learned";

export const TIL_META = {
  title: "today I learned...",
  emoji: "🤔",
  excerpt:
    "I'll share all the interesting facts I read about science, math, sports, and computer science here. Some of them might be incorrect or contain mathematical errors, as they are researched and written by me.",
};

const TIL_DIR = path.join(process.cwd(), "content/til");

export function getAllTilEntries(): TilEntry[] {
  if (!fs.existsSync(TIL_DIR)) return [];
  return fs
    .readdirSync(TIL_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((filename) => {
      const raw = fs.readFileSync(path.join(TIL_DIR, filename), "utf8");
      const { data, content } = matter(raw);
      return {
        slug: filename.replace(/\.md$/, ""),
        title: data.title ?? "",
        date: String(data.date ?? ""),
        content,
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

// Synthetic pinned card representing the TIL page on the blog list.
export function getTilCard(): BlogPost {
  const entries = getAllTilEntries();
  const words = entries.reduce(
    (sum, e) => sum + e.content.trim().split(/\s+/).length,
    0,
  );
  return {
    slug: TIL_SLUG,
    ...TIL_META,
    date: entries[0]?.date ?? "",
    readTime: `${Math.max(1, Math.round(words / 200))} min`,
    pinned: true,
    content: "",
  };
}
