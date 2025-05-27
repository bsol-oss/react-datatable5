import { TagFilter } from "@/components/Filter/TagFilter";
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
import { GlobalFilter } from "../../Filter/GlobalFilter";
import { Tooltip } from "../../ui/tooltip";
import { useDataTableContext } from "../context/useDataTableContext";
import { FilterDialog } from "./FilterDialog";
import { PageSizeControl } from "./PageSizeControl";
import { Pagination } from "./Pagination";
import { ReloadButton } from "./ReloadButton";
import { RowCountText } from "./RowCountText";
import { TableFilterTags } from "./TableFilterTags";
import { ViewDialog } from "./ViewDialog";

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
  filterTagsOptions?: {
    column: string;
    options: {
      label: string;
      value: string;
    }[];
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
  filterTagsOptions = [],
  extraItems = <></>,
  loading = false,
  hasError = false,
  gridProps = {},
}: TableControlsProps) => {
  const { tableLabel, table } = useDataTableContext();
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
        {filterTagsOptions.length > 0 && (
          <Flex flexFlow={"column"} gap={"0.5rem"}>
            {filterTagsOptions.map((option) => {
              const { column, options } = option;
              const tableColumn = table.getColumn(column);
              return (
                <Flex
                  key={column}
                  alignItems={"center"}
                  flexFlow={"wrap"}
                  gap={"0.5rem"}
                >
                  {showFilterName && <Text>{column}:</Text>}
                  <TagFilter
                    availableTags={options.map((item) => item.value)}
                    selectedTags={
                      (tableColumn?.getFilterValue() as string[]) ?? []
                    }
                    onTagChange={(tags) => {
                      if (tags.length === 0) {
                        return tableColumn?.setFilterValue(undefined);
                      }
                      tableColumn?.setFilterValue(tags);
                    }}
                  />
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
                <Text paddingRight={"0.5rem"}>{rowCountText}</Text>
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
