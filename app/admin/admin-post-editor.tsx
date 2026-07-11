"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Bold,
  Eye,
  Link as LinkIcon,
  Pencil,
  Sigma,
  SquareDashed,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { BlogMarkdown } from "@/components/blog-markdown";
import type { BlogPost } from "@/lib/blog";

const inputClass =
  "w-full px-4 py-2 border rounded-md bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary transition-colors";

type Snippet = {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  before: string;
  after: string;
  placeholder: string;
};

const snippets: Snippet[] = [
  { label: "bold", icon: Bold, before: "**", after: "**", placeholder: "bold" },
  {
    label: "link",
    icon: LinkIcon,
    before: "[",
    after: "](https://)",
    placeholder: "text",
  },
  {
    label: "inline math",
    icon: Sigma,
    before: "$",
    after: "$",
    placeholder: "x^2",
  },
  {
    label: "block math",
    icon: Sigma,
    before: "$$\n",
    after: "\n$$",
    placeholder: "\\int_0^1 x\\,dx",
  },
  {
    label: "entry box",
    icon: SquareDashed,
    before: '<div class="entry-box">\n\n',
    after: "\n\n</div>",
    placeholder: "## heading\n\ncontent",
  },
];

export function AdminPostEditor({
  post,
  onBack,
  onSaved,
}: {
  post: BlogPost | null;
  onBack: () => void;
  onSaved: () => void;
}) {
  const isEdit = post !== null;
  const [title, setTitle] = useState(post?.title ?? "");
  const [emoji, setEmoji] = useState(post?.emoji ?? "");
  const [excerpt, setExcerpt] = useState(post?.excerpt ?? "");
  const [content, setContent] = useState(post?.content ?? "");
  const [pinned, setPinned] = useState(post?.pinned ?? false);
  const [mobileTab, setMobileTab] = useState<"write" | "preview">("write");
  const [status, setStatus] = useState<
    | { state: "idle" }
    | { state: "saving" }
    | { state: "done"; slug: string }
    | { state: "error"; message: string }
  >({ state: "idle" });

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const dirty =
    title !== (post?.title ?? "") ||
    emoji !== (post?.emoji ?? "") ||
    excerpt !== (post?.excerpt ?? "") ||
    content !== (post?.content ?? "") ||
    pinned !== (post?.pinned ?? false);

  const insertSnippet = (s: Snippet) => {
    const el = textareaRef.current;
    if (!el) return;
    const start = el.selectionStart;
    const end = el.selectionEnd;
    const selected = content.slice(start, end) || s.placeholder;
    const next =
      content.slice(0, start) +
      s.before +
      selected +
      s.after +
      content.slice(end);
    setContent(next);
    // restore selection around the inserted text after React re-renders
    requestAnimationFrame(() => {
      el.focus();
      const selStart = start + s.before.length;
      el.setSelectionRange(selStart, selStart + selected.length);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ state: "saving" });

    const body = isEdit
      ? { slug: post.slug, title, emoji, excerpt, content, pinned }
      : { title, emoji, excerpt, content, pinned };

    try {
      const res = await fetch("/api/admin/publish", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json().catch(() => ({}));

      if (res.ok) {
        setStatus({ state: "done", slug: data.slug ?? post?.slug ?? "" });
        onSaved();
      } else {
        setStatus({
          state: "error",
          message: data.error ?? `save failed (${res.status})`,
        });
      }
    } catch {
      setStatus({ state: "error", message: "network error — try again" });
    }
  };

  const saving = status.state === "saving";

  return (
    <div className="space-y-6">
      {/* header */}
      <div className="flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          back to posts
        </button>
        {dirty && status.state !== "done" && (
          <span className="text-xs font-mono text-muted-foreground">
            unsaved changes
          </span>
        )}
      </div>

      <div>
        <h1 className="text-2xl font-bold">
          {isEdit ? "edit post" : "new post"}
        </h1>
        {isEdit && (
          <p className="mt-1 text-xs font-mono text-muted-foreground">
            slug: <span className="text-foreground">{post.slug}</span> (fixed)
          </p>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* meta fields */}
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
            aria-label="emoji"
          />
        </div>

        <input
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          placeholder="excerpt (short summary shown on the blog list)"
          className={inputClass}
        />

        <label className="flex items-center gap-2 text-sm text-muted-foreground w-fit cursor-pointer">
          <input
            type="checkbox"
            checked={pinned}
            onChange={(e) => setPinned(e.target.checked)}
            className="accent-primary"
          />
          pinned
        </label>

        {/* toolbar */}
        <div className="flex flex-wrap items-center gap-1.5 rounded-md border bg-background/50 p-1.5">
          {snippets.map((s) => (
            <button
              key={s.label}
              type="button"
              onClick={() => insertSnippet(s)}
              title={`insert ${s.label}`}
              className="inline-flex items-center gap-1.5 rounded px-2 py-1 text-xs font-mono text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
            >
              <s.icon className="w-3.5 h-3.5" />
              {s.label}
            </button>
          ))}
        </div>

        {/* mobile tabs */}
        <div className="flex gap-1 rounded-md border bg-background/50 p-1 lg:hidden">
          {(["write", "preview"] as const).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setMobileTab(t)}
              className={`flex-1 inline-flex items-center justify-center gap-1.5 rounded px-3 py-1.5 text-sm font-mono transition-colors ${
                mobileTab === t
                  ? "bg-accent text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {t === "write" ? (
                <Pencil className="w-3.5 h-3.5" />
              ) : (
                <Eye className="w-3.5 h-3.5" />
              )}
              {t}
            </button>
          ))}
        </div>

        {/* editor + preview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <textarea
            ref={textareaRef}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder={
              "content in markdown…\n\nmath works too: $2^{32}-1$ inline, $$…$$ for blocks"
            }
            className={`${inputClass} min-h-[55vh] font-mono text-sm leading-relaxed resize-y ${
              mobileTab === "preview" ? "hidden lg:block" : ""
            }`}
            required
          />
          <div
            className={`min-h-[55vh] overflow-auto rounded-md border bg-background/50 px-5 py-3 ${
              mobileTab === "write" ? "hidden lg:block" : ""
            }`}
          >
            {content.trim() ? (
              <article className="blog-content">
                <BlogMarkdown>{content}</BlogMarkdown>
              </article>
            ) : (
              <p className="text-sm text-muted-foreground font-mono">
                live preview appears here…
              </p>
            )}
          </div>
        </div>

        {/* actions */}
        <div className="flex flex-wrap items-center gap-4 pt-2">
          <Button type="submit" disabled={saving}>
            {saving
              ? isEdit
                ? "saving..."
                : "publishing..."
              : isEdit
                ? "save changes"
                : "publish"}
          </Button>

          {status.state === "done" && (
            <p className="text-sm text-green-600 dark:text-green-500">
              saved —{" "}
              <Link
                href={`/blog/${status.slug}`}
                className="underline"
                target="_blank"
              >
                /blog/{status.slug}
              </Link>
            </p>
          )}
          {status.state === "error" && (
            <p className="text-sm text-destructive">{status.message}</p>
          )}
        </div>
      </form>
    </div>
  );
}
