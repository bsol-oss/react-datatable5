import { CloseIcon } from "@chakra-ui/icons";
import { Flex, IconButton, Tag, Text } from "@chakra-ui/react";
import { useDataTable } from "./useDataTable";

export const TableFilterTags = () => {
  const { table } = useDataTable();

  return (
    <Flex gap={"0.5rem"} flexFlow={"wrap"}>
      {table.getState().columnFilters.map(({ id, value }, index) => {
        return (
          <Tag
            key={`${id}-${value}`}
            display={"flex"}
            gap={"0.5rem"}
            alignItems={"center"}
          >
            <Text>{`${id}: ${value}`}</Text>
            <IconButton
              size={"xs"}
              variant={"ghost"}
              icon={<CloseIcon />}
              onClick={() => {
                table.setColumnFilters(
                  table.getState().columnFilters.filter((value, curIndex) => {
                    return curIndex != index;
                  })
                );
              }}
              aria-label={"remove filter"}
            />
          </Tag>
        );
      })}
    </Flex>
  );
};
