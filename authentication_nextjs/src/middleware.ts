import { url } from "inspector";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
// Middleware in next.js runs before a request is completed.
export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isPublicPath = path === "/login" || path === "/signup";
  const Token = request.cookies.get("token")?.value || "";
  if (isPublicPath && Token) {
    // If user already logged in (has a token) but tries to go to /login or /signup,
    // redirect them to / (home).
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }
  if (!isPublicPath && !Token) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }
}

export const config = {
  //  matcher: tells Next.js which routes this middleware should run on.
  matcher: ["/", "/login", "/signup", "/profile"],
};
