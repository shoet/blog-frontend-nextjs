import { ZodError } from "zod";
import { ClientBlogEditFormError, ClientBlogEditFormState } from "./state";
import { ClientBlogEditFormSchema } from "./validate";
import { Blog } from "@/types/api";

export async function blogEditSubmitStateAction(
  state: ClientBlogEditFormState,
  formData: FormData,
): Promise<ClientBlogEditFormState> {
  return { errors: [] };
}
