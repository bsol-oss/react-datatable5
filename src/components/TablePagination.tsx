import { Button, ButtonGroup, IconButton } from "@chakra-ui/react";
import {
  MdArrowBack,
  MdArrowForward,
  MdFirstPage,
  MdLastPage,
} from "react-icons/md";
import { useDataTable } from "./useDataTable";

export interface PaginationProps {}

const TablePagination = ({}: PaginationProps) => {
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
    <ButtonGroup isAttached>
      <IconButton
        icon={<MdFirstPage />}
        onClick={() => firstPage()}
        disabled={!getCanPreviousPage()}
        aria-label={"first-page"}
      ></IconButton>
      <IconButton
        icon={<MdArrowBack />}
        onClick={() => previousPage()}
        disabled={!getCanPreviousPage()}
        aria-label={"previous-page"}
      ></IconButton>
      <Button onClick={() => {}} disabled={!getCanPreviousPage()}>
        {getState().pagination.pageIndex + 1}
      </Button>

      <IconButton
        onClick={() => nextPage()}
        disabled={!getCanNextPage()}
        aria-label={"next-page"}
      >
        <MdArrowForward />
      </IconButton>
      <IconButton
        onClick={() => lastPage()}
        disabled={!getCanNextPage()}
        aria-label={"last-page"}
      >
        <MdLastPage />
      </IconButton>
    </ButtonGroup>
  );
};

export default TablePagination;
