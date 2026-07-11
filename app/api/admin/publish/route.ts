import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";
import matter from "gray-matter";
import { verifySession, SESSION_COOKIE } from "@/lib/admin-auth";

function slugify(title: string): string {
  return title
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

function estimateReadTime(content: string): string {
  const words = content.trim().split(/\s+/).length;
  return `${Math.max(1, Math.round(words / 200))} min`;
}

async function commitToGitHub(filePath: string, markdown: string, title: string) {
  const token = process.env.GITHUB_TOKEN;
  const repo = process.env.GITHUB_REPO; // e.g. "enesdemirelus/enes-demirel-website"
  if (!token || !repo) {
    throw new Error("GITHUB_TOKEN or GITHUB_REPO is not configured");
  }

  const res = await fetch(
    `https://api.github.com/repos/${repo}/contents/${filePath}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github+json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: `blog: ${title}`,
        content: Buffer.from(markdown).toString("base64"),
      }),
    },
  );

  if (res.status === 422) {
    throw new Error("a post with this title already exists");
  }
  if (!res.ok) {
    throw new Error(`GitHub API error ${res.status}: ${await res.text()}`);
  }
}

export async function POST(request: Request) {
  const cookie = request.headers
    .get("cookie")
    ?.match(new RegExp(`${SESSION_COOKIE}=([^;]+)`))?.[1];

  if (!verifySession(cookie)) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const { title, emoji, excerpt, content, pinned } = body ?? {};

  if (typeof title !== "string" || !title.trim()) {
    return NextResponse.json({ error: "title is required" }, { status: 400 });
  }
  if (typeof content !== "string" || !content.trim()) {
    return NextResponse.json({ error: "content is required" }, { status: 400 });
  }

  const slug = slugify(title);
  if (!slug) {
    return NextResponse.json(
      { error: "title produces an empty slug" },
      { status: 400 },
    );
  }

  const markdown = matter.stringify(content.trim() + "\n", {
    title: title.trim(),
    excerpt: typeof excerpt === "string" ? excerpt.trim() : "",
    date: new Date().toISOString().slice(0, 10),
    readTime: estimateReadTime(content),
    emoji: typeof emoji === "string" && emoji.trim() ? emoji.trim() : "📝",
    pinned: pinned === true,
  });

  const relativePath = `content/blog/${slug}.md`;

  try {
    if (process.env.NODE_ENV === "development") {
      // local dev: write straight to disk, no commit
      const file = path.join(process.cwd(), relativePath);
      if (fs.existsSync(file)) {
        throw new Error("a post with this title already exists");
      }
      fs.writeFileSync(file, markdown);
    } else {
      await commitToGitHub(relativePath, markdown, title.trim());
    }
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "publish failed" },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true, slug });
}
