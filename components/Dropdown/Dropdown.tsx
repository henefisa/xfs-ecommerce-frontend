import clsx from "clsx";
import React, { useEffect, useRef, useState } from "react";
import { usePopper } from "react-popper";

interface DropdownProps {
  children: React.ReactNode;
  overlay: React.ReactNode;
  triggers?: ("hover" | "click")[];
}

const Dropdown: React.FC<DropdownProps> = ({
  children,
  overlay,
  triggers = ["hover"],
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [contentRef, setContentRef] = useState<HTMLDivElement | null>(null);
  const [overlayRef, setOverlayRef] = useState<HTMLDivElement | null>(null);
  const { styles, attributes, update } = usePopper(contentRef, overlayRef, {
    placement: "bottom-start",
    modifiers: [
      {
        name: "offset",
        options: {
          offset: [0, 8],
        },
      },
    ],
  });

  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleClickOpen = () => {
    if (!triggers.includes("click")) return;
    setIsOpen((prevState) => !prevState);
    update?.();
  };

  const handleMouseEnter = () => {
    if (!triggers.includes("hover")) return;
    setIsOpen(true);
    update?.();
  };

  const handleMouseLeave = () => {
    if (!triggers.includes("hover")) return;
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

  return (
    <div
      className="dropdown"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClickOpen}
      ref={dropdownRef}
    >
      <div className="dropdown__content" ref={setContentRef}>
        {children}
      </div>
      <div
        {...attributes.popper}
        className={clsx(
          "dropdown__overlay",
          isOpen && "dropdown__overlay--show"
        )}
        ref={setOverlayRef}
        style={styles.popper}
        onClick={handleMouseLeave}
      >
        {overlay}
      </div>
    </div>
  );
};

export default React.memo(Dropdown);
