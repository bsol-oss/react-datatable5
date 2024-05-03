import {
  ChevronDownIcon,
  ChevronUpIcon,
  CloseIcon,
  UpDownIcon,
} from "@chakra-ui/icons";
import { Button, Flex, Text } from "@chakra-ui/react";
import { useDataTable } from "./useDataTable";

const TableSorter = () => {
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
                      onClick={(e) => {
                        header.column.toggleSorting();
                      }}
                    >
                      {header.column.getNextSortingOrder() === false && (
                        // <Text>To No sort</Text>
                        <ChevronUpIcon />
                      )}
                      {header.column.getNextSortingOrder() === "asc" && (
                        // <Text>To asc</Text>
                        <UpDownIcon />
                      )}
                      {header.column.getNextSortingOrder() === "desc" && (
                        // <Text>To desc</Text>
                        <ChevronDownIcon />
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

export default TableSorter;
