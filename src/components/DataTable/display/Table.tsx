import {
  Box,
  Table as ChakraTable,
  List,
  TableRootProps,
} from '@chakra-ui/react';
import { ReactNode, useRef } from 'react';
import { HiColorSwatch } from 'react-icons/hi';
import { EmptyState } from '../../ui/empty-state';
import { useDataTableContext } from '../context/useDataTableContext';
import { useResponsiveColumnVisibility } from '../hooks/useResponsiveColumnVisibility';

export interface TableProps extends TableRootProps {
  showLoading?: boolean;
  loadingComponent?: ReactNode;
  emptyComponent?: ReactNode;
  canResize?: boolean;
  showSelector?: boolean;
  children: ReactNode;
}

const EmptyResult = (
  <EmptyState
    icon={<HiColorSwatch />}
    title="No results found"
    description="Try adjusting your search"
  >
    <List.Root variant="marker">
      <List.Item>Try removing filters</List.Item>
      <List.Item>Try different keywords</List.Item>
    </List.Root>
  </EmptyState>
);

export const Table = ({
  children,
  emptyComponent = EmptyResult,
  canResize = true,
  showLoading = false,
  showSelector = false,
  ...props
}: TableProps) => {
  const { table } = useDataTableContext();
  const containerRef = useRef<HTMLDivElement>(null);

  // Enable responsive column hiding when canResize is false
  useResponsiveColumnVisibility({
    containerRef,
    enabled: !canResize,
    showSelector,
  });

  // Skip empty check when loading to allow skeleton to render
  if (!showLoading && table.getRowModel().rows.length <= 0) {
    return emptyComponent;
  }

  return (
    <Box ref={containerRef} width="100%" overflow="auto">
      <ChakraTable.Root
        stickyHeader
        variant={'outline'}
        width={canResize ? table.getCenterTotalSize() : undefined}
        display={'grid'}
        alignContent={'start'}
        {...{ bg: { base: 'colorPalette.50', _dark: 'colorPalette.950' } }}
        {...props}
      >
        {children}
      </ChakraTable.Root>
    </Box>
  );
};
