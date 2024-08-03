import { ErrorText } from "@/app/_components/Atoms/ErrorText";
import css from "./index.module.scss";
import { getZodValidateError, ZodValidateError } from "@/utils/validate";
import { TextInput } from "@/app/_components/Atoms/TextInput";
import { Spacer } from "@/app/_components/Atoms/Spacer";
import { Button } from "@/app/_components/Atoms/Button";

const ValidationError = ({
  errors,
  field,
}: {
  errors?: ZodValidateError[];
  field: string;
}) => {
  const error = errors && getZodValidateError(errors, field);
  if (!error) return null;
  return <ErrorText>{error.error}</ErrorText>;
};

export const LoginActionForm = ({
  formAction,
  errors,
}: {
  formAction: (formData: FormData) => void;
  errors?: ZodValidateError[];
}) => {
  return (
    <form action={formAction}>
      <div className={css.formArea}>
        <div>
          <TextInput name="email" placeholder="Email" />
          <ValidationError errors={errors} field="email" />
        </div>
        <Spacer height={20} />
        <div>
          <TextInput name="password" placeholder="Password" type="password" />
          <ValidationError errors={errors} field="password" />
        </div>
      </div>
      <Spacer height={30} />
      <div className={css.actionArea}>
        <Button variant="primary">Signin</Button>
      </div>
    </form>
  );
};
