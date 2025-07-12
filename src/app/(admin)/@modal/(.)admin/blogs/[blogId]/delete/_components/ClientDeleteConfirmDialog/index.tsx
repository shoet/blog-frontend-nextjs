"use client";

import { OverlayDialog } from "@/app/_components/Molecules/OverlayDialog";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import styles from "./index.module.scss";
import type { Blog } from "@/types/api";
import { BlogCard } from "@/app/_components/Organisms/BlogCard";

type ClientDeleteConfirmDialogProps = { blog: Blog };

export const ClientDeleteConfirmDialog = (
  props: ClientDeleteConfirmDialogProps,
) => {
  const { blog } = props;

  const [errorMessage, setErrorMesage] = useState<string>();
  const formRef = useRef<HTMLFormElement>(null);

  const router = useRouter();

  const deleteBlog = async (blogId: number) => {
    await fetch(`/api/admin/blogs/${blogId}/delete`, { method: "POST" });
  };

  const onClickOK = async () => {
    try {
      await deleteBlog(blog.id);
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
        title="ブログ記事の削除"
        onClickOK={onClickOK}
        onClickCancel={onClickCancel}
        errorMessage={errorMessage}
        okText="削除"
        cancelText="キャンセル"
      >
        <DeleteConfirmDisplay blog={blog} />
      </OverlayDialog>
    </form>
  );
};

const DeleteConfirmDisplay = (props: { blog: Blog }) => {
  const { blog } = props;
  return (
    <div className={styles.deleteConfirmDisplay}>
      <div>以下のブログ記事を削除します。</div>
      <div className={styles.alert}>
        この操作は取り消せません。本当によろしいですか？
      </div>
      <div className={styles.blogDetail}>
        <BlogCard blog={blog} />
      </div>
    </div>
  );
};
