export type ClientBlogEditFormError = {
  field: string;
  error: string;
};

export type ClientBlogEditFormState = {
  thumbnail?: File;
  errors: ClientBlogEditFormError[];
};

export function getClientBlogEditFormError(
  state: ClientBlogEditFormState,
  field: string,
): ClientBlogEditFormError | undefined {
  return state.errors.find((error) => error.field === field);
}
