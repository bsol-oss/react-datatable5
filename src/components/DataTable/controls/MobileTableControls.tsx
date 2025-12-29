import { TagFilter } from '@/components/Filter/TagFilter';
import {
  Box,
  Flex,
  Grid,
  GridProps,
  Icon,
  Spinner,
  Stack,
  Text,
} from '@chakra-ui/react';
import { ReactNode } from 'react';
import { BsExclamationCircleFill } from 'react-icons/bs';
import { MdOutlineViewColumn } from 'react-icons/md';
import { GlobalFilter } from '../../Filter/GlobalFilter';
import { Tooltip } from '../../ui/tooltip';
import { useDataTableContext } from '../context/useDataTableContext';
import { FilterDialog } from './FilterDialog';
import { PageSizeControl } from './PageSizeControl';
import { Pagination } from './Pagination';
import { ReloadButton } from './ReloadButton';
import { RowCountText } from './RowCountText';
import { TableFilterTags } from './TableFilterTags';
import { ViewDialog } from './ViewDialog';

export interface MobileTableControlsProps {
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

export const MobileTableControls = ({
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
}: MobileTableControlsProps) => {
  const { tableLabel, table } = useDataTableContext();
  const { hasErrorText } = tableLabel;

  return (
    <Grid
      templateRows={'auto 1fr auto'}
      width={fitTableWidth ? 'fit-content' : '100%'}
      height={fitTableHeight ? 'fit-content' : '100%'}
      gap={2}
      padding={2}
      {...gridProps}
    >
      {/* Top Controls - Stacked vertically for mobile */}
      <Stack gap={2}>
        {/* First row: View, Status, Actions */}
        <Flex justifyContent={'space-between'} alignItems={'center'} gap={2}>
          <Flex gap={1} alignItems={'center'}>
            {showView && <ViewDialog icon={<MdOutlineViewColumn />} />}
            {loading && <Spinner size={'sm'} />}
            {hasError && (
              <Tooltip content={hasErrorText}>
                <Icon as={BsExclamationCircleFill} color={'red.400'} />
              </Tooltip>
            )}
          </Flex>
          <Flex gap={1} alignItems={'center'}>
            {showGlobalFilter && <GlobalFilter />}
            {showFilter && <FilterDialog />}
            {showReload && <ReloadButton />}
            {extraItems}
          </Flex>
        </Flex>

        {/* Filter Tags Options - Full width on mobile */}
        {filterTagsOptions.length > 0 && (
          <Stack gap={2}>
            {filterTagsOptions.map((option) => {
              const { column, options } = option;
              const tableColumn = table.getColumn(column);
              return (
                <Flex key={column} flexFlow={'column'} gap={1} width={'100%'}>
                  {tableColumn?.columnDef.meta?.displayName && (
                    <Text fontSize={'sm'} fontWeight={'medium'}>
                      {tableColumn?.columnDef.meta?.displayName}
                    </Text>
                  )}
                  <TagFilter
                    availableTags={options}
                    selectedTags={
                      (tableColumn?.getFilterValue() as string[]) ?? []
                    }
                    selectOne={true}
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
          </Stack>
        )}

        {/* Filter Tags - Full width on mobile */}
        {showFilterTags && (
          <Box width={'100%'}>
            <TableFilterTags />
          </Box>
        )}
      </Stack>

      {/* Content Area */}
      <Box
        overflow={'auto'}
        width={'100%'}
        bg={{ base: 'colorPalette.50', _dark: 'colorPalette.950' }}
        borderRadius={'md'}
        padding={1}
      >
        {children}
      </Box>

      {/* Bottom Controls - Stacked for mobile */}
      {(showPageSizeControl || showPageCountText || showPagination) && (
        <Stack gap={2} width={'100%'}>
          {/* Page Size and Count - Horizontal on mobile */}
          {(showPageSizeControl || showPageCountText) && (
            <Flex
              justifyContent={'space-between'}
              alignItems={'center'}
              gap={2}
              flexWrap={'wrap'}
            >
              {showPageSizeControl && <PageSizeControl />}
              {showPageCountText && <RowCountText />}
            </Flex>
          )}

          {/* Pagination - Centered on mobile */}
          {showPagination && (
            <Flex justifyContent={'center'} width={'100%'}>
              <Pagination />
            </Flex>
          )}
        </Stack>
      )}
    </Grid>
  );
};
