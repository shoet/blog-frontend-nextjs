"use client";
import { ReactNode } from "react";
import { ConfirmDialog } from "../ConfirmDialog";
import css from "./index.module.scss";
import { IconXmark } from "../../Atoms/Icon";

type OverlayDialogProps = {
  title: string;
  okText?: string;
  cancelText?: string;
  onClickOK: () => void;
  onClickCancel?: () => void;
  errorMessage?: string;
  children: ReactNode;
};

export const OverlayDialog = (props: OverlayDialogProps) => {
  const { children, ...rest } = props;
  return (
    <div className={css.overlayDialog}>
      <div
        className={css.overlayDialogBackground}
        onClick={rest.onClickCancel}
      ></div>
      <div className={css.dialog}>
        <ConfirmDialog {...rest}>{children}</ConfirmDialog>
        <IconXmark
          className={css.xmark}
          size="3x"
          onClick={rest.onClickCancel}
        />
      </div>
    </div>
  );
};
