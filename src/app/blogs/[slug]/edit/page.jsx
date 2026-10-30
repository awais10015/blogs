"use client";

import { useContext } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import blogContext from "@/context/blogContext";
import { useAuth } from "@/context/AuthContext";
import PostForm from "@/components/PostForm";

export default function EditPostPage() {
  const { slug } = useParams();
  const { blogs, updatePost, deletePost } = useContext(blogContext);
  const { currentUser } = useAuth();
  const router = useRouter();
  const post = blogs.find((b) => b.slug === slug);

  if (!post) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center px-6 pt-28 text-center">
        <p className="text-xl font-semibold text-[#2E4F21]">Post not found.</p>
        <Link href="/blogs" className="mt-4 underline">
          Back to blogs
        </Link>
      </div>
    );
  }

  if (currentUser && currentUser.id !== post.authorId) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center px-6 pt-28 text-center">
        <p className="text-xl font-semibold text-[#2E4F21]">
          You can only edit your own posts.
        </p>
        <Link href={`/blogs/${post.slug}`} className="mt-4 underline">
          View article
        </Link>
      </div>
    );
  }

  const onSubmit = async (data) => {
    const updated = updatePost(post.id, data);
    if (!updated) return;
    toast.success("Post updated.");
    router.push(`/blogs/${updated.slug}`);
  };

  const onDelete = () => {
    if (!window.confirm("Delete this post? This cannot be undone.")) return;
    if (deletePost(post.id)) {
      toast.success("Post deleted.");
      router.push("/blogs");
    }
  };

  return (
    <div className="min-h-screen px-4 pt-40 pb-16 sm:pt-28">
      <div className="mx-auto max-w-3xl">
        <div className="mb-6 flex items-center justify-between gap-4">
          <h1 className="text-3xl font-bold text-[#2E4F21] dark:text-[#d2f8dc]">
            Edit post
          </h1>
          <button
            type="button"
            onClick={onDelete}
            className="text-sm font-medium text-red-700 hover:underline"
          >
            Delete
          </button>
        </div>
        <PostForm
          initial={post}
          onSubmit={onSubmit}
          submitLabel="Save changes"
          requireImage={false}
        />
      </div>
    </div>
  );
}
