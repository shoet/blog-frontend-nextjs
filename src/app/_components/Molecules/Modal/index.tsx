"use client";

import type { ReactNode } from "react";
import clsx from "clsx";

type Props = {
  children: ReactNode;
  open?: boolean;
};

export const Modal = (props: Props) => {
  if (!props.open) {
    return null;
  }
  return (
    <>
      <div className={clsx(
        "fixed top-0 left-0 z-[0] h-dvh w-dvw bg-gray-400 opacity-70"
      )}></div>
      <div className={clsx(
        "-translate-1/2 fixed top-1/2 left-1/2 z-[1]"
      )}>{props.children}</div>
    </>
  );
};
