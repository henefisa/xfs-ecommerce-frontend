import clsx from "clsx";
import React from "react";

type ButtonColors = "primary" | "sucess" | "error" | "warning";
type ButtonTypes = "outline" | "solid";

interface ButtonProps {
  children: React.ReactNode;
  type?: ButtonTypes;
  color?: ButtonColors;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ children, type, color }) => {
  return (
    <button
      className={clsx(
        "button",
        type && `button--${type}`,
        color && `button--${color}`
      )}
    >
      {children}
    </button>
  );
};

export default React.memo(Button);
