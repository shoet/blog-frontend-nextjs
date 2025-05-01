"use client";
import { getHandlename } from "@/services/routeHandler";
import { Comment, UserProfile } from "@/types/api";
import { useEffect, useState } from "react";

export const useCommentForm = (props: {
  blogId: number;
  comments: Comment[];
  commentUser?: UserProfile;
}) => {
  const [commentText, setCommentText] = useState("");

  const handleChangeComment = (text: string) => {
    setCommentText(text);
  };

  const submitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (commentText.length === 0) return;
    // postComment?.(comment);
    setCommentText("");
  };

  const [showPreview, setShowPreview] = useState(false);
  const previewToggle = () => {
    setShowPreview(!showPreview);
  };

  const [handlename, setHandlename] = useState<string>();
  useEffect(() => {
    // ログインユーザーでない場合、匿名ユーザーとしてIDを生成する
    if (props.commentUser) return;
    (async () => {
      const { handlename } = await getHandlename(props.blogId);
      setHandlename(handlename);
    })();
  }, [props.commentUser]);

  return {
    commentText,
    handlename,
    showPreview,
    previewToggle,
    handleChangeComment,
    submitComment,
  };
};
