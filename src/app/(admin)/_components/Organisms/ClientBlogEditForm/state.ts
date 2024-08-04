export type ClientBlogEditFormError = {
  field: string;
  error: string;
};

export type ClientBlogEditFormState = {
  title: string;
  description: string;
  thumbnailUrl: string;
  tags: string[];
  content: string;

  thumbnail?: File;
  errors: ClientBlogEditFormError[];
};

export const emptyFormState: ClientBlogEditFormState = {
  title: "",
  description: "",
  thumbnailUrl: "",
  tags: [],
  content: "",
  errors: [],
};

export function getClientBlogEditFormError(
  state: ClientBlogEditFormState,
  field: string,
): ClientBlogEditFormError | undefined {
  return state.errors.find((error) => error.field === field);
}
