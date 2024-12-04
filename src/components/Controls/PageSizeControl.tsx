import { ChevronDownIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/react";
import { useDataTableContext } from "../../index";
import {
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
} from "@/components/ui/menu";
export interface PageSizeControlProps {
  pageSizes?: number[];
}

export const PageSizeControl = ({
  pageSizes = [10, 20, 30, 40, 50],
}: PageSizeControlProps) => {
  const { table } = useDataTableContext();

  return (
    <>
      <MenuRoot>
        <MenuTrigger asChild>
          <Button variant={"ghost"} gap={"0.5rem"}>
            {table.getState().pagination.pageSize} <ChevronDownIcon />
          </Button>
        </MenuTrigger>
        <MenuContent>
          {pageSizes.map((pageSize) => (
            <MenuItem
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
    </>
  );
};
