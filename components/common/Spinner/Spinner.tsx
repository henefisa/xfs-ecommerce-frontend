import clsx from "clsx";
import React from "react";

interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "small" | "default";
}

const Spinner: React.FC<SpinnerProps> = ({ size = "default", ...rest }) => {
  return <div className={clsx("spinner", `spinner--${size}`)} {...rest}></div>;
};

export default React.memo(Spinner);
