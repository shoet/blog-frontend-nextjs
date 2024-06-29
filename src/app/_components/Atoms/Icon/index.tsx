import { ComponentProps, CSSProperties } from "react";
import styles from "./index.module.scss";
import clsx from "clsx";
import {
  faGithub,
  faTwitter,
  faYoutube,
  IconDefinition,
} from "@fortawesome/free-brands-svg-icons";
import {
  faMagnifyingGlass,
  faXmark,
  faAngleRight,
  faAngleLeft,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SizeProp } from "@fortawesome/fontawesome-svg-core";

type IconProps = {
  size?: SizeProp;
  focus?: boolean;
  focusColor?: string;
} & ComponentProps<"div">;

const withIconStyle = (Icon: IconDefinition) => {
  return (props: IconProps) => {
    const { size, focus, focusColor, ...rest } = props;

    const style = {
      "--focus-color": focusColor,
    } as CSSProperties;

    return (
      <div
        className={clsx(
          styles.iconWrapper,
          focus && styles.iconWrapperFocus, // optional
          focusColor && styles.iconWrapperFocusColor, // optional
        )}
        style={style}
        {...rest}
      >
        <FontAwesomeIcon icon={Icon} size={size} />
      </div>
    );
  };
};

export const IconGitHub = withIconStyle(faGithub);
export const IconYoutube = withIconStyle(faYoutube);
export const IconTwitter = withIconStyle(faTwitter);
export const IconGlass = withIconStyle(faMagnifyingGlass);
export const IconXmark = withIconStyle(faXmark);
export const IconArrowRight = withIconStyle(faAngleRight);
export const IconArrowLeft = withIconStyle(faAngleLeft);
