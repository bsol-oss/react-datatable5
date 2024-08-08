import { Text } from "@chakra-ui/react";
import { useDataTable } from "../../index";

export const RowCountText = () => {
  const { table } = useDataTable();
  return <Text>{table.getRowCount()}</Text>;
};
