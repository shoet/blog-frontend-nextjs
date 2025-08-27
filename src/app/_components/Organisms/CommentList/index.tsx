"use client";
import type { Comment } from "@/types/api";
import { AvatarImage } from "../../Molecules/AvatarImage";
import { toStringYYYYMMDD_HHMMSS_ja } from "@/utils/date";
import { MarkdownRenderer } from "../../Molecules/MarkdownRenderer";
import clsx from "clsx";

export const CommentList = (props: { comments: Comment[] }) => {
  const { comments } = props;

  return (
    <div>
      {comments.map((comment, idx) => {
        return (
          <div
            key={comment.commentId}
            className={clsx("p-2", idx !== 0 && "border-t border-t-gray-300")}
          >
            <div
              className={clsx("flex flex-row items-center justify-start gap-2")}
            >
              <AvatarImage
                className={clsx("!w-[40px]")} // css important
                imageURL={comment.avatarImageFileUrl || "/avatar_default.png"}
              />
              <div className={clsx("text-sm font-bold")}>
                {comment.nickname || comment.clientId}
              </div>
              <div className={clsx("text-sm text-gray-500")}>
                {toStringYYYYMMDD_HHMMSS_ja(comment.created)}
              </div>
            </div>
            <div className={clsx("p-2")}>
              <MarkdownRenderer markdown={comment.content} />
            </div>
          </div>
        );
      })}
    </div>
  );
};
