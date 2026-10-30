"use client";

import Link from "next/link";
import { formatDate, readingTime } from "@/lib/posts";

export default function PostCard({ post }) {
  return (
    <Link
      href={`/blogs/${post.slug}`}
      className="group overflow-hidden rounded-2xl border border-white/70 bg-white/85 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md dark:border-white/10 dark:bg-[#1f3318]/70"
    >
      <div className="aspect-[16/10] overflow-hidden bg-neutral-100">
        <img
          src={post.image}
          alt={post.title}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="p-5">
        {post.status === "draft" ? (
          <span className="mb-2 inline-block rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-800">
            Draft
          </span>
        ) : null}
        <h3 className="text-lg font-semibold text-[#1f3318] group-hover:text-[#2E4F21] dark:text-[#d2f8dc]">
          {post.title}
        </h3>
        <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-300">
          {post.subtitle}
        </p>
        <p className="mt-3 text-xs text-neutral-500">
          {formatDate(post.createdAt)} · {readingTime(post.description)} min read
        </p>
        {post.tags?.length ? (
          <div className="mt-2 flex flex-wrap gap-1.5">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-[#2E4F21]/10 px-2 py-0.5 text-xs text-[#2E4F21] dark:bg-white/10 dark:text-[#d2f8dc]"
              >
                {tag}
              </span>
            ))}
          </div>
        ) : null}
      </div>
    </Link>
  );
}
