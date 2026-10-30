import DOMPurify from "dompurify";

export function sanitizeHtml(html) {
  const str = String(html || "");
  if (typeof window === "undefined") {
    return str
      .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, "")
      .replace(/\son\w+="[^"]*"/gi, "")
      .replace(/javascript:/gi, "");
  }
  return DOMPurify.sanitize(str, { USE_PROFILES: { html: true } });
}
