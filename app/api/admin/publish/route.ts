import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";
import matter from "gray-matter";
import { verifySession, SESSION_COOKIE } from "@/lib/admin-auth";
import { getBlogPost } from "@/lib/blog";
import { getAllTilEntries } from "@/lib/til";
import { getFile, putFile } from "@/lib/github";

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

export async function POST(request: Request) {
  const cookie = request.headers
    .get("cookie")
    ?.match(new RegExp(`${SESSION_COOKIE}=([^;]+)`))?.[1];

  if (!verifySession(cookie)) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const {
    title,
    emoji,
    excerpt,
    content,
    pinned,
    slug: rawSlug,
    collection: rawCollection,
  } = body ?? {};

  const collection = rawCollection === "til" ? "til" : "blog";

  if (typeof title !== "string" || !title.trim()) {
    return NextResponse.json({ error: "title is required" }, { status: 400 });
  }
  if (typeof content !== "string" || !content.trim()) {
    return NextResponse.json({ error: "content is required" }, { status: 400 });
  }

  const isEdit = typeof rawSlug === "string" && rawSlug.length > 0;
  if (isEdit && !/^[a-z0-9-]+$/.test(rawSlug)) {
    return NextResponse.json({ error: "invalid slug" }, { status: 400 });
  }

  let date = new Date().toISOString().slice(0, 10);
  const slug = isEdit
    ? rawSlug
    : collection === "til"
      ? `${date}-${slugify(title)}`
      : slugify(title);
  if (!slug || (!isEdit && !slugify(title))) {
    return NextResponse.json(
      { error: "title produces an empty slug" },
      { status: 400 },
    );
  }

  if (isEdit) {
    const existing =
      collection === "til"
        ? getAllTilEntries().find((e) => e.slug === slug)
        : getBlogPost(slug);
    if (!existing) {
      return NextResponse.json({ error: "post not found" }, { status: 404 });
    }
    date = existing.date;
  }

  const markdown = matter.stringify(
    content.trim() + "\n",
    collection === "til"
      ? { title: title.trim(), date }
      : {
          title: title.trim(),
          excerpt: typeof excerpt === "string" ? excerpt.trim() : "",
          date,
          readTime: estimateReadTime(content),
          emoji:
            typeof emoji === "string" && emoji.trim() ? emoji.trim() : "📝",
          pinned: pinned === true,
        },
  );

  const relativePath = `content/${collection}/${slug}.md`;
  const message = isEdit
    ? `${collection}: update ${title.trim()}`
    : `${collection}: ${title.trim()}`;

  try {
    if (process.env.NODE_ENV === "development") {
      const file = path.join(process.cwd(), relativePath);
      const exists = fs.existsSync(file);
      if (isEdit && !exists) {
        return NextResponse.json({ error: "post not found" }, { status: 404 });
      }
      if (!isEdit && exists) {
        throw new Error("a post with this title already exists");
      }
      fs.writeFileSync(file, markdown);
    } else if (isEdit) {
      const existing = await getFile(relativePath);
      if (!existing) {
        return NextResponse.json({ error: "post not found" }, { status: 404 });
      }
      await putFile(relativePath, markdown, message, existing.sha);
    } else {
      const existing = await getFile(relativePath);
      if (existing) {
        throw new Error("a post with this title already exists");
      }
      await putFile(relativePath, markdown, message);
    }
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "publish failed" },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true, slug });
}
