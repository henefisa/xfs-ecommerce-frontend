import clsx from "clsx";
import React from "react";

export interface BannerProps {
  size?: "sm" | "md" | "default" | "lg";
  title: string;
  subTitle?: string;
  description?: string;
  extra?: React.ReactNode[];
  className?: string;
  style?: React.CSSProperties;
}

const Banner: React.FC<BannerProps> = ({
  size = "default",
  title,
  subTitle,
  description,
  extra,
  className,
  style,
}) => {
  return (
    <div
      className={clsx(
        "banner",
        className,
        size !== "default" && `banner--${size}`
      )}
      style={style}
    >
      <div className="banner__content">
        <h5 className="banner__subtitle">{subTitle}</h5>
        <h2 className="banner__title">{title}</h2>
        <p className="banner__description">{description}</p>
        <div className="banner__extra">{extra}</div>
      </div>
    </div>
  );
};

export default React.memo(Banner);
