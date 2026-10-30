"use client";

import { useContext, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import blogContext from "@/context/blogContext";
import { useAuth } from "@/context/AuthContext";
import { formatDate } from "@/lib/posts";

export default function CommentThread({ postId }) {
  const { comments, addComment } = useContext(blogContext);
  const { currentUser } = useAuth();
  const [body, setBody] = useState("");
  const thread = comments.filter((c) => c.postId === postId);

  const submit = (e) => {
    e.preventDefault();
    if (!currentUser) return;
    if (!body.trim()) {
      toast.error("Write a comment first.");
      return;
    }
    const saved = addComment({
      postId,
      authorId: currentUser.id,
      authorName: currentUser.name,
      body: body.trim(),
    });
    if (saved) {
      setBody("");
      toast.success("Comment added.");
    }
  };

  return (
    <section className="mt-10 border-t border-neutral-200 pt-8 dark:border-white/10">
      <h2 className="text-xl font-bold text-[#2E4F21] dark:text-[#d2f8dc]">
        Comments ({thread.length})
      </h2>
      <ul className="mt-4 space-y-4">
        {thread.length === 0 ? (
          <li className="text-sm text-neutral-500">No comments yet.</li>
        ) : (
          thread.map((comment) => (
            <li
              key={comment.id}
              className="rounded-xl bg-neutral-50 p-4 dark:bg-white/5"
            >
              <p className="text-sm font-medium text-[#1f3318] dark:text-[#d2f8dc]">
                {comment.authorName}
                <span className="ml-2 font-normal text-neutral-500">
                  {formatDate(comment.createdAt)}
                </span>
              </p>
              <p className="mt-1 text-neutral-700 dark:text-neutral-300">
                {comment.body}
              </p>
            </li>
          ))
        )}
      </ul>

      {currentUser ? (
        <form onSubmit={submit} className="mt-6 space-y-3">
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows={3}
            placeholder="A thoughtful note…"
            className="w-full rounded-lg border border-neutral-200 p-3 text-[#1f3318] focus:outline-none focus:ring-2 focus:ring-[#2E4F21]/30 dark:border-white/10 dark:bg-[#1f3318] dark:text-[#d2f8dc]"
          />
          <button
            type="submit"
            className="rounded-full bg-[#2E4F21] px-4 py-2 text-sm text-white hover:bg-[#234018]"
          >
            Post comment
          </button>
        </form>
      ) : (
        <p className="mt-6 text-sm text-neutral-600 dark:text-neutral-300">
          <Link href="/login" className="font-medium text-[#2E4F21] underline">
            Log in
          </Link>{" "}
          to comment.
        </p>
      )}
    </section>
  );
}
