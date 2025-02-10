import { HStack } from "@chakra-ui/react";

import { useDataTableContext } from "../../index";
import {
  PaginationItems,
  PaginationNextTrigger,
  PaginationPrevTrigger,
  PaginationRoot
} from "../ui/pagination";

export const TablePagination = () => {
  const { table } = useDataTableContext();
  return (
    <PaginationRoot
      page={table.getState().pagination.pageIndex + 1}
      count={table.getRowCount()}
      pageSize={table.getState().pagination.pageSize}
      onPageChange={(e) => {
        table.setPageIndex(e.page - 1);
      }}
    >
      <HStack>
        <PaginationPrevTrigger />
        <PaginationItems />
        <PaginationNextTrigger />
      </HStack>
    </PaginationRoot>
  );
};
