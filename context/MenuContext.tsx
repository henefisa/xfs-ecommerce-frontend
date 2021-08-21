import { createContext } from "react";

export interface IMenuContext {
  currentActive?: string;
  uuid?: string;
  changeActive?: (id: string) => void;
}

const MenuContext = createContext<IMenuContext>({});

export default MenuContext;
