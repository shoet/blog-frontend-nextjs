"use client";
import { IconXmark } from "../../Atoms/Icon";
import styles from "./index.module.scss";

type Props = {
  title: string;
  detail: string;
  onClickClose?: () => void;
};

export const Toast = (props: Props) => {
  const { title, detail, onClickClose } = props;
  return (
    <div className={styles.toast}>
      <div className={styles.content}>
        <div className={styles.title}>{title}</div>
        <div className={styles.detail}>{detail}</div>
      </div>
      {onClickClose && (
        <button type="button" className={styles.close} onClick={onClickClose}>
          <IconXmark />
        </button>
      )}
    </div>
  );
};
