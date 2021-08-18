import React, { useImperativeHandle, useState } from "react";
import clsx from "clsx";

// icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

export interface RatingProps {
  value?: number;
  defaultValue?: number;
  onChange?: (rate: number) => void;
  disabled?: boolean;
  allowClear?: boolean;
}

export interface RatingRefProps {
  rate: number;
}

const Rating = React.forwardRef<RatingRefProps, RatingProps>(
  ({ value, onChange, disabled = false, defaultValue = 0 }, ref) => {
    const [rate, setRate] = useState(defaultValue);

    const handleRateChange = (rate: number) => {
      if (disabled) return;
      if (onChange) {
        onChange(rate);
        return;
      }
      setRate(rate);
    };

    const checkIsStarActive = (idx: number) => {
      if (value) {
        return idx <= value;
      }
      return idx <= rate;
    };

    useImperativeHandle(ref, () => ({ rate }), [rate]);

    return (
      <div className="rating">
        <ul
          className={clsx(
            "rating__stars",
            disabled && "rating__stars--disabled"
          )}
        >
          {[...new Array(5)].map((_, idx) => (
            <li
              key={idx}
              className={clsx(
                "rating__star",
                checkIsStarActive(idx + 1) && "rating__star--active"
              )}
              onClick={() => handleRateChange(idx + 1)}
            >
              <FontAwesomeIcon icon={faStar} />
            </li>
          ))}
        </ul>
      </div>
    );
  }
);

Rating.displayName = "Rating";

export default React.memo(Rating);
