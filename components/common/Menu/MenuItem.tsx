import React from "react";
import clsx from "clsx";

export interface MenuItemProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  icon?: React.ReactNode;
}

const MenuItem: React.FC<MenuItemProps> = ({
  children,
  className,
  icon,
  onClick,
}) => {
  const handleClick = () => {
    onClick?.();
  };

  return (
    <li className={clsx("menu__item", className)} onClick={handleClick}>
      {icon && <span className="menu__item-icon">{icon}</span>}
      <span className="menu__item-label">{children}</span>
    </li>
  );
};

export default React.memo(MenuItem);
