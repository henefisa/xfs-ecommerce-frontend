import clsx from "clsx";
import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { debounce } from "../../utils/debounce";

// components
import Toggle from "../Toggle/Toggle";

interface DrawerProps {
  children: React.ReactNode;
  isOpen?: boolean;
  handler?: boolean;
  mask?: boolean;
  portal?: boolean;
  className?: string;
  style?: React.CSSProperties;
  position?: "top" | "right" | "bottom" | "left";
  onClose?: () => void;
}

const Drawer: React.FC<DrawerProps> = ({
  children,
  isOpen = false,
  handler = false,
  mask = true,
  portal,
  className,
  style,
  position = "left",
  onClose,
}) => {
  const [open, setOpen] = useState(false);
  const [root, setRoot] = useState<HTMLDivElement | null>(null);

  const drawerRef = useRef<HTMLDivElement | null>(null);
  const contentWrapRef = useRef<HTMLDivElement | null>(null);

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
    setRoot(document.getElementById("drawer-root") as HTMLDivElement);
  }, []);

  useEffect(() => {
    if (isOpen || open) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [isOpen, open]);

  useEffect(() => {
    const resize = () => {
      if (!contentWrapRef.current) return;
      const width = contentWrapRef.current.offsetWidth;
      if (window.innerWidth <= width) {
        contentWrapRef.current.style.width = window.innerWidth - 40 + "px";
      } else {
        contentWrapRef.current.style.width = "";
      }
    };

    resize();

    const debouncedResize = debounce(resize, 300);
    window.addEventListener("resize", debouncedResize, false);

    return () => {
      window.removeEventListener("resize", debouncedResize, false);
    };
  }, []);

  if (portal) {
    return root
      ? ReactDOM.createPortal(
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
            {mask && <div className="drawer__mask" onClick={handleMaskClick} />}
            <div className="drawer__content-wrapper" ref={contentWrapRef}>
              <div className="drawer__content">{children}</div>
              {handler && (
                <Toggle
                  className="drawer__toggle"
                  onClick={handleToggle}
                  isActive={open}
                />
              )}
            </div>
          </div>,
          root
        )
      : null;
  }

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
      {mask && <div className="drawer__mask" onClick={handleMaskClick} />}
      <div className="drawer__content-wrapper" ref={contentWrapRef}>
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
