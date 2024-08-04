import { useFormState } from "react-dom";
import { Blog } from "@/types/api";
import { useState } from "react";
import { ClientBlogEditFormState } from "./state";
import { blogEditSubmitAction } from "./actions";

export const useBlogEditForm = (props: { blog?: Blog }) => {
  const { blog } = props;

  const [tags, setTags] = useState<string[]>(blog?.tags || []);
  const [isPublic, setIsPublic] = useState<boolean>(blog?.isPublic || false);

  const handleEnterTags = (tag: string) => {
    setTags([...tags, tag]);
  };

  const handleDeleteTags = (tag: string) => {
    const newTags = tags.filter((t) => {
      return t !== tag;
    });
    setTags(newTags);
  };

  const handleChangeIsPublic = (isPublic: boolean) => {
    setIsPublic(isPublic);
  };

  const [state, formAction] = useFormState(
    async (
      _: ClientBlogEditFormState,
      formData: FormData,
    ): Promise<ClientBlogEditFormState> => {
      // サムネイルのハンドリング TODO
      formData.append("tags", tags.join(","));
      const state = await blogEditSubmitAction(formData);
      return state;
    },
    {
      title: props.blog?.title || "",
      description: props.blog?.description || "",
      thumbnailUrl: props.blog?.thumbnailImageFileName || "",
      tags: tags,
      content: props.blog?.content || "",
      isPublic: isPublic,

      errors: [],
    },
  );

  return {
    state,
    formAction,
    tags,
    handleEnterTags,
    handleDeleteTags,
    handleChangeIsPublic,
    isPublic,
  };
};
