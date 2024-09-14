"use client";
import { ConfirmDialog } from "../ConfirmDialog";
import css from "./index.module.scss";

type OverlayDialogProps = {
  title: string;
  message: string;
  onClickOK: () => void;
  onClickCancel?: () => void;
  errorMessage?: string;
};

export const OverlayDialog = (props: OverlayDialogProps) => {
  return (
    <div className={css.overlayDialog}>
      <div className={css.overlayDialogBackground}></div>
      <div className={css.dialog}>
        <ConfirmDialog {...props} />
      </div>
    </div>
  );
};
