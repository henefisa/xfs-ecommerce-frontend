import clsx from "clsx";
import { motion } from "framer-motion";
import React from "react";
import Spinner from "../Spinner/Spinner";

type ButtonColors = "primary" | "success" | "error" | "warning";
type ButtonTypes = "outline" | "solid" | "link";

interface ButtonProps {
  children: React.ReactNode;
  type?: ButtonTypes;
  color?: ButtonColors;
  className?: string;
  htmlType?: React.ButtonHTMLAttributes<HTMLButtonElement>["type"];
  loading?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({
  children,
  type = "outline",
  color = "primary",
  className,
  htmlType,
  loading,
  disabled,
  onClick,
}) => {
  return (
    <button
      className={clsx(
        "button",
        type && `button--type-${type}`,
        color && `button--color-${color}`,
        disabled || (loading && `button--disabled`),
        className
      )}
      onClick={onClick}
      type={htmlType}
      disabled={loading}
    >
      {loading && (
        <motion.span className="button__loading-icon">
          <Spinner size="small" />
        </motion.span>
      )}
      <span className="button__content">{children}</span>
    </button>
  );
};

export default React.memo(Button);
