import { Button, Flex, Text } from "@chakra-ui/react";
import { useDataTableContext } from "./context/useDataTableContext";
import { FaUpDown } from "react-icons/fa6";
import { BiDownArrow, BiUpArrow } from "react-icons/bi";
import { CgClose } from "react-icons/cg";

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
                      {header.column.getIsSorted() === false && <FaUpDown />}
                      {header.column.getIsSorted() === "asc" && <BiDownArrow />}
                      {header.column.getIsSorted() === "desc" && <BiUpArrow />}
                    </Button>

                    {header.column.getIsSorted() && (
                      <Button
                        onClick={() => {
                          header.column.clearSorting();
                        }}
                      >
                        <CgClose />
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
