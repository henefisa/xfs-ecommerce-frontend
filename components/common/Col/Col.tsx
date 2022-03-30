import React, { useEffect, useRef } from "react";
import clsx from "clsx";

// context
import RowContext from "../../../contexts/RowContext";

interface ColProps {
  children?: React.ReactNode;
  className?: string;
  span?: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
}

const Col: React.FC<ColProps> = ({
  children,
  className,
  span,
  sm,
  md,
  lg,
  xl,
}) => {
  const colRef = useRef<HTMLDivElement>(null);

  const rowContext = React.useContext(RowContext);

  useEffect(() => {
    if (!colRef.current) return;
    if (!rowContext.gutter) return;
    if (typeof rowContext.gutter === "number") {
      colRef.current.style.paddingLeft = `${rowContext.gutter / 2}px`;
      colRef.current.style.paddingRight = `${rowContext.gutter / 2}px`;
    } else {
      colRef.current.style.paddingLeft = `${rowContext.gutter[0] / 2}px`;
      colRef.current.style.paddingRight = `${rowContext.gutter[0] / 2}px`;
    }
  }, [rowContext.gutter]);

  return (
    <div
      className={clsx(
        "col",
        span && `col--${span}`,
        sm && `col--sm-${sm}`,
        md && `col--md-${md}`,
        lg && `col--lg-${lg}`,
        xl && `col--xl-${xl}`,
        className
      )}
      ref={colRef}
    >
      {children}
    </div>
  );
};

export default React.memo(Col);
