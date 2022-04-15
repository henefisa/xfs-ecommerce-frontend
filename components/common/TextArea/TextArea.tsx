import Label from "../Label/Label";

interface Props {
  label?: string;
  isRequired?: boolean;
  footerDescription?: string;
  forLabel?: string;
  value: string;
  setValue: (value: string) => void;
  isLabelOnLeft?: boolean;
  placeholder?: string;
  avatar?: string;
  isDisableResize?: boolean;
  width?: number;
  height?: number;
}

const TextArea = (props: Props) => {
  const {
    label,
    isRequired,
    forLabel,
    value,
    setValue,
    isLabelOnLeft,
    placeholder,
    avatar,
    isDisableResize,
    width,
    height,
  } = props;

  const handleOnChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(event.target.value);
  };

  return (
    <div
      className={`${
        isLabelOnLeft
          ? "flex 2xl:flex-row xl:flex-row lg:flex-row flex-col"
          : ""
      }`}
    >
      {label && (
        <div
          className={`${
            isLabelOnLeft
              ? "2xl:w-[250px] xl:w-[250px] lg:w-[250px] w-full 2xl:mb-[0px] xl:mb-[0px] lg:mb-[0px] mb-[5px]"
              : ""
          }`}
        >
          <Label forLabel={forLabel} label={label} isRequired={isRequired} />
        </div>
      )}
      <div className={`w-full ${isLabelOnLeft || avatar ? "flex" : ""}`}>
        {avatar && (
          <img src={avatar} alt="avatar" className="w-[32px] h-fit mr-[15px]" />
        )}
        <div className="flex flex-col flex-1">
          <div className="mt-1 pb-[50px] relative">
            <textarea
              id={forLabel || ""}
              name={forLabel || ""}
              rows={1}
              className={`${
                isDisableResize ? "resize-none" : ""
              } p-2 rounded-md border border-gray-300 border-tl border-tr shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm`}
              placeholder={placeholder}
              value={value}
              onChange={handleOnChange}
              style={{
                width: width ? width : "100%",
                height: height ? height : "250px",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TextArea;
