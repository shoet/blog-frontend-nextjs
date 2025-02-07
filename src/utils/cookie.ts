import { cookies } from "next/headers";

export async function getServerSideCookie(key: string) {
  const cookie = await cookies();
  return cookie.get(key);
}
