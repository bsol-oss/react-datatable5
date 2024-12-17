import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import { Flex, Box, Table, MenuRoot, MenuTrigger } from "@chakra-ui/react";
import { flexRender, Header } from "@tanstack/react-table";
import { useState } from "react";
import { useDataTableContext } from "./useDataTableContext";
import { Checkbox } from "../../components/ui/checkbox";

export interface TableFooterProps {
  pinnedBgColor?: { light: string; dark: string };
  showSelector?: boolean;
  alwaysShowSelector?: boolean;
}

export const TableFooter = ({
  pinnedBgColor = { light: "gray.50", dark: "gray.700" },
  showSelector = false,
  alwaysShowSelector = true,
}: TableFooterProps) => {
  const table = useDataTableContext().table;
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
          position: "sticky",
          zIndex: 1,
          _dark: {
            backgroundColor: pinnedBgColor.dark,
          },
        }
      : {};
    return thProps;
  };

  return (
    <Table.Footer>
      {table.getFooterGroups().map((footerGroup) => (
        <Table.Row
          display={"flex"}
          key={`chakra-table-footergroup-${footerGroup.id}`}
        >
          {showSelector && (
            <Table.Header
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
                <Box
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
                </Box>
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
            </Table.Header>
          )}
          {footerGroup.headers.map((header) => (
            <Table.Header
              padding={"0"}
              key={`chakra-table-footer-${footerGroup.id}`}
              columnSpan={`${header.colSpan}`}
              // styling resize and pinning start
              maxWidth={`${header.getSize()}px`}
              width={`${header.getSize()}px`}
              display={"grid"}
              {...getThProps(header)}
            >
              <MenuRoot>
                <MenuTrigger asChild>
                  <Box
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
                  </Box>
                </MenuTrigger>
              </MenuRoot>
            </Table.Header>
          ))}
        </Table.Row>
      ))}
    </Table.Footer>
  );
};
