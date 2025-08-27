"use client";

import Image from "next/image";
import { type ReactEventHandler, useState } from "react";
import { SkeletonLoader } from "../SkeletonLoader";
import clsx from "clsx";

type LoadingNextImageProps = {
  src: string;
  alt: string;
} & React.ComponentProps<typeof Image>;

export const LoadingNextImage = (props: LoadingNextImageProps) => {
  const { src, alt, className, ...rest } = props;
  const [isLoading, setIsLoading] = useState(true);
  const visibility = isLoading ? "hidden" : "visible";

  const handleOnLoad: ReactEventHandler<HTMLImageElement> = (
    _: React.SyntheticEvent<HTMLImageElement, Event>,
  ): void => setIsLoading(false);

  return (
    <>
      {isLoading && (
        <div className={clsx("flex h-full flex-col justify-center")}>
          <SkeletonLoader />
        </div>
      )}
      <Image
        className={clsx(className)}
        src={src}
        alt={alt}
        onLoad={handleOnLoad}
        unoptimized
        {...rest}
        style={{ visibility }}
      />
    </>
  );
};
