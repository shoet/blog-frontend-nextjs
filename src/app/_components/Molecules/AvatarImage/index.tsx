import styles from "./index.module.scss";
import { ComponentProps } from "react";

type Props = {
  imageURL: string;
  alt?: string;
} & ComponentProps<"img">;

export const AvatarImage = (props: Props) => {
  return (
    <img
      className={styles.avatarImage}
      src={props.imageURL}
      alt={props.alt ?? "profile"}
    />
  );
};
