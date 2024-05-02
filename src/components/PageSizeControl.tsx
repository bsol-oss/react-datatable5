import { useContext } from "react";
import { TableContext } from "./DataTableContext";

export const PageSizeControl = () => {
  const { table } = useContext(TableContext);
  return (
    <select
      value={table.getState().pagination.pageSize}
      onChange={(e) => {
        table.setPageSize(Number(e.target.value));
      }}
    >
      {[10, 20, 30, 40, 50].map((pageSize) => (
        <option key={pageSize} value={pageSize}>
          {pageSize}
        </option>
      ))}
    </select>
  );
};
