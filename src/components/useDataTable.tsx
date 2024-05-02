import { useContext } from "react";
import { TableContext } from "./DataTableContext";

export const useDataTable = () => {
  const { table, refreshData } = useContext(TableContext);
  return { table, refreshData };
};
