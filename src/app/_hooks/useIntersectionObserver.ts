import { useRef, useState } from "react";

type Intersections = Record<
  string,
  {
    id: string;
    order: number;
    state?: "in" | "out";
  }
>;

export const useIntersectionObserver = () => {
  const observers = useRef<IntersectionObserver[]>([]);
  const [intersections, setIntersections] = useState<Intersections>({});

  const set = (id: string, order: number, state?: "in" | "out") => {
    setIntersections((prev) => {
      const item = prev[id];
      if (item) {
        item.state = state;
        return { ...prev, [id]: item };
      } else {
        return { ...prev, [id]: { id: id, order, state: "in" } };
      }
    });
  };

  const registerIntersection = (element: Element, order: number) => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            set(entry.target.id, order, "in");
          } else {
            set(entry.target.id, order, "out");
          }
        });
      },
      {
        root: null,
        threshold: 0,
      },
    );
    observer.observe(element);
    observers.current.push(observer);
  };

  const cleanup = () => {
    observers.current.forEach((o) => o.disconnect());
    setIntersections({});
  };

  return {
    intersections,
    registerIntersection,
    cleanup,
  };
};
