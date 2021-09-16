import { createContext } from "react";

export interface IRowContext {
  gutter?: number | [number, number];
}

const RowContext = createContext<IRowContext>({});

export default RowContext;
