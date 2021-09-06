import React, { useRef } from "react";

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
  step,
  disabled,
  className,
  onChange,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleStepUp = () => {
    if (!inputRef.current) return;
    inputRef.current.stepUp();
  };

  const handleStepDown = () => {
    if (!inputRef.current) return;
    inputRef.current.stepDown();
  };

  const handleInputChange = () => {
    if (!inputRef.current) return;
    onChange?.(+inputRef.current.value);
  };

  return (
    <div className={clsx("input-number", className)}>
      <input
        type="number"
        value={value}
        defaultValue={defaultValue}
        placeholder={placeholder}
        ref={inputRef}
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
        <button className="input-number__button">
          <FontAwesomeIcon icon={faChevronDown} onClick={handleStepDown} />
        </button>
      </div>
    </div>
  );
};

export default React.memo(InputNumber);
