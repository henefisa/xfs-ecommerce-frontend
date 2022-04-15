import React, { useState } from "react";
import clsx from "clsx";

// icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as faStarSolid } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarRegular } from "@fortawesome/free-regular-svg-icons";

interface StarsProps {
  length?: number;
  active?: number;
  type?: "solid" | "default" | "regular";
  isHover?: boolean;
  setStartSelect?: (idx: number) => void;
  startSelect?: number;
}

const Stars: React.FC<StarsProps> = ({
  length = 5,
  active = 0,
  type = "default",
  setStartSelect,
  startSelect,
}) => {
  const [indexHover, setIndexHover] = useState<number>(0);

  const getIcon = (idx: number) => {
    if (type === "solid") return faStarSolid;
    if (type === "regular") return faStarRegular;

    return idx <= active ? faStarSolid : faStarRegular;
  };

  return (
    <div className="stars">
      {[...new Array(length)].map((_, idx) => (
        <div
          onClick={setStartSelect ? () => setStartSelect(idx + 1) : undefined}
          onMouseEnter={
            setStartSelect ? () => setIndexHover(idx + 1) : undefined
          }
          onMouseLeave={setStartSelect ? () => setIndexHover(0) : undefined}
          className={
            setStartSelect
              ? clsx(
                  "star",
                  indexHover
                    ? idx + 1 <= indexHover && "active"
                    : startSelect
                    ? idx + 1 <= startSelect && "active"
                    : ""
                )
              : clsx("star", idx + 1 <= active && "active")
          }
          key={idx}
        >
          <FontAwesomeIcon icon={getIcon(idx + 1)} />
        </div>
      ))}
    </div>
  );
};

export default React.memo(Stars);
