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
  id: string;
  content: string;
};

export type HeadingMap = Map<string, Heading>;

type TableOfContentContextType = {
  headingMap: HeadingMap | null;
  loadHeadings: () => void;
  cleanupHeadings: () => void;
  watchRef: React.RefObject<HTMLDivElement | null>;
};

const TableOfContentContext = createContext<TableOfContentContextType>({
  headingMap: null,
  loadHeadings: () => {},
  cleanupHeadings: () => {},
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
    const elements = article?.querySelectorAll('[id^="heading-content-"]'); // markedで付与したidを抽出する
    if (!elements) {
      return;
    }

    const headingMap: HeadingMap = new Map();
    elements.forEach((e) => {
      const tagName = e.tagName.toLowerCase() as HeadingType;
      const text = e.textContent || "";

      const heading: Heading = {
        type: tagName,
        id: e.id,
        content: text,
      };
      headingMap.set(text, heading);
    });
    setHeadings(headingMap);

    return () => {
      setHeadings(null);
    };
  }, []);

  const cleanupHeadings = useCallback(() => {
    setHeadings(null);
  }, []);

  return (
    <TableOfContentContext.Provider
      value={{
        headingMap: headings,
        loadHeadings: loadHeadings,
        cleanupHeadings: cleanupHeadings,
        watchRef: watchRef,
      }}
    >
      <div>{children}</div>
    </TableOfContentContext.Provider>
  );
};
