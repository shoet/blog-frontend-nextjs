import Image from "next/image";
import styles from "./index.module.scss";
import { CSSProperties } from "react";

type Props = {
  imageURL: string;
  size: string;
  alt?: string;
};

export const AvatarImage = (props: Props) => {
  const { size = "100px" } = props;
  const style = { "--size": size } as CSSProperties;
  return (
    <div style={style}>
      <div className={styles.avatarImage}>
        <Image
          className={styles.image}
          fill
          src={props.imageURL}
          alt={props.alt ?? "profile"}
        />
      </div>
    </div>
  );
};
