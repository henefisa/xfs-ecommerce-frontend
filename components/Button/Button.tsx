import clsx from "clsx";
import React from "react";

type ButtonColors = "primary" | "success" | "error" | "warning";
type ButtonTypes = "outline" | "solid" | "link";

interface ButtonProps {
  children: React.ReactNode;
  type?: ButtonTypes;
  color?: ButtonColors;
  className?: string;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({
  children,
  type = "outline",
  color = "primary",
  className,
  onClick,
}) => {
  return (
    <button
      className={clsx(
        "button",
        type && `button--${type}`,
        color && `button--${color}`,
        className
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default React.memo(Button);
