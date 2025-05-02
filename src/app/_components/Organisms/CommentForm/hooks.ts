"use client";
import { getHandlename } from "@/services/routeHandler";
import { Comment, UserProfile } from "@/types/api";
import { useEffect, useOptimistic, useRef, useState } from "react";
import { postCommentServerAction } from "./actions";

export const useCommentForm = (props: {
  blogId: number;
  comments: Comment[];
  commentUser?: UserProfile;
}) => {
  const { blogId, comments, commentUser } = props;

  const [markdownText, setMarkdownText] = useState("");

  const handleChangeComment = (text: string) => {
    setMarkdownText(text);
  };

  // const [showPreview, setShowPreview] = useState(false);
  // const previewToggle = () => {
  //   setShowPreview(!showPreview);
  // };

  const [handlename, setHandlename] = useState<string>();
  useEffect(() => {
    // ログインユーザーでない場合、匿名ユーザーとしてIDを生成する
    if (commentUser) return;
    (async () => {
      const { handlename } = await getHandlename(blogId);
      setHandlename(handlename);
    })();
  }, [commentUser]);

  const [optimisticComment, addOptimistic] = useOptimistic<Comment[], Comment>(
    comments,
    (prev, newComment) => {
      return [...prev, newComment];
    },
  );

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const submitComment = async (formData: FormData) => {
    const commentText = formData.get("comment") as string;
    if (commentText.length === 0) return;
    const newComment: Comment = {
      commentId: 0,
      blogId,
      content: commentText,
      userId: commentUser?.userId,
      nickname: commentUser?.nickname,
      clientId: handlename,
      isDeleted: false,
      isEdited: false,
      created: new Date().getTime(),
      modified: new Date().getTime(),
      avatarImageFileUrl: commentUser?.avatarImageFileURL,
    };
    addOptimistic(newComment);
    textareaRef.current!.value = "";
    await postCommentServerAction(formData);
  };

  return {
    textareaRef,
    optimisticComment,
    markdownText,
    handlename,
    // showPreview,
    // previewToggle,
    handleChangeComment,
    submitComment,
  };
};
