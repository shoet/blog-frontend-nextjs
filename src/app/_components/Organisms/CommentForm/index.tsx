"use client";
import { Button } from "../../Atoms/Button";
import { MarkdownRenderer } from "../../Molecules/MarkdownRenderer";
import styles from "./index.module.scss";
import { TextToggle } from "../../Atoms/TextToggle";
import { Divider } from "../../Atoms/Divider";
import { AvatarImage } from "../../Molecules/AvatarImage";
import { Comment, UserProfile } from "@/types/api";
import { CommentList } from "../CommentList";
import { useCommentForm } from "./hooks";
import clsx from "clsx";
import { RefObject, useState } from "react";

const NoComment = () => {
  return (
    <div className={styles.noComment}>
      <div className={styles.noCommentInner}>
        <div className={styles.title}>コメントを投稿しよう</div>
      </div>
    </div>
  );
};

type Props = {
  blogId: number;
  comments: Comment[];
  commentUser?: UserProfile;
};

export const CommentForm = (props: Props) => {
  const { blogId, comments, commentUser } = props;

  const { textareaRef, optimisticComment, handlename, submitComment } =
    useCommentForm({ blogId, comments, commentUser });

  return (
    <form action={submitComment}>
      <input hidden name="blogId" defaultValue={blogId} />
      <input hidden name="clientId" defaultValue={handlename} />
      <input hidden name="userId" defaultValue={commentUser?.userId} />
      <CommentFormPresenter
        commentList={optimisticComment}
        textareaRef={textareaRef}
        commentUser={commentUser}
        handlename={handlename}
      />
    </form>
  );
};

export const CommentFormPresenter = (props: {
  commentList: Comment[];
  textareaRef: RefObject<HTMLTextAreaElement | null>;
  commentUser?: UserProfile;
  handlename?: string;
}) => {
  const { commentList, textareaRef, commentUser, handlename } = props;
  const [showPreview, setShowPreview] = useState(false);
  const previewToggle = () => {
    setShowPreview(!showPreview);
  };
  const defaultAvatarURL = "/avatar_default.png";
  return (
    <>
      <CommentList comments={commentList} />
      <div className={styles.commentForm}>
        <div className={styles.avatar}>
          <AvatarImage
            imageURL={commentUser?.avatarImageFileURL || defaultAvatarURL}
          />
          <div className={styles.name}>
            {commentUser?.nickname || `匿名ユーザー(ID: ${handlename || ""})`}
          </div>
        </div>
        <div className={styles.toggle}>
          <TextToggle
            leftText="Markdown"
            rightText="Preview"
            onChangeToggle={previewToggle}
          />
        </div>
        <div
          className={styles.tabs}
          onClick={() => textareaRef.current?.focus()} // textareaにフォーカスを当てる
        >
          <div
            className={clsx(
              styles.editor,
              showPreview ? styles.background : styles.surface,
            )}
          >
            <textarea
              name="comment"
              ref={textareaRef}
              rows={5}
              placeholder="コメントを投稿する"
            />
          </div>
          <div
            className={clsx(
              styles.preview,
              showPreview ? styles.surface : styles.background,
            )}
          >
            {textareaRef.current?.value.length !== 0 ? (
              <MarkdownRenderer markdown={textareaRef.current?.value || ""} />
            ) : (
              <NoComment />
            )}
          </div>
        </div>
        <Divider />
        <div className={styles.sender}>
          <Button variant="secondaryDark" round type="submit">
            投稿する
          </Button>
        </div>
      </div>
    </>
  );
};
