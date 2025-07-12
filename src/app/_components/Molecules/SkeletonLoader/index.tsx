import { colors } from "@/themes/colors";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import css from "./index.module.scss";
import clsx from "clsx";

const RoundSkeleton = () => {
  return <Skeleton borderRadius={30} />;
};

const SkeletonRow = (props: { rowNum: number }) => {
  const { rowNum } = props;
  return (
    <div className={css.skeletonRow}>
      <div className={clsx(css.skeletonCol, css[`skeletonCol_${rowNum}_1`])}>
        <RoundSkeleton />
      </div>
      <div className={clsx(css.skeletonCol, css[`skeletonCol_${rowNum}_2`])}>
        <RoundSkeleton />
      </div>
      <div className={clsx(css.skeletonCol, css[`skeletonCol_${rowNum}_3`])}>
        <RoundSkeleton />
      </div>
    </div>
  );
};

export const SkeletonLoader = (props: { rows?: number }) => {
  const { rows = 3 } = props;
  return (
    <SkeletonTheme
      baseColor={colors.boxPlaceholderBG}
      highlightColor={colors.boxPlaceholderFG}
    >
      <div className={css.skeleton}>
        {Array.from({ length: rows }).map((_, idx) => (
          // biome-ignore lint: lint/suspicious/noArrayIndexKey
          <SkeletonRow key={idx} rowNum={(idx % 5) + 1} />
        ))}
      </div>
    </SkeletonTheme>
  );
};
