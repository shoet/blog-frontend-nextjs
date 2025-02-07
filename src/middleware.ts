import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { getUsersMe } from "./services/getUsersMe";

export async function middleware(request: NextRequest) {
  if (
    request.nextUrl.pathname === "/admin" ||
    request.nextUrl.pathname.startsWith("/admin/blogs")
  ) {
    // 未ログイン状態でアクセスした場合にはログイン画面にリダイレクトする
    if (!(await authGuard())) {
      return NextResponse.redirect(new URL("/admin/signin", request.url));
    }
  }
  if (request.nextUrl.pathname === "/admin/signin") {
    // ログイン済みの場合は/adminに管理画面トップにリダイレクトする
    if (await authGuard()) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin", "/admin/signin", "/admin/blogs/:path*"],
};

export async function authGuard(): Promise<boolean> {
  const cookie = await cookies();
  const token = cookie.get("authToken");
  if (!token || token.value == "") return false;
  try {
    await getUsersMe(token.value);
    return true;
  } catch (e) {
    return false;
  }
}
