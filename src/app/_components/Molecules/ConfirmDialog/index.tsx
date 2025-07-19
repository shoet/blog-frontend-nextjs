"use client";
import type { CSSProperties } from "react";
import { Button } from "../../Atoms/Button";
import { theme } from "@/themes";
import clsx from "clsx";

type ConfirmDialogProps = {
  title: string;
  okText?: string;
  cancelText?: string;
  onClickOK: () => void;
  onClickCancel?: () => void;
  errorMessage?: string;
  enableSubmit?: boolean;
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
    <div className={clsx(
      "flex flex-col justify-between gap-2",
      "min-h-[200px] min-w-[300px] p-5",
      "rounded-xl border border-[var(--border-color)] border-solid bg-white",
      "z-0",
    )} style={style}>
      <div className={clsx(
        "flex flex-col gap-[10px]"
      )}>
        <div className={"font-bold text-md"}>{title}</div>
        <div className={"text-[var(--text-color)] text-sm"}>{children}</div>
        {errorMessage && (
          <div className={"text-red-500 text-sm"}>{errorMessage}</div>
        )}
      </div>
      <div className={clsx(
        "flex w-full flex-row justify-center gap-[20px]",
      )}>
        {onClickCancel && (
          <Button type="button" variant="secondary" className={"w-full"} onClick={onClickCancel}>
            {cancelText ?? "Cancel"}
          </Button>
        )}
        {props.enableSubmit ? (
          <Button variant="primary" className={"w-full"} type="submit" onSubmit={onClickOK}>
            {okText ?? "OK"}
          </Button>
        ) : (
          <Button variant="primary" className={"w-full"} onClick={onClickOK}>
            {okText ?? "OK"}
          </Button>
        )}
      </div>
    </div>
  );
};
