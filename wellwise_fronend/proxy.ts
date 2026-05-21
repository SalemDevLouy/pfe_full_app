import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const legacyMainRoutes: Record<string, string> = {
    "/dashboard": "/main/dashboard",
    "/tracker": "/main/tracker",
    "/insights": "/main/insights",
    "/assessment": "/main/assessment",
    "/store": "/main/store",
    "/profile": "/main/profile",
    "/cart": "/main/cart",
    "/product-details": "/main/product-details",
  };

  // Keep old links/bookmarks working after moving routes under /main.
  if (legacyMainRoutes[pathname]) {
    const url = request.nextUrl.clone();
    url.pathname = legacyMainRoutes[pathname];
    return NextResponse.redirect(url);
  }

    const token = await getToken({
   req: request,
   cookieName: process.env.VERCEL_ENV === "development"
                ? "next-auth.session-token"
                : "__Secure-next-auth.session-token",
   secret: process.env.NEXTAUTH_SECRET,
})


  // All routes under /main are private and require authentication.
  const isProtectedRoute = pathname === "/main" || pathname.startsWith("/main/");

  if (isProtectedRoute && !token) {
    const url = request.nextUrl.clone();
    url.pathname = "/signin";
    url.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(url);
  }

  // If authenticated and trying to access auth pages, redirect to main dashboard.
  if (token && (pathname === "/signin" || pathname === "/signup" || pathname === "/login")) {
    const url = request.nextUrl.clone();
    url.pathname = "/main/dashboard";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|public).*)",
  ],
};
