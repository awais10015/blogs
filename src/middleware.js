import { NextResponse } from "next/server";

export function middleware(request) {
  const { pathname } = request.nextUrl;
  const isWrite =
    pathname === "/blogs/new" || /^\/blogs\/[^/]+\/edit\/?$/.test(pathname);

  if (!isWrite) return NextResponse.next();

  const token = request.cookies.get("token")?.value;
  if (!token) {
    const url = new URL("/login", request.url);
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/blogs/new", "/blogs/:slug/edit"],
};
