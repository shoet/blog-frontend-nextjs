"use client";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "../../Atoms/Button";
import { MarkdownRenderer } from "../../Molecules/MarkdownRenderer";
import styles from "./index.module.scss";
import { TextToggle } from "../../Atoms/TextToggle";
import { Divider } from "../../Atoms/Divider";
import { AvatarImage } from "../../Molecules/AvatarImage";
import { Comment, UserProfile } from "@/types/api";
import { getHandlename } from "@/services/routeHandler";
import { toStringYYYYMMDD_HHMMSS_ja } from "@/utils/date";
import { CommentList } from "../CommentList";

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
  postComment?: (text: string) => void;
};

export const CommentForm = (props: Props) => {
  const { blogId, comments, commentUser, postComment } = props;

  const [comment, setComment] = useState("");

  const [anonymous, setAnonymous] = useState<string>();

  const handleChangeText = (text: string) => {
    setComment(text);
  };

  const submitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (comment.length === 0) return;
    postComment?.(comment);
    setComment("");
  };

  const [showPreview, setShowPreview] = useState(false);

  const handleToggle = () => {
    setShowPreview(!showPreview);
  };

  useEffect(() => {
    // ログインユーザーでない場合、匿名ユーザーとしてIDを生成する
    if (props.commentUser) return;
    (async () => {
      const { handlename } = await getHandlename(blogId);
      setAnonymous(handlename);
    })();
  }, [props.commentUser]);

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
            {commentUser?.nickname || `匿名ユーザー(ID: ${anonymous || ""})`}
          </div>
        </div>
        <div className={styles.toggle}>
          <TextToggle
            leftText="Markdown"
            rightText="Preview"
            onChangeToggle={() => handleToggle()}
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
                onChange={(e) => handleChangeText(e.target?.value)}
                placeholder="コメントを投稿する"
                value={comment}
              />
            </div>
          ) : (
            <div className={styles.preview}>
              {comment.length !== 0 ? (
                <MarkdownRenderer markdown={comment} />
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
            disabled={comment == ""}
          >
            投稿する
          </Button>
        </div>
      </div>
    </div>
  );
};
