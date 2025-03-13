import { HStack } from "@chakra-ui/react";

import { useDataTableContext } from "../context/useDataTableContext";
import {
  PaginationItems,
  PaginationNextTrigger,
  PaginationPrevTrigger,
  PaginationRoot,
} from "../../ui/pagination";

// TODO: not working in client side
export const Pagination = () => {
  const { table, type } = useDataTableContext();
  const getCount = () => {
    if (type === "client") {
      return table.getFilteredRowModel().flatRows.length ?? 0;
    }
    return table.getRowCount();
  };

  return (
    <PaginationRoot
      page={table.getState().pagination.pageIndex + 1}
      count={getCount()}
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
