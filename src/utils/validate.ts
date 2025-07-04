import { z, ZodError, ZodSchema } from "zod";
import { ZodError as ZodErrorV4 } from "zod/v4";

export type ZodValidateError = {
  field: string;
  error: string;
};

export function assertZodSchema<T extends ZodSchema>(
  zObject: T,
  data: any,
): asserts data is z.infer<T> {
  zObject.parse(data);
}

/**
 * getZodValidateErrors は ZodError から ZodValidateError の配列を取得する
 */
export function getZodValidateErrors(e: ZodError): ZodValidateError[] {
  return e.errors.map((error) => {
    return {
      field: error.path.join("."),
      error: error.message,
    };
  });
}

/**
 * getZodValidateError は ZodValidateError の配列から特定のフィールドのエラーを取得する
 */
export function getZodValidateError(
  errors: ZodValidateError[],
  field: string,
): ZodValidateError | undefined {
  return errors.find((error) => error.field === field);
}

export function getZodValidateErrorsV4(e: ZodErrorV4): ZodValidateError[] {
  return e.issues.map((issue) => {
    return {
      field: issue.path.join("."),
      error: issue.message,
    };
  });
}
