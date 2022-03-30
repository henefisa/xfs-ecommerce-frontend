import React, { useEffect, useImperativeHandle, useRef, useState } from "react";
import { useForm, FormProvider, UseFormReturn } from "react-hook-form";
import clsx from "clsx";

// validation
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// context
import FormContext from "../../../contexts/FormContext";

export interface FormProps {
  children: React.ReactNode;
  schema?: yup.AnyObjectSchema;
  name?: string;
  errors?: Record<string, string>;
  type?: "inline" | "default";
  onSubmit?: (values: any) => void;
}

const Form = React.forwardRef<
  UseFormReturn,
  FormProps &
    Partial<Omit<React.HTMLAttributes<HTMLFormElement>, "name" | "onSubmit">>
>(
  (
    {
      children,
      schema,
      name,
      onSubmit,
      className,
      errors,
      type = "default",
      ...rest
    },
    ref
  ) => {
    const methods = useForm({
      resolver: schema && yupResolver(schema),
    });
    const [requiredFields, setRequiredFields] = useState<string[]>([]);

    useEffect(() => {
      if (!schema) return;
      const _requiredFields: string[] = Object.keys(schema.fields).filter(
        (key) => schema.fields[key].exclusiveTests.required
      );

      setRequiredFields(_requiredFields);
    }, [schema]);

    useImperativeHandle(ref, () => methods);

    return (
      <FormContext.Provider value={{ name, requiredFields, errors }}>
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
