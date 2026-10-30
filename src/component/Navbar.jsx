"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import ThemeToggle from "@/components/ThemeToggle";

const Navbar = () => {
  const auth = useAuth();
  const currentUser = auth?.currentUser;

  return (
    <nav className="fixed top-4 left-0 right-0 z-50 mx-auto max-w-5xl rounded-2xl border border-white/60 bg-white/75 shadow-lg backdrop-blur-xl dark:border-white/10 dark:bg-[#1f3318]/80">
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 md:px-8">
        <Link href="/" className="flex items-center gap-2">
          <img src="/logo.svg" alt="Logo" width={36} height={36} />
          <span className="text-lg font-bold tracking-wide text-[#2E4F21] sm:text-xl dark:text-[#d2f8dc]">
            BLOGS
          </span>
        </Link>

        <div className="flex flex-wrap items-center gap-3 sm:gap-4">
          <Link
            href="/"
            className="text-sm font-medium text-neutral-700 hover:text-[#2E4F21] sm:text-base dark:text-neutral-200 dark:hover:text-white"
          >
            Home
          </Link>
          <Link
            href="/blogs"
            className="text-sm font-medium text-neutral-700 hover:text-[#2E4F21] sm:text-base dark:text-neutral-200 dark:hover:text-white"
          >
            Blogs
          </Link>
          {currentUser ? (
            <>
              <Link
                href="/blogs/new"
                className="inline-flex h-9 items-center rounded-full bg-[#2E4F21] px-4 text-sm text-white hover:bg-[#234018] sm:text-base"
              >
                Write
              </Link>
              <span className="hidden text-sm text-neutral-600 sm:inline dark:text-neutral-300">
                {currentUser.name}
              </span>
              <button
                type="button"
                onClick={() => auth.logout()}
                className="text-sm font-medium text-neutral-700 hover:text-[#2E4F21] dark:text-neutral-200"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="text-sm font-medium text-neutral-700 hover:text-[#2E4F21] sm:text-base dark:text-neutral-200"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="inline-flex h-9 items-center rounded-full bg-[#2E4F21] px-4 text-sm text-white hover:bg-[#234018] sm:text-base"
              >
                Register
              </Link>
            </>
          )}
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
