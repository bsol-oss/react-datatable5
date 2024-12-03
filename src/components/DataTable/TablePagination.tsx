import { Button, ButtonGroup, IconButton } from "@chakra-ui/react";
import {
  MdArrowBack,
  MdArrowForward,
  MdFirstPage,
  MdLastPage,
} from "react-icons/md";
import { useDataTableContext } from "./useDataTableContext";

export interface PaginationProps {}

export const TablePagination = ({}: PaginationProps) => {
  const {
    firstPage,
    getCanPreviousPage,
    previousPage,
    getState,
    nextPage,
    getCanNextPage,
    lastPage,
  } = useDataTableContext().table;
  return (
    <ButtonGroup isAttached>
      <IconButton
        onClick={() => firstPage()}
        disabled={!getCanPreviousPage()}
        aria-label={"first-page"}
        variant={"ghost"}
      >
        <MdFirstPage />
      </IconButton>
      <IconButton
        onClick={() => previousPage()}
        disabled={!getCanPreviousPage()}
        aria-label={"previous-page"}
        variant={"ghost"}
      >
        <MdArrowBack />
      </IconButton>
      <Button
        variant={"ghost"}
        onClick={() => {}}
        disabled={!getCanPreviousPage()}
      >
        {getState().pagination.pageIndex + 1}
      </Button>

      <IconButton
        onClick={() => nextPage()}
        disabled={!getCanNextPage()}
        aria-label={"next-page"}
        variant={"ghost"}
      >
        <MdArrowForward />
      </IconButton>
      <IconButton
        onClick={() => lastPage()}
        disabled={!getCanNextPage()}
        aria-label={"last-page"}
        variant={"ghost"}
      >
        <MdLastPage />
      </IconButton>
    </ButtonGroup>
  );
};
