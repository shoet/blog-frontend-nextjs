import Link from "next/link";
import styles from "./errors.module.scss";

export default function Forbidden() {
  return (
    <div className={styles.errorPage}>
      <div className={styles.container}>
        <div className={styles.status}>
          <div className={styles.statusCode}>403</div>
          <div className={styles.logo}>shoet Blog</div>
        </div>
        <div className={styles.content}>
          <div className={styles.heading}>
            <div className={styles.headingInner}>
              <div className={styles.title}>アクセスが拒否されました</div>
            </div>
          </div>
          <div>
            別のページをご覧いただくか、必要な権限をお持ちの場合は再度ログインしてください。
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
