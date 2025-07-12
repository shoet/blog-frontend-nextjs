"use client";
import type { Comment } from "@/types/api";
import styles from "./index.module.scss";
import { AvatarImage } from "../../Molecules/AvatarImage";
import { toStringYYYYMMDD_HHMMSS_ja } from "@/utils/date";
import { MarkdownRenderer } from "../../Molecules/MarkdownRenderer";

export const CommentList = (props: { comments: Comment[] }) => {
  const { comments } = props;

  return (
    <div className={styles.commentList}>
      {comments.map((comment) => {
        return (
          <div key={comment.commentId} className={styles.commentRow}>
            <div className={styles.avatar}>
              <AvatarImage
                imageURL={comment.avatarImageFileUrl || "/avatar_default.png"}
              />
              <div className={styles.name}>
                {comment.nickname || comment.clientId}
              </div>
              <div className={styles.created}>
                {toStringYYYYMMDD_HHMMSS_ja(comment.created)}
              </div>
            </div>
            <div className={styles.content}>
              <MarkdownRenderer markdown={comment.content} />
            </div>
          </div>
        );
      })}
    </div>
  );
};
