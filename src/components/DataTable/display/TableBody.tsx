import { Box, Table, TableRowProps } from "@chakra-ui/react";
import { Cell, flexRender, Row } from "@tanstack/react-table";
import { useState } from "react";
import { Checkbox } from "../../ui/checkbox";
import { useDataTableContext } from "../context/useDataTableContext";
export interface TableBodyProps {
  pinnedBgColor?: { light: string; dark: string };
  showSelector?: boolean;
  alwaysShowSelector?: boolean;
  canResize?: boolean;
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
  canResize = true,
}: TableBodyProps) => {
  "use no memo"  
  const { table } = useDataTableContext();
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
            : `${cell.column.getStart("left")}px`,
          background: pinnedBgColor.light,
          position: "sticky",
          zIndex: -1,
          _dark: {
            backgroundColor: pinnedBgColor.dark,
          },
        }
      : {};
    return tdProps;
  };

  const getTrProps = ({
    hoveredRow,
    index,
  }: {
    hoveredRow: number;
    index: number;
  }): TableRowProps => {
    if (hoveredRow === -1) {
      return {};
    }
    if (hoveredRow === index) {
      return {
        opacity: "1",
      };
    }

    return {
      opacity: "0.8",
    };
  };

  return (
    <Table.Body>
      {table.getRowModel().rows.map((row, index) => {
        return (
          <Table.Row
            display={"flex"}
            key={`chakra-table-row-${row.id}`}
            zIndex={1}
            onMouseEnter={() => handleRowHover(index)}
            onMouseLeave={() => handleRowHover(-1)}
            {...getTrProps({ hoveredRow, index })}
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
                <Table.Cell
                  padding={`${table.getDensityValue()}px`}
                  key={`chakra-table-rowcell-${cell.id}-${index}`}
                  // styling resize and pinning start
                  flex={`${canResize ? "0" : "1"} 0 ${cell.column.getSize()}px`}
                  backgroundColor={"white"}
                  {...getTdProps(cell)}
                  _dark={{
                    backgroundColor: "gray.950",
                  }}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </Table.Cell>
              );
            })}
          </Table.Row>
        );
      })}
    </Table.Body>
  );
};

const TableRowSelector = <TData,>({
  index,
  row,
  hoveredRow,
  pinnedBgColor = { light: "gray.50", dark: "gray.700" },
  alwaysShowSelector = true,
}: TableRowSelectorProps<TData>) => {
  const { table } = useDataTableContext();
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
    <Table.Cell
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
        <Box
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
              onChange: row.getToggleSelectedHandler(),
            }}
          />
        </Box>
      )}
    </Table.Cell>
  );
};
