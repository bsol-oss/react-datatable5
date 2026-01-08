import { Box, Flex, Grid, GridProps, Icon, Spinner } from '@chakra-ui/react';
import { ReactNode, useMemo } from 'react';
import { BsExclamationCircleFill } from 'react-icons/bs';
import { MdOutlineViewColumn } from 'react-icons/md';
import { GlobalFilter } from '../../Filter/GlobalFilter';
import { Tag } from '../../ui/tag';
import { Tooltip } from '../../ui/tooltip';
import { useDataTableContext } from '../context/useDataTableContext';
import { FilterDialog } from './FilterDialog';
import { PageSizeControl } from './PageSizeControl';
import { Pagination } from './Pagination';
import { ReloadButton } from './ReloadButton';
import { RowCountText } from './RowCountText';
import { TableFilterTags } from './TableFilterTags';
import { ViewDialog } from './ViewDialog';

export interface TableControlsProps {
  totalText?: string;
  fitTableWidth?: boolean;
  fitTableHeight?: boolean;
  children?: ReactNode;
  showGlobalFilter?: boolean;
  showFilter?: boolean;
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
  const { tableLabel, table, columnFilters, setColumnFilters } =
    useDataTableContext();
  const { hasErrorText } = tableLabel;

  // Get applied filters with display information
  const appliedFilters = useMemo(() => {
    type ArrayFilter = {
      columnId: string;
      displayName: string;
      values: string[];
      isArray: true;
    };

    type SingleFilter = {
      columnId: string;
      displayName: string;
      value: string;
      isArray: false;
    };

    return columnFilters
      .map((filter): ArrayFilter | SingleFilter | null => {
        const column = table.getColumn(filter.id);
        if (!column) return null;

        const meta = column.columnDef.meta;
        const displayName = meta?.displayName ?? filter.id;
        const filterValue = filter.value;

        // Handle array values (tag filters)
        if (Array.isArray(filterValue)) {
          return {
            columnId: filter.id,
            displayName,
            values: filterValue,
            isArray: true,
          };
        }

        // Handle single values (select filters)
        if (
          filterValue !== undefined &&
          filterValue !== null &&
          filterValue !== ''
        ) {
          return {
            columnId: filter.id,
            displayName,
            value: String(filterValue),
            isArray: false,
          };
        }

        return null;
      })
      .filter(
        (filter): filter is ArrayFilter | SingleFilter => filter !== null
      );
  }, [columnFilters, table]);

  const handleRemoveFilter = (columnId: string) => {
    setColumnFilters(columnFilters.filter((f) => f.id !== columnId));
  };

  return (
    <Grid
      templateRows={'auto 1fr'}
      width={fitTableWidth ? 'fit-content' : '100%'}
      height={fitTableHeight ? 'fit-content' : '100%'}
      gap={'0.5rem'}
      p={1}
      {...gridProps}
    >
      <Flex flexFlow={'column'} gap={2}>
        <Flex justifyContent={'space-between'}>
          <Flex gap={2} alignItems={'center'} flexWrap={'wrap'}>
            {showView && <ViewDialog icon={<MdOutlineViewColumn />} />}
            {appliedFilters.length > 0 && (
              <Flex gap={1.5} alignItems={'center'} flexWrap={'wrap'}>
                {appliedFilters.map((filter) => {
                  if (filter.isArray) {
                    return filter.values.map((value, index) => (
                      <Tag
                        key={`${filter.columnId}-${value}-${index}`}
                        size="sm"
                        colorPalette="blue"
                        onClose={() => {
                          const column = table.getColumn(filter.columnId);
                          if (column) {
                            const currentValue =
                              (column.getFilterValue() as string[]) ?? [];
                            const newValue = currentValue.filter(
                              (v) => v !== value
                            );
                            if (newValue.length === 0) {
                              handleRemoveFilter(filter.columnId);
                            } else {
                              column.setFilterValue(newValue);
                            }
                          }
                        }}
                      >
                        {filter.displayName}: {value}
                      </Tag>
                    ));
                  }
                  return (
                    <Tag
                      key={filter.columnId}
                      size="sm"
                      colorPalette="blue"
                      onClose={() => handleRemoveFilter(filter.columnId)}
                    >
                      {filter.displayName}: {filter.value}
                    </Tag>
                  );
                })}
              </Flex>
            )}
          </Flex>
          <Flex gap={'0.5rem'} alignItems={'center'} justifySelf={'end'}>
            {loading && <Spinner size={'sm'} />}
            {hasError && (
              <Tooltip content={hasErrorText}>
                <Icon as={BsExclamationCircleFill} color={'red.400'} />
              </Tooltip>
            )}
            {showGlobalFilter && <GlobalFilter />}
            {filterTagsOptions.length > 0 && (
              <TableFilterTags filterTagsOptions={filterTagsOptions} />
            )}
            {showFilter && <FilterDialog />}
            {showReload && <ReloadButton />}
            {extraItems}
          </Flex>
        </Flex>
      </Flex>

      <Grid>{children}</Grid>
      {(showPageSizeControl || showPageCountText || showPagination) && (
        <Flex justifyContent={'space-between'}>
          <Flex gap={'1rem'} alignItems={'center'}>
            {showPageSizeControl && <PageSizeControl />}
            {showPageCountText && <RowCountText />}
          </Flex>
          <Box justifySelf={'end'}>{showPagination && <Pagination />}</Box>
        </Flex>
      )}
    </Grid>
  );
};
