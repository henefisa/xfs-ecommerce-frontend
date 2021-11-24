import React from "react";

interface ErrorProps {
  message: string;
  icon?: React.ReactElement;
  style?: React.CSSProperties;
  className?: string;
}

const Error: React.FC<ErrorProps> = ({ message, icon, style, className }) => {
  return <div className=""></div>;
};

export default React.memo(Error);
