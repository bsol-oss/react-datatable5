import { Card, DataList as ChakraDataList, Flex } from "@chakra-ui/react";
import { snakeToLabel } from "../Form/utils/snakeToLabel";
import { useDataTableContext } from "./context/useDataTableContext";

export interface DataDisplayProps {
  variant?: "horizontal" | "stats" | "";
}

const formatValue = (value: unknown): string => {
  if (typeof value === "object") {
    return JSON.stringify(value);
  }
  if (typeof value === "string") {
    return value;
  }
  throw new Error("value is unknown");
};

export const DataDisplay = ({ variant = "" }: DataDisplayProps) => {
  const { table } = useDataTableContext();
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
                  overflow={"auto"}
                >
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <ChakraDataList.Item key={cell.id}>
                        <ChakraDataList.ItemLabel>
                          {snakeToLabel(cell.column.id)}
                        </ChakraDataList.ItemLabel>
                        <ChakraDataList.ItemValue>{`${formatValue(cell.getValue())}`}</ChakraDataList.ItemValue>
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
                  overflow={"auto"}
                >
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <ChakraDataList.Item
                        key={cell.id}
                        display={"flex"}
                        justifyContent={"center"}
                        alignItems={"center"}
                        flex={"1 0 10rem"}
                      >
                        <ChakraDataList.ItemLabel>
                          {snakeToLabel(cell.column.id)}
                        </ChakraDataList.ItemLabel>
                        <ChakraDataList.ItemValue>{`${formatValue(cell.getValue())}`}</ChakraDataList.ItemValue>
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
                      <ChakraDataList.ItemValue>{`${formatValue(cell.getValue())}`}</ChakraDataList.ItemValue>
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
