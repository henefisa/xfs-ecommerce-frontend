import clsx from "clsx";
import React, { useEffect, useRef } from "react";

// context
import RowContext from "../../contexts/RowContext";

interface RowProps {
  children?: React.ReactNode;
  className?: string;
  justify?: "start" | "center" | "end" | "between";
  align?: "start" | "center" | "end" | "stretch";
  gutter?: number | [number, number];
  divide?: "all" | "x" | "y";
  style?: React.CSSProperties;
}

const Row: React.FC<RowProps> = ({
  children,
  className,
  justify,
  align,
  gutter = 0,
  style,
  divide,
}) => {
  const rowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!rowRef.current) return;
    if (!gutter) return;

    if (typeof gutter === "number") {
      rowRef.current.style.marginLeft = `${-gutter / 2}px`;
      rowRef.current.style.marginRight = `${-gutter / 2}px`;
    } else {
      rowRef.current.style.marginLeft = `${-gutter[0] / 2}px`;
      rowRef.current.style.marginRight = `${-gutter[0] / 2}px`;
      rowRef.current.style.rowGap = `${gutter[1]}px`;
    }
  }, [gutter]);

  return (
    <RowContext.Provider value={{ gutter }}>
      <div
        className={clsx(
          "row",
          justify && `row--justify-${justify}`,
          align && `row--align-${align}`,
          divide && `row--divide-${divide}`,
          className
        )}
        ref={rowRef}
        style={style}
      >
        {children}
      </div>
    </RowContext.Provider>
  );
};

export default React.memo(Row);
