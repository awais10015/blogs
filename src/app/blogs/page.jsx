"use client";
import React, { useContext, useState, useMemo } from "react";

import Link from "next/link";
import blogContext from "@/context/blogContext";
import TiptapEditor from "@/components/TiptapEditor";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Lens } from "@/components/magicui/lens";

import { message, Space } from "antd";

const Page = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [previewBlog, setPreviewBlog] = useState(null);

  const { blogs, setBlogs } = useContext(blogContext);
  const [description, setDescription] = useState("");

  const success = () => {
    messageApi.open({
      type: "success",
      content: "Blog Successfully Added",
    });
  };

  const addBlog = (e) => {
    e.preventDefault();

    const form = e.target;
    const title = form.title.value;
    const subtitle = form.subtitle.value;
    // const description = form.description.value;
    const imageFile = form.image.files[0];

    if (!imageFile) {
      alert("Please select an image.");
      return;
    }

    const imageURL = URL.createObjectURL(imageFile);

    const newBlog = {
      id: Date.now(),
      Title: title,
      Subtitle: subtitle,
      Description: description,
      Image: imageURL,
    };

    setBlogs((prev) => [...prev, newBlog]);
    success();
    form.reset();
    setDescription("");
  };

  const contextValue = useMemo(() => ({ name: "Ant Design" }), []);

  return (
    <>
      {contextHolder}
      <div className="h-23 bg-[#D2F8DC] w-full">{}</div>
      <div className="relative bg-[#D2F8DC] p-10">
        <div className="grid gap-6 md:grid-cols-2 pl-0 sm:pl-20 md:pl-10">
          {blogs.map((blog, index) => (
            <Card
              key={index}
              className="hover:scale-110 transition-all duration-300 ease-in-out relative max-w-md bg-[#a0f1bd] shadow-none"
            >
              <CardHeader>
                <Lens
                  zoomFactor={2}
                  lensSize={150}
                  isStatic={false}
                  ariaLabel="Zoom Area"
                >
                  <img
                    src={blog.Image}
                    alt="image placeholder"
                    width={500}
                    height={500}
                  />
                </Lens>
              </CardHeader>
              <CardContent>
                <CardTitle className="text-2xl">{blog.Title}</CardTitle>
                <CardDescription>{blog.Subtitle}</CardDescription>
              </CardContent>
              <CardFooter className="space-x-4">
                <Button
                  className="hover:scale-110 hover:bg-amber-50"
                  variant="ghost"
                  onClick={() => setPreviewBlog(blog)}
                >
                  Preview
                </Button>
                <Link href={`/blogs/${blog.id}`}>
                  <Button className="hover:scale-110" variant="secondary">
                    Learn More
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>

        <form
          onSubmit={addBlog}
          className="space-y-4 mt-10 bg-[#2E4F21] sm:p-20 md:p-20 mb-10 w-full p-5 rounded-3xl"
        >
          <input
            type="text"
            name="title"
            placeholder="Add Blog Title"
            required
            className="w-full p-2 border placeholder:text-white rounded hover:scale-105 hover:bg-white hover:placeholder:text-black transition-all duration-300 ease-in-out"
          />
          <input
            type="text"
            name="subtitle"
            placeholder="Add Blog Sub Title"
            required
            className="w-full p-3 placeholder:text-white hover:placeholder:text-black rounded border border-gray-30 focus:border-transparent hover:scale-105 hover:bg-white transition-all duration-300 ease-in-out"
          />
          <TiptapEditor
            description={description}
            placeholder="Add Description"
            setDescription={setDescription}
          />

          <input
            type="file"
            name="image"
            accept="image/*"
            required
            className="w-full border border-gray-600 p-2 placeholder:text-white hover:scale-105 hover:bg-white transition-all duration-300 ease-in-out rounded"
          />
          <Space>
            <button
              type="secondary"
              className="px-4 py-2 bg-gray-900 text-white rounded-2xl hover:bg-gray-500
            hover:scale-108 transition-all duration-200 ease-in-out"
            >
              Add Blog
            </button>
          </Space>
        </form>

        {previewBlog && (
          <>
            <Card className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl bg-white p-4 rounded-xl shadow-xl">
              <CardHeader className="flex justify-between items-center">
                <Button
                  className="hover:scale-108 transition-all duration-200 ease-in-out"
                  variant="ghost"
                  onClick={() => setPreviewBlog(null)}
                >
                  Close
                </Button>
              </CardHeader>

              <CardContent className="flex flex-col gap-4">
                <Lens isStatic position={{ x: 260, y: 150 }}>
                  <img
                    src={previewBlog.Image}
                    alt="image placeholder"
                    className="w-full h-64 object-cover rounded"
                  />
                </Lens>

                <CardTitle className="text-3xl">{previewBlog.Title}</CardTitle>
                <CardDescription className="text-lg text-gray-700">
                  {previewBlog.Subtitle}
                </CardDescription>
              </CardContent>

              <CardFooter className="space-x-4"></CardFooter>
            </Card>
          </>
        )}
      </div>
    </>
  );
};

export default Page;
