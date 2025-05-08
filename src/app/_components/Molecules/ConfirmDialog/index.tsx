"use client";
import { CSSProperties } from "react";
import { Button } from "../../Atoms/Button";
import css from "./index.module.scss";
import { theme } from "@/themes";
import { Spacer } from "../../Atoms/Spacer";

type ConfirmDialogProps = {
  title: string;
  okText?: string;
  cancelText?: string;
  onClickOK: () => void;
  onClickCancel?: () => void;
  errorMessage?: string;
  children?: React.ReactNode;
};

export const ConfirmDialog = (props: ConfirmDialogProps) => {
  const {
    title,
    okText,
    cancelText,
    children,
    onClickOK,
    onClickCancel,
    errorMessage,
  } = props;

  const style = {
    "--border-color": theme.colors.borderDark,
    "--text-color": theme.colors.black,
  } as CSSProperties;

  return (
    <div className={css.dialog} style={style}>
      <div>
        <div className={css.title}>{title}</div>
        <Spacer height={10} />
        <div className={css.message}>{children}</div>
        {errorMessage && (
          <>
            <Spacer height={10} />
            <div className={css.errorMessage}>{errorMessage}</div>
          </>
        )}
      </div>
      <div className={css.actionArea}>
        {onClickCancel && (
          <Button variant="secondary" onClick={onClickCancel}>
            {cancelText ?? "Cancel"}
          </Button>
        )}
        <Button variant="primary" onClick={onClickOK}>
          {okText ?? "OK"}
        </Button>
      </div>
    </div>
  );
};
