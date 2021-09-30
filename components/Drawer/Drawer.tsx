import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import React, { useEffect, useRef, useState } from "react";
import Toggle from "../Toggle/Toggle";

interface DrawerProps {
  children: React.ReactNode;
  isOpen?: boolean;
  float?: boolean;
  handler?: boolean;
  className?: string;
  style?: React.CSSProperties;
  position?: "top" | "right" | "bottom" | "left";
  onClose?: () => void;
}

const Drawer: React.FC<DrawerProps> = ({
  children,
  isOpen = false,
  float = false,
  handler = false,
  className,
  style,
  position = "left",
  onClose,
}) => {
  const [open, setOpen] = useState(false);

  const drawerRef = useRef<HTMLDivElement | null>(null);

  const handleMaskClick = () => {
    onClose?.();
    if (handler) {
      setOpen(false);
    }
  };

  const handleToggle = () => {
    setOpen((prevState) => !prevState);
  };

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [isOpen]);

  return (
    <div
      className={clsx(
        "drawer",
        `drawer--${position}`,
        (isOpen || open) && "drawer--open",
        className
      )}
      ref={drawerRef}
      style={style}
    >
      <div className="drawer__mask" onClick={handleMaskClick} />
      <div className="drawer__content-wrapper">
        <div className="drawer__content">{children}</div>
        {handler && (
          <Toggle
            className="drawer__toggle"
            onClick={handleToggle}
            isActive={open}
          />
        )}
      </div>
    </div>
  );
};

export default React.memo(Drawer);
