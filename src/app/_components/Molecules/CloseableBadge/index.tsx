import { Badge, BadgeProps } from "../../Atoms/Badge";
import { IconXmark } from "../../Atoms/Icon";
import { Spacer } from "../../Atoms/Spacer";

type CloseableBadgeProps = {
  onClickClose?: () => void;
} & Omit<BadgeProps, "onClick">;

export const CloseableBadge = (props: CloseableBadgeProps) => {
  const { onClickClose, children, ...rest } = props;

  return (
    <Badge {...rest}>
      <span>{children}</span>
      <Spacer width={10} />
      <IconXmark onClick={onClickClose} />
    </Badge>
  );
};
