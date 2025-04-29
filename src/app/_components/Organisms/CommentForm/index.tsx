"use client";
import React, { useRef, useState } from "react";
import { Button } from "../../Atoms/Button";
import { MarkdownRenderer } from "../../Molecules/MarkdownRenderer";
import styles from "./index.module.scss";
import { TextToggle } from "../../Atoms/TextToggle";
import { Divider } from "../../Atoms/Divider";
import { AvatarImage } from "../../Molecules/AvatarImage";
import { UserProfile } from "@/types/api";

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
  commentUser?: UserProfile;
  postComment?: (text: string) => void;
};

export const CommentForm = (props: Props) => {
  const { commentUser, postComment } = props;

  const [text, setText] = useState("");

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

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const defaultAvatarURL = "/avatar_default.png";

  return (
    <div className={styles.commentForm}>
      <div className={styles.title}>コメント</div>
      <div className={styles.header}>
        <div className={styles.avatar}>
          <AvatarImage
            imageURL={commentUser?.avatarImageFileURL || defaultAvatarURL}
          />
        </div>
        <div className={styles.toggle}>
          <TextToggle
            leftText="Markdown"
            rightText="Preview"
            onChangeToggle={() => handleToggle()}
          />
        </div>
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
