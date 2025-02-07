import css from "./index.module.scss";
import { Spacer } from "@/app/_components/Atoms/Spacer";
import { Button } from "@/app/_components/Atoms/Button";
import { logoutServerAction } from "./actions";
import { getServerSideCookie } from "@/utils/cookie";
import { getUsersMe } from "@/services/getUsersMe";
import Link from "next/link";

export const Header = async () => {
  let user = null;
  try {
    const authToken = await getServerSideCookie("authToken");
    if (!authToken) {
      return null;
    }
    user = await getUsersMe(authToken.value);
  } catch (error) {
    console.error(error);
    return null;
  }
  return (
    <header>
      <div className={css.header}>
        <div className={css.navigation}>
          <div>管理画面にログイン中</div>
          <div className={css.navigationItems}>
            <Link href="/admin" className={css.navigationLink}>
              TOP
            </Link>
            <Link href="/blogs" target="_blank" className={css.navigationLink}>
              BLOG
            </Link>
          </div>
        </div>
        <div className={css.signOut}>
          こんにちは、{user.name}さん
          <Spacer width={10} />
          <form action={logoutServerAction}>
            <Button variant="secondaryDark">ログアウト</Button>
          </form>
        </div>
      </div>
    </header>
  );
};
