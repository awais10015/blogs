"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useContext } from "react";
import blogContext from "@/context/blogContext";
import { useAuth } from "@/context/AuthContext";
import PostForm from "@/components/PostForm";

export default function NewPostPage() {
  const { addPost } = useContext(blogContext);
  const { currentUser } = useAuth();
  const router = useRouter();

  const onSubmit = async (data) => {
    if (!currentUser) {
      toast.error("Log in to write.");
      router.push("/login?next=/blogs/new");
      return;
    }
    const post = addPost({
      ...data,
      authorId: currentUser.id,
      authorName: currentUser.name,
    });
    if (!post) return;
    toast.success(data.status === "draft" ? "Draft saved." : "Post published.");
    router.push(data.status === "draft" ? "/blogs" : `/blogs/${post.slug}`);
  };

  return (
    <div className="min-h-screen px-4 pt-40 pb-16 sm:pt-28">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-6 text-3xl font-bold text-[#2E4F21] dark:text-[#d2f8dc]">
          Write a post
        </h1>
        <PostForm onSubmit={onSubmit} />
      </div>
    </div>
  );
}
