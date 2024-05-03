import { Input, Text, Button } from "@chakra-ui/react";
import { useDataTable } from "./useDataTable";

const TableFilter = () => {
  const { table } = useDataTable();

  return (
    <>
      {table.getLeafHeaders().map((header) => {
        return (
          <>
            {header.column.getCanFilter() && (
              <>
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
              </>
            )}
          </>
        );
      })}
    </>
  );
};

export default TableFilter;
