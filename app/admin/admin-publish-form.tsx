"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const inputClass =
  "w-full px-4 py-2 border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary";

export function AdminPublishForm() {
  const [title, setTitle] = useState("");
  const [emoji, setEmoji] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [pinned, setPinned] = useState(false);
  const [status, setStatus] = useState<
    | { state: "idle" }
    | { state: "publishing" }
    | { state: "done"; slug: string }
    | { state: "error"; message: string }
  >({ state: "idle" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ state: "publishing" });

    const res = await fetch("/api/admin/publish", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, emoji, excerpt, content, pinned }),
    });
    const data = await res.json().catch(() => ({}));

    if (res.ok) {
      setStatus({ state: "done", slug: data.slug });
      setTitle("");
      setEmoji("");
      setExcerpt("");
      setContent("");
      setPinned(false);
    } else {
      setStatus({
        state: "error",
        message: data.error ?? `publish failed (${res.status})`,
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">new blog post</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-3">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="title"
              className={inputClass}
              required
            />
            <input
              value={emoji}
              onChange={(e) => setEmoji(e.target.value)}
              placeholder="📝"
              className={`${inputClass} w-20 text-center`}
              maxLength={4}
            />
          </div>

          <input
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            placeholder="excerpt (short summary shown on the blog list)"
            className={inputClass}
          />

          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder={"content in markdown…\n\nmath works too: $2^{32}-1$ inline, $$…$$ for blocks"}
            className={`${inputClass} min-h-[40vh] font-mono text-sm`}
            required
          />

          <label className="flex items-center gap-2 text-sm text-muted-foreground">
            <input
              type="checkbox"
              checked={pinned}
              onChange={(e) => setPinned(e.target.checked)}
            />
            pinned
          </label>

          <Button
            type="submit"
            className="w-full"
            disabled={status.state === "publishing"}
          >
            {status.state === "publishing" ? "publishing..." : "publish"}
          </Button>

          {status.state === "done" && (
            <p className="text-sm text-green-600">
              published — live after the next deploy:{" "}
              <Link href={`/blog/${status.slug}`} className="underline">
                /blog/{status.slug}
              </Link>
            </p>
          )}
          {status.state === "error" && (
            <p className="text-sm text-destructive">{status.message}</p>
          )}
        </form>
      </CardContent>
    </Card>
  );
}
