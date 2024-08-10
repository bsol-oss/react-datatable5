import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import {
  Box,
  Checkbox,
  Flex,
  FormLabel,
  Menu,
  MenuButton,
  Tfoot,
  Th,
  Tr,
} from "@chakra-ui/react";
import { flexRender } from "@tanstack/react-table";
import { useDataTableContext } from "./useDataTableContext";
import { useState } from "react";

export interface TableFooterProps {
  pinnedBgColor?: { light: string; dark: string };
}

export const TableFooter = ({
  pinnedBgColor = { light: "gray.50", dark: "gray.700" },
}: TableFooterProps) => {
  const table = useDataTableContext().table;
  const SELECTION_BOX_WIDTH = 20;
  const [hoveredCheckBox, setHoveredCheckBox] = useState<boolean>(false);

  const handleRowHover = (isHovered: boolean) => {
    setHoveredCheckBox(isHovered);
  };

  const isCheckBoxVisible = () => {
    if (table.getIsAllRowsSelected()) {
      return true;
    }
    if (hoveredCheckBox) {
      return true;
    }
    return false;
  };
  return (
    <Tfoot>
      {table.getFooterGroups().map((footerGroup) => (
        <Tr display={"flex"} key={crypto.randomUUID()}>
          <Th
            // styling resize and pinning start
            padding={`${table.getDensityValue()}px`}
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
              />
            )}
          </Th>
          {footerGroup.headers.map((header) => (
            <Th
              padding={"0"}
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
