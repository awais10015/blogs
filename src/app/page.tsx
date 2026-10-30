"use client";

import React, { useContext } from "react";
import { Globe } from "@/components/magicui/globe";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import blogContext from "@/context/blogContext";
import PostCard from "@/components/PostCard";

const Page = () => {
  const { blogs } = useContext(blogContext);
  const featured = blogs
    .filter((blog) => blog.status === "published")
    .slice(0, 3);

  return (
    <div className="flex min-h-screen flex-col">
      <section className="mx-auto flex min-h-[calc(100svh)] w-full max-w-6xl flex-col-reverse items-center justify-center gap-8 px-6 pt-40 pb-12 sm:pt-28 md:flex-row md:gap-12">
        <div className="flex-shrink-0 scale-90 md:scale-100">
          <Globe />
        </div>

        <div className="max-w-xl text-center lg:text-left">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#2E4F21]/70 dark:text-[#d2f8dc]/70">
            A quiet place to read
          </p>
          <h1 className="text-4xl font-bold leading-tight text-[#2E4F21] sm:text-5xl dark:text-[#d2f8dc]">
            Stories, notes, and ideas worth sitting with.
          </h1>
          <p className="mt-5 text-base leading-relaxed text-[#2E4F21]/80 sm:text-lg dark:text-neutral-300">
            Welcome to Blogs — a small editorial space for makers, writers, and
            wanderers. Read featured essays, or publish a piece of your own.
          </p>
          <div className="mt-8">
            <Link
              href="/blogs"
              className={cn(
                buttonVariants({ variant: "secondary" }),
                "h-11 px-6 text-base"
              )}
            >
              View Blogs
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 pb-20">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-[#2E4F21] sm:text-3xl dark:text-[#d2f8dc]">
              Featured posts
            </h2>
            <p className="mt-1 text-[#2E4F21]/70 dark:text-neutral-300">
              A few published pieces to start with.
            </p>
          </div>
          <Link
            href="/blogs"
            className="shrink-0 text-sm font-medium text-[#2E4F21] hover:underline dark:text-[#d2f8dc]"
          >
            See all
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((blog) => (
            <PostCard key={blog.id} post={blog} />
          ))}
        </div>
      </section>

      <footer className="mt-auto border-t border-[#2E4F21]/10 py-8 text-center text-sm text-[#2E4F21]/70 dark:text-neutral-400">
        Blogs — written for readers, not algorithms.
      </footer>
    </div>
  );
};

export default Page;
