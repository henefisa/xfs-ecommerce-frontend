import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

interface ModalProps {
  children: React.ReactNode;
  isOpen?: boolean;
  onClose?: () => void;
}

const Modal: React.FC<ModalProps> = ({ children, isOpen, onClose }) => {
  const [root, setRoot] = useState<Element>();

  useEffect(() => {
    setRoot(document.getElementById("modal-root") as Element);
  }, []);

  return root
    ? ReactDOM.createPortal(
        <div className={clsx("modal", isOpen && "modal--open")}>
          <div className="modal__content">{isOpen ? children : null}</div>
          <div className="modal__close" onClick={onClose}>
            <FontAwesomeIcon icon={faTimes} />
          </div>
        </div>,
        root
      )
    : null;
};

export default React.memo(Modal);
