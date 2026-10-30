# Blogs

A Next.js blog app for reading, searching, and writing posts. Data is stored in the browser (localStorage)—no backend database.

## Features

- Home page with featured posts
- Post archive at `/blogs` with search and tag filters
- Individual post pages with sanitized HTML content
- Rich-text editor (TipTap) for creating and editing posts
- Draft and published post statuses
- Comments (stored locally)
- Light/dark theme
- Client-side auth with cookie-gated write routes

## Tech stack

- [Next.js 15](https://nextjs.org/) (App Router)
- React 19
- Tailwind CSS 4
- TipTap, DOMPurify, Sonner, next-themes

## Getting started

### Prerequisites

- Node.js 20+ (recommended)
- npm

### Install and run

```bash
cd blogs
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Other scripts

| Command         | Description            |
| --------------- | ---------------------- |
| `npm run build` | Production build       |
| `npm run start` | Serve production build |
| `npm run lint`  | ESLint (Next.js config)|

## Demo account

A seed editor user is always available:

| Field    | Value               |
| -------- | ------------------- |
| Email    | `editor@blogs.test` |
| Password | `asdf`              |

You can also register a new account from `/register`. Sessions and posts persist in **localStorage** for that browser only.

## Routes

| Path                 | Description                    |
| -------------------- | ------------------------------ |
| `/`                  | Landing / featured posts       |
| `/blogs`             | All posts (search and tags)    |
| `/blogs/[slug]`      | Read a post                    |
| `/blogs/new`         | Create post (login required)   |
| `/blogs/[slug]/edit` | Edit post (login required)     |
| `/login`, `/register`| Auth                           |

Middleware redirects unauthenticated users from write routes to `/login`.

## Project structure

```
src/
  app/              # App Router pages
  components/       # UI, PostForm, TipTap editor, etc.
  context/          # Auth and blog state
  lib/              # posts helpers, storage, sanitize
  middleware.js     # Protects new/edit routes
```

## Notes

- This is a **demo/local-first** app: clearing site data removes posts, users, and comments.
- Passwords are stored in plain text in localStorage—not suitable for production as-is.
