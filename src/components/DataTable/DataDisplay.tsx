import { Card, DataList as ChakraDataList, Flex } from "@chakra-ui/react";
import { useContext } from "react";
import { snakeToLabel } from "../Form/utils/snakeToLabel";
import { TableContext } from "./DataTableContext";

export interface DataDisplayProps {
  variant?: "horizontal" | "stats" | "";
}

export const DataDisplay = ({ variant = "" }: DataDisplayProps) => {
  const { table } = useContext(TableContext);
  if (variant == "horizontal") {
    return (
      <Flex flexFlow={"column"} gap={"1"}>
        {table.getRowModel().rows.map((row) => {
          return (
            <Card.Root key={`chakra-table-card-${row.id}`}>
              <Card.Body>
                <ChakraDataList.Root
                  gap={4}
                  padding={4}
                  display={"grid"}
                  variant={"subtle"}
                  orientation={"horizontal"}
                  overflow={'auto'}
                >
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <ChakraDataList.Item key={cell.id}>
                        <ChakraDataList.ItemLabel>
                          {snakeToLabel(cell.column.id)}
                        </ChakraDataList.ItemLabel>
                        <ChakraDataList.ItemValue>{`${cell.getValue()}`}</ChakraDataList.ItemValue>
                      </ChakraDataList.Item>
                    );
                  })}
                </ChakraDataList.Root>
              </Card.Body>
            </Card.Root>
          );
        })}
      </Flex>
    );
  }
  if (variant == "stats") {
    return (
      <Flex flexFlow={"column"} gap={"1"}>
        {table.getRowModel().rows.map((row) => {
          return (
            <Card.Root key={`chakra-table-card-${row.id}`}>
              <Card.Body>
                <ChakraDataList.Root
                  gap={4}
                  padding={4}
                  display={"flex"}
                  flexFlow={"row"}
                  variant={"subtle"}
                >
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <ChakraDataList.Item
                        key={cell.id}
                        display={"flex"}
                        justifyContent={"center"}
                        alignItems={"center"}
                        flex={"1 1 10rem"}
                      >
                        <ChakraDataList.ItemLabel>
                          {snakeToLabel(cell.column.id)}
                        </ChakraDataList.ItemLabel>
                        <ChakraDataList.ItemValue>{`${cell.getValue()}`}</ChakraDataList.ItemValue>
                      </ChakraDataList.Item>
                    );
                  })}
                </ChakraDataList.Root>
              </Card.Body>
            </Card.Root>
          );
        })}
      </Flex>
    );
  }
  return (
    <Flex flexFlow={"column"} gap={"1"}>
      {table.getRowModel().rows.map((row) => {
        return (
          <Card.Root key={`chakra-table-card-${row.id}`}>
            <Card.Body>
              <ChakraDataList.Root
                gap={4}
                padding={4}
                display={"grid"}
                variant={"subtle"}
                gridTemplateColumns={"repeat(auto-fit, minmax(20rem, 1fr))"}
              >
                {row.getVisibleCells().map((cell) => {
                  return (
                    <ChakraDataList.Item key={cell.id}>
                      <ChakraDataList.ItemLabel>
                        {snakeToLabel(cell.column.id)}
                      </ChakraDataList.ItemLabel>
                      <ChakraDataList.ItemValue>{`${cell.getValue()}`}</ChakraDataList.ItemValue>
                    </ChakraDataList.Item>
                  );
                })}
              </ChakraDataList.Root>
            </Card.Body>
          </Card.Root>
        );
      })}
    </Flex>
  );
};
