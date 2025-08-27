"use client";
import { Button } from "../../Atoms/Button";
import { MarkdownRenderer } from "../../Molecules/MarkdownRenderer";
import { TextToggle } from "../../Atoms/TextToggle";
import { Divider } from "../../Atoms/Divider";
import { AvatarImage } from "../../Molecules/AvatarImage";
import type { Comment, UserProfile } from "@/types/api";
import { CommentList } from "../CommentList";
import { useCommentForm } from "./hooks";
import clsx from "clsx";
import { type RefObject, useState } from "react";

const NoComment = () => {
  return (
    <div
      className={clsx(
        "min-h-[200px] flex flex-row items-center justify-center",
      )}
    >
      <div className={clsx("flex justify-center items-center")}>
        <div className={clsx("text-lg font-bold text-gray-500")}>
          コメントを投稿しよう
        </div>
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
      <div className={clsx("flex flex-col gap-2 p-6")}>
        <div
          className={clsx(
            "flex flex-row items-center justify-start gap-4 h-[40px]",
          )}
        >
          <AvatarImage
            className={clsx("!w-[40px]")} // css important
            imageURL={commentUser?.avatarImageFileURL || defaultAvatarURL}
          />
          <div className={clsx("text-lg font-bold")}>
            {commentUser?.nickname || `匿名ユーザー(ID: ${handlename || ""})`}
          </div>
        </div>
        <div className={clsx("w-full")}>
          <TextToggle
            leftText="Markdown"
            rightText="Preview"
            onChangeToggle={previewToggle}
          />
        </div>
        <button
          type="button"
          className={clsx("flex flex-col relative h-[300px]")}
          onClick={() => textareaRef.current?.focus()} // textareaにフォーカスを当てる
        >
          <div
            className={clsx(
              "bg-white w-full h-full absolute",
              showPreview ? "z-0" : "z-10",
            )}
          >
            <textarea
              className={clsx(
                "p-[8px] h-full w-full border-none outline-none resize-none",
                "placeholder:text-gray-500 text-md",
              )}
              name="comment"
              ref={textareaRef}
              rows={5}
              placeholder="コメントを投稿する"
            />
          </div>
          <div
            className={clsx(
              "overflow-scroll bg-white w-full h-full absolute",
              showPreview ? "z-10" : "z-0",
            )}
          >
            {textareaRef.current?.value.length !== 0 ? (
              <div className={clsx("flex flex-row justify-start text-start")}>
                <MarkdownRenderer markdown={textareaRef.current?.value || ""} />
              </div>
            ) : (
              <NoComment />
            )}
          </div>
        </button>
        <Divider />
        <div className={clsx("flex flex-row justify-end")}>
          <Button variant="secondaryDark" round type="submit">
            投稿する
          </Button>
        </div>
      </div>
    </>
  );
};
