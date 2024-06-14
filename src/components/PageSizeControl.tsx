import { ChevronDownIcon } from "@chakra-ui/icons";
import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { useDataTable } from "./useDataTable";

export interface PageSizeControlProps {
  pageSizes?: number[];
}

export const PageSizeControl = ({
  pageSizes = [10, 20, 30, 40, 50],
}: PageSizeControlProps) => {
  const { table } = useDataTable();

  return (
    <>
      <Menu>
        <MenuButton
          as={Button}
          variant={"ghost"}
          rightIcon={<ChevronDownIcon />}
          gap={"0.5rem"}
        >
          {table.getState().pagination.pageSize}
        </MenuButton>
        <MenuList>
          {pageSizes.map((pageSize) => (
            <MenuItem
              onClick={() => {
                table.setPageSize(Number(pageSize));
              }}
            >
              {pageSize}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </>
  );
};
