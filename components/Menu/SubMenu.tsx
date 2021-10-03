import React, { useContext, useEffect, useState } from "react";
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
import Portal from "../Portal/Portal";

export interface SubMenuProps {
  children: React.ReactNode;
  portal?: boolean;
  title: string;
  overlayWidth?: number | string;
}

const Placement = {
  vertical: "bottom-start",
  horizontal: "right-start",
};

const SubMenu: React.FC<SubMenuProps> = ({
  children,
  title,
  portal,
  overlayWidth,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMount, setIsMount] = useState(false);
  const [root, setRoot] = useState<HTMLDivElement | null>(null);
  const [contentRef, setContentRef] = useState<HTMLDivElement | null>(null);
  const [overlayRef, setOverlayRef] = useState<HTMLUListElement | null>(null);

  const { mode } = useContext(MenuContext);

  const { styles, attributes, update } = usePopper(contentRef, overlayRef, {
    placement: Placement[mode] as VariationPlacement,
  });

  const toggleOpen = () => {
    setIsOpen((prevState) => !prevState);
  };

  const handleTransitionEnd = () => {
    if (!isOpen) {
      setIsMount(false);
    }
  };

  const overlay = portal ? (
    isMount ? (
      <Portal root={root}>
        <ul
          className={clsx(
            "menu__sub-menu-list",
            portal && "menu__sub-menu-list--portal"
          )}
          ref={setOverlayRef}
          {...attributes.popper}
          style={{ ...styles.popper, width: overlayWidth }}
          onClick={toggleOpen}
          onTransitionEnd={handleTransitionEnd}
        >
          {children}
        </ul>
      </Portal>
    ) : null
  ) : (
    <ul
      className={clsx(
        "menu__sub-menu-list",
        isOpen && "menu__sub-menu-list--open"
      )}
    >
      {children}
    </ul>
  );

  useEffect(() => {
    setRoot(document.getElementById("menu-root") as HTMLDivElement);
  }, []);

  useEffect(() => {
    if (!isOpen) {
      overlayRef?.classList.remove("menu__sub-menu-list--open");
      return;
    } else {
      update?.();
      setIsMount(true);
    }
  }, [isOpen, overlayRef, update]);

  useEffect(() => {
    if (isMount) {
      overlayRef?.classList.add("menu__sub-menu-list--open");
    }
  }, [overlayRef, isMount]);

  return (
    <li className={clsx("menu__sub-menu", `menu__sub-menu--${mode}`)}>
      <div
        className={clsx(
          "menu__sub-menu-title",
          isOpen && `menu__sub-menu-title--open`
        )}
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
      {overlay}
    </li>
  );
};

export default React.memo(SubMenu);
