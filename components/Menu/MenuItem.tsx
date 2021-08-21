import React, { useContext } from "react";
import clsx from "clsx";

// context
import MenuContext from "../../context/MenuContext";

export interface MenuItemProps {
  id: string;
  children: React.ReactNode;
  className?: string;
  onClick?: (id: string) => void;
}

const MenuItem: React.FC<MenuItemProps> = ({
  children,
  className,
  id,
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
      {children}
    </li>
  );
};

export default React.memo(MenuItem);
