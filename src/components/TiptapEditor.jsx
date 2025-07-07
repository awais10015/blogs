"use client";

import React from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";

const TiptapEditor = ({ description, setDescription }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "Add Blog Description here...",
        showOnlyWhenEditable: true,
        showOnlyCurrent: false,
      }),
    ],
    content: description || "",
    onUpdate: ({ editor }) => {
      setDescription(editor.getHTML());
    },
  });

  if (!editor) return null;

  return (
    <div className="w-full placeholder:text-white">
      
      <div className="flex gap-2 border p-2 rounded-t bg-gray-100">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`${
            editor.isActive("bold") ? "bg-[#2E4F21] text-white" : "bg-white"
          } px-2 py-1 border rounded`}
        >
          B
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`${
            editor.isActive("italic") ? "bg-[#2E4F21] text-white" : "bg-white"
          } px-2 py-1 border rounded`}
        >
          I
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`${
            editor.isActive("bulletList")
              ? "bg-[#2E4F21] text-white"
              : "bg-white"
          } px-2 py-1 border rounded`}
        >
          • List
        </button>
      </div>

    
      <div className="border border-t-0 text-white rounded-b p-2 min-h-10">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

export default TiptapEditor;
