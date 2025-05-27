import {
  Box,
  Flex,
  Grid,
  GridProps,
  Icon,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { ReactNode } from "react";
import { BsExclamationCircleFill } from "react-icons/bs";
import { MdOutlineViewColumn } from "react-icons/md";
import { Tooltip } from "../../ui/tooltip";
import { PageSizeControl } from "./PageSizeControl";
import { RowCountText } from "./RowCountText";
import { Pagination } from "./Pagination";
import { ViewDialog } from "./ViewDialog";
import { GlobalFilter } from "../../Filter/GlobalFilter";
import { FilterDialog } from "./FilterDialog";
import { ReloadButton } from "./ReloadButton";
import { FilterOptions } from "../../Filter/FilterOptions";
import { TableFilterTags } from "./TableFilterTags";
import { useDataTableContext } from "../context/useDataTableContext";

export interface TableControlsProps {
  totalText?: string;
  fitTableWidth?: boolean;
  fitTableHeight?: boolean;
  children?: ReactNode;
  showGlobalFilter?: boolean;
  showFilter?: boolean;
  showFilterName?: boolean;
  showFilterTags?: boolean;
  showReload?: boolean;
  showPagination?: boolean;
  showPageSizeControl?: boolean;
  showPageCountText?: boolean;
  showView?: boolean;
  filterOptions?: {
    label: string;
    value: string;
  }[];
  extraItems?: ReactNode;
  loading?: boolean;
  hasError?: boolean;
  gridProps?: GridProps;
}

export const TableControls = ({
  fitTableWidth = false,
  fitTableHeight = false,
  children = <></>,
  showGlobalFilter = false,
  showFilter = false,
  showFilterName = false,
  showFilterTags = false,
  showReload = false,
  showPagination = true,
  showPageSizeControl = true,
  showPageCountText = true,
  showView = true,
  filterOptions = [],
  extraItems = <></>,
  loading = false,
  hasError = false,
  gridProps = {},
}: TableControlsProps) => {
  const { tableLabel } = useDataTableContext();
  const { rowCountText, hasErrorText } = tableLabel;
  return (
    <Grid
      templateRows={"auto 1fr"}
      width={fitTableWidth ? "fit-content" : "100%"}
      height={fitTableHeight ? "fit-content" : "100%"}
      gap={"0.5rem"}
      {...gridProps}
    >
      <Flex flexFlow={"column"} gap={2}>
        <Flex justifyContent={"space-between"}>
          <Box>{showView && <ViewDialog icon={<MdOutlineViewColumn />} />}</Box>
          <Flex gap={"0.5rem"} alignItems={"center"} justifySelf={"end"}>
            {loading && <Spinner size={"sm"} />}
            {hasError && (
              <Tooltip content={hasErrorText}>
                <Icon as={BsExclamationCircleFill} color={"red.400"} />
              </Tooltip>
            )}
            {showGlobalFilter && <GlobalFilter />}
            {showFilter && <FilterDialog />}
            {showReload && <ReloadButton />}
            {extraItems}
          </Flex>
        </Flex>
        {filterOptions.length > 0 && (
          <Flex flexFlow={"column"} gap={"0.5rem"}>
            {filterOptions.map((option) => {
              const { label, value } = option;
              return (  
                <Flex
                  key={value}
                  alignItems={"center"}
                  flexFlow={"wrap"}
                  gap={"0.5rem"}
                >
                  {showFilterName && <Text>{label}:</Text>}
                  <FilterOptions column={value}></FilterOptions>
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
        {...{ bg: { base: "colorPalette.50", _dark: "colorPalette.950" } }}
      >
        {children}
      </Grid>
      {(showPageSizeControl || showPageCountText || showPagination) && (
        <Flex justifyContent={"space-between"}>
          <Flex gap={"1rem"} alignItems={"center"}>
            {showPageSizeControl && <PageSizeControl />}
            {showPageCountText && (
              <Flex>
                <Text paddingRight={"0.5rem"}>
                  {rowCountText}
                </Text>
                <RowCountText />
              </Flex>
            )}
          </Flex>
          <Box justifySelf={"end"}>{showPagination && <Pagination />}</Box>
        </Flex>
      )}
    </Grid>
  );
};
