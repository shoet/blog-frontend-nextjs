"use client";
import React, { useRef } from "react";
import { Button } from "../../Atoms/Button";
import { MarkdownRenderer } from "../../Molecules/MarkdownRenderer";
import styles from "./index.module.scss";
import { TextToggle } from "../../Atoms/TextToggle";
import { Divider } from "../../Atoms/Divider";
import { AvatarImage } from "../../Molecules/AvatarImage";
import { Comment, UserProfile } from "@/types/api";
import { CommentList } from "../CommentList";
import { useCommentForm } from "./hooks";

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

  const {
    commentText,
    handlename,
    showPreview,
    previewToggle,
    handleChangeComment,
    submitComment,
  } = useCommentForm({ blogId, comments, commentUser });

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const defaultAvatarURL = "/avatar_default.png";

  return (
    <div>
      <CommentList comments={comments} />
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
          onClick={() => textareaRef.current?.focus()}
        >
          {!showPreview ? (
            <div className={styles.editor}>
              <textarea
                ref={textareaRef}
                rows={5}
                onChange={(e) => handleChangeComment(e.target?.value)}
                placeholder="コメントを投稿する"
                value={commentText}
              />
            </div>
          ) : (
            <div className={styles.preview}>
              {commentText.length !== 0 ? (
                <MarkdownRenderer markdown={commentText} />
              ) : (
                <NoComment />
              )}
            </div>
          )}
        </div>
        <Divider />
        <div className={styles.sender}>
          <Button
            variant="secondaryDark"
            onSubmit={submitComment}
            round
            disabled={commentText == ""}
          >
            投稿する
          </Button>
        </div>
      </div>
    </div>
  );
};
