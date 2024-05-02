import { Thead, Tr, Th, Button, Text, Box, Flex, Grid } from "@chakra-ui/react";
import { ColumnFaceting, flexRender } from "@tanstack/react-table";
// import { Box } from "framer-motion";
import { useDataTable } from "./useDataTable";
import {
  ChevronUpIcon,
  ChevronDownIcon,
  UpDownIcon,
  CloseIcon,
} from "@chakra-ui/icons";

interface TableHeaderProps {
  canResize?: boolean;
}

const TableHeader = ({ canResize }: TableHeaderProps) => {
  const table = useDataTable().table;
  return (
    <Thead>
      {table.getHeaderGroups().map((headerGroup) => (
        <Tr key={crypto.randomUUID()} style={{ columnSpan: "all" }}>
          {headerGroup.headers.map((header) => {
            console.log(header.column.getFilterValue(), "okgspokpsor");
            const resizeProps = {
              onClick: () => header.column.resetSize(),
              onMouseDown: header.getResizeHandler(),
              onTouchStart: header.getResizeHandler(),
              cursor: "col-resize",
            };
            // console.log(header.getSize(), "gjidsaoig");
            console.log(
              header,
              header.column.getNextSortingOrder(),
              "dfksopdfoht"
            );

            return (
              <Th
                padding={"0rem"}
                key={crypto.randomUUID()}
                colSpan={header.colSpan}
                width={`${header.getSize()}px`}
              >
                <Flex justifyContent={"space-between"}>
                  <Flex>
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
                            header.column.toggleSorting();
                          }}
                        >
                          {header.column.getNextSortingOrder() === false && (
                            // <Text>To No sort</Text>
                            <ChevronUpIcon />
                          )}
                          {header.column.getNextSortingOrder() === "asc" && (
                            // <Text>To asc</Text>
                            <UpDownIcon />
                          )}
                          {header.column.getNextSortingOrder() === "desc" && (
                            // <Text>To desc</Text>
                            <ChevronDownIcon />
                          )}
                        </Button>

                        {header.column.getIsSorted() && (
                          <Button
                            onClick={(e) => {
                              header.column.clearSorting();
                            }}
                          >
                            <CloseIcon />
                          </Button>
                        )}
                      </>
                    )}

                    {header.column.getIsFiltered() ? (
                      <Text>Filtered</Text>
                    ) : (
                      <Text>Not Filtered</Text>
                    )}
                  </Flex>
                  {canResize && (
                    <Box
                      borderRight={
                        header.column.getIsResizing()
                          ? "0.25rem solid black"
                          : "0.25rem solid grey"
                      }
                      height={"5rem"}
                      width={"5px"}
                      userSelect={"none"}
                      style={{ touchAction: "none" }}
                      {...resizeProps}
                    ></Box>
                  )}
                </Flex>
              </Th>
            );
          })}
        </Tr>
      ))}
    </Thead>
  );
};

export default TableHeader;
