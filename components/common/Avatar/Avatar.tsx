import React from "react";
import Image from "next/image";
import clsx from "clsx";

interface AvatarProps {
  src: string;
  name?: string;
  style?: React.CSSProperties;
  className?: string;
  size?: "small" | "default" | "large";
}

const Avatar: React.FC<AvatarProps> = ({
  src,
  name,
  style,
  className,
  size = "default",
}) => {
  return (
    <div
      className={clsx(
        "avatar",
        size !== "default" && `avatar--${size}`,
        className
      )}
      style={style}
    >
      <Image
        alt={name}
        layout="fill"
        src={src}
        objectFit="cover"
        objectPosition="center"
      />
    </div>
  );
};

export default React.memo(Avatar);
