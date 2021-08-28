import React, { useContext } from "react";
import clsx from "clsx";

// context
import MenuContext from "../../contexts/MenuContext";

export interface MenuItemProps {
  id: string;
  children: React.ReactNode;
  className?: string;
  onClick?: (id: string) => void;
  icon?: React.ReactNode;
}

const MenuItem: React.FC<MenuItemProps> = ({
  children,
  className,
  id,
  icon,
  onClick,
}) => {
  const { currentActive, changeActive } = useContext(MenuContext);

  const handleClick = () => {
    onClick?.(id);
    changeActive?.(id);
  };

  return (
    <li
      data-id={id}
      className={clsx(
        "menu__item",
        currentActive === id && "active",
        className
      )}
      onClick={handleClick}
    >
      {icon && <span className="menu__item-icon">{icon}</span>}
      <span className="menu__item-label">{children}</span>
    </li>
  );
};

export default React.memo(MenuItem);
