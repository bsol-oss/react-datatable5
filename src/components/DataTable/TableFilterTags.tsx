import { Flex, IconButton, Text } from "@chakra-ui/react";
import { useDataTableContext } from "./useDataTableContext";
import { Tag } from "@/components/ui/tag";
import { CgClose } from "react-icons/cg";
export const TableFilterTags = () => {
  const { table } = useDataTableContext();

  return (
    <Flex gap={"0.5rem"} flexFlow={"wrap"}>
      {table.getState().columnFilters.map(({ id, value }) => {
        return (
          <Tag key={`${id}-${value}`} gap={"0.5rem"}>
            {`${id}: ${value}`}
            <IconButton
              variant={"ghost"}
              aria-label={"remove filter"}
              onClick={() => {
                table.setColumnFilters(
                  table.getState().columnFilters.filter((filter) => {
                    return filter.value != value;
                  })
                );
              }}
            >
              <CgClose />
            </IconButton>
          </Tag>
        );
      })}
    </Flex>
  );
};
