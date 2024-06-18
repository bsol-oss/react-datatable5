import { CloseIcon } from "@chakra-ui/icons";
import { Flex, IconButton, Tag } from "@chakra-ui/react";
import { useDataTable } from "./useDataTable";

export const TableFilterTags = () => {
  const { table } = useDataTable();

  return (
    <Flex gap={"0.5rem"} flexFlow={'wrap'}>
      {table.getState().columnFilters.map(({ id, value }, index) => {
        return (
          <Tag>
            {`${id}: ${value}`}
            <IconButton
              size={"xs"}
              icon={<CloseIcon />}
              onClick={() => {
                table.setColumnFilters(
                  table.getState().columnFilters.filter((value, curIndex) => {
                    return curIndex != index;
                  })
                );
              }}
              aria-label={""}
            />
          </Tag>
        );
      })}
    </Flex>
  );
};
