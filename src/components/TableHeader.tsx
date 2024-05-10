import { Box, Button, Checkbox, Flex, Th, Thead, Tr } from "@chakra-ui/react";
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

export interface TableHeaderProps {
  canResize?: boolean;
}

export const TableHeader = ({ canResize }: TableHeaderProps) => {
  const { table } = useDataTable();
  const SELECTION_BOX_WIDTH = 32;
  return (
    <Thead>
      {table.getHeaderGroups().map((headerGroup) => (
        <Tr display={"flex"} key={crypto.randomUUID()}>
          <Th
            // styling resize and pinning start
            padding={"0.5rem"}
            left={`0px`}
            backgroundColor={"gray.50"}
            position={"sticky"}
            zIndex={1}
            // styling resize and pinning end
          >
            <Checkbox
              {...{
                isChecked: table.getIsAllRowsSelected(),
                // indeterminate: table.getIsSomeRowsSelected(),
                onChange: table.getToggleAllRowsSelectedHandler(),
              }}
            ></Checkbox>
          </Th>
          {headerGroup.headers.map((header) => {
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
                // styling resize and pinning start
                maxWidth={`${header.getSize()}px`}
                width={`${header.getSize()}px`}
                left={
                  header.column.getIsPinned()
                    ? `${header.getStart("left") + SELECTION_BOX_WIDTH}px`
                    : undefined
                }
                backgroundColor={
                  header.column.getIsPinned() ? "gray.50" : undefined
                }
                position={header.column.getIsPinned() ? "sticky" : "relative"}
                zIndex={header.column.getIsPinned() ? 1 : 0}
                // styling resize and pinning end
              >
                <Flex
                  alignItems={"center"}
                  gap={"0.5rem"}
                  padding={"0.5rem"}
                  overflow={"scroll"}
                >
                  <Box>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </Box>
                  <Button
                    onClick={() => {
                      header.column.pin("left");
                    }}
                  >
                    {"<="}
                  </Button>
                  <Button
                    onClick={() => {
                      header.column.pin(false);
                    }}
                  >
                    {"X"}
                  </Button>
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
                      position={"absolute"}
                      right={"0"}
                      top={"0"}
                      height={"100%"}
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
