import type { ComponentProps, CSSProperties } from "react";
import clsx from "clsx";
import {
  faGithub,
  faTwitter,
  faYoutube,
  type IconDefinition,
} from "@fortawesome/free-brands-svg-icons";
import {
  faMagnifyingGlass,
  faXmark,
  faAngleRight,
  faAngleLeft,
  faCloudArrowUp,
  faPlus,
  faPenToSquare,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { SizeProp } from "@fortawesome/fontawesome-svg-core";

type IconProps = {
  color?: string;
  size?: SizeProp;
  focus?: boolean;
  focusColor?: string;
} & ComponentProps<"div">;

const withIconStyle = (Icon: IconDefinition) => {
  return function IconStyle(props: IconProps) {
    const { color, size, focus, focusColor, ...rest } = props;

    const style = {
      "--focus-color": focusColor,
      "--fg-color": color,
    } as CSSProperties;

    return (
      <div
        className={clsx(
          "inline-block transition-colors duration-100 ease-in-out",
          {
            "text-[var(--fg-color)]": color,
            "hover:cursor-pointer": focus,
            "hover:cursor-pointer hover:text-[var(--focus-color)]": focusColor,
          }
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
export const IconUpload = withIconStyle(faCloudArrowUp);
export const IconPlus = withIconStyle(faPlus);
export const IconEdit = withIconStyle(faPenToSquare);
export const IconTrash = withIconStyle(faTrash);
