import { Input, Text, Box } from "@chakra-ui/react";
import { useDataTable } from "./useDataTable";

export const GlobalFilter = () => {
  const { globalFilter, setGlobalFilter } = useDataTable();

  return (
    <Input
      value={globalFilter}
      onChange={(e) => {
        setGlobalFilter(e.target.value);
      }}
    />
  );
};
