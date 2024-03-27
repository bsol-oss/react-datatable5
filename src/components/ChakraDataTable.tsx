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
import React, { useRef } from "react";

interface ChakraDataTable<T> {
  table: ITable<T>;
  hasFooter: boolean;
}

const ChakraDataTable = <T,>({
  table,
  hasFooter,
  refreshData,
}: ChakraDataTable<T>) => {
  console.log(table.getState().sorting, "dogpasjdpfo");
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
                  console.log(column, "dsfjsaidfijo");
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
        console.log(header.column.getFilterValue(), "okgspokpsor");
        return (
          <>
            {header.column.getCanFilter() && (
              <>
              <Text>{header.column.id}</Text>
                <Input
                  value={header.column.getFilterValue()}
                  onChange={(e) => {
                    console.log(e, "gifdogj");
                    header.column.setFilterValue(e.target.value);
                    // console.log(value,"sdoafo")
                    // header.column.setFilterValue(value);
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
                  console.log(header.column.getFilterValue(), "okgspokpsor");
                  return (
                    <Th
                      key={crypto.randomUUID()}
                      colSpan={header.colSpan}
                      width={`${header.getSize()}px`}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
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

                      {/* {header.column.getCanFilter() && (
                        <>
                          <Input
                            value={ header.column.getFilterValue()}
                            onChange={(value) => {
                              console.log(e, "gifdogj");
                              header.column.setFilterValue(e.target.value);
                            // console.log(value,"sdoafo")
                            // header.column.setFilterValue(value);
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
                      )} */}
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
                            header.getContext()
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
