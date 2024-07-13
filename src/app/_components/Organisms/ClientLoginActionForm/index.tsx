"use client";
import { LoginActionFormState } from "./state";
import { loginServerAction } from "./action";
import { useFormState } from "react-dom";
import { LoginActionForm } from "../LoginActionForm";

export const ClientLoginActionForm = () => {
  const [state, formAction] = useFormState(
    (_: LoginActionFormState, formData: FormData) =>
      loginServerAction(formData),
    {},
  );
  return (
    <LoginActionForm formAction={formAction} errors={state.validateErrors} />
  );
};
