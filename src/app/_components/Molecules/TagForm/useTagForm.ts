import React, { useRef } from "react";

type useTagFormProps = {
  onSubmit?: (text: string) => void;
};

export const useTagForm = (props: useTagFormProps) => {
  const { onSubmit } = props;

  const inputRef = useRef<HTMLInputElement>(null);

  const onKeyDownEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputRef.current) {
      const word = inputRef.current.value;
      onSubmit && onSubmit(word);
      inputRef.current.value = "";
    }
  };

  return { inputRef, onKeyDownEnter };
};
