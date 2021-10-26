import React, { useImperativeHandle } from "react";
import { useForm, FormProvider, UseFormReturn } from "react-hook-form";
import clsx from "clsx";

// validation
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// context
import FormContext from "../../contexts/FormContext";

export interface FormProps {
  children: React.ReactNode;
  schema?: yup.AnyObjectSchema;
  name?: string;
  type?: "inline" | "default";
  className?: string;
  onSubmit?: (values: any) => void;
}

const Form = React.forwardRef<
  UseFormReturn,
  FormProps &
    Partial<Omit<React.HTMLAttributes<HTMLFormElement>, "className" | "name">>
>(
  (
    { children, schema, name, onSubmit, className, type = "default", ...rest },
    ref
  ) => {
    const methods = useForm({
      resolver: schema && yupResolver(schema),
    });

    useImperativeHandle(ref, () => methods);

    return (
      <FormContext.Provider value={{ name }}>
        <FormProvider {...methods}>
          <form
            className={clsx(
              "form",
              type !== "default" && `form--${type}`,
              className
            )}
            onSubmit={methods.handleSubmit((values) => {
              onSubmit?.(values);
            })}
          >
            {children}
          </form>
        </FormProvider>
      </FormContext.Provider>
    );
  }
);

export default React.memo(Form);
