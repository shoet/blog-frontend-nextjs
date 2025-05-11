"use client";
import Link from "next/link";
import styles from "./errors.module.scss";

export default function Error() {
  return (
    <div className={styles.errorPage}>
      <div className={styles.container}>
        <div className={styles.status}>
          <div className={styles.statusCode}>500</div>
          <div className={styles.logo}>shoet Blog</div>
        </div>
        <div className={styles.content}>
          <div className={styles.heading}>
            <div className={styles.headingInner}>
              <div className={styles.title}>エラーが発生しました</div>
            </div>
          </div>
          <div>
            ご不便をおかけして申し訳ありません。
            しばらく時間をおいてから再度お試しください。
          </div>
        </div>
        <div className={styles.link}>
          <Link className={styles.button} href="/">
            TOPへ戻る
          </Link>
        </div>
      </div>
    </div>
  );
}
