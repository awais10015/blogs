"use client";

import { useContext, useEffect, useMemo } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import blogContext from "@/context/blogContext";
import { useAuth } from "@/context/AuthContext";
import CommentThread from "@/components/CommentThread";
import PostCard from "@/components/PostCard";
import { formatDate, readingTime } from "@/lib/posts";
import { sanitizeHtml } from "@/lib/sanitize";

export default function BlogDetail() {
  const { slug } = useParams();
  const { blogs } = useContext(blogContext);
  const { currentUser } = useAuth();
  const blog = blogs.find((b) => b.slug === slug);

  useEffect(() => {
    if (blog?.title) document.title = `${blog.title} · Blogs`;
    return () => {
      document.title = "Blogs";
    };
  }, [blog?.title]);

  const related = useMemo(() => {
    if (!blog) return [];
    const tagged = blogs.filter(
      (p) =>
        p.id !== blog.id &&
        p.status === "published" &&
        (p.tags || []).some((tag) => (blog.tags || []).includes(tag))
    );
    if (tagged.length) return tagged.slice(0, 3);
    return blogs
      .filter((p) => p.id !== blog.id && p.status === "published")
      .slice(0, 3);
  }, [blogs, blog]);

  if (!blog) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center px-6 pt-28 text-center">
        <p className="text-xl font-semibold text-[#2E4F21]">Blog not found.</p>
        <Link
          href="/blogs"
          className="mt-4 text-sm font-medium text-[#2E4F21] underline underline-offset-4"
        >
          Back to blogs
        </Link>
      </div>
    );
  }

  if (blog.status === "draft" && currentUser?.id !== blog.authorId) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center px-6 pt-28 text-center">
        <p className="text-xl font-semibold text-[#2E4F21]">This draft is private.</p>
        <Link href="/blogs" className="mt-4 underline">
          Back to blogs
        </Link>
      </div>
    );
  }

  const isOwner = currentUser?.id === blog.authorId;

  return (
    <section className="min-h-screen px-4 pt-40 pb-16 sm:pt-28">
      <article className="mx-auto max-w-3xl">
        <Link
          href="/blogs"
          className="mb-6 inline-flex text-sm font-medium text-[#2E4F21] underline-offset-4 hover:underline dark:text-[#d2f8dc]"
        >
          Back to blogs
        </Link>

        <div className="overflow-hidden rounded-2xl bg-white/90 shadow-lg dark:bg-[#1f3318]/80">
          <img
            src={blog.image}
            alt={blog.title}
            className="h-64 w-full object-cover md:h-[420px]"
          />

          <div className="space-y-4 p-8 md:p-10">
            {blog.status === "draft" ? (
              <span className="inline-block rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-800">
                Draft
              </span>
            ) : null}
            <h1 className="text-3xl font-extrabold leading-snug text-[#1f3318] md:text-4xl dark:text-[#d2f8dc]">
              {blog.title}
            </h1>
            <p className="text-lg font-medium text-neutral-500">{blog.subtitle}</p>
            <p className="text-sm text-neutral-500">
              {blog.authorName} · {formatDate(blog.createdAt)} ·{" "}
              {readingTime(blog.description)} min read
            </p>
            {blog.tags?.length ? (
              <div className="flex flex-wrap gap-2">
                {blog.tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/blogs?tag=${encodeURIComponent(tag)}`}
                    className="rounded-full bg-[#2E4F21]/10 px-3 py-1 text-xs text-[#2E4F21] dark:bg-white/10 dark:text-[#d2f8dc]"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            ) : null}
            {isOwner ? (
              <Link
                href={`/blogs/${blog.slug}/edit`}
                className="inline-flex text-sm font-medium text-[#2E4F21] underline"
              >
                Edit post
              </Link>
            ) : null}
            <hr className="border-neutral-200 dark:border-white/10" />
            <div
              className="prose prose-lg max-w-none text-neutral-800 prose-headings:text-[#2E4F21] prose-a:text-[#2E4F21] dark:text-neutral-200 dark:prose-headings:text-[#d2f8dc] dark:prose-invert"
              dangerouslySetInnerHTML={{
                __html: sanitizeHtml(blog.description),
              }}
            />
            <CommentThread postId={blog.id} />
          </div>
        </div>

        {related.length ? (
          <div className="mt-12">
            <h2 className="mb-4 text-2xl font-bold text-[#2E4F21] dark:text-[#d2f8dc]">
              Related posts
            </h2>
            <div className="grid gap-6 sm:grid-cols-2">
              {related.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          </div>
        ) : null}
      </article>
    </section>
  );
}
