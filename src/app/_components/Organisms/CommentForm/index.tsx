"use client";
import React, { Suspense, useEffect, useRef, useState } from "react";
import { Button } from "../../Atoms/Button";
import { MarkdownRenderer } from "../../Molecules/MarkdownRenderer";
import styles from "./index.module.scss";
import { TextToggle } from "../../Atoms/TextToggle";
import { Divider } from "../../Atoms/Divider";
import { AvatarImage } from "../../Molecules/AvatarImage";
import { UserProfile } from "@/types/api";
import { getHandlename } from "@/services/routeHandler";
import { SkeletonLoader } from "../../Molecules/SkeletonLoader";

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
  commentUser?: UserProfile;
  postComment?: (text: string) => void;
};

export const CommentForm = (props: Props) => {
  const { blogId, commentUser, postComment } = props;

  const [text, setText] = useState("");

  const [anonymous, setAnonymous] = useState<string>();

  const handleChangeText = (text: string) => {
    setText(text);
  };

  const submitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.length === 0) return;
    postComment?.(text);
    setText("");
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
    <div className={styles.commentForm}>
      <div className={styles.title}>コメント</div>
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
      <div className={styles.tabs} onClick={() => textareaRef.current?.focus()}>
        {!showPreview ? (
          <div className={styles.editor}>
            <textarea
              ref={textareaRef}
              rows={5}
              onChange={(e) => handleChangeText(e.target?.value)}
              placeholder="コメントを投稿する"
              value={text}
            />
          </div>
        ) : (
          <div className={styles.preview}>
            {text.length !== 0 ? (
              <MarkdownRenderer markdown={text} />
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
          disabled={text == ""}
        >
          投稿する
        </Button>
      </div>
    </div>
  );
};
