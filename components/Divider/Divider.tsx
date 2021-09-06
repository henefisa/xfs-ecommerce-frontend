import React from "react";
import clsx from "clsx";

interface DividerProps {
  direction?: "vertical" | "horizontal";
  className?: string;
}

const Divider: React.FC<DividerProps> = ({
  direction = "vertical",
  className,
}) => {
  return (
    <div className={clsx("divider", `divider--${direction}`, className)} />
  );
};

export default React.memo(Divider);
