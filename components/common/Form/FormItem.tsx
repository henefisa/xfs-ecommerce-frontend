import React, { useContext } from "react";
import { useFormContext } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";

// context
import FormContext from "../../../contexts/FormContext";

export interface FormItemProps {
  label?: string;
  name: string;
  error?: string;
  children: React.ReactNode;
}

const FormItem: React.FC<FormItemProps> = ({
  label,
  name,
  children,
  error,
}) => {
  const { register, formState } = useFormContext();

  const formContext = useContext(FormContext);

  const errorMessage =
    error || formState.errors[name]?.message || formContext.errors?.[name];

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

      <div
        className={clsx(
          "form__item-field",
          !!errorMessage && `form__item-field--error`
        )}
      >
        {React.cloneElement(children, {
          ...register(name),
          id: formContext.name && `${formContext.name}-${name}`,
        })}
      </div>
      <AnimatePresence>
        {errorMessage && (
          <motion.div
            className="form__item-error"
            key="error"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {errorMessage}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default React.memo(FormItem);
