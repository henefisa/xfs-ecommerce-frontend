import React from "react";
import clsx from "clsx";

// icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as faStarSolid } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarRegular } from "@fortawesome/free-regular-svg-icons";

interface StarsProps {
  length?: number;
  active?: number;
  type?: "solid" | "default" | "regular";
}

const Stars: React.FC<StarsProps> = ({
  length = 5,
  active = 0,
  type = "default",
}) => {
  const getIcon = (idx: number) => {
    if (type === "solid") return faStarSolid;
    if (type === "regular") return faStarRegular;

    return idx < active ? faStarSolid : faStarRegular;
  };

  return (
    <div className="stars">
      {[...new Array(length)].map((_, idx) => (
        <div className={clsx("star", idx + 1 <= active && "active")} key={idx}>
          <FontAwesomeIcon icon={getIcon(idx + 1)} />
        </div>
      ))}
    </div>
  );
};

export default React.memo(Stars);
