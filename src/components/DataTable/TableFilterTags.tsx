import { CloseIcon } from "@chakra-ui/icons";
import { Flex, IconButton, Text } from "@chakra-ui/react";
import { useDataTableContext } from "./useDataTableContext";
import { Tag } from "@/components/ui/tag";
export const TableFilterTags = () => {
  const { table } = useDataTableContext();

  return (
    <Flex gap={"0.5rem"} flexFlow={"wrap"}>
      {table.getState().columnFilters.map(({ id, value }) => {
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
              onClick={() => {
                table.setColumnFilters(
                  table.getState().columnFilters.filter((filter) => {
                    return filter.value != value;
                  })
                );
              }}
              aria-label={"remove filter"}
            >
              <CloseIcon />
            </IconButton>
          </Tag>
        );
      })}
    </Flex>
  );
};
