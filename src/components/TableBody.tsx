import { Tbody, Td, Tr } from "@chakra-ui/table";
import { flexRender } from "@tanstack/react-table";
import { useContext } from "react";
import { TableContext } from "./DataTableContext";

export const TableBody = () => {
  const { table } = useContext(TableContext);
  return (
    <Tbody>
      {table.getRowModel().rows.map((row) => (
        <Tr key={crypto.randomUUID()}>
          {row.getVisibleCells().map((cell) => (
            <Td key={crypto.randomUUID()} width={`${cell.column.getSize()}px`}>
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </Td>
          ))}
        </Tr>
      ))}
    </Tbody>
  );
};

