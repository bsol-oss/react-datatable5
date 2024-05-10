import { Tbody, Td, Tr } from "@chakra-ui/table";
import { flexRender } from "@tanstack/react-table";
import { useContext } from "react";
import { TableContext } from "./DataTableContext";
import { Checkbox } from "@chakra-ui/react";
export const TableBody = () => {
  const { table } = useContext(TableContext);
  return (
    <Tbody>
      {table.getRowModel().rows.map((row) => {
        return (
          <Tr display={"flex"} key={crypto.randomUUID()}>
            <Td
              // styling resize and pinning start
              padding="0.5rem"
              left={`0px`}
              backgroundColor={"gray.50"}
              position={"sticky"}
              zIndex={1}
              // styling resize and pinning end
            >
              <Checkbox
                {...{
                  isChecked: row.getIsSelected(),
                  disabled: !row.getCanSelect(),
                  // indeterminate: row.getIsSomeSelected(),
                  onChange: row.getToggleSelectedHandler(),
                }}
              ></Checkbox>
            </Td>
            {row.getVisibleCells().map((cell) => {
              return (
                <Td
                  padding="0rem"
                  key={crypto.randomUUID()}
                  // styling resize and pinning start
                  maxWidth={`${cell.column.getSize()}px`}
                  width={`${cell.column.getSize()}px`}
                  left={
                    cell.column.getIsPinned()
                      ? `${cell.column.getStart("left") + 32}px`
                      : undefined
                  }
                  backgroundColor={
                    cell.column.getIsPinned() ? "gray.50" : "whitealpha.900"
                  }
                  position={cell.column.getIsPinned() ? "sticky" : "relative"}
                  zIndex={cell.column.getIsPinned() ? 1 : -1}
                  // styling resize and pinning end
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </Td>
              );
            })}
          </Tr>
        );
      })}
    </Tbody>
  );
};
