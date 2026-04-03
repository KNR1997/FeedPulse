import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { AUTH_CRED } from "./utils/constants";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    (pathname === "/login" || pathname === "/register") &&
    request.cookies.has(AUTH_CRED)
  )
    return NextResponse.redirect(new URL("/", request.url));

  if (
    (pathname === "/" ||
      pathname === "/accounts" ||
      pathname === "/feedbacks") &&
    !request.cookies.has(AUTH_CRED)
  )
    return NextResponse.redirect(new URL("/login", request.url));

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/landing", "/accounts", "/login", "/register", "/feedbacks"],
};
