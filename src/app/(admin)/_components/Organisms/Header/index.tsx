import css from "./index.module.scss";
import { Spacer } from "@/app/_components/Atoms/Spacer";
import { Button } from "@/app/_components/Atoms/Button";
import { logoutServerAction } from "./actions";
import { User } from "@/types/api";

type HeaderProps = {
  user: User;
};

export const Header = async (props: HeaderProps) => {
  const { user } = props;
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
