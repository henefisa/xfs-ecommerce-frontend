import React from "react";
import clsx from "clsx";

export interface InputProps {
  size?: "small" | "default" | "large";
}

const Input: React.FC<
  InputProps & Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">
> = ({ className, size = "default", ...props }) => {
  return (
    <div className={clsx("input-wrap", className)}>
      <input
        {...props}
        className={clsx("input", size !== "default" && `input--${size}`)}
      />
    </div>
  );
};

export default React.memo(Input);
