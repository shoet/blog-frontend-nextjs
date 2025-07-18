"use client";
import type { ReactNode } from "react";
import { ConfirmDialog } from "../ConfirmDialog";
import { IconXmark } from "../../Atoms/Icon";
import clsx from "clsx";

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
    <div className={clsx(
      "fixed top-0 left-0 h-dvh w-dvw bg-gray-700 opacity-70",
    )}>
      <div className="-translate-1/2 absolute top-1/2 left-1/2">
        <ConfirmDialog {...rest}>{children}</ConfirmDialog>
        <IconXmark
          className={clsx("-top-[50px] absolute right-0 cursor-pointer")}
          size="3x"
          onClick={rest.onClickCancel}
        />
      </div>
    </div>
  )
}
