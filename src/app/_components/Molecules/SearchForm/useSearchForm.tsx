import React, { useRef } from "react";

type useSearchFormProps = {
  onSubmit?: (keyword: string) => void;
};

export const useSearchForm = (props: useSearchFormProps) => {
  const { onSubmit } = props;

  const inputRef = useRef<HTMLInputElement>(null);

  const handleOnClickButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    const text = inputRef.current?.value;
    if (text) {
      onSubmit && onSubmit(text);
    }
  };

  const handleOnKeydownInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const text = inputRef.current?.value;
      if (text) {
        onSubmit && onSubmit(text);
      }
    }
  };

  return { inputRef, handleOnKeydownInput, handleOnClickButton };
};
