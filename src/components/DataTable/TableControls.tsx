import { Box, Flex, Grid, Icon, Spinner, Text } from "@chakra-ui/react";
import { ReactNode } from "react";
import { BsExclamationCircleFill } from "react-icons/bs";
import { MdOutlineViewColumn } from "react-icons/md";
import { Tooltip } from "../../components/ui/tooltip";
import {
  EditFilterButton,
  EditViewButton,
  FilterOptions,
  GlobalFilter,
  PageSizeControl,
  ReloadButton,
  RowCountText,
  TableFilterTags,
  TablePagination,
} from "../../index";

export interface TableControlsProps {
  totalText?: string;
  fitTableWidth?: boolean;
  fitTableHeight?: boolean;
  isMobile?: boolean;
  children?: ReactNode;
  showGlobalFilter?: boolean;
  showFilter?: boolean;
  showFilterName?: boolean;
  showFilterTags?: boolean;
  showReload?: boolean;
  filterOptions?: string[];
  extraItems?: ReactNode;
  loading?: boolean;
  hasError?: boolean;
}

export const TableControls = ({
  totalText = "Total:",
  fitTableWidth = false,
  fitTableHeight = false,
  isMobile = false,
  children = <></>,
  showGlobalFilter = false,
  showFilter = false,
  showFilterName = false,
  showFilterTags = false,
  showReload = false,
  filterOptions = [],
  extraItems = <></>,
  loading = false,
  hasError = false,
}: TableControlsProps) => {
  return (
    <Grid
      templateRows={"auto 1fr auto"}
      width={fitTableWidth ? "fit-content" : "100%"}
      height={fitTableHeight ? "fit-content" : "100%"}
      gap={"0.5rem"}
    >
      <Flex flexFlow={"column"} gap={2}>
        <Flex justifyContent={"space-between"}>
          <Box>
            <EditViewButton
              text={isMobile ? undefined : "View"}
              icon={<MdOutlineViewColumn />}
            />
          </Box>
          <Flex gap={"0.5rem"} alignItems={"center"} justifySelf={"end"}>
            {loading && <Spinner size={"sm"} />}
            {hasError && (
              <Tooltip content="An error occurred while fetching data">
                <Icon as={BsExclamationCircleFill} color={"red.400"} />
              </Tooltip>
            )}
            {showGlobalFilter && <GlobalFilter />}
            {showFilter && (
              <>
                <EditFilterButton
                  text={isMobile ? undefined : "Advanced Filter"}
                />
              </>
            )}
            {showReload && <ReloadButton />}
            {extraItems}
          </Flex>
        </Flex>
        {filterOptions.length > 0 && (
          <Flex flexFlow={"column"} gap={"0.5rem"}>
            {filterOptions.map((column) => {
              return (
                <Flex
                  key={column}
                  alignItems={"center"}
                  flexFlow={"wrap"}
                  gap={"0.5rem"}
                >
                  {showFilterName && <Text>{column}:</Text>}
                  <FilterOptions column={column}></FilterOptions>
                </Flex>
              );
            })}
          </Flex>
        )}
        {showFilterTags && (
          <Flex>
            <TableFilterTags />
          </Flex>
        )}
      </Flex>

      <Grid
        overflow={"auto"}
        backgroundColor={"gray.50"}
        _dark={{
          backgroundColor: "gray.900",
        }}
      >
        {children}
      </Grid>
      <Flex justifyContent={"space-between"}>
        <Flex gap={"1rem"} alignItems={"center"}>
          <PageSizeControl />
          <Flex>
            <Text paddingRight={"0.5rem"}>{totalText}</Text>
            <RowCountText />
          </Flex>
        </Flex>
        <Box justifySelf={"end"}>
          <TablePagination />
        </Box>
      </Flex>
    </Grid>
  );
};
