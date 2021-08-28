import clsx from "clsx";
import React, { useEffect, useRef, useState } from "react";
import { Placement } from "@popperjs/core";
import { usePopper } from "react-popper";
import { debounce } from "../../utils/debounce";

interface DropdownProps {
  children: React.ReactNode;
  overlay: React.ReactNode;
  triggers?: "hover" | "click";
  placement?: Placement;
  overlayWidth?: number;
}

const Dropdown: React.FC<DropdownProps> = ({
  children,
  overlay,
  triggers = "hover",
  placement = "bottom-start",
  overlayWidth,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [contentRef, setContentRef] = useState<HTMLDivElement | null>(null);
  const [overlayRef, setOverlayRef] = useState<HTMLDivElement | null>(null);
  const [arrowRef, setArrowRef] = useState<HTMLDivElement | null>(null);
  const { styles, attributes, update } = usePopper(contentRef, overlayRef, {
    placement,
    modifiers: [
      {
        name: "offset",
        options: {
          offset: [0, 8],
        },
      },
      { name: "arrow", options: { element: arrowRef } },
    ],
  });

  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleToggleDropdown = () => {
    if (triggers !== "click") return;
    setIsOpen((prevState) => !prevState);
    update?.();
  };

  const handleMouseEnter = () => {
    if (triggers !== "hover") return;
    setIsOpen(true);
    update?.();
  };

  const handleMouseLeave = () => {
    if (triggers !== "hover") return;
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!dropdownRef.current?.contains(e.target as Node) && isOpen) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [overlayRef, isOpen]);

  useEffect(() => {
    const resize = debounce(() => update?.(), 300);
    window.addEventListener("resize", resize, false);
    return () => {
      window.removeEventListener("resize", resize, false);
    };
  }, [update]);

  return (
    <div
      className="dropdown"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      ref={dropdownRef}
    >
      <div
        className="dropdown__content"
        ref={setContentRef}
        onClick={handleToggleDropdown}
      >
        {children}
      </div>
      <div
        {...attributes.popper}
        className={clsx(
          "dropdown__overlay",
          isOpen && "dropdown__overlay--show"
        )}
        ref={setOverlayRef}
        style={{ ...styles.popper, width: overlayWidth }}
        onClick={() => setIsOpen(false)}
      >
        <div
          className="dropdown__arrow"
          ref={setArrowRef}
          style={styles.arrow}
        />
        {overlay}
      </div>
    </div>
  );
};

export default React.memo(Dropdown);
