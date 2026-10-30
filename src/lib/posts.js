export const EDITOR_USER = {
  id: "editor-1",
  name: "Editor",
  email: "editor@blogs.test",
  password: "asdf",
};

export const SEED_POSTS = [
  {
    id: "post-0",
    slug: "writing-in-the-age-of-distraction",
    title: "Writing in the Age of Distraction",
    subtitle: "How to keep a quiet mind while the feed never stops.",
    description: `
      <p>Most of us do not lack ideas. We lack a stretch of uninterrupted attention long enough to finish a sentence we actually mean.</p>
      <p>This note is a small argument for slower publishing: one thought, one page, written as if a friend might read it on a Sunday morning.</p>
      <p>Close the extra tabs. Keep the draft ugly until the idea is honest. Then share it.</p>
    `,
    image:
      "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=1400&q=80",
    tags: ["writing", "attention"],
    status: "published",
    authorId: EDITOR_USER.id,
    authorName: EDITOR_USER.name,
    createdAt: "2026-03-12T10:00:00.000Z",
    updatedAt: "2026-03-12T10:00:00.000Z",
  },
  {
    id: "post-1",
    slug: "a-quiet-morning-ritual",
    title: "A Quiet Morning Ritual",
    subtitle: "Coffee, a notebook, and twenty minutes that belong to you.",
    description: `
      <p>The first hour of the day is easy to spend on other people's urgency. A ritual is a fence around that hour.</p>
      <p>I boil water, sit by the window, and write three lines that are not for anyone else. It is not productivity. It is a way of arriving in the day.</p>
      <p>If you try it, keep the bar low. Twenty minutes. No audience. No score.</p>
    `,
    image:
      "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1400&q=80",
    tags: ["ritual", "mornings"],
    status: "published",
    authorId: EDITOR_USER.id,
    authorName: EDITOR_USER.name,
    createdAt: "2026-04-02T08:00:00.000Z",
    updatedAt: "2026-04-02T08:00:00.000Z",
  },
  {
    id: "post-2",
    slug: "notes-from-the-trail",
    title: "Notes from the Trail",
    subtitle: "What walking teaches that sitting never will.",
    description: `
      <p>A path is a kind of editor. It removes the extra plot, the extra worry, until the next step is obvious.</p>
      <p>I started walking with a small notebook because the best sentences arrived between trees, not at the desk. They are rarely grand. They are specific: light on a fence, a bird I cannot name, the sound of my own breathing.</p>
      <p>Bring the notes home. Let them become the piece you meant to write all week.</p>
    `,
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1400&q=80",
    tags: ["walking", "notes"],
    status: "published",
    authorId: EDITOR_USER.id,
    authorName: EDITOR_USER.name,
    createdAt: "2026-05-18T14:00:00.000Z",
    updatedAt: "2026-05-18T14:00:00.000Z",
  },
  {
    id: "post-3",
    slug: "designing-spaces-that-think",
    title: "Designing Spaces That Think",
    subtitle: "Rooms, screens, and the feeling of enough.",
    description: `
      <p>A good workspace is not a shrine to tools. It is a place that makes the next useful action feel obvious.</p>
      <p>Clear the desk until only the current piece remains. Use type that is kind to tired eyes. Leave a margin — on the page, and in the day.</p>
      <p>Design is hospitality. If a reader stays, the space did its job.</p>
    `,
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1400&q=80",
    tags: ["design", "workspace"],
    status: "published",
    authorId: EDITOR_USER.id,
    authorName: EDITOR_USER.name,
    createdAt: "2026-06-09T11:00:00.000Z",
    updatedAt: "2026-06-09T11:00:00.000Z",
  },
];

export function slugify(title) {
  const base =
    String(title || "")
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") || "post";
  return base;
}

export function uniqueSlug(title, posts, ignoreId) {
  const base = slugify(title);
  let slug = base;
  let i = 2;
  while (posts.some((p) => p.slug === slug && p.id !== ignoreId)) {
    slug = `${base}-${i}`;
    i += 1;
  }
  return slug;
}

export function stripHtml(html) {
  return String(html || "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function readingTime(html) {
  const words = stripHtml(html).split(" ").filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

export function formatDate(iso) {
  if (!iso) return "";
  try {
    return new Date(iso).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return "";
  }
}

export function parseTags(value) {
  return String(value || "")
    .split(",")
    .map((tag) => tag.trim().toLowerCase())
    .filter(Boolean)
    .slice(0, 8);
}