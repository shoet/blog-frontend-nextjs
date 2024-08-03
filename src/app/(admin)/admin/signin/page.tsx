import { ClientLoginActionForm } from "../../_components/Organisms/ClientLoginActionForm";
import css from "./page.module.scss";

const SigninPage = () => {
  return (
    <div className={css.page}>
      <div className={css.loginForm}>
        <ClientLoginActionForm />
      </div>
    </div>
  );
};

export default SigninPage;
