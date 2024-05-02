import { Button, Flex, Text } from "@chakra-ui/react";
import { useDataTable } from "./useDataTable";

interface PaginationProps {}
const TablePagination = (props: PaginationProps) => {
  const {
    firstPage,
    getCanPreviousPage,
    previousPage,
    getState,
    nextPage,
    getCanNextPage,
    lastPage,
  } = useDataTable().table;
  return (
    <Flex>
      <Button onClick={() => firstPage()} disabled={!getCanPreviousPage()}>
        {"<<"}
      </Button>
      <Button onClick={() => previousPage()} disabled={!getCanPreviousPage()}>
        {"<"}
      </Button>
      <Text>{getState().pagination.pageIndex + 1}</Text>

      <Button onClick={() => nextPage()} disabled={!getCanNextPage()}>
        {">"}
      </Button>
      <Button onClick={() => lastPage()} disabled={!getCanNextPage()}>
        {">>"}
      </Button>
    </Flex>
  );
};

export default TablePagination;
