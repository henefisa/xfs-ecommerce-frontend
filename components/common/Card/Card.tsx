import React from "react";
import clsx from "clsx";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const Card: React.FC<CardProps> = ({ children, className, style }) => {
  return (
    <div className={clsx("card", className)} style={style}>
      {children}
    </div>
  );
};

export default React.memo(Card);
