import { Flex, Switch } from "@chakra-ui/react";
import { useDataTable } from "./useDataTable";

export const TableViewer = () => {
  const { table } = useDataTable();

  return (
    <Flex flexFlow={"column"} gap={"1rem"}>
      {table.getAllLeafColumns().map((column) => {
        const displayName =
          column.columnDef.meta === undefined
            ? column.id
            : column.columnDef.meta.displayName;
        return (
          <Flex flexFlow={"row"} gap={"0.5rem"} alignItems={"center"}>
            <Switch
              isChecked={column.getIsVisible()}
              onChange={column.getToggleVisibilityHandler()}
            />
            {displayName}
          </Flex>
        );
      })}
    </Flex>
  );
};
