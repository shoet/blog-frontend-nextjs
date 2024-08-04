import { useFormState } from "react-dom";
import { blogEditSubmitStateAction } from "./actions";
import { Blog } from "@/types/api";
import { useState } from "react";

export const useBlogEditForm = (props: { blog?: Blog }) => {
  const { blog } = props;

  const [tags, setTags] = useState<string[]>(blog?.tags || []);


  const [state, formAction] = useFormState(blogEditSubmitStateAction, {
    title: props.blog?.title || "",
    description: props.blog?.description || "",
    thumbnailUrl: props.blog?.thumbnailImageFileName || "",
    tags: tags,
    content: props.blog?.content || "",

    errors: [],
  });

  return { state, formAction, handleEnterTags, handleDeleteTags };
};
