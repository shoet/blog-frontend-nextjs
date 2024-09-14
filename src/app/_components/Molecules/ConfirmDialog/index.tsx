"use client";
import { CSSProperties } from "react";
import { Button } from "../../Atoms/Button";
import css from "./index.module.scss";
import { theme } from "@/themes";
import { Spacer } from "../../Atoms/Spacer";

type ConfirmDialogProps = {
  title: string;
  message: string;
  onClickOK: () => void;
  onClickCancel?: () => void;
  errorMessage?: string;
};

export const ConfirmDialog = (props: ConfirmDialogProps) => {
  const { title, message, onClickOK, onClickCancel, errorMessage } = props;

  const style = {
    "--border-color": theme.colors.borderDark,
    "--text-color": theme.colors.black,
  } as CSSProperties;

  return (
    <div className={css.dialog} style={style}>
      <div>
        <div className={css.title}>{title}</div>
        <Spacer height={10} />
        <div className={css.message}>{message}</div>
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
