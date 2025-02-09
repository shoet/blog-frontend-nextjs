"use client";
import { LoginActionFormState } from "./state";
import { loginServerAction } from "./action";
import { LoginActionForm } from "../LoginActionForm";
import { useActionState } from "react";

export const ClientLoginActionForm = () => {
  const [state, formAction, isPending] = useActionState(
    async (_: LoginActionFormState, formData: FormData) => {
      const result = await loginServerAction(formData);
      return result;
    },
    { errors: [], validateErrors: [] },
  );
  return (
    <LoginActionForm
      formAction={formAction}
      errors={state.errors}
      validateErrors={state.validateErrors}
      isLoading={isPending}
    />
  );
};
