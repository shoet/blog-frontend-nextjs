import type { Metadata } from "next";
import { APP_DESCRIPTION, APP_TITLE } from "@/constant";
import styles from "./layout.module.scss";

export const metadata: Metadata = {
  title: APP_TITLE,
  description: APP_DESCRIPTION,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <div className={styles.title}>プロフィール</div>
      <div className={styles.profile}>{children}</div>
    </div>
  );
}
