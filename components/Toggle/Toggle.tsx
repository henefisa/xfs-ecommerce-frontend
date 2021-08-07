import clsx from "clsx";
import React, { useRef } from "react";

interface ToggleProps {
  onClick?: () => void;
  isActive?: boolean;
  className?: string;
}

const Toggle: React.FC<ToggleProps> = ({
  onClick = () => {},
  isActive = false,
  className,
}) => {
  return (
    <div
      className={clsx("toggle", isActive && "toggle--active", className)}
      onClick={onClick}
    >
      <div className="bars">
        <span className="bars__line" />
        <span className="bars__line" />
        <span className="bars__line" />
      </div>
    </div>
  );
};

export default React.memo(Toggle);
