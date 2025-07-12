"use client";

import type { ReactNode } from "react";
import styles from "./index.module.scss";

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
      <div className={styles.background}></div>
      <div className={styles.container}>{props.children}</div>
    </>
  );
};
