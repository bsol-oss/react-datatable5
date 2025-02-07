import { HStack } from "@chakra-ui/react";

import { useDataTableContext } from "../DataTable/useDataTableContext";
import {
  PaginationItems,
  PaginationNextTrigger,
  PaginationRoot,
  PaginationPrevTrigger,
  PaginationPageText,
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
        <PaginationPageText format="long" />
        <PaginationPrevTrigger />
        <PaginationItems />
        <PaginationNextTrigger />
      </HStack>
    </PaginationRoot>
  );
};
