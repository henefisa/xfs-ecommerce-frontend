import React, { useContext } from "react";
import { useFormContext } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";

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
          {formContext.requiredFields?.includes(name) && (
            <span className="form__item-label-required">*</span>
          )}
        </label>
      )}

      <motion.div className="form__item-field" key="field">
        {React.cloneElement(children, {
          ...register(name),
          id: formContext.name && `${formContext.name}-${name}`,
        })}
      </motion.div>
      <AnimatePresence>
        {formState.errors[name] && (
          <motion.div
            className="form__item-error"
            key="error"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {formState.errors[name]?.message}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default React.memo(FormItem);
