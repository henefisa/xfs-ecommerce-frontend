import React, { useContext, useState } from "react";
import clsx from "clsx";
import { VariationPlacement } from "@popperjs/core";
import { usePopper } from "react-popper";

// icons
import {
  faChevronDown,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// contexts
import MenuContext from "../../contexts/MenuContext";

export interface SubMenuProps {
  children: React.ReactNode;
  float?: boolean;
  title: string;
}

const Placement = {
  vertical: "bottom-start",
  horizontal: "right-start",
};

const SubMenu: React.FC<SubMenuProps> = ({ children, title, float }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [contentRef, setContentRef] = useState<HTMLDivElement | null>(null);
  const [overlayRef, setOverlayRef] = useState<HTMLUListElement | null>(null);

  const { mode } = useContext(MenuContext);

  const { styles, attributes } = usePopper(contentRef, overlayRef, {
    placement: Placement[mode] as VariationPlacement,
  });

  const toggleOpen = () => {
    setIsOpen((prevState) => !prevState);
  };

  return (
    <li
      className={clsx(
        "menu__sub-menu",
        isOpen && "menu__sub-menu--open",
        `menu__sub-menu--${mode}`
      )}
    >
      <div
        className="menu__sub-menu-title"
        ref={setContentRef}
        onClick={toggleOpen}
      >
        {title}
        <div className="icon">
          <FontAwesomeIcon
            icon={mode === "horizontal" ? faChevronRight : faChevronDown}
          />
        </div>
      </div>
      {float ? (
        <ul
          className={clsx(
            "menu__sub-menu-list",
            float && "menu__sub-menu-list--float"
          )}
          ref={setOverlayRef}
          {...attributes.popper}
          style={{ ...styles.popper }}
          onClick={toggleOpen}
        >
          {children}
        </ul>
      ) : (
        <ul className="menu__sub-menu-list">{children}</ul>
      )}
    </li>
  );
};

export default React.memo(SubMenu);
