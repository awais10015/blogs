"use client";

import React from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";

const TiptapEditor = ({ description, setDescription }) => {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "Add blog description here...",
        showOnlyWhenEditable: true,
        showOnlyCurrent: false,
      }),
    ],
    content: description || "",
    onUpdate: ({ editor }) => {
      setDescription(editor.getHTML());
    },
  });

  React.useEffect(() => {
    if (!editor) return;
    if (description === "" && editor.getText().trim() !== "") {
      editor.commands.setContent("");
    }
  }, [description, editor]);

  if (!editor) return null;

  return (
    <div className="w-full">
      <div className="flex gap-2 border border-neutral-200 p-2 rounded-t-lg bg-neutral-50">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`${
            editor.isActive("bold")
              ? "bg-[#2E4F21] text-white"
              : "bg-white text-[#1f3318]"
          } px-2 py-1 border border-neutral-200 rounded`}
        >
          B
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`${
            editor.isActive("italic")
              ? "bg-[#2E4F21] text-white"
              : "bg-white text-[#1f3318]"
          } px-2 py-1 border border-neutral-200 rounded`}
        >
          I
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`${
            editor.isActive("bulletList")
              ? "bg-[#2E4F21] text-white"
              : "bg-white text-[#1f3318]"
          } px-2 py-1 border border-neutral-200 rounded`}
        >
          • List
        </button>
      </div>

      <div className="border border-t-0 border-neutral-200 text-[#1f3318] bg-white rounded-b-lg p-3 min-h-32">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

export default TiptapEditor;
