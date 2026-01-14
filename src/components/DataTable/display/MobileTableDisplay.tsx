import { Box, Card, Flex, Stack, Text } from '@chakra-ui/react';
import { flexRender } from '@tanstack/react-table';
import { Checkbox } from '../../ui/checkbox';
import { useDataTableContext } from '../context/useDataTableContext';
import {
  isRowSelected,
  canRowSelect,
  createRowToggleHandler,
} from '../utils/selectors';

export interface MobileTableDisplayProps {
  showSelector?: boolean;
  isLoading?: boolean;
}

export const MobileTableDisplay = ({
  showSelector = false,
  isLoading = false,
}: MobileTableDisplayProps) => {
  const { table, rowSelection, setRowSelection } = useDataTableContext();

  if (isLoading) {
    return <MobileTableSkeleton showSelector={showSelector} />;
  }

  return (
    <Stack gap={4} padding={2}>
      {table.getRowModel().rows.map((row) => {
        return (
          <Card.Root key={`mobile-table-card-${row.id}`} width="100%">
            <Card.Body padding={4}>
              {showSelector && (
                <Flex marginBottom={3}>
                  <Checkbox
                    {...{
                      checked: isRowSelected(row.id, rowSelection),
                      disabled: !canRowSelect(row),
                      onCheckedChange: createRowToggleHandler(
                        row,
                        rowSelection,
                        setRowSelection
                      ),
                    }}
                  />
                </Flex>
              )}
              <Stack gap={3}>
                {row.getVisibleCells().map((cell) => {
                  const displayName =
                    cell.column.columnDef.meta?.displayName ?? cell.column.id;
                  return (
                    <Box key={`mobile-table-cell-${cell.id}`}>
                      <Text
                        fontSize="sm"
                        fontWeight="bold"
                        color={{ base: 'gray.600', _dark: 'gray.400' }}
                        marginBottom={1}
                      >
                        {displayName}
                      </Text>
                      <Box
                        color={{ base: 'gray.900', _dark: 'gray.100' }}
                        fontSize="sm"
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </Box>
                    </Box>
                  );
                })}
              </Stack>
            </Card.Body>
          </Card.Root>
        );
      })}
    </Stack>
  );
};

const MobileTableSkeleton = ({
  showSelector = false,
}: {
  showSelector?: boolean;
}) => {
  const { table } = useDataTableContext();
  const pageSize = table.getState().pagination.pageSize;
  const visibleColumns = table.getVisibleLeafColumns();

  return (
    <Stack gap={4} padding={2}>
      {Array.from({ length: pageSize }).map((_, rowIndex) => {
        return (
          <Card.Root key={`mobile-skeleton-${rowIndex}`} width="100%">
            <Card.Body padding={4}>
              {showSelector && (
                <Flex marginBottom={3}>
                  <Box
                    width="20px"
                    height="20px"
                    bg={{ base: 'gray.200', _dark: 'gray.700' }}
                    borderRadius="md"
                  />
                </Flex>
              )}
              <Stack gap={3}>
                {visibleColumns.map((column) => {
                  return (
                    <Box key={`mobile-skeleton-cell-${column.id}`}>
                      <Box
                        width="40%"
                        height="16px"
                        bg={{ base: 'gray.200', _dark: 'gray.700' }}
                        borderRadius="sm"
                        marginBottom={2}
                      />
                      <Box
                        width="80%"
                        height="20px"
                        bg={{ base: 'gray.200', _dark: 'gray.700' }}
                        borderRadius="sm"
                      />
                    </Box>
                  );
                })}
              </Stack>
            </Card.Body>
          </Card.Root>
        );
      })}
    </Stack>
  );
};
