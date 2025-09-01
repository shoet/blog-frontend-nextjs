import { Spacer } from "@/app/_components/Atoms/Spacer";
import { SkeletonLoader } from "@/app/_components/Molecules/SkeletonLoader";
import clsx from "clsx";

export default function Loading() {
  return (
    <div>
      <div className={clsx("border-gray-300 border-b pb-4")}>
        <SkeletonLoader rows={4} />
        <Spacer height={20} />
        <div className={clsx("flex flex-row items-center justify-start gap-4")}>
          <div className={clsx("font-bold text-gray-500 text-md")}>
            <SkeletonLoader rows={1} />
          </div>
          <SkeletonLoader rows={1} />
        </div>
        <Spacer height={20} />
      </div>
      <Spacer height={20} />
      <div className={clsx("flex flex-row items-start justify-center gap-6")}>
        <div className={clsx("w-9/12")}>
          <SkeletonLoader rows={15} />
        </div>
        <Spacer width={40} />
        <div className={clsx("sticky top-6 mt-6 w-3/12")}>
          <SkeletonLoader rows={10} />
        </div>
      </div>
      <Spacer height={50} />
      <SkeletonLoader rows={5} />
    </div>
  );
}
