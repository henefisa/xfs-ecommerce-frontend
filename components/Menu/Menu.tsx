import React, { useState } from "react";
import clsx from "clsx";
import { v4 as uuidv4 } from "uuid";

// context
import MenuContext from "../../context/MenuContext";

export interface MenuProps {
  children: React.ReactNode;
  className?: string;
  direction?: "vertical" | "horizontal";
  mode?: "dark" | "light" | "transparent";
  style?: React.CSSProperties;
  activeId?: string;
  onClick?: (id: string) => void;
}

const Menu: React.FC<MenuProps> = ({
  children,
  className,
  direction = "vertical",
  mode = "light",
  style,
  activeId,
  onClick,
}) => {
  const [currentActive, setCurrentActive] = useState(activeId);
  const menuId = uuidv4();

  const cloned = React.Children.map(children, (child) => {
    if (React.isValidElement(child) && child.props.id) {
      const handlers = (id: string) => {
        onClick?.(id);
        child.props.onClick?.(id);
      };

      return React.cloneElement(child, { ...child.props, onClick: handlers });
    }
  });

  return (
    <MenuContext.Provider
      value={{ uuid: menuId, currentActive, changeActive: setCurrentActive }}
    >
      <ul
        data-menu-id={menuId}
        className={clsx(
          "menu",
          direction !== "vertical" && `menu--${direction}`,
          mode !== "light" && `menu--${mode}`,
          className
        )}
        style={style}
      >
        {cloned}
      </ul>
    </MenuContext.Provider>
  );
};

export default React.memo(Menu);
