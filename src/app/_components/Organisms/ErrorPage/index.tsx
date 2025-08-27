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
        "flex flex-col items-center justify-center bg-main",
        "h-dvh",
      )}
    >
      <div className={clsx("flex max-w-[500px] flex-col gap-3")}>
        <div
          className={clsx(
            "flex w-full flex-row justify-start",
            "font-bold text-5xl text-white",
          )}
        >
          {props.statusCode}
        </div>
        <div className={clsx("flex flex-col gap-4", "rounded-xl bg-white p-6")}>
          <div
            className={clsx("flex flex-row items-center justify-start gap-2")}
          >
            <div
              className={clsx(
                "h-[calc(100%-2px)] w-[5px] rounded-full bg-main",
              )}
            ></div>
            <div className={clsx("font-bold text-md")}>{props.title}</div>
          </div>
          <div>{props.detail}</div>
        </div>
      </div>
      <div className={clsx("flex w-full flex-row justify-center")}>
        <Link
          href="/"
          className={clsx(
            "mt-[30px] rounded-full bg-white px-8 py-2",
            styles.button,
          )}
        >
          TOPへ戻る
        </Link>
      </div>
    </div>
  );
};
