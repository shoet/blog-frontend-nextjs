"use client";

import Image from "next/image";
import { ReactEventHandler, useState } from "react";
import { SkeletonLoader } from "../SkeletonLoader";
import css from "./index.module.scss";

type LoadingNextImageProps = {
  src: string;
  alt: string;
} & React.ComponentProps<typeof Image>;

export const LoadingNextImage = (props: LoadingNextImageProps) => {
  const { src, alt, ...rest } = props;
  const [isLoading, setIsLoading] = useState(true);
  const visibility = isLoading ? "hidden" : "visible";

  const handleOnLoad: ReactEventHandler<HTMLImageElement> = (
    _: React.SyntheticEvent<HTMLImageElement, Event>,
  ): void => setIsLoading(false);

  return (
    <>
      {isLoading && (
        <div className={css.skeletonWrapper}>
          <SkeletonLoader />
        </div>
      )}
      <Image
        src={src}
        alt={alt}
        onLoad={handleOnLoad}
        {...rest}
        style={{ visibility }}
      />
    </>
  );
};
