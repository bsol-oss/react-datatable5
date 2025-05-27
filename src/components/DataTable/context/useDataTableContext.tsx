import { useContext } from "react";
import { DataTableContext, DataTableContextProps } from "./DataTableContext";

export const useDataTableContext = <TData,>(): DataTableContextProps<TData> => {
  return useContext(DataTableContext) as DataTableContextProps<TData>;
};
