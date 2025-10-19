import { cookies } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";
import { getUsersMe } from "./services/getUsersMe";
import { FetchError } from "./services";

export async function middleware(request: NextRequest) {
  // CloudFrontOACがPOST/PUTリクエストの場合にx-amz-content-sha256ヘッダーにペイロードハッシュを含める必要があるため
  if (request.method === "POST" || request.method === "PUT") {
    const sha256 = await createSHA256(request);
    request.headers.set("x-amz-content-sha256", sha256);
  }
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

async function createSHA256(request: NextRequest) {
  const originalRequest = request.clone();
  const buffer = await originalRequest.arrayBuffer();
  const hashBuffer = await crypto.subtle.digest("SHA-256", buffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  return hashHex;
}

export const config = {
  matcher: ["/admin", "/admin/signin", "/admin/blogs/:path*"],
};

export async function authGuard(): Promise<boolean> {
  const cookie = await cookies();
  const token = cookie.get("authToken");
  if (!token || token.value === "") return false;
  try {
    await getUsersMe(token.value);
    return true;
  } catch (e) {
    if (e instanceof FetchError) {
      if (e.status === 401) {
        cookie.delete("authToken");
        return false;
      }
    }
    return false;
  }
}
