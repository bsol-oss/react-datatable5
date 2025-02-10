import { createContext } from "react";

export interface DataTableServerContext {
  url: string;
}

export const DataTableServerContext = createContext<DataTableServerContext>({
  url: "",
});
