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
    // biome-ignore lint: lint/a
    <div
      className={clsx("fixed inset-0")}
    >
      {/*
        biome-ignore lint: lint/a
      */}
      <div
        className="absolute inset-0 bg-gray-700/70"
        onClick={() => rest.onClickCancel?.()}
      />
      <div className="-translate-1/2 absolute top-1/2 left-1/2">
        <ConfirmDialog {...rest}>{children}</ConfirmDialog>
        <IconXmark
          className={clsx("-top-[50px] absolute right-0 cursor-pointer text-gray-200")}
          size="3x"
          onClick={() => rest.onClickCancel?.()}
        />
      </div>
    </div>
  )
}
