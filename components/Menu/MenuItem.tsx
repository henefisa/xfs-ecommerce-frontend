import React, { useContext } from "react";
import clsx from "clsx";

// context
import MenuContext from "../../contexts/MenuContext";

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
  const { currentActive, changeActive } = useContext(MenuContext);

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
