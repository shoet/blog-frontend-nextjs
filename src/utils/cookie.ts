import { cookies } from "next/headers";

export function getServerSideCookie(key: string) {
  const cookie = cookies();
  return cookie.get(key);
}
