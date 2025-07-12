"use client";
import styles from "./index.module.scss";
import { type CSSProperties, useEffect, useState } from "react";
import {
  type Heading,
  type HeadingType,
  useTableOfContentContext,
} from "../TableOfContentProvider";
import { theme } from "@/themes";
import clsx from "clsx";

const headingsStyle: Record<HeadingType, CSSProperties> = {
  h1: {
    "--font-size": "1.1rem",
    "--letter-spacing": "0.2rem",
    "--color": theme.colors.black,
    "--focus-background-color": theme.colors.focusGreen,
  } as CSSProperties,
  h2: {
    "--font-size": "1.0rem",
    "--letter-spacing": "0.1rem",
    "--color": theme.colors.black,
    "--focus-background-color": theme.colors.focusGreen,
  } as CSSProperties,
  h3: {
    "--font-size": "0.8rem",
    "--letter-spacing": "0.1rem",
    "--color": theme.colors.black,
    "--focus-background-color": theme.colors.focusGreen,
  } as CSSProperties,
};

const getHeadingMessage = (heading: Heading) => {
  switch (heading.type) {
    case "h1":
      return `${heading.content}`;
    case "h2":
      return `${heading.content}`;
    case "h3":
      return `${heading.content}`;
  }
};

export const TableOfContentComponent = (props: {
  headings: Heading[];
  onClick?: (heading: Heading) => void;
}) => {
  const { headings, onClick } = props;
  return (
    <div
      className={styles.tableOfContent}
      style={
        { "--background-color": theme.colors.secondaryGray } as CSSProperties
      }
    >
      <div className={styles.titleSummary}>目次</div>
      {headings.map((heading) => {
        return (
          <button
            type="button"
            className={clsx(styles.heading, styles[`heading-${heading.type}`])}
            key={heading.content}
            style={headingsStyle[heading.type]}
            onClick={() => {
              onClick?.(heading);
            }}
          >
            {getHeadingMessage(heading)}
          </button>
        );
      })}
    </div>
  );
};

export const TableOfContent = () => {
  const { headingMap, jumpToHeading } = useTableOfContentContext();
  const [headings, setHeading] = useState<Heading[] | null>(null);

  useEffect(() => {
    if (!headingMap) {
      setHeading(null);
      return;
    }
    const headings = headingMap && Array.from(headingMap.values());
    setHeading(headings);
  }, [headingMap]);

  const onClickHeading = (heading: Heading) => {
    jumpToHeading(heading.content);
  };

  if (headings == null) return null;
  return (
    <TableOfContentComponent headings={headings} onClick={onClickHeading} />
  );
};
