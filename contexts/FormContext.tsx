import { createContext } from "react";

export interface IFormContext {
  name?: string;
}

const FormContext = createContext<IFormContext>({});
export default FormContext;
