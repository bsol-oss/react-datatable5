import { Box, BoxProps, Grid } from "@chakra-ui/react";
import { useDataTableContext } from "../context/useDataTableContext";
import { RecordDisplay } from "./RecordDisplay";
import { ReactNode } from "react";
import { flexRender } from "@tanstack/react-table";

export interface TableDataDisplayProps {
  colorPalette?: string;
  emptyComponent?: ReactNode;
}

export const TableDataDisplay = ({
  colorPalette,
  emptyComponent,
}: TableDataDisplayProps) => {
  const { columns, translate, data } = useDataTableContext();
  const columnsMap = Object.fromEntries(
    columns.map((def) => {
      const { accessorKey, id } = def;
      if (accessorKey) {
        return [accessorKey, def];
      }
      return [id, def];
    })
  );
  const columnHeaders = Object.keys(columnsMap);
  const totalWidths = columns
    .map(({ size }) => {
      if (!!size === false) {
        return 0;
      }
      if (typeof size === "number") {
        return size;
      }
      return 0;
    })
    .reduce((previous, current) => previous + current, 0);
  const columnWidths = columns
    .map(({ size }) => {
      if (!!size === false) {
        return "1fr";
      }

      return `minmax(${size}px, ${(size / totalWidths) * 100}%)`;
    })
    .join(" ");

  console.log({ columnWidths }, "hadfg");
  const cellProps: BoxProps = {
    flex: "1 0 0%",
    overflow: "auto",
    paddingX: "2",
    py: "1",
    color: { base: "colorPalette.900", _dark: "colorPalette.100" },
    bgColor: { base: "colorPalette.50", _dark: "colorPalette.950" },
    borderBottomColor: { base: "colorPalette.200", _dark: "colorPalette.800" },
    borderBottomWidth: "1px",
    ...{ colorPalette },
  };
  if (data.length <= 0) {
    return <>{emptyComponent}</>;
  }
  return (
    <Grid
      templateColumns={`${columnWidths}`}
      overflow={"auto"}
      borderWidth={"1px"}
      color={{ base: "colorPalette.900", _dark: "colorPalette.100" }}
      borderColor={{ base: "colorPalette.200", _dark: "colorPalette.800" }}
      {...{ colorPalette }}
    >
      <Grid
        templateColumns={`${columnWidths}`}
        column={`1/span ${columns.length}`}
        bg={{ base: "colorPalette.200", _dark: "colorPalette.800" }}
        {...{ colorPalette }}
      >
        {columnHeaders.map((header) => {
          return (
            <Box
              flex={"1 0 0%"}
              paddingX={"2"}
              py={"1"}
              overflow={"auto"}
              textOverflow={"ellipsis"}
            >
              {translate.t(`column_header.${header}`)}
            </Box>
          );
        })}
      </Grid>

      {data.map((record) => {
        return (
          <>
            {columnHeaders.map((header) => {
              const { cell } = columnsMap[header];
              const value = record[header];
              if (!!record === false) {
                return (
                  <Box {...cellProps}>
                    {translate.t(`column_cell.placeholder`)}
                  </Box>
                );
              }
              if (cell) {
                return (
                  <Box {...cellProps}>
                    {cell({ row: { original: record } })}
                  </Box>
                );
              }
              if (typeof value === "object") {
                return (
                  <Box {...cellProps}>
                    <RecordDisplay object={value} />
                  </Box>
                );
              }
              return <Box {...cellProps}>{value}</Box>;
            })}
          </>
        );
      })}
    </Grid>
  );
};
