export const STORAGE_KEYS = {
  posts: "blogs:posts",
  users: "blogs:users",
  comments: "blogs:comments",
  session: "blogs:session",
};

export function readJson(key, fallback) {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

export function writeJson(key, value) {
  if (typeof window === "undefined") return { ok: true };
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
    return { ok: true };
  } catch (error) {
    const quota =
      error instanceof DOMException &&
      (error.name === "QuotaExceededError" || error.code === 22);
    return { ok: false, quota, error };
  }
}

export function setTokenCookie() {
  document.cookie = "token=blogs-demo-token; path=/; max-age=604800; SameSite=Lax";
}

export function clearTokenCookie() {
  document.cookie = "token=; path=/; max-age=0; SameSite=Lax";
}
