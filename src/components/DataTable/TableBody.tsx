import { Box, Checkbox, FormLabel, ResponsiveValue } from "@chakra-ui/react";
import { Tbody, Td, Tr } from "@chakra-ui/table";
import { Cell, flexRender, Row } from "@tanstack/react-table";
import * as CSS from "csstype";
import { useContext, useState } from "react";
import { TableContext } from "./DataTableContext";

export interface TableBodyProps {
  pinnedBgColor?: { light: string; dark: string };
  showSelector?: boolean;
  alwaysShowSelector?: boolean;
}

export interface TableRowSelectorProps<TData> {
  index: number;
  row: Row<TData>;
  hoveredRow: number;
  pinnedBgColor?: {
    light: string;
    dark: string;
  };
  alwaysShowSelector?: boolean;
}

export const TableBody = ({
  pinnedBgColor = { light: "gray.50", dark: "gray.700" },
  showSelector = false,
  alwaysShowSelector = true,
}: TableBodyProps) => {
  const { table } = useContext(TableContext);
  const SELECTION_BOX_WIDTH = 20;
  const [hoveredRow, setHoveredRow] = useState<number>(-1);

  const handleRowHover = (index: number) => {
    setHoveredRow(index);
  };

  const getTdProps = (cell: Cell<unknown, unknown>) => {
    const tdProps = cell.column.getIsPinned()
      ? {
          left: showSelector
            ? `${cell.column.getStart("left") + SELECTION_BOX_WIDTH + table.getDensityValue() * 2}px`
            : `${cell.column.getStart("left") + table.getDensityValue() * 2}px`,
          background: pinnedBgColor.light,
          position: "sticky" as ResponsiveValue<CSS.Property.Position>,
          zIndex: 1,
          _dark: {
            backgroundColor: pinnedBgColor.dark,
          },
        }
      : {};
    return tdProps;
  };

  return (
    <Tbody>
      {table.getRowModel().rows.map((row, index) => {
        return (
          <Tr
            display={"flex"}
            _hover={{ backgroundColor: "rgba(178,178,178,0.1)" }}
            key={`chakra-table-row-${row.id}`}
            zIndex={1}
            onMouseEnter={() => handleRowHover(index)}
            onMouseLeave={() => handleRowHover(-1)}
          >
            {showSelector && (
              <TableRowSelector
                index={index}
                row={row}
                hoveredRow={hoveredRow}
                alwaysShowSelector={alwaysShowSelector}
              />
            )}
            {row.getVisibleCells().map((cell, index) => {
              return (
                <Td
                  padding={`${table.getDensityValue()}px`}
                  key={`chakra-table-rowcell-${cell.id}-${index}`}
                  // styling resize and pinning start
                  maxWidth={`${cell.column.getSize()}px`}
                  width={`${cell.column.getSize()}px`}
                  {...getTdProps(cell)}
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
  alwaysShowSelector = true,
}: TableRowSelectorProps<TData>) => {
  const { table } = useContext(TableContext);
  const SELECTION_BOX_WIDTH = 20;
  const isCheckBoxVisible = (
    current_index: number,
    current_row: Row<TData>
  ) => {
    if (alwaysShowSelector) {
      return true;
    }
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
        <Box
          as="span"
          margin={"0rem"}
          display={"grid"}
          justifyItems={"center"}
          alignItems={"center"}
          width={`${SELECTION_BOX_WIDTH}px`}
          height={`${SELECTION_BOX_WIDTH}px`}
        ></Box>
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
