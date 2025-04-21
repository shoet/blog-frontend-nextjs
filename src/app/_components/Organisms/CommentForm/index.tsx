"use client";
import { useRef, useState } from "react";
import { Button } from "../../Atoms/Button";
import { MarkdownRenderer } from "../../Molecules/MarkdownRenderer";
import styles from "./index.module.scss";
import { TextToggle } from "../../Atoms/TextToggle";
import { Divider } from "../../Atoms/Divider";

const NoComment = () => {
  return (
    <div className={styles.noComment}>
      <div className={styles.noCommentInner}>
        <div className={styles.title}>コメントを投稿しよう</div>
      </div>
    </div>
  );
};

export const CommentForm = () => {
  const [text, setText] = useState("");

  const handleChangeText = (text: string) => {
    setText(text);
  };

  const [showPreview, setShowPreview] = useState(false);

  const handleToggle = () => {
    setShowPreview(!showPreview);
  };

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  return (
    <div className={styles.commentForm}>
      <div className={styles.title}>コメント</div>
      <TextToggle
        leftText="Markdown"
        rightText="Preview"
        onChangeToggle={() => handleToggle()}
      />
      <div className={styles.tabs} onClick={() => textareaRef.current?.focus()}>
        {!showPreview ? (
          <div className={styles.editor}>
            <textarea
              ref={textareaRef}
              rows={5}
              onChange={(e) => handleChangeText(e.target?.value)}
              placeholder="コメントを投稿する"
            >
              {text}
            </textarea>
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
        <Button variant="secondaryDark" round disabled={text == ""}>
          投稿する
        </Button>
      </div>
    </div>
  );
};
