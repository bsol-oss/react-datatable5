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
} from "@chakra-ui/react";
import { Table as ITable, flexRender } from "@tanstack/react-table";

interface ChakraDataTable<T> {
  table: ITable<T>;
  hasFooter: boolean;
}

const ChakraDataTable = <T,>({ table, hasFooter }: ChakraDataTable<T>) => {
  return (
    <>
      <Flex justifyContent={"flex-end"}>
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
      <Grid overflowX={"scroll"} overflowY={"auto"}>
        <Table variant="simple">
          <Thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <Tr key={crypto.randomUUID()} style={{ columnSpan: "all" }}>
                {headerGroup.headers.map((header) => (
                  <Th key={crypto.randomUUID()} colSpan={header.colSpan}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </Th>
                ))}
              </Tr>
            ))}
          </Thead>
          <Tbody>
            {table.getRowModel().rows.map((row) => (
              <Tr key={crypto.randomUUID()}>
                {row.getVisibleCells().map((cell) => (
                  <Td key={crypto.randomUUID()}>
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
