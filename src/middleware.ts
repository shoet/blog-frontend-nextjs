import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { getUsersMe } from "./services/getUsersMe";

export async function middleware(request: NextRequest) {
  if (
    request.nextUrl.pathname === "/admin" ||
    request.nextUrl.pathname.startsWith("/admin/blogs")
  ) {
    if (!(await authGuard())) {
      return NextResponse.redirect(new URL("/admin/signin", request.url));
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin", "/admin/blogs/:path*"],
};

export async function authGuard(): Promise<boolean> {
  const token = cookies().get("authToken");
  if (!token || token.value == "") return false;
  try {
    await getUsersMe(token.value);
    return true;
  } catch (e) {
    return false;
  }
}
