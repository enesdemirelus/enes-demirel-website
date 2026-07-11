"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Calendar,
  ChevronDown,
  ChevronUp,
  Pin,
  Plus,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import type { BlogPost } from "@/lib/blog";
import type { TilEntry } from "@/lib/til";
import { AdminPostEditor } from "./admin-post-editor";

type Tab = "posts" | "til";
type View =
  | { mode: "list" }
  | { mode: "editor"; kind: "blog"; post: BlogPost | null }
  | { mode: "editor"; kind: "til"; post: TilEntry | null };

export function AdminDashboard({
  posts: initialPosts,
  tilEntries: initialTil,
}: {
  posts: BlogPost[];
  tilEntries: TilEntry[];
}) {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("posts");
  const [posts, setPosts] = useState<BlogPost[]>(initialPosts);
  const [til, setTil] = useState<TilEntry[]>(initialTil);
  const [view, setView] = useState<View>({ mode: "list" });
  const [confirmingDelete, setConfirmingDelete] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // resync with server data after router.refresh()
  useEffect(() => {
    setPosts(initialPosts);
  }, [initialPosts]);
  useEffect(() => {
    setTil(initialTil);
  }, [initialTil]);

  const move = async (index: number, dir: -1 | 1) => {
    const target = index + dir;
    if (target < 0 || target >= posts.length) return;
    setError(null);

    const prev = posts;
    const next = [...posts];
    [next[index], next[target]] = [next[target], next[index]];
    setPosts(next); // optimistic

    try {
      const res = await fetch("/api/admin/reorder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slugs: next.map((p) => p.slug) }),
      });
      if (!res.ok) throw new Error();
      router.refresh();
    } catch {
      setPosts(prev); // revert
      setError("reorder failed — try again");
    }
  };

  const del = async (slug: string, collection?: "til") => {
    setError(null);
    setConfirmingDelete(null);
    const prevPosts = posts;
    const prevTil = til;
    if (collection === "til") {
      setTil(til.filter((e) => e.slug !== slug)); // optimistic
    } else {
      setPosts(posts.filter((p) => p.slug !== slug)); // optimistic
    }

    try {
      const res = await fetch("/api/admin/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(collection ? { collection, slug } : { slug }),
      });
      if (!res.ok) throw new Error();
      router.refresh();
    } catch {
      setPosts(prevPosts); // revert
      setTil(prevTil);
      setError("delete failed — try again");
    }
  };

  if (view.mode === "editor") {
    return (
      <AdminPostEditor
        post={view.post}
        mode={view.kind}
        onBack={() => {
          setView({ mode: "list" });
          router.refresh();
        }}
        onSaved={() => router.refresh()}
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* tabs */}
      <div className="flex gap-1 rounded-md border bg-background/50 p-1 w-fit">
        {(["posts", "til"] as const).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => {
              setTab(t);
              setConfirmingDelete(null);
              setError(null);
            }}
            className={`inline-flex items-center gap-2 rounded px-3 py-1.5 text-sm font-mono transition-colors ${
              tab === t
                ? "bg-accent text-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {t}
            <span className="text-xs opacity-60">
              {t === "posts" ? posts.length : til.length}
            </span>
          </button>
        ))}
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      {tab === "posts" ? (
        <PostsSection
          posts={posts}
          confirmingDelete={confirmingDelete}
          setConfirmingDelete={setConfirmingDelete}
          onNew={() => setView({ mode: "editor", kind: "blog", post: null })}
          onEdit={(post) => setView({ mode: "editor", kind: "blog", post })}
          onDelete={(slug) => del(slug)}
          move={move}
        />
      ) : (
        <TilSection
          entries={til}
          confirmingDelete={confirmingDelete}
          setConfirmingDelete={setConfirmingDelete}
          onNew={() => setView({ mode: "editor", kind: "til", post: null })}
          onEdit={(post) => setView({ mode: "editor", kind: "til", post })}
          onDelete={(slug) => del(slug, "til")}
        />
      )}
    </div>
  );
}

function PostsSection({
  posts,
  confirmingDelete,
  setConfirmingDelete,
  onNew,
  onEdit,
  onDelete,
  move,
}: {
  posts: BlogPost[];
  confirmingDelete: string | null;
  setConfirmingDelete: (s: string | null) => void;
  onNew: () => void;
  onEdit: (post: BlogPost) => void;
  onDelete: (slug: string) => void;
  move: (index: number, dir: -1 | 1) => void;
}) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-xl font-bold">posts</h2>
        <Button size="sm" onClick={onNew}>
          <Plus className="w-4 h-4" />
          new post
        </Button>
      </div>

      {posts.length === 0 && (
        <p className="text-sm text-muted-foreground font-mono">
          no posts yet — create one.
        </p>
      )}

      <div className="space-y-3">
        {posts.map((post, i) => (
          <div
            key={post.slug}
            className="group border rounded-lg bg-background/50 backdrop-blur-sm transition-colors hover:border-foreground/40"
          >
            <div className="flex items-start gap-3 p-4">
              {/* reorder arrows */}
              <div className="flex flex-col items-center gap-0.5 pt-1">
                <button
                  type="button"
                  onClick={() => move(i, -1)}
                  disabled={i === 0}
                  aria-label="move up"
                  className="text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:hover:text-muted-foreground transition-colors"
                >
                  <ChevronUp className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => move(i, 1)}
                  disabled={i === posts.length - 1}
                  aria-label="move down"
                  className="text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:hover:text-muted-foreground transition-colors"
                >
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>

              {/* clickable content */}
              <button
                type="button"
                onClick={() => onEdit(post)}
                className="flex flex-1 items-start gap-3 text-left min-w-0"
              >
                <span className="text-3xl flex-shrink-0 leading-none">
                  {post.emoji}
                </span>
                <span className="flex-1 min-w-0">
                  <span className="flex flex-wrap items-center gap-2">
                    <span className="font-semibold group-hover:text-foreground/80 transition-colors">
                      {post.title}
                    </span>
                    {post.pinned && (
                      <Badge variant="secondary" className="gap-1">
                        <Pin className="w-3 h-3" />
                        pinned
                      </Badge>
                    )}
                  </span>
                  <span className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Calendar className="w-3 h-3" />
                    {formatDate(post.date)}
                  </span>
                  {post.excerpt && (
                    <span className="mt-1.5 block text-sm text-muted-foreground line-clamp-1">
                      {post.excerpt}
                    </span>
                  )}
                </span>
              </button>

              {/* delete */}
              <div className="flex-shrink-0 pt-0.5">
                {confirmingDelete === post.slug ? (
                  <DeleteConfirm
                    onYes={() => onDelete(post.slug)}
                    onNo={() => setConfirmingDelete(null)}
                  />
                ) : (
                  <button
                    type="button"
                    onClick={() => setConfirmingDelete(post.slug)}
                    aria-label="delete post"
                    className="text-muted-foreground hover:text-destructive transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TilSection({
  entries,
  confirmingDelete,
  setConfirmingDelete,
  onNew,
  onEdit,
  onDelete,
}: {
  entries: TilEntry[];
  confirmingDelete: string | null;
  setConfirmingDelete: (s: string | null) => void;
  onNew: () => void;
  onEdit: (entry: TilEntry) => void;
  onDelete: (slug: string) => void;
}) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-xl font-bold">til</h2>
        <Button size="sm" onClick={onNew}>
          <Plus className="w-4 h-4" />
          new fact
        </Button>
      </div>

      {entries.length === 0 && (
        <p className="text-sm text-muted-foreground font-mono">
          no facts yet — create one.
        </p>
      )}

      <div className="space-y-3">
        {entries.map((entry) => (
          <div
            key={entry.slug}
            className="group border rounded-lg bg-background/50 backdrop-blur-sm transition-colors hover:border-foreground/40"
          >
            <div className="flex items-start gap-3 p-4">
              <button
                type="button"
                onClick={() => onEdit(entry)}
                className="flex flex-1 flex-col text-left min-w-0"
              >
                <span className="font-semibold group-hover:text-foreground/80 transition-colors">
                  {entry.title}
                </span>
                <span className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Calendar className="w-3 h-3" />
                  {formatDate(entry.date)}
                </span>
              </button>

              {/* delete */}
              <div className="flex-shrink-0 pt-0.5">
                {confirmingDelete === entry.slug ? (
                  <DeleteConfirm
                    onYes={() => onDelete(entry.slug)}
                    onNo={() => setConfirmingDelete(null)}
                  />
                ) : (
                  <button
                    type="button"
                    onClick={() => setConfirmingDelete(entry.slug)}
                    aria-label="delete fact"
                    className="text-muted-foreground hover:text-destructive transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function DeleteConfirm({
  onYes,
  onNo,
}: {
  onYes: () => void;
  onNo: () => void;
}) {
  return (
    <div className="flex items-center gap-2 text-xs font-mono">
      <span className="text-muted-foreground">delete?</span>
      <button
        type="button"
        onClick={onYes}
        className="text-destructive hover:underline"
      >
        yes
      </button>
      <button
        type="button"
        onClick={onNo}
        className="text-muted-foreground hover:text-foreground hover:underline"
      >
        no
      </button>
    </div>
  );
}
