"use client";
import clsx from "clsx";
import { IconXmark } from "../../Atoms/Icon";

type Props = {
  title: string;
  detail: string;
  onClickClose?: () => void;
};

export const Toast = (props: Props) => {
  const { title, detail, onClickClose } = props;
  return (
    <div className={clsx(
      "flex w-[250px] flex-row items-center justify-between",
      "rounded-md bg-[#91a679] p-2 text-gray-100 opacity-80"
    )}>
      <div className={clsx("flex flex-col gap-1")}>
        <div className={clsx("font-bold text-sm")}>{title}</div>
        <div className={clsx("text-xs")}>{detail}</div>
      </div>
      {onClickClose && (
        <button
          type="button"
          className={clsx("mr-2 text-white text-xl")}
          onClick={onClickClose}
        >
          <IconXmark />
        </button>
      )}
    </div>
  );
};
