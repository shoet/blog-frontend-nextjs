import clsx from "clsx";
import { Badge, type BadgeProps } from "../../Atoms/Badge";
import { IconXmark } from "../../Atoms/Icon";
import { Spacer } from "../../Atoms/Spacer";

type CloseableBadgeProps = {
  onClickClose?: () => void;
} & Omit<BadgeProps, "onClick">;

export const CloseableBadge = (props: CloseableBadgeProps) => {
  const { onClickClose, children, ...rest } = props;

  return (
    <Badge {...rest}>
      <div className={clsx("flex flex-row items-center")}>
        <span>{children}</span>
        <Spacer width={10} />
        <IconXmark className={clsx("cursor-pointer")} onClick={onClickClose} />
      </div>
    </Badge>
  );
};
