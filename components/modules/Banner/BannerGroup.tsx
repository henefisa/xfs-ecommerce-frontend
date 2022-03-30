import React from "react";

export interface BannerGroupProps {
  children: React.ReactNode;
}

const BannerGroup: React.FC<BannerGroupProps> = ({ children }) => {
  return <div className="banner-group">{children}</div>;
};

export default React.memo(BannerGroup);
