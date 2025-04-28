import styles from "./index.module.scss";
import { ComponentProps } from "react";

type Props = {
  imageURL: string;
  alt?: string;
} & ComponentProps<"img">;

export const AvatarImage = (props: Props) => {
  const { imageURL, alt, ...rest } = props;
  return (
    <img
      className={styles.avatarImage}
      src={imageURL}
      alt={alt ?? "profile"}
      {...rest}
    />
  );
};
