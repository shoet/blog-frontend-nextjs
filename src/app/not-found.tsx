import Link from "next/link";
import styles from "./errors.module.scss";

export default function NotFound() {
  return (
    <div className={styles.errorPage}>
      <div className={styles.container}>
        <div className={styles.status}>
          <div className={styles.statusCode}>404</div>
          <div className={styles.logo}>shoet Blog</div>
        </div>
        <div className={styles.content}>
          <div className={styles.heading}>
            <div className={styles.headingInner}>
              <div className={styles.title}>
                お探しのページが見つかりませんでした
              </div>
            </div>
          </div>
          <div>
            あなたのご覧になっていたページからのリンクが無効になっているか、入力されたアドレス(URL)のタイプミスかもしれません。
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
