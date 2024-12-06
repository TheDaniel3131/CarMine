import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname, searchParams } = req.nextUrl;

  // Allow access to the signin page
  if (pathname === "/admin/signin") {
    return NextResponse.next();
  }

  // Protect all routes under /admin/accessed
  if (pathname.startsWith("/admin/accessed")) {
    const isAuthenticated = searchParams.get("authenticated") === "true";

    if (!isAuthenticated) {
      // Redirect unauthenticated users to signin
      return NextResponse.redirect(new URL("/admin/signin", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/accessed/:path*"],
};
