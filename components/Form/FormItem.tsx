import React, { useContext } from "react";
import { useFormContext } from "react-hook-form";

// context
import FormContext from "../../contexts/FormContext";

export interface FormItemProps {
  label?: string;
  name: string;
  children: React.ReactNode;
}

const FormItem: React.FC<FormItemProps> = ({ label, name, children }) => {
  const { register, formState } = useFormContext();

  const formContext = useContext(FormContext);

  if (!React.isValidElement(children)) return null;
  return (
    <div className="form__item">
      {label && (
        <label
          className="form__item-label"
          htmlFor={formContext.name && `${formContext.name}-${name}`}
        >
          {label}
        </label>
      )}
      <div className="form__item-field">
        {React.cloneElement(children, {
          ...register(name),
          id: formContext.name && `${formContext.name}-${name}`,
        })}
      </div>
      <div className="form__item-error">{formState.errors[name]?.message}</div>
    </div>
  );
};

export default React.memo(FormItem);
