import React from "react";
import clsx from "clsx";

// context
import MenuContext from "../../../contexts/MenuContext";

export interface MenuProps {
  children: React.ReactNode;
  className?: string;
  direction?: "vertical" | "horizontal";
  mode?: "vertical" | "horizontal";
  style?: React.CSSProperties;
  activeId?: string;
  onClick?: () => void;
}

const Menu: React.FC<MenuProps> = ({
  children,
  className,
  direction = "vertical",
  mode = "vertical",
  style,
  onClick,
}) => {
  const handleMenuClick = () => {
    onClick?.();
  };

  return (
    <MenuContext.Provider value={{ mode }}>
      <ul
        className={clsx(
          "menu",
          direction !== "vertical" && `menu--${direction}`,
          className
        )}
        style={style}
        onClick={handleMenuClick}
      >
        {children}
      </ul>
    </MenuContext.Provider>
  );
};

export default React.memo(Menu);
