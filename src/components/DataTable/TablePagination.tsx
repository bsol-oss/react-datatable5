import { Button, ButtonGroup, IconButton } from "@chakra-ui/react";
import {
  MdArrowBack,
  MdArrowForward,
  MdFirstPage,
  MdLastPage,
} from "react-icons/md";
import { useDataTable } from "./useDataTable";

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
  } = useDataTable().table;
  return (
    <ButtonGroup isAttached>
      <IconButton
        icon={<MdFirstPage />}
        onClick={() => firstPage()}
        isDisabled={!getCanPreviousPage()}
        aria-label={"first-page"}
        variant={"ghost"}
      ></IconButton>
      <IconButton
        icon={<MdArrowBack />}
        onClick={() => previousPage()}
        isDisabled={!getCanPreviousPage()}
        aria-label={"previous-page"}
        variant={"ghost"}
      ></IconButton>
      <Button
        variant={"ghost"}
        onClick={() => {}}
        disabled={!getCanPreviousPage()}
      >
        {getState().pagination.pageIndex + 1}
      </Button>

      <IconButton
        onClick={() => nextPage()}
        isDisabled={!getCanNextPage()}
        aria-label={"next-page"}
        variant={"ghost"}
      >
        <MdArrowForward />
      </IconButton>
      <IconButton
        onClick={() => lastPage()}
        isDisabled={!getCanNextPage()}
        aria-label={"last-page"}
        variant={"ghost"}
      >
        <MdLastPage />
      </IconButton>
    </ButtonGroup>
  );
};
