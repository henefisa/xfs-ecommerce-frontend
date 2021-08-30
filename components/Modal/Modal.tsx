import clsx from "clsx";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

// icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

interface ModalProps {
  children: React.ReactNode;
  isOpen?: boolean;
  className?: string;
  onClose?: () => void;
}

const Modal: React.FC<ModalProps> = ({
  children,
  isOpen,
  className,
  onClose,
}) => {
  const [root, setRoot] = useState<Element>();

  useEffect(() => {
    setRoot(document.getElementById("modal-root") as Element);
  }, []);

  useEffect(() => {
    if (!root) return;
    if (isOpen) {
      root.classList.add("open");
    } else {
      root.classList.remove("open");
    }
  }, [isOpen, root]);

  return root && isOpen
    ? ReactDOM.createPortal(
        <div className={clsx("modal", className)}>
          <div className="modal__content">{children}</div>
          <div className="modal__close" onClick={onClose}>
            <FontAwesomeIcon icon={faTimes} />
          </div>
        </div>,
        root
      )
    : null;
};

export default React.memo(Modal);
