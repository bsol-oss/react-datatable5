import { Input, Text, Button } from "@chakra-ui/react";
import { useDataTable } from "./useDataTable";

const TableFilter = () => {
  const { table, refreshData } = useDataTable();

  return (
    <>
      {table.getLeafHeaders().map((header) => {
        console.log(header.column.getFilterValue(), "okgspokpsor");
        return (
          <>
            {header.column.getCanFilter() && (
              <>
                <Text>{header.column.id}</Text>
                <Input
                  value={header.column.getFilterValue()}
                  onChange={(e) => {
                    console.log(e, "gifdogj");
                    header.column.setFilterValue(e.target.value);
                    // console.log(value,"sdoafo")
                    // header.column.setFilterValue(value);
                  }}
                />
                <Button
                  onClick={() => {
                    refreshData();
                  }}
                >
                  Filter
                </Button>
              </>
            )}
          </>
        );
      })}
    </>
  );
};

export default TableFilter;
