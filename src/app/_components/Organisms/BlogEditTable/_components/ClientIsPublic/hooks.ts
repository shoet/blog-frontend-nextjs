import { Blog } from "@/types/api";
import { useActionState, useRef, useState } from "react";
import { updateIsPublicServerAction } from "./actions";

type Props = {
  blog: Blog;
};

type State = {
  isPublic: boolean;
  errors: string[];
};

export const useIsPublic = (props: Props) => {
  const { blog } = props;
  const formRef = useRef<HTMLFormElement>(null);

  const [state, action] = useActionState(
    async (state: State, _: FormData) => {
      const newState = !state.isPublic;

      const formData = new FormData();

      formData.append("blogId", blog.id.toString());
      formData.append("isPublic", newState.toString());

      try {
        await updateIsPublicServerAction(formData);
      } catch (e) {
        console.error(e);
        return { ...state, errors: ["公開状態の更新に失敗しました"] };
      }

      return { isPublic: newState, errors: [] };
    },
    { isPublic: props.blog.isPublic, errors: [] },
  );

  const handleOnChangeToggle = () => {
    if (formRef.current === null) {
      return;
    }
    formRef.current.requestSubmit();
  };

  return {
    formRef,
    formAction: action,
    isPublic: state.isPublic,
    handleOnChangeToggle,
  };
};
