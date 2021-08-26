import clsx from "clsx";
import React from "react";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  flex?: boolean;
  justify?: "start" | "center" | "end" | "between" | "evenly" | "around";
  items?: "start" | "center" | "end" | "baseline" | "stretch";
}

const Container: React.FC<ContainerProps> = ({
  children,
  className,
  flex,
  justify,
  items,
}) => {
  return (
    <div
      className={clsx(
        "container mx-auto px-4",
        flex && "flex",
        justify && `justify-${justify}`,
        items && `items-${items}`,
        className
      )}
    >
      {children}
    </div>
  );
};

export default React.memo(Container);
