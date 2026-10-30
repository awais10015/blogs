"use client";

import { useState } from "react";
import { toast } from "sonner";
import TiptapEditor from "@/components/TiptapEditor";
import { compressImageFile } from "@/lib/images";
import { parseTags } from "@/lib/posts";

const fieldClass =
  "w-full p-3 rounded-lg border border-neutral-200 bg-white text-[#1f3318] placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#2E4F21]/30 dark:border-white/10 dark:bg-[#1f3318] dark:text-[#d2f8dc]";

export default function PostForm({
  initial,
  onSubmit,
  submitLabel = "Publish",
  requireImage = true,
}) {
  const [title, setTitle] = useState(initial?.title || "");
  const [subtitle, setSubtitle] = useState(initial?.subtitle || "");
  const [tags, setTags] = useState((initial?.tags || []).join(", "));
  const [description, setDescription] = useState(initial?.description || "");
  const [image, setImage] = useState(initial?.image || "");
  const [busy, setBusy] = useState(false);

  const handleFile = async (file) => {
    if (!file) return;
    setBusy(true);
    try {
      const dataUrl = await compressImageFile(file);
      setImage(dataUrl);
    } catch {
      toast.error("Could not process that image.");
    } finally {
      setBusy(false);
    }
  };

  const save = async (status) => {
    if (!title.trim() || !subtitle.trim() || !description.trim()) {
      toast.error("Title, subtitle, and body are required.");
      return;
    }
    if (requireImage && !image) {
      toast.error("Please add a cover image.");
      return;
    }
    setBusy(true);
    try {
      await onSubmit({
        title: title.trim(),
        subtitle: subtitle.trim(),
        description,
        image,
        tags: parseTags(tags),
        status,
      });
    } finally {
      setBusy(false);
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        save("published");
      }}
      className="space-y-5 rounded-2xl border border-white/70 bg-white/90 p-6 shadow-sm sm:p-10 dark:border-white/10 dark:bg-[#1f3318]/80"
    >
      <label className="block space-y-1.5">
        <span className="text-sm font-medium text-[#2E4F21] dark:text-[#d2f8dc]">
          Title
        </span>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="A clear title"
          required
          className={fieldClass}
        />
      </label>

      <label className="block space-y-1.5">
        <span className="text-sm font-medium text-[#2E4F21] dark:text-[#d2f8dc]">
          Subtitle
        </span>
        <input
          value={subtitle}
          onChange={(e) => setSubtitle(e.target.value)}
          placeholder="One line that invites a read"
          required
          className={fieldClass}
        />
      </label>

      <label className="block space-y-1.5">
        <span className="text-sm font-medium text-[#2E4F21] dark:text-[#d2f8dc]">
          Tags
        </span>
        <input
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          placeholder="writing, notes, design"
          className={fieldClass}
        />
      </label>

      <div className="space-y-1.5">
        <span className="text-sm font-medium text-[#2E4F21] dark:text-[#d2f8dc]">
          Body
        </span>
        <TiptapEditor
          key={initial?.id || "new"}
          description={description}
          setDescription={setDescription}
        />
      </div>

      <label className="block space-y-1.5">
        <span className="text-sm font-medium text-[#2E4F21] dark:text-[#d2f8dc]">
          Cover image
        </span>
        <input
          type="file"
          name="image"
          accept="image/*"
          required={requireImage && !image}
          onChange={(e) => handleFile(e.target.files?.[0])}
          className="w-full rounded-lg border border-neutral-200 bg-white p-3 text-sm text-neutral-700 file:mr-3 file:rounded-md file:border-0 file:bg-[#2E4F21] file:px-3 file:py-1.5 file:text-white dark:border-white/10 dark:bg-[#1f3318] dark:text-neutral-200"
        />
        {image ? (
          <img
            src={image}
            alt="Cover preview"
            className="mt-2 h-40 w-full rounded-lg object-cover"
          />
        ) : null}
      </label>

      <div className="flex flex-wrap gap-3">
        <button
          type="submit"
          disabled={busy}
          className="rounded-full bg-[#2E4F21] px-5 py-2.5 text-white hover:bg-[#234018] disabled:opacity-60"
        >
          {busy ? "Saving…" : submitLabel}
        </button>
        <button
          type="button"
          disabled={busy}
          onClick={() => save("draft")}
          className="rounded-full border border-[#2E4F21] px-5 py-2.5 text-[#2E4F21] hover:bg-[#2E4F21]/10 disabled:opacity-60 dark:border-[#d2f8dc] dark:text-[#d2f8dc]"
        >
          Save draft
        </button>
      </div>
    </form>
  );
}
