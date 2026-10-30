export type PostStatus = "published" | "draft";

export type Post = {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  tags: string[];
  status: PostStatus;
  authorId: string;
  authorName: string;
  createdAt: string;
  updatedAt: string;
};

export type BlogContextValue = {
  blogs: Post[];
};
