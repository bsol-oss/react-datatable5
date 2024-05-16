import { Checkbox } from "@chakra-ui/react";
import { Tbody, Td, Tr } from "@chakra-ui/table";
import { flexRender } from "@tanstack/react-table";
import { useContext } from "react";
import { TableContext } from "./DataTableContext";

export interface TableBodyProps {
  pinnedBgColor?: { light: string; dark: string };
}

export const TableBody = ({
  pinnedBgColor = { light: "gray.50", dark: "gray.700" },
}: TableBodyProps) => {
  const { table } = useContext(TableContext);
  return (
    <Tbody>
      {table.getRowModel().rows.map((row) => {
        return (
          <Tr
            display={"flex"}
            _hover={{ backgroundColor: "rgba(178,178,178,0.1)" }}
            key={crypto.randomUUID()}
            zIndex={1}
          >
            <Td
              // styling resize and pinning start
              padding={table.getState().density}
              {...(table.getIsSomeColumnsPinned("left")
                ? {
                    left: `0px`,
                    backgroundColor: pinnedBgColor.light,
                    position: "sticky",
                    zIndex: 1,
                    _dark: { backgroundColor: pinnedBgColor.dark },
                  }
                : {})}
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
                  padding={table.getState().density}
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
                    cell.column.getIsPinned() ? pinnedBgColor.light : undefined
                  }
                  position={cell.column.getIsPinned() ? "sticky" : "relative"}
                  zIndex={cell.column.getIsPinned() ? 1 : 0}
                  _dark={{
                    backgroundColor: cell.column.getIsPinned()
                      ? pinnedBgColor.dark
                      : undefined,
                  }}
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
