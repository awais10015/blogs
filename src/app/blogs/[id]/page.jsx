"use client";

import { useParams } from "next/navigation";
import { useContext } from "react";
import blogContext from "@/context/blogContext";

const BlogDetail = () => {
  const { id } = useParams();
  const { blogs } = useContext(blogContext);

  const blog = blogs.find((b) => b.id === Number(id));

  if (!blog)
    return <div className="p-10 mt-50 text-center text-xl font-semibold text-gray-500">Blog not found.</div>;

  return (
    <section className="px-4 mt-20 md:px-20 py-10">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        <img
          src={blog.Image}
          alt={blog.Title}
          className="w-full h-64 md:h-[400px] object-cover"
        />

        <div className="p-8 md:p-10 space-y-6">
          <h1 className="text-4xl font-extrabold text-gray-900 leading-snug">
            {blog.Title}
          </h1>
          <h2 className="text-lg text-gray-500 font-medium">{blog.Subtitle}</h2>

          <hr className="my-4 border-gray-300" />

          <div
            className="prose prose-lg max-w-none text-gray-800"
            dangerouslySetInnerHTML={{ __html: blog.Description }}
          />
        </div>
      </div>
    </section>
  );
};

export default BlogDetail;
