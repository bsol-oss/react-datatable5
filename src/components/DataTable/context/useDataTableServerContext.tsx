import { useContext } from "react";
import { DataTableServerContext } from "./DataTableServerContext";

export const useDataTableServerContext = (): DataTableServerContext => {
  return useContext(DataTableServerContext);
};
