import { Input, Text, Box } from "@chakra-ui/react";
import { useDataTable } from "./useDataTable";

export const TableFilter = () => {
  const { table } = useDataTable();

  return (
    <>
      {table.getLeafHeaders().map((header) => {
        const displayName =
          header.column.columnDef.meta === undefined
            ? header.column.id
            : header.column.columnDef.meta.displayName;
        return (
          <>
            {header.column.getCanFilter() && (
              <Box>
                <Text>{displayName}</Text>
                <Input
                  value={
                    header.column.getFilterValue()
                      ? String(header.column.getFilterValue())
                      : ""
                  }
                  onChange={(e) => {
                    header.column.setFilterValue(e.target.value);
                  }}
                />
              </Box>
            )}
          </>
        );
      })}
    </>
  );
};
