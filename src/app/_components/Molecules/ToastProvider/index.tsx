"use client";
import clsx from "clsx";
import styles from "./index.module.scss";

import { createContext, ReactNode, useContext, useState } from "react";
import { Toast } from "../Toast";

type ToastContextType = {
  visiable: boolean;
  showToast: (content: ToastContent) => void;
  closeToast: () => void;
};

type ToastContent = {
  title: string;
  detail: string;
};

const ToastContext = createContext<ToastContextType>({
  visiable: false,
  showToast: (content: ToastContent) => {},
  closeToast: () => {},
});

export const useToastContext = () => useContext(ToastContext);

export const ToastProvider = (props: { children: ReactNode }) => {
  const [visiable, setVisiable] = useState(false);
  const [content, setContent] = useState<ToastContent>();
  const showToast = (content: ToastContent) => {
    setContent(content);
    setVisiable(true);
  };
  const closeToast = () => {
    setVisiable(false);
  };
  return (
    <ToastContext.Provider
      value={{
        visiable: visiable,
        showToast: showToast,
        closeToast: closeToast,
      }}
    >
      <div className={styles.toastProvider}>
        <div className={styles.childrenContainer}>{props.children}</div>
        <div className={styles.toastContainer}>
          {content && (
            <div
              className={clsx(
                styles[`toastPosition-${visiable ? "visiable" : "hidden"}`],
                styles.toast,
              )}
            >
              <Toast title={content.title} detail={content.detail} />
            </div>
          )}
        </div>
      </div>
    </ToastContext.Provider>
  );
};

// export const Toast = () => {
//   const { visiable } = useToastContext();
//   return <div>{visiable && <div className={styles.toast}>toast</div>}</div>;
// };
