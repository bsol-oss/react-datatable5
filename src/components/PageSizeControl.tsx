import { useContext } from "react";
import { TableContext } from "./DataTableContext";

export interface PageSizeControlProps {
  pageSizes?: number[];
}

export const PageSizeControl = ({
  pageSizes = [10, 20, 30, 40, 50],
}: PageSizeControlProps) => {
  const { table } = useContext(TableContext);

  return (
    <select
      value={table.getState().pagination.pageSize}
      onChange={(e) => {
        table.setPageSize(Number(e.target.value));
      }}
    >
      {pageSizes.map((pageSize) => (
        <option key={pageSize} value={pageSize}>
          {pageSize}
        </option>
      ))}
    </select>
  );
};

