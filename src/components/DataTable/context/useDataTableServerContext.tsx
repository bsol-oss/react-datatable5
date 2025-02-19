import { useContext } from "react";
import { DataTableServerContext } from "./DataTableServerContext";

export interface UseDataTableServerContext extends DataTableServerContext {
  isEmpty: boolean;
}

export const useDataTableServerContext = (): UseDataTableServerContext => {
  const context = useContext(DataTableServerContext);
  const { query } = context;
  const isEmpty = (query.data?.count ?? 0) <= 0;
  return { ...context, isEmpty };
};
