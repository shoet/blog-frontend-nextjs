"use client";

import { OverlayDialog } from "@/app/_components/Molecules/OverlayDialog";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

type ClientDeleteConfirmDialogProps = { blogId: number };

export const ClientDeleteConfirmDialog = (
  props: ClientDeleteConfirmDialogProps,
) => {
  const { blogId } = props;

  const [errorMessage, setErrorMesage] = useState<string>();
  const formRef = useRef<HTMLFormElement>(null);

  const router = useRouter();

  const deleteBlog = async (blogId: number) => {
    await fetch(`/api/admin/blogs/${blogId}/delete`, { method: "POST" });
  };

  const onClickOK = async () => {
    try {
      await deleteBlog(blogId);
      if (formRef.current) formRef.current.submit();
    } catch (err) {
      setErrorMesage("削除に失敗しました");
      console.error(err);
    }
  };

  const onClickCancel = () => {
    router.back();
  };

  const close = () => router.push("/admin");

  return (
    <form
      ref={formRef}
      onSubmit={(event) => {
        event.preventDefault();
        close();
      }}
    >
      <OverlayDialog
        title="削除"
        message={`BlogID: ${blogId} を削除しますか？`}
        onClickOK={onClickOK}
        onClickCancel={onClickCancel}
        errorMessage={errorMessage}
      />
    </form>
  );
};
