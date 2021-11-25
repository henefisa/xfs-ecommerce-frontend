import { createContext } from "react";

export interface IFormContext {
  name?: string;
  requiredFields?: string[];
  errors?: Record<string, string>;
}

const FormContext = createContext<IFormContext>({});
export default FormContext;
