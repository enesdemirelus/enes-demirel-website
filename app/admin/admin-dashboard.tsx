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
import { AdminPostEditor } from "./admin-post-editor";

type View = { mode: "list" } | { mode: "editor"; post: BlogPost | null };

export function AdminDashboard({ posts: initialPosts }: { posts: BlogPost[] }) {
  const router = useRouter();
  const [posts, setPosts] = useState<BlogPost[]>(initialPosts);
  const [view, setView] = useState<View>({ mode: "list" });
  const [confirmingDelete, setConfirmingDelete] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // resync with server data after router.refresh()
  useEffect(() => {
    setPosts(initialPosts);
  }, [initialPosts]);

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

  const del = async (slug: string) => {
    setError(null);
    setConfirmingDelete(null);
    const prev = posts;
    setPosts(posts.filter((p) => p.slug !== slug)); // optimistic

    try {
      const res = await fetch("/api/admin/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug }),
      });
      if (!res.ok) throw new Error();
      router.refresh();
    } catch {
      setPosts(prev); // revert
      setError("delete failed — try again");
    }
  };

  if (view.mode === "editor") {
    return (
      <AdminPostEditor
        post={view.post}
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
      {/* header */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-baseline gap-3">
          <h1 className="text-2xl font-bold">posts</h1>
          <span className="text-sm font-mono text-muted-foreground">
            {posts.length}
          </span>
        </div>
        <Button
          size="sm"
          onClick={() => setView({ mode: "editor", post: null })}
        >
          <Plus className="w-4 h-4" />
          new post
        </Button>
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      {posts.length === 0 && (
        <p className="text-sm text-muted-foreground font-mono">
          no posts yet — create one.
        </p>
      )}

      {/* list */}
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
                onClick={() => setView({ mode: "editor", post })}
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
                  <div className="flex items-center gap-2 text-xs font-mono">
                    <span className="text-muted-foreground">delete?</span>
                    <button
                      type="button"
                      onClick={() => del(post.slug)}
                      className="text-destructive hover:underline"
                    >
                      yes
                    </button>
                    <button
                      type="button"
                      onClick={() => setConfirmingDelete(null)}
                      className="text-muted-foreground hover:text-foreground hover:underline"
                    >
                      no
                    </button>
                  </div>
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
