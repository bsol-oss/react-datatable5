import { Box, Button, Flex, Th, Thead, Tr } from "@chakra-ui/react";
import { flexRender } from "@tanstack/react-table";
import { MdFilterListAlt } from "react-icons/md";

// import { Box } from "framer-motion";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  CloseIcon,
  UpDownIcon,
} from "@chakra-ui/icons";
import { useDataTable } from "./useDataTable";

interface TableHeaderProps {
  canResize?: boolean;
}

const TableHeader = ({ canResize }: TableHeaderProps) => {
  const { table } = useDataTable();
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

            return (
              <Th
                padding={"0rem"}
                key={crypto.randomUUID()}
                colSpan={header.colSpan}
                width={`${header.getSize()}px`}
              >
                <Flex alignItems={"center"} gap={"0.5rem"} padding={"0.5rem"}>
                  <Box>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </Box>
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

                  {header.column.getIsFiltered() && <MdFilterListAlt />}
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
