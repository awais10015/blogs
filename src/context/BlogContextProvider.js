"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import blogContext from "./blogContext";
import { SEED_POSTS, uniqueSlug } from "@/lib/posts";
import { STORAGE_KEYS, readJson, writeJson } from "@/lib/storage";

export function BlogContextProvider({ children }) {
  const [blogs, setBlogs] = useState(SEED_POSTS);
  const [comments, setComments] = useState([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const storedPosts = readJson(STORAGE_KEYS.posts, null);
    if (Array.isArray(storedPosts) && storedPosts.length) {
      setBlogs(storedPosts);
    } else {
      writeJson(STORAGE_KEYS.posts, SEED_POSTS);
    }
    const storedComments = readJson(STORAGE_KEYS.comments, []);
    setComments(Array.isArray(storedComments) ? storedComments : []);
    setReady(true);
  }, []);

  const persistPosts = (next) => {
    const result = writeJson(STORAGE_KEYS.posts, next);
    if (!result.ok) {
      toast.error(
        result.quota
          ? "Browser storage is full. Try a smaller cover image."
          : "Could not save posts."
      );
      return false;
    }
    setBlogs(next);
    return true;
  };

  const persistComments = (next) => {
    const result = writeJson(STORAGE_KEYS.comments, next);
    if (!result.ok) {
      toast.error("Could not save comments.");
      return false;
    }
    setComments(next);
    return true;
  };

  const addPost = (data) => {
    const now = new Date().toISOString();
    const post = {
      id: `post-${Date.now()}`,
      slug: uniqueSlug(data.title, blogs),
      title: data.title,
      subtitle: data.subtitle,
      description: data.description,
      image: data.image,
      tags: data.tags || [],
      status: data.status || "published",
      authorId: data.authorId,
      authorName: data.authorName,
      createdAt: now,
      updatedAt: now,
    };
    const ok = persistPosts([post, ...blogs]);
    return ok ? post : null;
  };

  const updatePost = (id, data) => {
    let updated = null;
    const next = blogs.map((post) => {
      if (post.id !== id) return post;
      updated = {
        ...post,
        ...data,
        slug: uniqueSlug(data.title || post.title, blogs, id),
        updatedAt: new Date().toISOString(),
      };
      return updated;
    });
    const ok = persistPosts(next);
    return ok ? updated : null;
  };

  const deletePost = (id) => {
    const next = blogs.filter((post) => post.id !== id);
    const ok = persistPosts(next);
    if (ok) {
      persistComments(comments.filter((c) => c.postId !== id));
    }
    return ok;
  };

  const addComment = ({ postId, authorId, authorName, body }) => {
    const comment = {
      id: `comment-${Date.now()}`,
      postId,
      authorId,
      authorName,
      body: String(body).trim(),
      createdAt: new Date().toISOString(),
    };
    const ok = persistComments([...comments, comment]);
    return ok ? comment : null;
  };

  return (
    <blogContext.Provider
      value={{
        blogs,
        comments,
        ready,
        addPost,
        updatePost,
        deletePost,
        addComment,
      }}
    >
      {children}
    </blogContext.Provider>
  );
}
