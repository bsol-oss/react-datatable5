import {
  ChevronDownIcon,
  ChevronUpIcon,
  CloseIcon,
  UpDownIcon,
} from "@chakra-ui/icons";
import { Button, Flex, Text } from "@chakra-ui/react";
import { useDataTable } from "./useDataTable";

export const TableSorter = () => {
  const { table } = useDataTable();

  return (
    <>
      {table.getHeaderGroups().map((headerGroup) => (
        <>
          {headerGroup.headers.map((header) => {
            return (
              <>
                {header.column.getCanSort() && (
                  <Flex alignItems={"center"} gap={"0.5rem"} padding={"0.5rem"}>
                    <Text>{header.column.id}</Text>
                    <Button
                      variant={"ghost"}
                      onClick={(e) => {
                        header.column.toggleSorting();
                      }}
                    >
                      {header.column.getIsSorted() === false && (
                        // <Text>To No sort</Text>
                        <UpDownIcon />
                      )}
                      {header.column.getIsSorted() === "asc" && (
                        // <Text>To asc</Text>
                        <ChevronDownIcon />
                      )}
                      {header.column.getIsSorted() === "desc" && (
                        // <Text>To desc</Text>
                        <ChevronUpIcon />
                      )}
                    </Button>

                    {header.column.getIsSorted() && (
                      <Button
                        onClick={(e) => {
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
