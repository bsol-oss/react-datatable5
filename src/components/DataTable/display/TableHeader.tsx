import {
  Box,
  TableHeaderProps as ChakraTableHeaderProps,
  Flex,
  Table,
  TableRowProps,
} from "@chakra-ui/react";
import { flexRender, Header } from "@tanstack/react-table";
import { MdCancel, MdClear, MdFilterListAlt } from "react-icons/md";

import { Button } from "@/components/ui/button";
import {
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
} from "@/components/ui/menu";
import { BiDownArrow, BiUpArrow } from "react-icons/bi";
import { GrAscend, GrDescend } from "react-icons/gr";
import { MdPushPin } from "react-icons/md";
import { useDataTableContext } from "../context/useDataTableContext";

export interface TableHeaderProps {
  canResize?: boolean;
  showSelector?: boolean;
  isSticky?: boolean;
  tableHeaderProps?: ChakraTableHeaderProps;
  tableRowProps?: TableRowProps;
}

export const TableHeader = ({
  canResize = true,
  showSelector = false,
  isSticky = true,
  tableHeaderProps = {},
  tableRowProps = {},
}: TableHeaderProps) => {
  const { table } = useDataTableContext();
  const SELECTION_BOX_WIDTH = 20;

  const getThProps = (header: Header<unknown, unknown>) => {
    const thProps = header.column.getIsPinned()
      ? {
          left: showSelector
            ? `${header.getStart("left") + SELECTION_BOX_WIDTH + table.getDensityValue() * 2}px`
            : `${header.getStart("left")}px`,
          position: "sticky",
          zIndex: 100 + 1,
        }
      : {};
    return thProps;
  };
  const stickyProps = {
    position: "sticky",
    top: 0,
  };

  return (
    <Table.Header {...(isSticky ? stickyProps : {})} {...tableHeaderProps}>
      {table.getHeaderGroups().map((headerGroup) => (
        <Table.Row
          display={"flex"}
          key={`chakra-table-headergroup-${headerGroup.id}`}
          {...tableRowProps}
        >
          {showSelector && (
            <Table.ColumnHeader
              padding={`${table.getDensityValue()}px`}
              display={"grid"}
              {...{
                color: {
                  base: "colorPalette.900",
                  _dark: "colorPalette.100",
                },
                bg: { base: "colorPalette.50", _dark: "colorPalette.950" },
              }}
              justifyItems={"center"}
              alignItems={"center"}
            >
              <Box
                width={`${SELECTION_BOX_WIDTH}px`}
                height={`${SELECTION_BOX_WIDTH}px`}
                // TODO: select all rows in page
              ></Box>
            </Table.ColumnHeader>
          )}
          {headerGroup.headers.map((header) => {
            const resizeProps = {
              onMouseDown: header.getResizeHandler(),
              onTouchStart: header.getResizeHandler(),
              cursor: "col-resize",
            };

            return (
              <Table.ColumnHeader
                padding={0}
                key={`chakra-table-header-${header.id}`}
                columnSpan={`${header.colSpan}`}
                // styling resize and pinning start
                flex={`${canResize ? "0" : "1"} 0 ${header.column.getSize()}px`}
                display={"grid"}
                gridTemplateColumns={"1fr auto"}
                zIndex={1500 + header.index}
                {...{
                  color: {
                    base: "colorPalette.800",
                    _dark: "colorPalette.200",
                  },
                  bg: { base: "colorPalette.100", _dark: "colorPalette.900" },
                }}
                {...getThProps(header)}
              >
                <MenuRoot>
                  <MenuTrigger asChild>
                    <Flex
                      padding={`${table.getDensityValue()}px`}
                      alignItems={"center"}
                      justifyContent={"start"}
                      borderRadius={"0rem"}
                      overflow={"auto"}
                      _hover={{
                        backgroundColor: "gray.100",
                        _dark: {
                          backgroundColor: "gray.700",
                        },
                      }}
                    >
                      <Flex gap="0.5rem" alignItems={"center"}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                        <Box>
                          {header.column.getCanSort() && (
                            <>
                              {header.column.getIsSorted() === false && <></>}
                              {header.column.getIsSorted() === "asc" && (
                                <BiUpArrow />
                              )}
                              {header.column.getIsSorted() === "desc" && (
                                <BiDownArrow />
                              )}
                            </>
                          )}
                        </Box>
                        <Box>
                          {header.column.getIsFiltered() && <MdFilterListAlt />}
                        </Box>
                      </Flex>
                    </Flex>
                  </MenuTrigger>

                  <MenuContent>
                    {!header.column.getIsPinned() && (
                      <MenuItem asChild value="pin-column">
                        <Button
                          variant={"ghost"}
                          onClick={() => {
                            header.column.pin("left");
                          }}
                        >
                          <MdPushPin />
                          Pin Column
                        </Button>
                      </MenuItem>
                    )}
                    {header.column.getIsPinned() && (
                      <MenuItem asChild value="cancel-pin">
                        <Button
                          variant={"ghost"}
                          onClick={() => {
                            header.column.pin(false);
                          }}
                        >
                          <MdCancel />
                          Cancel Pin
                        </Button>
                      </MenuItem>
                    )}
                    {header.column.getCanSort() && (
                      <>
                        <MenuItem asChild value="sort-ascend">
                          <Button
                            variant={"ghost"}
                            onClick={() => {
                              table.setSorting((state) => {
                                return [
                                  ...state.filter((column) => {
                                    return column.id !== header.id;
                                  }),
                                  { id: header.id, desc: false },
                                ];
                              });
                            }}
                          >
                            <GrAscend />
                            Sort Ascending
                          </Button>
                        </MenuItem>
                        <MenuItem asChild value="sort-descend">
                          <Button
                            variant={"ghost"}
                            onClick={() => {
                              table.setSorting((state) => {
                                return [
                                  ...state.filter((column) => {
                                    return column.id !== header.id;
                                  }),
                                  { id: header.id, desc: true },
                                ];
                              });
                            }}
                          >
                            <GrDescend />
                            Sort Descending
                          </Button>
                        </MenuItem>

                        {header.column.getIsSorted() && (
                          <MenuItem asChild value="sort-descend">
                            <Button
                              variant={"ghost"}
                              onClick={() => {
                                header.column.clearSorting();
                              }}
                            >
                              <MdClear />
                              Clear Sorting
                            </Button>
                          </MenuItem>
                        )}
                      </>
                    )}
                  </MenuContent>
                </MenuRoot>

                {canResize && (
                  <Box
                    borderRight={"0.2rem solid"}
                    borderRightColor={
                      header.column.getIsResizing() ? "gray.700" : "transparent"
                    }
                    position={"relative"}
                    right={"0.1rem"}
                    width={"2px"}
                    height={"100%"}
                    userSelect={"none"}
                    style={{ touchAction: "none" }}
                    _hover={{
                      borderRightColor: header.column.getIsResizing()
                        ? "gray.700"
                        : "gray.400",
                    }}
                    {...resizeProps}
                  ></Box>
                )}
              </Table.ColumnHeader>
            );
          })}
        </Table.Row>
      ))}
    </Table.Header>
  );
};
