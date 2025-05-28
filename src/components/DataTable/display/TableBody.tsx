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
}

export const TableBody = ({
  showSelector = false,
  canResize = true,
}: TableBodyProps) => {
  "use no memo";
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
          position: "relative",
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
              />
            )}
            {row.getVisibleCells().map((cell, index) => {
              return (
                <Table.Cell
                  padding={`${table.getDensityValue()}px`}
                  key={`chakra-table-rowcell-${cell.id}-${index}`}
                  // styling resize and pinning start
                  flex={`${canResize ? "0" : "1"} 0 ${cell.column.getSize()}px`}
                  // this is to avoid the cell from being too wide
                  minWidth={`0`}
                  {...{
                    color: {
                      base: "colorPalette.900",
                      _dark: "colorPalette.100",
                    },
                    bg: { base: "colorPalette.50", _dark: "colorPalette.950" },
                  }}
                  {...getTdProps(cell)}
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
  row,
}: TableRowSelectorProps<TData>) => {
  const { table } = useDataTableContext();
  const SELECTION_BOX_WIDTH = 20;

  return (
    <Table.Cell
      padding={`${table.getDensityValue()}px`}
      display={"grid"}
      {...{
        color: {
          base: "colorPalette.900",
          _dark: "colorPalette.100",
        },
        bg: { base: "colorPalette.50", _dark: "colorPalette.950" },
      }}
      justifyItems={"center"}
      alignItems={"center"}
    >
      <Checkbox
        width={`${SELECTION_BOX_WIDTH}px`}
        height={`${SELECTION_BOX_WIDTH}px`}
        {...{
          checked: row.getIsSelected(),
          disabled: !row.getCanSelect(),
          onCheckedChange: row.getToggleSelectedHandler(),
        }}
      />
    </Table.Cell>
  );
};
