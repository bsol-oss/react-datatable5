import {
  Box,
  Checkbox,
  Flex,
  FormLabel,
  Grid,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Portal,
  ResponsiveValue,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { flexRender, Header } from "@tanstack/react-table";
import { MdCancel, MdClear, MdFilterListAlt } from "react-icons/md";

import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import * as CSS from "csstype";
import { useState } from "react";
import { GrAscend, GrDescend } from "react-icons/gr";
import { MdPushPin } from "react-icons/md";
import { useDataTableContext } from "../../index";

export interface TableHeaderProps {
  canResize?: boolean;
  pinnedBgColor?: { light: string; dark: string };
  showSelector?: boolean;
  alwaysShowSelector?: boolean;
}

export const TableHeader = ({
  canResize,
  pinnedBgColor = { light: "gray.50", dark: "gray.700" },
  showSelector,
  alwaysShowSelector = true,
}: TableHeaderProps) => {
  const { table } = useDataTableContext();
  const SELECTION_BOX_WIDTH = 20;
  const [hoveredCheckBox, setHoveredCheckBox] = useState<boolean>(false);

  const handleRowHover = (isHovered: boolean) => {
    setHoveredCheckBox(isHovered);
  };

  const isCheckBoxVisible = () => {
    if (alwaysShowSelector) {
      return true;
    }
    if (table.getIsAllRowsSelected()) {
      return true;
    }
    if (hoveredCheckBox) {
      return true;
    }
    return false;
  };

  const getThProps = (header: Header<unknown, unknown>) => {
    const thProps = header.column.getIsPinned()
      ? {
          left: showSelector
            ? `${header.getStart("left") + SELECTION_BOX_WIDTH + table.getDensityValue() * 2}px`
            : `${header.getStart("left") + table.getDensityValue() * 2}px`,
          background: pinnedBgColor.light,
          position: "sticky" as ResponsiveValue<CSS.Property.Position>,
          zIndex: 1,
          _dark: {
            backgroundColor: pinnedBgColor.dark,
          },
        }
      : {};
    return thProps;
  };

  return (
    <Thead>
      {table.getHeaderGroups().map((headerGroup) => (
        <Tr display={"flex"} key={`chakra-table-headergroup-${headerGroup.id}`}>
          {showSelector && (
            <Th
              // styling resize and pinning start
              {...(table.getIsSomeColumnsPinned("left")
                ? {
                    left: `0px`,
                    backgroundColor: pinnedBgColor.light,
                    position: "sticky",
                    zIndex: 1,
                    _dark: { backgroundColor: pinnedBgColor.dark },
                  }
                : {})}
              // styling resize and pinning end
              padding={`${table.getDensityValue()}px`}
              onMouseEnter={() => handleRowHover(true)}
              onMouseLeave={() => handleRowHover(false)}
              display={"grid"}
            >
              {isCheckBoxVisible() && (
                <FormLabel
                  margin={"0rem"}
                  display={"grid"}
                  justifyItems={"center"}
                  alignItems={"center"}
                >
                  <Checkbox
                    width={`${SELECTION_BOX_WIDTH}px`}
                    height={`${SELECTION_BOX_WIDTH}px`}
                    {...{
                      isChecked: table.getIsAllRowsSelected(),
                      // indeterminate: table.getIsSomeRowsSelected(),
                      onChange: table.getToggleAllRowsSelectedHandler(),
                    }}
                  ></Checkbox>
                </FormLabel>
              )}
              {!isCheckBoxVisible() && (
                <Box
                  as="span"
                  margin={"0rem"}
                  display={"grid"}
                  justifyItems={"center"}
                  alignItems={"center"}
                  width={`${SELECTION_BOX_WIDTH}px`}
                  height={`${SELECTION_BOX_WIDTH}px`}
                ></Box>
              )}
            </Th>
          )}
          {headerGroup.headers.map((header) => {
            const resizeProps = {
              onMouseDown: header.getResizeHandler(),
              onTouchStart: header.getResizeHandler(),
              cursor: "col-resize",
            };

            return (
              <Th
                padding={"0rem"}
                key={`chakra-table-header-${header.id}`}
                colSpan={header.colSpan}
                // styling resize and pinning start
                width={`${header.getSize()}px`}
                display={"grid"}
                gridTemplateColumns={'1fr auto'}
                zIndex={header.index}
                {...getThProps(header)}
              >
                <Menu>
                  <MenuButton
                    as={Grid}
                    padding={`${table.getDensityValue()}px`}
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent={"start"}
                    borderRadius={"0rem"}
                    overflow={'auto'}
                    _hover={{ backgroundColor: "gray.100" }}
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
                              <ChevronUpIcon />
                            )}
                            {header.column.getIsSorted() === "desc" && (
                              <ChevronDownIcon />
                            )}
                          </>
                        )}
                      </Box>
                      <Box>
                        {header.column.getIsFiltered() && <MdFilterListAlt />}
                      </Box>
                    </Flex>
                  </MenuButton>

                  <Portal>
                    <MenuList>
                      {!header.column.getIsPinned() && (
                        <MenuItem
                          icon={<MdPushPin />}
                          onClick={() => {
                            header.column.pin("left");
                          }}
                        >
                          Pin Column
                        </MenuItem>
                      )}
                      {header.column.getIsPinned() && (
                        <MenuItem
                          icon={<MdCancel />}
                          onClick={() => {
                            header.column.pin(false);
                          }}
                        >
                          Cancel Pin
                        </MenuItem>
                      )}
                      {header.column.getCanSort() && (
                        <>
                          <MenuItem
                            icon={<GrAscend />}
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
                            Sort Ascending
                          </MenuItem>
                          <MenuItem
                            icon={<GrDescend />}
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
                            Sort Descending
                          </MenuItem>

                          {header.column.getIsSorted() && (
                            <MenuItem
                              icon={<MdClear />}
                              onClick={() => {
                                header.column.clearSorting();
                              }}
                            >
                              Clear Sorting
                            </MenuItem>
                          )}
                        </>
                      )}
                    </MenuList>
                  </Portal>
                </Menu>

                {canResize && (
                  <Box
                    borderRight={"0.2rem solid"}
                    borderRightColor={
                      header.column.getIsResizing() ? "gray.700" : "transparent"
                    }
                    position={'relative'}
                    right={'0.1rem'}
                    width={"2px"}
                    height={'100%'}
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
              </Th>
            );
          })}
        </Tr>
      ))}
    </Thead>
  );
};
