import { url } from "inspector";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isPublicPath = path === "/login" || path === "/signup";
  const Token = request.cookies.get("token")?.value || "";
  if (isPublicPath && Token) {
    return NextResponse.redirect(new URL('/',request.nextUrl))
  }
  if (!isPublicPath && !Token) {
    return NextResponse.redirect(new URL('/login',request.nextUrl))
  }
}

export const config = {
  matcher: ["/", "/login", "/signup", "/profile"],
};
