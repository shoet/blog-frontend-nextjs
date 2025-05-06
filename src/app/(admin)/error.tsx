"use client";

import { useEffect, useRef } from "react";
import { logoutServerAction } from "./_components/Organisms/Header/actions";
import { useRouter } from "next/navigation";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const logoutFormRef = useRef<HTMLFormElement>(null);

  // LogoutのためのCookie操作のServerActionを呼び出す
  useEffect(() => {
    if (logoutFormRef.current) {
      if (error.message == "Unauthorized") {
        logoutFormRef.current.requestSubmit();
      } else {
        const router = useRouter();
        router.push("/");
      }
    }
  }, [logoutFormRef.current]);

  return <form ref={logoutFormRef} action={logoutServerAction} />;
}
