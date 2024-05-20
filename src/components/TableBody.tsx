import { Box, Checkbox, FormLabel } from "@chakra-ui/react";
import { Tbody, Td, Tr } from "@chakra-ui/table";
import { flexRender, Row } from "@tanstack/react-table";
import { useContext, useState } from "react";
import { TableContext } from "./DataTableContext";

export interface TableBodyProps {
  pinnedBgColor?: { light: string; dark: string };
}

export interface TableRowSelectorProps<TData> {
  index: number;
  row: Row<TData>;
  hoveredRow: number;
  pinnedBgColor?: {
    light: string;
    dark: string;
  };
}

export const TableBody = ({
  pinnedBgColor = { light: "gray.50", dark: "gray.700" },
}: TableBodyProps) => {
  const { table } = useContext(TableContext);
  const SELECTION_BOX_WIDTH = 20;
  const [hoveredRow, setHoveredRow] = useState<number>(-1);

  const handleRowHover = (index: number) => {
    setHoveredRow(index);
  };

  return (
    <Tbody>
      {table.getRowModel().rows.map((row, index) => {
        return (
          <Tr
            display={"flex"}
            _hover={{ backgroundColor: "rgba(178,178,178,0.1)" }}
            key={crypto.randomUUID()}
            zIndex={1}
            onMouseEnter={() => handleRowHover(index)}
            onMouseLeave={() => handleRowHover(-1)}
          >
            <TableRowSelector index={index} row={row} hoveredRow={hoveredRow} />
            {row.getVisibleCells().map((cell) => {
              return (
                <Td
                  padding={`${table.getDensityValue()}px`}
                  key={crypto.randomUUID()}
                  // styling resize and pinning start
                  maxWidth={`${cell.column.getSize()}px`}
                  width={`${cell.column.getSize()}px`}
                  left={
                    cell.column.getIsPinned()
                      ? `${cell.column.getStart("left") + SELECTION_BOX_WIDTH + table.getDensityValue() * 2}px`
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

const TableRowSelector = <TData,>({
  index,
  row,
  hoveredRow,
  pinnedBgColor = { light: "gray.50", dark: "gray.700" },
}: TableRowSelectorProps<TData>) => {
  const { table } = useContext(TableContext);
  const SELECTION_BOX_WIDTH = 20;
  const isCheckBoxVisible = (
    current_index: number,
    current_row: Row<TData>
  ) => {
    if (current_row.getIsSelected()) {
      return true;
    }
    if (hoveredRow == current_index) {
      return true;
    }
    return false;
  };

  return (
    <Td
      padding={`${table.getDensityValue()}px`}
      // styling resize and pinning start
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
      display={"grid"}
    >
      {!isCheckBoxVisible(index, row) && (
        <FormLabel
          margin={"0rem"}
          display={"grid"}
          justifyItems={"center"}
          alignItems={"center"}
        >
          <Box
            width={`${SELECTION_BOX_WIDTH}px`}
            height={`${SELECTION_BOX_WIDTH}px`}
          >
            <span>{index + 1}</span>
          </Box>
        </FormLabel>
      )}
      {isCheckBoxVisible(index, row) && (
        <FormLabel
          margin={"0rem"}
          display={"grid"}
          justifyItems={"center"}
          alignItems={"center"}
        >
          <Checkbox
            width={`${SELECTION_BOX_WIDTH}px`}
            height={`${SELECTION_BOX_WIDTH}px`}
            {...{
              isChecked: row.getIsSelected(),
              disabled: !row.getCanSelect(),
              // indeterminate: row.getIsSomeSelected(),
              onChange: row.getToggleSelectedHandler(),
            }}
          />
        </FormLabel>
      )}
    </Td>
  );
};
