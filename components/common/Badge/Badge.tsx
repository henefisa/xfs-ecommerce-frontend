import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  value: number;
}

const Badge: React.FC<BadgeProps> = ({ children, value }) => {
  return (
    <div className="badge">
      {children}
      <div className="badge__value">{value > 99 ? "99+" : value}</div>
    </div>
  );
};

export default React.memo(Badge);
