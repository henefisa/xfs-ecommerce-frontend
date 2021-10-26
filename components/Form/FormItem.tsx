import React, { useContext } from "react";
import { useFormContext } from "react-hook-form";
import { motion } from "framer-motion";

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
    <motion.div className="form__item" layout>
      {label && (
        <label
          className="form__item-label"
          htmlFor={formContext.name && `${formContext.name}-${name}`}
        >
          {label}
        </label>
      )}
      <motion.div className="form__item-field" key="field">
        {React.cloneElement(children, {
          ...register(name),
          id: formContext.name && `${formContext.name}-${name}`,
        })}
      </motion.div>
      {formState.errors[name] && (
        <motion.div className="form__item-error" key="error">
          {formState.errors[name]?.message}
        </motion.div>
      )}
    </motion.div>
  );
};

export default React.memo(FormItem);
