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
  showFilter?: boolean;
  fitTableWidth?: boolean;
  fitTableHeight?: boolean;
  isMobile?: boolean;
  children?: ReactNode;
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
  showFilter = false,
  fitTableWidth = false,
  fitTableHeight = false,
  isMobile = false,
  children = <></>,
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
      templateRows={"auto auto auto 1fr auto"}
      templateColumns={"1fr 1fr"}
      width={fitTableWidth ? "fit-content" : "100%"}
      height={fitTableHeight ? "fit-content" : "100%"}
      justifySelf={"center"}
      alignSelf={"center"}
      gap={"0.5rem"}
    >
      <Flex justifyContent={"space-between"} gridColumn={"1 / span 2"}>
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
          {showFilter && (
            <>
              <GlobalFilter />
              <EditFilterButton
                text={isMobile ? undefined : "Advanced Filter"}
              />
            </>
          )}
          {showReload && <ReloadButton />}
          {extraItems}
        </Flex>
      </Flex>
      <Flex gridColumn={"1 / span 2"} flexFlow={"column"} gap={"0.5rem"}>
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
      <Flex gridColumn={"1 / span 2"}>
        {showFilterTags && <TableFilterTags />}
      </Flex>
      <Box
        overflow={"auto"}
        gridColumn={"1 / span 2"}
        width={"100%"}
        height={"100%"}
        backgroundColor={"gray.50"}
      >
        {children}
      </Box>
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
    </Grid>
  );
};
