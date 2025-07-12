"use client";

import { useEffect, useRef } from "react";
import { logoutServerAction } from "./_components/Organisms/Header/actions";
import { useRouter } from "next/navigation";

export default function ErrorPage({
  error,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const logoutFormRef = useRef<HTMLFormElement>(null);
  const router = useRouter();

  // LogoutのためのCookie操作のServerActionを呼び出す
  useEffect(() => {
    if (logoutFormRef.current) {
      if (error.message === "Unauthorized") {
        logoutFormRef.current.requestSubmit();
      } else {
        router.push("/");
      }
    }
  }, [router, error.message]);

  return <form ref={logoutFormRef} action={logoutServerAction} />;
}
