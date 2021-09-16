import React, { ChangeEvent, useEffect, useRef, useState } from "react";

// icons
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";

interface InputNumberProps {
  value?: number;
  defaultValue?: number;
  placeholder?: string;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  className?: string;
  onChange?: (value: number) => void;
}

const InputNumber: React.FC<InputNumberProps> = ({
  value,
  defaultValue = 0,
  placeholder,
  min,
  max,
  step = 1,
  disabled,
  className,
  onChange,
}) => {
  const [inputVal, setInputVal] = useState(value || defaultValue);

  const handleStepUp = () => {
    if (max && inputVal >= max) return;
    setInputVal((prevState) => {
      onChange?.(prevState + step);
      return inputVal + step;
    });
  };

  const handleStepDown = () => {
    if (min && inputVal <= min) return;
    setInputVal((prevState) => {
      onChange?.(prevState - step);
      return inputVal - step;
    });
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputVal(+e.target.value);
    onChange?.(+e.target.value);
  };

  return (
    <div className={clsx("input-number", className)}>
      <input
        type="number"
        value={inputVal}
        placeholder={placeholder}
        min={min}
        max={max}
        step={step}
        disabled={disabled}
        onChange={handleInputChange}
      />
      <div className="input-number__nav">
        <button className="input-number__button" onClick={handleStepUp}>
          <FontAwesomeIcon icon={faChevronUp} />
        </button>
        <button className="input-number__button" onClick={handleStepDown}>
          <FontAwesomeIcon icon={faChevronDown} />
        </button>
      </div>
    </div>
  );
};

export default React.memo(InputNumber);
