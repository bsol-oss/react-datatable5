import { Select } from "@chakra-ui/react";
import { useDataTable } from "./useDataTable";

export const RowSelector = ({ columnId, value, onChange }) => {
  const { table } = useDataTable();
  console.log(table.getCoreRowModel().rows, "fkdok");
  return (
    <>
      {table
        .getAllLeafColumns()
        .filter((column) => {
          console.log(column, "asgfds");
          return column.id === columnId;
        })
        .map((column) => {
          return (
            <Select placeholder="Please select" value={value} onChange={onChange}>
              {table.getCoreRowModel().rows.map((row, index) => {
                return <option>{row.original[columnId]}</option>;
              })}
            </Select>
          );
        })}
    </>
  );
};
