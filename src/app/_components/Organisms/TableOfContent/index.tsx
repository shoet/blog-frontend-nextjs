"use client";
import { useIntersectionObserver } from "@/app/_hooks/useIntersectionObserver";
import clsx from "clsx";
import Link from "next/link";
import { useEffect, useState } from "react";

export type HeadingType = "h1" | "h2" | "h3";

export type Heading = {
  type: HeadingType;
  id: string;
  content: string;
};

/**
 * ClientTableOfContent は、目次要素を表示する。
 * また、documentからintersectionObserveIdPrefixを持つ対象要素を検索し交差状態を監視する。
 * rootIdが指定されている場合は、そのidを持つ要素の中から検索する。
 */
export const ClientTableOfContent = (props: {
  headings: Heading[];
  intersectionObserveIdPrefix: string;
  rootId?: string;
}) => {
  const { headings, intersectionObserveIdPrefix, rootId } = props;
  const {
    registerIntersection,
    cleanup: cleanupIntersections,
    intersections,
  } = useIntersectionObserver();
  const [topHeading, setTopHeading] = useState<string>();

  const registerIntersections = (observeIdPrefix: string, rootId?: string) => {
    let sections: NodeListOf<Element> | never[];
    if (rootId) {
      const article = document.querySelector(`#${rootId}`);
      sections = article?.querySelectorAll(`[id^="${observeIdPrefix}"]`) || [];
    } else {
      sections = document.querySelectorAll(`[id^="${observeIdPrefix}"]`) || [];
    }
    sections?.forEach((e, idx) => {
      registerIntersection(e, idx);
    });
  };

  useEffect(() => {
    cleanupIntersections();
    registerIntersections(intersectionObserveIdPrefix, rootId);

    return () => {
      cleanupIntersections();
    };
  }, []);

  useEffect(() => {
    const intersectionsArray = Object.values(intersections).filter(
      (i) => i.state === "in",
    );
    if (intersectionsArray.length > 0) {
      setTopHeading(intersectionsArray.sort((a, b) => a.order - b.order)[0].id);
    }
  }, [intersections]);

  return (
    <TableOfContentPresentor headings={headings} activeHeadingId={topHeading} />
  );
};

export const TableOfContentPresentor = (props: {
  headings: Heading[];
  activeHeadingId?: string;
}) => {
  const { headings, activeHeadingId } = props;
  return (
    <div className={clsx("bg-gray-300 p-4 flex flex-col rounded-xl")}>
      <div className={clsx("text-lg font-extrabold mb-1")}>目次</div>
      <div className={clsx("p-2 flex flex-col")}>
        {headings.map((heading) => (
          <Link
            key={heading.id}
            href={`#${heading.id}`}
            className={clsx(
              "font-bold cursor-pointer text-left break-words",
              "hover:bg-main-strong rounded-sm p-1",
              'hover:before:content-[">"]',
              activeHeadingId === heading.id &&
                'before:content-["->"] text-gray-700',
              heading.type === "h1" &&
                `text-lg tracking-[0.2rem] py-1 before:content-["#"]`,
              heading.type === "h2" &&
                'text-md tracking-[0.1rem] py-0.5 before:content-["##"]',
              heading.type === "h3" &&
                'text-sm tracking-[0.1rem] before:content-["###"]',
            )}
          >
            {heading.content}
          </Link>
        ))}
      </div>
    </div>
  );
};
