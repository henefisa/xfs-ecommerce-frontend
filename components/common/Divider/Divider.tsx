import React from "react";
import clsx from "clsx";

interface DividerProps {
  direction?: "vertical" | "horizontal";
  className?: string;
  style?: React.CSSProperties;
}

const Divider: React.FC<DividerProps> = ({
  direction = "vertical",
  className,
  style,
}) => {
  return (
    <div
      className={clsx("divider", `divider--${direction}`, className)}
      style={style}
    />
  );
};

export default React.memo(Divider);
