import { z, ZodError, ZodSchema } from "zod";

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

export function getZodValidateErrors(e: ZodError): ZodValidateError[] {
  return e.errors.map((error) => {
    return {
      field: error.path.join("."),
      error: error.message,
    };
  });
}

export function getZodValidateError(
  errors: ZodValidateError[],
  field: string,
): ZodValidateError | undefined {
  return errors.find((error) => error.field === field);
}
