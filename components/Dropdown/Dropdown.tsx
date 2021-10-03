import clsx from "clsx";
import React, { useEffect, useRef, useState } from "react";
import { Placement } from "@popperjs/core";
import { usePopper } from "react-popper";

// utils
import { debounce } from "../../utils/debounce";

interface DropdownProps {
  children: React.ReactNode;
  overlay: React.ReactNode;
  triggers?: "hover" | "click";
  placement?: Placement;
  overlayWidth?: number;
  /**
   * Return true to close dropdown when click the overlay and vice versa;
   */
  onClickOverlay?: () => boolean;
}

const Dropdown: React.FC<DropdownProps> = ({
  children,
  overlay,
  triggers = "hover",
  placement = "bottom",
  overlayWidth,
  onClickOverlay,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [contentRef, setContentRef] = useState<HTMLDivElement | null>(null);
  const [overlayRef, setOverlayRef] = useState<HTMLDivElement | null>(null);
  const { styles, attributes, update } = usePopper(contentRef, overlayRef, {
    placement,
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

  const handleClickOverlay = () => {
    if (onClickOverlay?.()) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!dropdownRef.current?.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

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
        onClick={handleClickOverlay}
      >
        {overlay}
      </div>
    </div>
  );
};

export default React.memo(Dropdown);
