import { ZodValidateError } from "@/utils/validate";

export type State = {
  statusCode?: number;
  message?: string;
  zodError?: ZodValidateError[];
};
