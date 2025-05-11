import Link from "next/link";
import styles from "./errors.module.scss";

export default function NotFound() {
  return (
    <div className={styles.errorPage}>
      <div className={styles.container}>
        <div className={styles.status}>
          <div className={styles.statusCode}>401</div>
          <div className={styles.logo}>shoet Blog</div>
        </div>
        <div className={styles.content}>
          <div className={styles.heading}>
            <div className={styles.headingInner}>
              <div className={styles.title}>認証が必要です</div>
            </div>
          </div>
          <div>このページにアクセスするにはログインが必要です。</div>
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
