import { Blog } from "@/types/api";
import { useActionState, useRef } from "react";
import { updateIsPublicServerAction } from "./actions";
import { useToastContext } from "@/app/_components/Molecules/ToastProvider";

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

  const { queueToast } = useToastContext();

  const [state, action] = useActionState(
    async (state: State, _: FormData) => {
      const newState = !state.isPublic;

      const formData = new FormData();

      formData.append("blogId", blog.id.toString());
      formData.append("isPublic", newState.toString());

      try {
        await updateIsPublicServerAction(formData);
        await queueToast(
          "記事の更新",
          `記事を${newState ? "公開" : "非公開"}状態に変更しました`,
        );
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
