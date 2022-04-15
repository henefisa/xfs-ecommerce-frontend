interface Props {
  label: string;
  isRequired?: boolean;
  forLabel?: string;
  className?: string;
  id?: string;
}

const Label = (props: Props) => {
  const { label, isRequired, forLabel, className, id } = props;
  return (
    <label
      id={id}
      htmlFor={forLabel}
      className={`block text-sm font-medium text-gray-700 ${className}`}
    >
      {label}
      {isRequired ? <span style={{ color: "red" }}>* </span> : null}
    </label>
  );
};

export default Label;
