import clsx from "clsx";
import Link from "next/link";
import styles from "./index.module.css";

type Props = {
  statusCode: number;
  title: string;
  detail: string;
};

export const ErrorPage = (props: Props) => {
  return (
    <div
      className={clsx(
        "bg-main flex flex-col items-center justify-center",
        "h-dvh",
      )}
    >
      <div className={clsx("max-w-[500px] flex flex-col gap-3")}>
        <div
          className={clsx(
            "flex flex-row justify-start w-full",
            "text-white text-5xl font-bold",
          )}
        >
          {props.statusCode}
        </div>
        <div className={clsx("flex flex-col gap-4", "bg-white rounded-xl p-6")}>
          <div
            className={clsx("flex flex-row items-center justify-start gap-2")}
          >
            <div
              className={clsx(
                "w-[5px] h-[calc(100%-2px)] bg-main rounded-full",
              )}
            ></div>
            <div className={clsx("font-bold text-md")}>{props.title}</div>
          </div>
          <div>{props.detail}</div>
        </div>
      </div>
      <div className={clsx("w-full flex flex-row justify-center")}>
        <Link
          href="/"
          className={clsx(
            "px-8 py-2 bg-white rounded-full mt-[30px]",
            styles.button,
          )}
        >
          TOPへ戻る
        </Link>
      </div>
    </div>
  );
};
