import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";
import { verifySession, SESSION_COOKIE } from "@/lib/admin-auth";
import { getFile, putFile, deleteFile } from "@/lib/github";

const ORDER_PATH = "content/blog/_order.json";

export async function POST(request: Request) {
  const cookie = request.headers
    .get("cookie")
    ?.match(new RegExp(`${SESSION_COOKIE}=([^;]+)`))?.[1];

  if (!verifySession(cookie)) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const slug = body?.slug;

  if (typeof slug !== "string" || !/^[a-z0-9-]+$/.test(slug)) {
    return NextResponse.json({ error: "invalid slug" }, { status: 400 });
  }

  const relativePath = `content/blog/${slug}.md`;

  try {
    if (process.env.NODE_ENV === "development") {
      const file = path.join(process.cwd(), relativePath);
      if (!fs.existsSync(file)) {
        return NextResponse.json({ error: "post not found" }, { status: 404 });
      }
      fs.unlinkSync(file);

      const orderFile = path.join(process.cwd(), ORDER_PATH);
      if (fs.existsSync(orderFile)) {
        const order = JSON.parse(fs.readFileSync(orderFile, "utf8"));
        if (Array.isArray(order) && order.includes(slug)) {
          const next = order.filter((s: unknown) => s !== slug);
          fs.writeFileSync(orderFile, JSON.stringify(next, null, 2) + "\n");
        }
      }
    } else {
      const existing = await getFile(relativePath);
      if (!existing) {
        return NextResponse.json({ error: "post not found" }, { status: 404 });
      }
      await deleteFile(relativePath, `blog: delete ${slug}`, existing.sha);

      const orderMeta = await getFile(ORDER_PATH);
      if (orderMeta) {
        const res = await fetch(
          `https://api.github.com/repos/${process.env.GITHUB_REPO}/contents/${ORDER_PATH}`,
          {
            headers: {
              Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
              Accept: "application/vnd.github.raw+json",
            },
          },
        );
        if (res.ok) {
          const order = JSON.parse(await res.text());
          if (Array.isArray(order) && order.includes(slug)) {
            const next = order.filter((s: unknown) => s !== slug);
            await putFile(
              ORDER_PATH,
              JSON.stringify(next, null, 2) + "\n",
              `blog: delete ${slug}`,
              orderMeta.sha,
            );
          }
        }
      }
    }
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "delete failed" },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
}
