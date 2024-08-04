import { ZodError } from "zod";
import {
  ClientBlogEditFormError,
  ClientBlogEditFormState,
  emptyFormState,
} from "./state";
import { ClientBlogEditFormSchema } from "./validate";

export async function blogEditSubmitStateAction(
  state: ClientBlogEditFormState,
  formData: FormData,
): Promise<ClientBlogEditFormState> {
  return emptyFormState; // TODO: 一旦空で返す
}

export async function blogEditSubmitAction(
  formData: FormData,
): Promise<ClientBlogEditFormState> {
  try {
    const valid = ClientBlogEditFormSchema.parse(
      Object.fromEntries(formData.entries()),
    );
  } catch (e) {
    if (e instanceof ZodError) {
      const errors: ClientBlogEditFormError[] = e.errors.map((error) => {
        const field = error.path[0].toString();
        const message = error.message;
        return { field: field, error: message } as ClientBlogEditFormError;
      });
      return emptyFormState; // TODO: 一旦空で返す
    } else {
      throw e;
    }
  }
  return emptyFormState; // TODO: 一旦空で返す
}
