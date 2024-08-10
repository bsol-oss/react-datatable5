import { Text } from "@chakra-ui/react";
import { useDataTableContext } from "../../index";

export const RowCountText = () => {
  const { table } = useDataTableContext();
  return <Text>{table.getRowCount()}</Text>;
};
