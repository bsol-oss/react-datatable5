import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Checkbox,
  Flex,
  Menu,
  MenuButton,
  Tfoot,
  Th,
  Tr,
} from "@chakra-ui/react";
import { flexRender } from "@tanstack/react-table";
import { useDataTable } from "./useDataTable";

export interface TableFooterProps {
  pinnedBgColor?: { light: string; dark: string };
}

export const TableFooter = ({
  pinnedBgColor = { light: "gray.50", dark: "gray.700" },
}: TableFooterProps)=> {
  const table = useDataTable().table;
  const SELECTION_BOX_WIDTH = 32;
  return (
    <Tfoot>
      {table.getFooterGroups().map((footerGroup) => (
        <Tr display={"flex"} key={crypto.randomUUID()}>
          <Th
            // styling resize and pinning start
            padding={"0.5rem"}
            {...(table.getIsSomeColumnsPinned("left")
              ? {
                  left: `0px`,
                  backgroundColor: pinnedBgColor.dark,
                  position: "sticky",
                  zIndex: 1,
                  _dark: { backgroundColor: pinnedBgColor.dark },
                }
              : {})}
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
          {footerGroup.headers.map((header) => (
            <Th
              padding="0rem"
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
                header.column.getIsPinned() ? pinnedBgColor.dark : undefined
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
                  as={Button}
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"start"}
                  variant={"ghost"}
                  borderRadius={"0rem"}
                  padding={"0rem"}
                >
                  <Flex gap="0.5rem" alignItems={"center"}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.footer,
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
              </Menu>
            </Th>
          ))}
        </Tr>
      ))}
    </Tfoot>
  );
};
