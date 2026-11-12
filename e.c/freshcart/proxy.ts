import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedRoutes = [
  "/cart",
  "/wishlist",
  "/checkout",
  "/allorders",
  "/change-password",
  "/profile",
];
const authRoutes = ["/login", "/register", "/forgot-password"];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("token")?.value;

  if (!token && protectedRoutes.some((r) => pathname.startsWith(r))) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (token && authRoutes.some((r) => pathname.startsWith(r))) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/cart/:path*",
    "/wishlist/:path*",
    "/checkout/:path*",
    "/allorders/:path*",
    "/change-password/:path*",
    "/profile/:path*",
    "/login",
    "/register",
    "/forgot-password",
  ],
};