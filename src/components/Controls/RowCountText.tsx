import { Text } from "@chakra-ui/react";
import { useDataTableContext } from "../../index";

export const RowCountText = () => {
  const { table, type } = useDataTableContext();
  const getCount = () => {
    if (type === "client") {
      return table.getFilteredRowModel().flatRows.length ?? 0;
    }
    return table.getRowCount();
  };
  return <Text>{getCount()}</Text>;
};
