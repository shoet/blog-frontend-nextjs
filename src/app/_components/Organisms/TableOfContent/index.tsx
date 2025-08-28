"use client";
import { useEffect, useState } from "react";
import {
  type Heading,
  useTableOfContentContext,
} from "../TableOfContentProvider";
import clsx from "clsx";
import Link from "next/link";

export const TableOfContentPresentor = (props: { headings: Heading[] }) => {
  const { headings } = props;
  return (
    <div className={clsx("bg-main p-4 flex flex-col rounded-xl")}>
      <div className={clsx("text-lg font-extrabold mb-1")}>目次</div>
      <div className={clsx("p-2 flex flex-col")}>
        {headings.map((heading) => (
          <Link
            key={heading.element.id}
            href={`#${heading.element.id}`}
            className={clsx(
              "font-bold cursor-pointer text-left",
              "hover:bg-main-strong rounded-sm p-1",
              'hover:before:content-[">"]',
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

export const TableOfContent = () => {
  const { headingMap } = useTableOfContentContext();
  const [headings, setHeading] = useState<Heading[] | null>(null);

  useEffect(() => {
    if (!headingMap) {
      setHeading(null);
      return;
    }
    const headings = headingMap && Array.from(headingMap.values());
    setHeading(headings);
  }, [headingMap]);

  if (headings == null) return null;
  return <TableOfContentPresentor headings={headings} />;
};
