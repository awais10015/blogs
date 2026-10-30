"use client";

import { Suspense, useContext, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import blogContext from "@/context/blogContext";
import { useAuth } from "@/context/AuthContext";
import PostCard from "@/components/PostCard";

function BlogsList() {
  const { blogs } = useContext(blogContext);
  const { currentUser } = useAuth();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState("");

  useEffect(() => {
    const tag = searchParams.get("tag");
    if (tag) setActiveTag(tag);
  }, [searchParams]);

  const visible = useMemo(() => {
    return blogs.filter((post) => {
      const isOwner = currentUser && post.authorId === currentUser.id;
      if (post.status !== "published" && !isOwner) return false;
      if (activeTag && !(post.tags || []).includes(activeTag)) return false;
      if (!query.trim()) return true;
      const hay = `${post.title} ${post.subtitle} ${(post.tags || []).join(" ")}`.toLowerCase();
      return hay.includes(query.trim().toLowerCase());
    });
  }, [blogs, currentUser, query, activeTag]);

  const tags = useMemo(() => {
    const set = new Set();
    blogs.forEach((post) => {
      if (post.status === "published" || post.authorId === currentUser?.id) {
        (post.tags || []).forEach((tag) => set.add(tag));
      }
    });
    return [...set].sort();
  }, [blogs, currentUser]);

  return (
    <div className="min-h-screen px-4 pt-40 pb-16 sm:px-6 sm:pt-28">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-[#2E4F21] sm:text-4xl dark:text-[#d2f8dc]">
              All posts
            </h1>
            <p className="mt-2 text-[#2E4F21]/70 dark:text-neutral-300">
              Search the archive, or write if you are signed in.
            </p>
          </div>
          {currentUser ? (
            <Link
              href="/blogs/new"
              className="rounded-full bg-[#2E4F21] px-4 py-2 text-sm text-white hover:bg-[#234018]"
            >
              Write
            </Link>
          ) : null}
        </header>

        <div className="mb-6">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search titles, subtitles, tags…"
            className="w-full rounded-xl border border-white/70 bg-white/90 p-3 text-[#1f3318] focus:outline-none focus:ring-2 focus:ring-[#2E4F21]/30 dark:border-white/10 dark:bg-[#1f3318]/80 dark:text-[#d2f8dc]"
          />
        </div>

        {tags.length ? (
          <div className="mb-8 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setActiveTag("")}
              className={`rounded-full px-3 py-1 text-sm ${
                !activeTag
                  ? "bg-[#2E4F21] text-white"
                  : "bg-white/80 text-[#2E4F21] dark:bg-white/10 dark:text-[#d2f8dc]"
              }`}
            >
              All
            </button>
            {tags.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => setActiveTag(tag === activeTag ? "" : tag)}
                className={`rounded-full px-3 py-1 text-sm ${
                  activeTag === tag
                    ? "bg-[#2E4F21] text-white"
                    : "bg-white/80 text-[#2E4F21] dark:bg-white/10 dark:text-[#d2f8dc]"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        ) : null}

        {visible.length === 0 ? (
          <p className="rounded-2xl bg-white/80 p-8 text-center text-neutral-600 dark:bg-[#1f3318]/70 dark:text-neutral-300">
            No posts match that search.
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function BlogsPage() {
  return (
    <Suspense>
      <BlogsList />
    </Suspense>
  );
}
