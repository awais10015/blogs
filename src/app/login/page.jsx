"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";
import { Suspense } from "react";

function LoginForm() {
  const { login } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next") || "/blogs";
  const [email, setEmail] = useState("editor@blogs.test");
  const [password, setPassword] = useState("asdf");

  const onSubmit = (e) => {
    e.preventDefault();
    const result = login(email, password);
    if (!result.ok) {
      toast.error(result.error);
      return;
    }
    toast.success("Welcome back.");
    router.push(next);
  };

  return (
    <div className="mx-auto w-full max-w-md rounded-2xl border border-white/70 bg-white/90 p-8 shadow-sm dark:border-white/10 dark:bg-[#1f3318]/80">
      <h1 className="text-3xl font-bold text-[#2E4F21] dark:text-[#d2f8dc]">
        Login
      </h1>
      <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300">
        Demo account: editor@blogs.test / asdf
      </p>
      <form onSubmit={onSubmit} className="mt-6 space-y-4">
        <label className="block space-y-1">
          <span className="text-sm font-medium">Email</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full rounded-lg border border-neutral-200 p-3 dark:border-white/10 dark:bg-[#1f3318]"
          />
        </label>
        <label className="block space-y-1">
          <span className="text-sm font-medium">Password</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full rounded-lg border border-neutral-200 p-3 dark:border-white/10 dark:bg-[#1f3318]"
          />
        </label>
        <button
          type="submit"
          className="w-full rounded-full bg-[#2E4F21] py-2.5 text-white hover:bg-[#234018]"
        >
          Sign in
        </button>
      </form>
      <p className="mt-4 text-sm text-neutral-600 dark:text-neutral-300">
        New here?{" "}
        <Link href="/register" className="font-medium text-[#2E4F21] underline">
          Create an account
        </Link>
      </p>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4 pt-24 pb-12">
      <Suspense>
        <LoginForm />
      </Suspense>
    </div>
  );
}
