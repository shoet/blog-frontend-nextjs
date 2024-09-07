"use client";
import { CSSProperties } from "react";
import { Button } from "../../Atoms/Button";
import css from "./index.module.scss";
import { theme } from "@/themes";

type ConfirmDialogProps = {
  title: string;
  message: string;
  onClickOK: () => void;
  onClickCancel?: () => void;
};

export const ConfirmDialog = (props: ConfirmDialogProps) => {
  const { title, message, onClickOK, onClickCancel } = props;

  const style = {
    "--border-color": theme.colors.borderDark,
    "--text-color": theme.colors.black,
  } as CSSProperties;

  return (
    <div className={css.dialog} style={style}>
      <div className={css.title}>{title}</div>
      <div className={css.message}>{message}</div>
      <div className={css.actionArea}>
        {onClickCancel && (
          <Button variant="secondary" onClick={onClickCancel}>
            Cancel
          </Button>
        )}
        <Button variant="primary" onClick={onClickOK}>
          OK
        </Button>
      </div>
    </div>
  );
};
