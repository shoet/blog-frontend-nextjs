import type { ZodValidateError } from "@/utils/validate";

export type LoginActionFormState = {
  validateErrors?: ZodValidateError[];
  errors?: string[];
};
