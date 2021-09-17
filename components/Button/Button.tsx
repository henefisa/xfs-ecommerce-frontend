import clsx from "clsx";
import React from "react";

type ButtonColors = "primary" | "success" | "error" | "warning";
type ButtonTypes = "outline" | "solid" | "link";

interface ButtonProps {
  children: React.ReactNode;
  type?: ButtonTypes;
  color?: ButtonColors;
  className?: string;
  htmlType?: React.ButtonHTMLAttributes<HTMLButtonElement>["type"];
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({
  children,
  type = "outline",
  color = "primary",
  className,
  htmlType,
  onClick,
}) => {
  return (
    <button
      className={clsx(
        "button",
        type && `button--type-${type}`,
        color && `button--color-${color}`,
        className
      )}
      onClick={onClick}
      type={htmlType}
    >
      {children}
    </button>
  );
};

export default React.memo(Button);
