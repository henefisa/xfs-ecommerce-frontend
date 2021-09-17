import React, { useImperativeHandle } from "react";
import { useForm, FormProvider, UseFormReturn } from "react-hook-form";

// validation
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

export interface FormProps {
  children: React.ReactNode;
  schema?: yup.AnyObjectSchema;
  onSubmit?: (values: any) => void;
}

const Form = React.forwardRef<UseFormReturn, FormProps>(
  ({ children, schema, onSubmit }, ref) => {
    const methods = useForm({
      resolver: schema && yupResolver(schema),
    });

    useImperativeHandle(ref, () => methods);

    return (
      <FormProvider {...methods}>
        <form
          className="form"
          onSubmit={methods.handleSubmit((values) => {
            onSubmit?.(values);
          })}
        >
          {children}
        </form>
      </FormProvider>
    );
  }
);

export default React.memo(Form);
