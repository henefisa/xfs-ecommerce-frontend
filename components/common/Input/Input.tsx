import React from "react";
import clsx from "clsx";

export interface InputProps {
  size?: "small" | "default" | "large";
}

const Input = React.forwardRef<
  HTMLInputElement,
  InputProps & React.InputHTMLAttributes<HTMLInputElement>
>(({ size = "default", className, ...props }, ref) => {
  return (
    <div className={clsx("input-wrap", className)}>
      <input
        {...props}
        className={clsx("input", size !== "default" && `input--${size}`)}
        ref={ref}
      />
    </div>
  );
});

Input.displayName = "Input";

export default React.memo(Input);
