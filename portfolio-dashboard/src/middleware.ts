import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "./services/AuthServices";

const publicRoutes = ["/login"];

export const middleware = async (request: NextRequest) => {
  const { pathname, origin } = request.nextUrl;
  const userInfo = await getCurrentUser();

  const isPublicRoute = publicRoutes.includes(pathname);

  if (!userInfo) {
    // Not logged in and trying to access a protected route
    if (!isPublicRoute) {
      const redirectUrl = `${origin}/login?redirectPath=${encodeURIComponent(
        pathname
      )}`;
      return NextResponse.redirect(redirectUrl);
    }
    return NextResponse.next(); // Accessing public route like /login
  }

  // Logged in user trying to access /login
  if (pathname === "/login") {
    return NextResponse.redirect(`${origin}/`);
  }

  // Logged in and accessing any other route
  return NextResponse.next();
};

export const config = {
  // matcher: ["/", "/login", "/:path*"],
  matcher: ["/((?!_next|favicon.ico|images|api).*)"],
};
