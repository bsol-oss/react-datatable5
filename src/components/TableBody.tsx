import { Tbody, Td, Tr } from "@chakra-ui/table";
import { flexRender } from "@tanstack/react-table";
import { useContext } from "react";
import { TableContext } from "./DataTableContext";
import { Checkbox } from "@chakra-ui/react";
export const TableBody = () => {
  const { table } = useContext(TableContext);
  console.log(table.getSelectedRowModel().rows, "jfaisodij");

  return (
    <Tbody>
      {table.getRowModel().rows.map((row) => {
        console.log(row.getIsSelected(), row,"lghrpl")
        return (
          <Tr key={crypto.randomUUID()}>
            <Td padding="0.5rem">
              <Checkbox
                {...{
                  isChecked: row.getIsSelected(),
                  disabled: !row.getCanSelect(),
                  // indeterminate: row.getIsSomeSelected(),
                  onChange: row.getToggleSelectedHandler(),
                }}
              ></Checkbox>
            </Td>
            {row.getVisibleCells().map((cell) => (
              <Td
                padding="0.5rem"
                key={crypto.randomUUID()}
                width={`${cell.column.getSize()}px`}
              >
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </Td>
            ))}
          </Tr>
        );
      })}
    </Tbody>
  );
};
