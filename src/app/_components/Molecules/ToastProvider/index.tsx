"use client";
import clsx from "clsx";
import styles from "./index.module.scss";

import {
  createContext,
  type CSSProperties,
  type ReactNode,
  useContext,
  useState,
} from "react";
import { Toast } from "../Toast";

type ToastContextType = {
  queueToast: (title: string, detail: string) => Promise<void>;
};

type State = "visiable" | "hidden";

type ToastContent = {
  id: string;
  title: string;
  detail: string;
  state: State;
};

const ToastContext = createContext<ToastContextType>({
  queueToast: async () => { },
});

export const useToastContext = () => useContext(ToastContext);

export const ToastProvider = (props: { children: ReactNode }) => {
  const [toastQueue, setToastQueue] = useState<ToastContent[]>([]);

  const queue = (toast: Omit<ToastContent, "id">): string => {
    const newId = crypto.randomUUID();
    setToastQueue((prev) => {
      return [...prev, { ...toast, id: newId }];
    });
    return newId;
  };

  const updateState = (id: string, state: State) => {
    setToastQueue((prev) => {
      return prev.map((q) => {
        if (q.id === id) {
          return { ...q, state };
        }
        return q;
      });
    });
  };

  const remove = (id: string) => {
    setToastQueue((prev) => prev.filter((q) => q.id !== id));
  };

  const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));
  const setTimedToast = async (title: string, detail: string) => {
    // キュー・デキュー前後にアニメーションのための時間を挟む
    const id = queue({ title, detail, state: "hidden" });
    await sleep(100);
    updateState(id, "visiable");
    setTimeout(async () => {
      updateState(id, "hidden");
      await sleep(100);
      remove(id);
    }, 2 * 1000);
  };

  return (
    <ToastContext.Provider
      value={{
        queueToast: setTimedToast,
      }}
    >
      <div className={styles.toastProvider}>
        <div className={styles.childrenContainer}>{props.children}</div>
        {toastQueue.map((t, idx) => {
          return (
            t.state && (
              <div
                key={t.id}
                className={clsx(
                  styles.toast,
                  styles[`toastPosition-${t.state}`],
                )}
                style={
                  {
                    // 消えるときに高さを維持したままにする
                    "--toast-queue-order": toastQueue.length - idx - 1,
                  } as CSSProperties
                }
              >
                <Toast title={t.title} detail={t.detail} />
              </div>
            )
          );
        })}
      </div>
    </ToastContext.Provider>
  );
};
