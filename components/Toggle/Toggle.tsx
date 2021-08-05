import clsx from "clsx";
import React, { useRef } from "react";

interface ToggleProps {
  onClick?: () => void;
  isActive?: boolean;
}

const Toggle: React.FC<ToggleProps> = ({ onClick = () => {}, isActive }) => {
  return (
    <div
      className={clsx("toggle", isActive && "toggle--active")}
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
