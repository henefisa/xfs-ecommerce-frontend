import React from "react";
import { useFormContext } from "react-hook-form";

export interface FormItemProps {
  children: React.ReactNode;
  name: string;
}

const FormItem: React.FC<FormItemProps> = ({ name, children }) => {
  const { register, formState } = useFormContext();

  if (!React.isValidElement(children)) return null;
  return (
    <div className="form__item">
      {React.cloneElement(children, { ...register(name) })}
      <div className="form__item-error">{formState.errors[name]?.message}</div>
    </div>
  );
};

export default React.memo(FormItem);
