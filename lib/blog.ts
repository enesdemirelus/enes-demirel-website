import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  emoji: string;
  pinned: boolean;
  content: string;
}

const BLOG_DIR = path.join(process.cwd(), "content/blog");
const ORDER_FILE = path.join(BLOG_DIR, "_order.json");

function readOrder(): string[] {
  try {
    const raw = fs.readFileSync(ORDER_FILE, "utf8");
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((s): s is string => typeof s === "string");
  } catch {
    return [];
  }
}

function parsePost(filename: string): BlogPost {
  const raw = fs.readFileSync(path.join(BLOG_DIR, filename), "utf8");
  const { data, content } = matter(raw);
  return {
    slug: filename.replace(/\.md$/, ""),
    title: data.title ?? "",
    excerpt: data.excerpt ?? "",
    date: String(data.date ?? ""),
    readTime: data.readTime ?? "1 min",
    emoji: data.emoji ?? "📝",
    pinned: data.pinned === true,
    content,
  };
}

export function getAllBlogPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  const order = readOrder();
  const orderIndex = (slug: string): number => {
    const i = order.indexOf(slug);
    return i === -1 ? Infinity : i;
  };
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".md"))
    .map(parsePost)
    .sort((a, b) => {
      if (a.pinned !== b.pinned) return a.pinned ? -1 : 1;
      const ia = orderIndex(a.slug);
      const ib = orderIndex(b.slug);
      if (ia !== ib) return ia - ib;
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
}

export function getBlogPost(slug: string): BlogPost | undefined {
  const file = path.join(BLOG_DIR, `${slug}.md`);
  if (!/^[a-z0-9-]+$/.test(slug) || !fs.existsSync(file)) {
    return undefined;
  }
  return parsePost(`${slug}.md`);
}
