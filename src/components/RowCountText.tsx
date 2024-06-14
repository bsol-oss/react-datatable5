import { Text } from "@chakra-ui/react";
import { useContext } from "react";
import { TableContext } from "./DataTableContext";

export const RowCountText = () => {
  const { table } = useContext(TableContext);
  return <Text>{table.getRowCount()}</Text>;
};
