import { HStack } from "@chakra-ui/react";

import { useDataTableContext } from "../../index";
import {
  PaginationItems,
  PaginationNextTrigger,
  PaginationPrevTrigger,
  PaginationRoot
} from "../ui/pagination";


// TODO: not working in client side
export const TablePagination = () => {
  const { table } = useDataTableContext();
  return (
    <PaginationRoot
      page={table.getState().pagination.pageIndex + 1}
      count={table.getFilteredRowModel().flatRows.length ?? 0}
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
