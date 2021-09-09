import clsx from "clsx";
import React, {
  TransitionEvent,
  TransitionEventHandler,
  useEffect,
  useRef,
  useState,
} from "react";
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
  const [isMount, setIsMount] = useState(isOpen);
  const modalRef = useRef<HTMLDivElement | null>(null);

  const handleTransitionEnd = () => {
    if (!isOpen) {
      setIsMount(false);
    }
  };

  const content = isMount ? (
    <div
      className={clsx("modal", className)}
      onTransitionEnd={handleTransitionEnd}
      ref={modalRef}
    >
      <div className="modal__content">
        {children}
        <div className="modal__close" onClick={onClose}>
          <FontAwesomeIcon icon={faTimes} />
        </div>
      </div>
    </div>
  ) : null;

  useEffect(() => {
    setRoot(document.getElementById("modal-root") as Element);
  }, []);

  useEffect(() => {
    if (!isOpen) {
      modalRef.current?.classList.remove("modal--show");
      return;
    }
    setIsMount(true);
  }, [isOpen]);

  useEffect(() => {
    if (isMount) {
      modalRef.current?.classList.add("modal--show");
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [isMount]);

  return root ? ReactDOM.createPortal(content, root) : null;
};

export default React.memo(Modal);
