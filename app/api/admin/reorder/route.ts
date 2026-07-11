import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";
import { verifySession, SESSION_COOKIE } from "@/lib/admin-auth";
import { getFile, putFile } from "@/lib/github";

const ORDER_PATH = "content/blog/_order.json";

export async function POST(request: Request) {
  const cookie = request.headers
    .get("cookie")
    ?.match(new RegExp(`${SESSION_COOKIE}=([^;]+)`))?.[1];

  if (!verifySession(cookie)) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const slugs = body?.slugs;

  if (
    !Array.isArray(slugs) ||
    !slugs.every((s) => typeof s === "string" && /^[a-z0-9-]+$/.test(s))
  ) {
    return NextResponse.json(
      { error: "slugs must be an array of valid slugs" },
      { status: 400 },
    );
  }

  const json = JSON.stringify(slugs, null, 2);

  try {
    if (process.env.NODE_ENV === "development") {
      const file = path.join(process.cwd(), ORDER_PATH);
      fs.writeFileSync(file, json + "\n");
    } else {
      const existing = await getFile(ORDER_PATH);
      await putFile(
        ORDER_PATH,
        json + "\n",
        "blog: reorder posts",
        existing?.sha,
      );
    }
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "reorder failed" },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
}
