import { Box, BoxProps, Flex, Grid, Table } from "@chakra-ui/react";
import { useDataTableContext } from "../context/useDataTableContext";
import { useDataTableServerContext } from "../context/useDataTableServerContext";
import { RecordDisplay } from "./RecordDisplay";

export const TableDataDisplay = () => {
  const { table, columns, translate } = useDataTableContext();
  const { query } = useDataTableServerContext();
  const { data } = query;
  const columnDef = table._getColumnDefs();
  console.log(columnDef, "glp");
  console.log(columnDef, columns, table.getState().columnOrder, data, "glp");
  const columnsMap = Object.fromEntries(
    columns.map((def) => {
      return [def.accessorKey, def];
    })
  );
  const columnHeaders = Object.keys(columnsMap);
  const columnWidths = columns
    .map(({ size }) => {
      if (!!size === false) {
        return "1fr";
      }
      return `${size}px`;
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
  };
  return (
    <Grid
      templateColumns={`${columnWidths}`}
      overflow={"auto"}
      borderWidth={"1px"}
      borderColor={{ base: "colorPalette.200", _dark: "colorPalette.800" }}
    >
      <Grid
        templateColumns={`${columnWidths}`}
        column={`1/span ${columns.length}`}
        bg={{ base: "colorPalette.200", _dark: "colorPalette.800" }}
      >
        {columnHeaders.map((header) => {
          return (
            <Box flex={"1 0 0%"} paddingX={"2"} py={"1"}>
              {translate.t(`column_header.${header}`)}
            </Box>
          );
        })}
      </Grid>
      {data?.data.map((record) => {
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
