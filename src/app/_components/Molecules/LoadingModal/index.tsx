import clsx from "clsx";
import { Spinner } from "../../Atoms/Spinner";

type Props = {
  open?: boolean;
};

export const LoadingModal = (props: Props) => {
  if (!props.open) {
    return null;
  }
  return (
    <>
      <div className={clsx("fixed top-0 left-0 h-dvh w-dvw bg-gray-400 opacity-80")} />
      <div className={clsx("-translate-x-1/2 -translate-y-1/2 fixed top-1/2 left-1/2")}>
        <Spinner />
      </div>
    </>
  );
};

