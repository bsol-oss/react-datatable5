import {
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
} from "@/components/ui/menu";
import { Button } from "@chakra-ui/react";
import { BiDownArrow } from "react-icons/bi";
import { useDataTableContext } from "../context/useDataTableContext";
export interface PageSizeControlProps {
  pageSizes?: number[];
}

export const PageSizeControl = ({
  pageSizes = [10, 20, 30, 40, 50],
}: PageSizeControlProps) => {
  const { table } = useDataTableContext();
  return (
    <MenuRoot>
      <MenuTrigger asChild>
        <Button variant={"ghost"} gap={"0.5rem"}>
          {table.getState().pagination.pageSize} <BiDownArrow />
        </Button>
      </MenuTrigger>
      <MenuContent>
        {pageSizes.map((pageSize) => (
          <MenuItem
            key={`chakra-table-pageSize-${pageSize}`}
            value={`chakra-table-pageSize-${pageSize}`}
            onClick={() => {
              table.setPageSize(Number(pageSize));
            }}
          >
            {pageSize}
          </MenuItem>
        ))}
      </MenuContent>
    </MenuRoot>
  );
};
