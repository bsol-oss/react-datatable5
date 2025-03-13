import { Box, BoxProps, Grid } from "@chakra-ui/react";
import { useDataTableContext } from "../context/useDataTableContext";
import { RecordDisplay } from "./RecordDisplay";

export interface TableDataDisplayProps {
  colorPalette?: string;
}

export const TableDataDisplay = ({ colorPalette }: TableDataDisplayProps) => {
  const { table, columns, translate, data } = useDataTableContext();
  const columnDef = table._getColumnDefs();
  console.log(columnDef, "glp");
  console.log(columnDef, columns, table.getState().columnOrder, data, "glp");
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
    borderBottomColor: { base: "colorPalette.200", _dark: "colorPalette.800" },
    borderBottomWidth: "1px",
    ...{ colorPalette },
  };
  return (
    <Grid
      templateColumns={`${columnWidths}`}
      overflow={"auto"}
      borderWidth={"1px"}
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
              if (!!record === false) {
                return (
                  <Box {...cellProps}>
                    {translate.t(`column_cell.placeholder`)}
                  </Box>
                );
              }
              if (!!record[header] === false) {
                return (
                  <Box {...cellProps}>
                    {translate.t(`column_cell.placeholder`)}
                  </Box>
                );
              }
              if (typeof record[header] === "object") {
                return (
                  <Box {...cellProps}>
                    <RecordDisplay object={record[header]} />
                  </Box>
                );
              }
              return <Box {...cellProps}>{record[header] ?? ""}</Box>;
            })}
          </>
        );
      })}
    </Grid>
  );
};
