import {
  Box,
  Checkbox,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Portal,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { flexRender } from "@tanstack/react-table";
import { MdCancel, MdFilterListAlt } from "react-icons/md";

import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import { IoMdClose } from "react-icons/io";
import { MdPushPin, MdSort } from "react-icons/md";
import { useDataTable } from "./useDataTable";
export interface TableHeaderProps {
  canResize?: boolean;
  pinnedBgColor?: { light: string; dark: string };
}

export const TableHeader = ({
  canResize,
  pinnedBgColor = { light: "gray.50", dark: "gray.700" },
}: TableHeaderProps) => {
  const { table } = useDataTable();
  const SELECTION_BOX_WIDTH = 16;
  return (
    <Thead>
      {table.getHeaderGroups().map((headerGroup) => (
        <Tr display={"flex"} key={crypto.randomUUID()}>
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
            padding={"0rem"}
          >
            <Checkbox
              padding={`${table.getDensityValue()}px`}
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
                    ? `${header.getStart("left") + SELECTION_BOX_WIDTH + table.getDensityValue() * 2}px`
                    : undefined
                }
                backgroundColor={
                  header.column.getIsPinned() ? pinnedBgColor.light : undefined
                }
                position={header.column.getIsPinned() ? "sticky" : "relative"}
                zIndex={header.column.getIsPinned() ? 1 : undefined}
                _dark={{
                  backgroundColor: header.column.getIsPinned()
                    ? pinnedBgColor.dark
                    : undefined,
                }}
                // styling resize and pinning end
                display={"grid"}
              >
                <Menu>
                  <MenuButton
                    as={Box}
                    padding={`${table.getDensityValue()}px`}
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent={"start"}
                    borderRadius={"0rem"}
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
                            {header.column.getIsSorted() === false && (
                              // <UpDownIcon />
                              <></>
                            )}
                            {header.column.getIsSorted() === "asc" && (
                              <ChevronUpIcon />
                            )}
                            {header.column.getIsSorted() === "desc" && (
                              <ChevronDownIcon />
                            )}
                          </>
                        )}
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
                            icon={<MdSort />}
                            onClick={() => {
                              header.column.toggleSorting();
                            }}
                          >
                            Toggle Sorting
                          </MenuItem>

                          {header.column.getIsSorted() && (
                            <MenuItem
                              icon={<IoMdClose />}
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

                {header.column.getIsFiltered() && <MdFilterListAlt />}
                {canResize && (
                  <Box
                    borderRight={"0.2rem solid"}
                    borderRightColor={
                      header.column.getIsResizing() ? "gray.700" : "transparent"
                    }
                    position={"absolute"}
                    right={"0"}
                    top={"0"}
                    height={"100%"}
                    width={"5px"}
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
