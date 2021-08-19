import clsx from "clsx";
import React from "react";

export interface BannerProps {
  size?: "sm" | "md" | "default" | "lg";
  title: string;
  subTitle?: string;
  description?: string;
  extra?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  center?: boolean;
}

const Banner: React.FC<BannerProps> = ({
  size = "default",
  title,
  subTitle,
  description,
  extra,
  className,
  style,
  center,
}) => {
  return (
    <div
      className={clsx(
        "banner",
        className,
        size !== "default" && `banner--${size}`,
        center && `banner--text-center`
      )}
      style={style}
    >
      <div className="banner__content">
        {subTitle && <h5 className="banner__subtitle">{subTitle}</h5>}
        {title && <h2 className="banner__title">{title}</h2>}
        {description && <p className="banner__description">{description}</p>}
        {extra && <div className="banner__extra">{extra}</div>}
      </div>
    </div>
  );
};

export default React.memo(Banner);
