import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  Grid,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Table,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
  Text,
  Input,
} from "@chakra-ui/react";
import { Table as ITable, flexRender } from "@tanstack/react-table";
// import React, { useRef } from "react";
import React, { CSSProperties } from "react";
import {
  Column,
  ColumnDef,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

interface ChakraDataTable<T> {
  table: ITable<T>;
  hasFooter: boolean;
}

const getCommonPinningStyles = (column: Column<any>): CSSProperties => {
  const isPinned = column.getIsPinned();
  const isLastLeftPinnedColumn =
    isPinned === "left" && column.getIsLastColumn("left");
  const isFirstRightPinnedColumn =
    isPinned === "right" && column.getIsFirstColumn("right");

  return {
    boxShadow: isLastLeftPinnedColumn
      ? "-4px 0 4px -4px gray inset"
      : isFirstRightPinnedColumn
        ? "4px 0 4px -4px gray inset"
        : undefined,
    left: isPinned === "left" ? `${column.getStart("left")}px` : undefined,
    right: isPinned === "right" ? `${column.getAfter("right")}px` : undefined,
    opacity: isPinned ? 0.95 : 1,
    position: isPinned ? "sticky" : "relative",
    width: column.getSize(),
    zIndex: isPinned ? 1 : 0,
  };
};

const ChakraDataTable = <T,>({
  table,
  hasFooter,
  refreshData,
}: ChakraDataTable<T>) => {
  return (
    <>
      <Flex justifyContent={"flex-end"}>
        {JSON.stringify(table.getState().sorting)}
        <Button
          onClick={() => {
            table.resetSorting();
          }}
        >
          Reset Sorting
        </Button>
        <Popover placement="bottom-end">
          <PopoverTrigger>
            <Button>Edit View</Button>
          </PopoverTrigger>
          <PopoverContent width={"auto"}>
            <PopoverArrow />
            <PopoverBody>
              <Flex flexFlow={"column"} gap={"1rem"}>
                {table.getAllLeafColumns().map((column) => {
                  return (
                    <FormControl key={crypto.randomUUID()} width={"auto"}>
                      <Checkbox
                        isChecked={column.getIsVisible()}
                        onChange={column.getToggleVisibilityHandler()}
                      >
                        {column.id}
                      </Checkbox>
                    </FormControl>
                  );
                })}
              </Flex>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </Flex>
      {table.getLeafHeaders().map((header) => {
        return (
          <>
            {header.column.getCanFilter() && (
              <>
                <Text>{header.column.id}</Text>
                <Input
                  value={header.column.getFilterValue()}
                  onChange={(e) => {
                    header.column.setFilterValue(e.target.value);
                  }}
                />
                <Button
                  onClick={() => {
                    refreshData();
                  }}
                >
                  Filter
                </Button>
              </>
            )}
          </>
        );
      })}

      <Grid overflowX={"scroll"} overflowY={"auto"}>
        <Table variant="simple">
          <Thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <Tr key={crypto.randomUUID()} style={{ columnSpan: "all" }}>
                {headerGroup.headers.map((header) => {
                  return (
                    <Th
                      key={crypto.randomUUID()}
                      colSpan={header.colSpan}
                      width={`${header.getSize()}px`}
                      style={{ ...getCommonPinningStyles(header.column) }}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                      {header.column.getCanSort() && (
                        <>
                          <Button
                            onClick={(e) => {
                              const func =
                                header.column.getToggleSortingHandler();
                              if (func === undefined) {
                                return;
                              }
                              func(e);
                            }}
                          >
                            Toggle Sort
                          </Button>
                          <Text>
                            {header.column.getIsSorted()
                              ? "Sorted"
                              : "Not Sort"}
                          </Text>
                          {header.column.getNextSortingOrder() === false && (
                            <Text>To No sort</Text>
                          )}
                          {header.column.getNextSortingOrder() === "asc" && (
                            <Text>To asc</Text>
                          )}
                          {header.column.getNextSortingOrder() === "desc" && (
                            <Text>To desc</Text>
                          )}
                        </>
                      )}

                      {header.column.getIsFiltered() ? (
                        <Text>Filtered</Text>
                      ) : (
                        <Text>Not Filtered</Text>
                      )}
                      <Box
                        padding={"1rem 0"}
                        borderRight={
                          header.column.getIsResizing()
                            ? "1rem solid black"
                            : "0.5rem solid grey"
                        }
                        {...{
                          onDoubleClick: () => header.column.resetSize(),
                          onMouseDown: header.getResizeHandler(),
                          onTouchStart: header.getResizeHandler(),
                        }}
                      />
                      {}
                    </Th>
                  );
                })}
              </Tr>
            ))}
          </Thead>
          <Tbody>
            {table.getRowModel().rows.map((row) => (
              <Tr key={crypto.randomUUID()}>
                {row.getVisibleCells().map((cell) => (
                  <Td
                    key={crypto.randomUUID()}
                    width={`${cell.column.getSize()}px`}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Td>
                ))}
              </Tr>
            ))}
          </Tbody>
          {hasFooter && (
            <Tfoot>
              {table.getFooterGroups().map((footerGroup) => (
                <Tr key={crypto.randomUUID()}>
                  {footerGroup.headers.map((header) => (
                    <Th key={crypto.randomUUID()} colSpan={header.colSpan}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.footer,
                            header.getContext(),
                          )}
                    </Th>
                  ))}
                </Tr>
              ))}
            </Tfoot>
          )}
        </Table>
      </Grid>
      <Flex>
        <Button
          onClick={() => table.firstPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {"<<"}
        </Button>
        <Button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {"<"}
        </Button>
        <Text>{table.getState().pagination.pageIndex + 1}</Text>

        <Button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          {">"}
        </Button>
        <Button
          onClick={() => table.lastPage()}
          disabled={!table.getCanNextPage()}
        >
          {">>"}
        </Button>
        <select
          value={table.getState().pagination.pageSize}
          onChange={(e) => {
            table.setPageSize(Number(e.target.value));
          }}
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              {pageSize}
            </option>
          ))}
        </select>
      </Flex>
    </>
  );
};

export default ChakraDataTable;
