import clsx from "clsx";
import type { ComponentProps } from "react";

type Props = {
  imageURL: string;
  alt?: string;
} & ComponentProps<"img">;

export const AvatarImage = (props: Props) => {
  const { imageURL, alt, ...rest } = props;
  return (
    <img
      className={clsx("aspect-square w-full rounded-full object-cover")}
      src={imageURL}
      alt={alt ?? "profile"}
      {...rest}
    />
  );
};


