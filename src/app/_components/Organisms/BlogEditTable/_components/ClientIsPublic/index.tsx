"use client";

import { ToggleSwitch } from "@/app/_components/Atoms/ToggleSwitch";
import { Blog } from "@/types/api";
import { useIsPublic } from "./hooks";

type Props = {
  blog: Blog;
};

export const ClientIsPublic = (props: Props) => {
  const { blog: defaultBlog } = props;

  const { isPublic, formRef, formAction, handleOnChangeToggle } = useIsPublic({
    blog: defaultBlog,
  });
  return (
    <form ref={formRef} action={formAction}>
      <ToggleSwitch
        defaultStatus={isPublic}
        onChangeToggle={handleOnChangeToggle}
      />
    </form>
  );
};
