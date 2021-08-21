import React from "react";

interface DropdownProps {
  children: React.ReactNode;
}

const Dropdown: React.FC<DropdownProps> = ({ children }) => {
  return (
    <div className="dropdown">
      <div className="dropdown__content">{children}</div>
      <div className="dropdown__overlay"></div>
    </div>
  );
};

export default React.memo(Dropdown);
