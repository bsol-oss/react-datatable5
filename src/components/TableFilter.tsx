import { Input, Text, Box } from "@chakra-ui/react";
import { useDataTable } from "./useDataTable";

export const TableFilter = () => {
  const { table } = useDataTable();

  return (
    <>
      {table.getLeafHeaders().map((header) => {
        return (
          <>
            {header.column.getCanFilter() && (
              <Box>
                <Text>{header.column.id}</Text>
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

