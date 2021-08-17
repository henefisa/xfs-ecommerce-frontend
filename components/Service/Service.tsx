import clsx from "clsx";
import React from "react";

interface ServiceProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  bordered?: boolean;
  rounded?: boolean;
}

const Service: React.FC<ServiceProps> = ({
  icon,
  title,
  description,
  bordered,
  rounded,
}) => {
  return (
    <div
      className={clsx(
        "service",
        bordered && "service--bordered",
        rounded && "service--rounded"
      )}
    >
      <div className="service__icon">{icon}</div>
      <div className="service__title">{title}</div>
      <div className="service__description">{description}</div>
    </div>
  );
};

export default React.memo(Service);
