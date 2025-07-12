"use client";
import {
  createContext,
  type PropsWithChildren,
  useCallback,
  useContext,
  useRef,
  useState,
} from "react";

export type HeadingType = "h1" | "h2" | "h3";

export type Heading = {
  type: HeadingType;
  element: Element;
  content: string;
  topPosition: number;
};

export type HeadingMap = Map<string, Heading>;

type TableOfContentContextType = {
  headingMap: HeadingMap | null;
  loadHeadings: () => void;
  cleanupHeadings: () => void;
  jumpToHeading: (key: string) => void;
  watchRef: React.RefObject<HTMLDivElement | null>;
};

const TableOfContentContext = createContext<TableOfContentContextType>({
  headingMap: null,
  loadHeadings: () => { },
  cleanupHeadings: () => { },
  jumpToHeading: () => { },
  watchRef: { current: null },
});

export const useTableOfContentContext = () => useContext(TableOfContentContext);

export const TableOfContentContextProvider = (props: PropsWithChildren) => {
  const { children } = props;
  const [headings, setHeadings] = useState<HeadingMap | null>(null);
  const watchRef = useRef<HTMLDivElement>(null);

  /**
   * loadHeadings は、watchRefで参照した要素内から、目次の見出しを抽出する
   */
  const loadHeadings = useCallback(() => {
    if (!watchRef.current) {
      return;
    }

    const article = watchRef.current.querySelector("#article");
    const elements = article?.querySelectorAll("h1,h2,h3");
    if (!elements) {
      return;
    }

    const headingMap: HeadingMap = new Map();
    elements.forEach((e) => {
      const tagName = e.tagName.toLowerCase() as HeadingType;
      const text = e.textContent || "";
      const rect = e.getBoundingClientRect();
      const topPosition = rect.top;

      const heading: Heading = {
        type: tagName,
        element: e,
        content: text,
        topPosition: topPosition,
      };
      headingMap.set(text, heading);
    });
    setHeadings(headingMap);

    return () => {
      setHeadings(null);
    };
  }, [])

  const cleanupHeadings = useCallback(
    () => {
      setHeadings(null);
      document.children[0].scrollTo(0, 0);
    }, [])

  const jumpToHeading = useCallback(
    (key: string) => {
      const heading = headings?.get(key);
      if (heading) {
        const h = document.querySelectorAll(heading.type);
        h.forEach((e) => {
          if (e.textContent === heading.content) {
            e.scrollIntoView();
            return;
          }
        });
      }
    }, [headings])

  return (
    <TableOfContentContext.Provider
      value={{
        headingMap: headings,
        loadHeadings: loadHeadings,
        cleanupHeadings: cleanupHeadings,
        jumpToHeading: jumpToHeading,
        watchRef: watchRef,
      }}
    >
      <div>{children}</div>
    </TableOfContentContext.Provider>
  );
};
