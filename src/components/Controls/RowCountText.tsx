import { Text } from "@chakra-ui/react";
import { useDataTableContext } from "../../index";

export const RowCountText = () => {
  const { table } = useDataTableContext();
  return <Text>{table.getFilteredRowModel().flatRows.length ?? 0}</Text>;
};
