import { getHandlename } from "@/services/routeHandler";
import { UserProfile } from "@/types/api";
import { useEffect, useState } from "react";

export const useCommentForm = (props: {
  blogId: number;
  commentUser?: UserProfile;
}) => {
  const [comment, setComment] = useState("");

  const handleChangeComment = (text: string) => {
    setComment(text);
  };

  const submitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (comment.length === 0) return;
    // postComment?.(comment);
    setComment("");
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
    comment,
    handlename,
    showPreview,
    previewToggle,
    handleChangeComment,
    submitComment,
  };
};
