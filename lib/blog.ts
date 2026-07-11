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
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".md"))
    .map(parsePost)
    .sort((a, b) => {
      if (a.pinned !== b.pinned) return a.pinned ? -1 : 1;
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
}

export function getBlogPost(slug: string): BlogPost | undefined {
  const file = path.join(BLOG_DIR, `${slug}.md`);
  if (
    !/^[a-z0-9-]+$/.test(slug) ||
    !fs.existsSync(file)
  ) {
    return undefined;
  }
  return parsePost(`${slug}.md`);
}
