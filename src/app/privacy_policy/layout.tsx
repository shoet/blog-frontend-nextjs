import type { ReactNode } from "react";
import styles from "./layout.module.scss";

export default function Layout({ children }: { children: ReactNode }) {
  return <div className={styles.content}>{children}</div>;
}
