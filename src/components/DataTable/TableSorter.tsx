import {
  ChevronDownIcon,
  ChevronUpIcon,
  CloseIcon,
  UpDownIcon,
} from "@chakra-ui/icons";
import { Button, Flex, Text } from "@chakra-ui/react";
import { useDataTableContext } from "./useDataTableContext";

export const TableSorter = () => {
  const { table } = useDataTableContext();

  return (
    <>
      {table.getHeaderGroups().map((headerGroup) => (
        <>
          {headerGroup.headers.map((header) => {
            const displayName =
              header.column.columnDef.meta === undefined
                ? header.column.id
                : header.column.columnDef.meta.displayName;
            return (
              <>
                {header.column.getCanSort() && (
                  <Flex alignItems={"center"} gap={"0.5rem"} padding={"0.5rem"}>
                    <Text>{displayName}</Text>
                    <Button
                      variant={"ghost"}
                      onClick={() => {
                        header.column.toggleSorting();
                      }}
                    >
                      {header.column.getIsSorted() === false && <UpDownIcon />}
                      {header.column.getIsSorted() === "asc" && (
                        <ChevronDownIcon />
                      )}
                      {header.column.getIsSorted() === "desc" && (
                        <ChevronUpIcon />
                      )}
                    </Button>

                    {header.column.getIsSorted() && (
                      <Button
                        onClick={() => {
                          header.column.clearSorting();
                        }}
                      >
                        <CloseIcon />
                      </Button>
                    )}
                  </Flex>
                )}
              </>
            );
          })}
        </>
      ))}
    </>
  );
};
