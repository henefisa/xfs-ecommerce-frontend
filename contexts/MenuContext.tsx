import { createContext } from "react";

export interface IMenuContext {
  mode: "vertical" | "horizontal";
}

const MenuContext = createContext<IMenuContext>({ mode: "vertical" });

export default MenuContext;
