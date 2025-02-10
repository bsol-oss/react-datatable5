import { useContext } from "react";
import { DataTableContext } from "./DataTableContext";

export const useDataTableContext
 = <TData,>(): DataTableContext<TData> => {
  return useContext(DataTableContext);
};
