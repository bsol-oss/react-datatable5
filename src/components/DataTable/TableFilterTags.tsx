import { Tag } from "@/components/ui/tag";
import { Flex } from "@chakra-ui/react";
import { useDataTableContext } from "./context/useDataTableContext";
export const TableFilterTags = () => {
  const { table } = useDataTableContext();

  return (
    <Flex gap={"0.5rem"} flexFlow={"wrap"}>
      {table.getState().columnFilters.map(({ id, value }) => {
        return (
          <Tag
            key={`${id}-${value}`}
            gap={"0.5rem"}
            closable
            cursor={"pointer"}
            onClick={() => {
              table.setColumnFilters(
                table.getState().columnFilters.filter((filter) => {
                  return filter.value != value;
                })
              );
            }}
          >
            {`${id}: ${value}`}
          </Tag>
        );
      })}
    </Flex>
  );
};
