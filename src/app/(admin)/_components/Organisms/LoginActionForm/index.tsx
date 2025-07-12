import { ErrorText } from "@/app/_components/Atoms/ErrorText";
import css from "./index.module.scss";
import { getZodValidateError, type ZodValidateError } from "@/utils/validate";
import { TextInput } from "@/app/_components/Atoms/TextInput";
import { Spacer } from "@/app/_components/Atoms/Spacer";
import { Button } from "@/app/_components/Atoms/Button";

/**
 * ValidationError は与えられたerrorsからfieldに対するエラーメッセージコンポーネントを生成する
 */
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

const Errors = ({ errors }: { errors: string[] | undefined }) => {
  if (errors === undefined || errors?.length === 0) return null;
  return (
    <div>
      {errors.map((error) => {
        return <ErrorText key={error}>{error}</ErrorText>;
      })}
      <Spacer height={30} />
    </div>
  );
};

export const LoginActionForm = ({
  formAction,
  errors,
  validateErrors,
  isLoading = false,
}: {
  formAction: (formData: FormData) => void;
  errors?: string[];
  validateErrors?: ZodValidateError[];
  isLoading: boolean;
}) => {
  return (
    <form action={formAction}>
      <div className={css.formArea}>
        <Errors errors={errors} />
        <div>
          <TextInput name="email" placeholder="Email" />
          <ValidationError errors={validateErrors} field="email" />
        </div>
        <Spacer height={20} />
        <div>
          <TextInput name="password" placeholder="Password" type="password" />
          <ValidationError errors={validateErrors} field="password" />
        </div>
      </div>
      <Spacer height={30} />
      <div className={css.actionArea}>
        <Button variant="primary" disabled={isLoading}>
          Signin
        </Button>
      </div>
    </form>
  );
};
