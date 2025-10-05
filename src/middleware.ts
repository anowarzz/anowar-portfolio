import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  console.log(pathname);

  if (pathname.startsWith("/admin-control")) {
    try {
      const cookieHeader = request.headers.get("cookie");

      console.log("Cookie header:", cookieHeader); 

      const response = await fetch(
        `https://anowarzz-portfolio-server.vercel.app/api/admin/verify-token`,
        {
          method: "GET",
          headers: {
            Cookie: cookieHeader || "",
            "Content-Type": "application/json",
          },
          credentials: "include",
          cache: "no-store",
        }
      );

      console.log("Response status:", response.status);

      if (!response.ok) {
        console.log("Failed to verify token");
        return NextResponse.redirect(new URL("/admin-login", request.url));
      }

      const isAdmin = await response.json();
      console.log("isAdmin:", isAdmin);

      if (!isAdmin) {
        console.log("User is not an admin");
        return NextResponse.redirect(new URL("/admin-login", request.url));
      }
    } catch (error) {
      console.log("Error verifying token:", error);
      return NextResponse.redirect(new URL("/admin-login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin-control/:path*"],
};
