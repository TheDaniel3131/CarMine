// // middleware.ts
// import { NextRequest, NextResponse } from "next/server";

// export function middleware(req: NextRequest) {
//   const { pathname } = req.nextUrl;

//   // Allow access to login and signup routes
//   if (pathname === "/admin/signin" || pathname === "/admin/signup") {
//     return NextResponse.next();
//   }

//   // Check for the session cookie (admin-session)
//   const session = req.cookies.get("admin-session");

//   if (!session) {
//     return NextResponse.redirect(new URL("/admin/signin", req.url)); // Redirect if no session
//   }

//   return NextResponse.next(); // Allow access to protected routes
// }

// // Apply middleware to all admin routes
// export const config = {
//   matcher: ["/admin/:path*"], // Protect all routes under /admin/*
// };


export function middleware(){

}