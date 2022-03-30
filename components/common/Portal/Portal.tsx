import React from "react";
import ReactDOM from "react-dom";

interface PortalProps {
  children: React.ReactNode | null;
  root: HTMLElement | null;
}

const Portal: React.FC<PortalProps> = ({ children, root }) => {
  if (!root) return null;
  return ReactDOM.createPortal(children, root);
};

export default React.memo(Portal);
