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
  isPublic: boolean;

  errors: ClientBlogEditFormError[];
  generalError?: string;
};

export const emptyFormState: ClientBlogEditFormState = {
  title: "",
  description: "",
  thumbnailUrl: "",
  tags: [],
  content: "",
  isPublic: false,
  errors: [],
};

export function getClientBlogEditFormError(
  state: ClientBlogEditFormState,
  field: string,
): ClientBlogEditFormError | undefined {
  return state.errors.find((error) => error.field === field);
}
