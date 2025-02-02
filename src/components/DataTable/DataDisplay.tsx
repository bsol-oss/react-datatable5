import { Card, DataList as ChakraDataList, Flex } from "@chakra-ui/react";
import { useContext } from "react";
import { TableContext } from "./DataTableContext";

export const DataDisplay = () => {
  const { table } = useContext(TableContext);
  console.log(table.getRowModel(), "okfsa");
  return (
    <Flex flexFlow={'column'} gap={'1'}>
      {table.getRowModel().rows.map((row) => {
        return (
          <Card.Root key={`chakra-table-card-${row.id}`}>
            <Card.Body>
              <ChakraDataList.Root
                // orientation="horizontal"
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
                        {cell.column.id}
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
