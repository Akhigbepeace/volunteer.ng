import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const isAuthenticated = req.cookies.get("auth_token");

  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/auth") && !isAuthenticated) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (pathname === "/login" && isAuthenticated) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/auth/:path*", "/login"],
};
