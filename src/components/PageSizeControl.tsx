import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList
} from "@chakra-ui/react";
import { useContext } from "react";
import { TableContext } from "./DataTableContext";

export interface PageSizeControlProps {
  pageSizes?: number[];
}

export const PageSizeControl = ({
  pageSizes = [10, 20, 30, 40, 50],
}: PageSizeControlProps) => {
  const { table } = useContext(TableContext);

  return (
    <>
      <Menu>
        <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
          {table.getState().pagination.pageSize}
        </MenuButton>
        <MenuList>
          {pageSizes.map((pageSize) => (
            <MenuItem onClick={()=>{ table.setPageSize(Number(pageSize));}}>
              {pageSize}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </>
  );
};
