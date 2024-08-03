import css from "./index.module.scss";
import { Spacer } from "@/app/_components/Atoms/Spacer";
import { Button } from "@/app/_components/Atoms/Button";
import { logoutServerAction } from "./actions";
import { getServerSideCookie } from "@/utils/cookie";
import { getUsersMe } from "@/services/getUsersMe";

export const Header = async () => {
  const authToken = getServerSideCookie("authToken");
  if (!authToken) {
    return null;
  }
  const user = await getUsersMe(authToken.value);
  return (
    <header>
      <div className={css.header}>
        <div>管理画面にログイン中</div>
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
