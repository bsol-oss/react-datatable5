import { Box, BoxProps, Grid } from '@chakra-ui/react';
import { useDataTableContext } from '../context/useDataTableContext';
import { RecordDisplay } from './RecordDisplay';
import { ReactNode } from 'react';
import { flexRender } from '@tanstack/react-table';

export interface TableDataDisplayProps {
  colorPalette?: string;
  emptyComponent?: ReactNode;
}

export const TableDataDisplay = ({
  colorPalette,
  emptyComponent,
}: TableDataDisplayProps) => {
  const { columns, data } = useDataTableContext();
  const columnsMap = Object.fromEntries(
    columns.map((def) => {
      const { accessorKey, id } = def;
      if (accessorKey) {
        return [accessorKey, def];
      }
      return [id, def];
    })
  );
  const columnHeaders = Object.keys(columnsMap);
  const totalWidths = columns
    .map(({ size }) => {
      if (!!size === false) {
        return 0;
      }
      if (typeof size === 'number') {
        return size;
      }
      return 0;
    })
    .reduce((previous, current) => previous + current, 0);
  const columnWidths = columns
    .map(({ size }) => {
      if (!!size === false) {
        return '1fr';
      }

      return `minmax(${size}px, ${(size / totalWidths) * 100}%)`;
    })
    .join(' ');

  const cellProps: BoxProps = {
    flex: '1 0 0%',
    overflow: 'auto',
    paddingX: '2',
    py: '1',
    color: { base: 'colorPalette.900', _dark: 'colorPalette.100' },
    bgColor: { base: 'colorPalette.50', _dark: 'colorPalette.950' },
    borderBottomColor: { base: 'colorPalette.200', _dark: 'colorPalette.800' },
    borderBottomWidth: '1px',
    ...{ colorPalette },
  };
  if (data.length <= 0) {
    return <>{emptyComponent}</>;
  }
  return (
    <Grid
      templateColumns={`${columnWidths}`}
      overflow={'auto'}
      borderWidth={'1px'}
      color={{ base: 'colorPalette.900', _dark: 'colorPalette.100' }}
      borderColor={{ base: 'colorPalette.200', _dark: 'colorPalette.800' }}
      {...{ colorPalette }}
    >
      <Grid
        templateColumns={`${columnWidths}`}
        column={`1/span ${columns.length}`}
        bg={{ base: 'colorPalette.200', _dark: 'colorPalette.800' }}
        {...{ colorPalette }}
      >
        {columnHeaders.map((header) => {
          const columnDef = columnsMap[header];
          return (
            <Box
              key={`chakra-table-header-${header}`}
              flex={'1 0 0%'}
              paddingX={'2'}
              py={'1'}
              overflow={'auto'}
              textOverflow={'ellipsis'}
            >
              {columnDef?.meta?.displayName ?? header}
            </Box>
          );
        })}
      </Grid>

      {data.map((record, recordIndex) => {
        return (
          <Box key={`chakra-table-record-${recordIndex}`} display="contents">
            {columnHeaders.map((header) => {
              const { cell } = columnsMap[header];
              const value = record[header];
              if (!!record === false) {
                return (
                  <Box
                    key={`chakra-table-cell-${recordIndex}-${header}`}
                    {...cellProps}
                  >
                    {/* Placeholder for empty record */}
                  </Box>
                );
              }
              if (cell) {
                return (
                  <Box
                    key={`chakra-table-cell-${recordIndex}-${header}`}
                    {...cellProps}
                  >
                    {cell({ row: { original: record } })}
                  </Box>
                );
              }
              if (typeof value === 'object') {
                return (
                  <Box
                    key={`chakra-table-cell-${recordIndex}-${header}`}
                    {...cellProps}
                  >
                    <RecordDisplay object={value} />
                  </Box>
                );
              }
              return (
                <Box
                  key={`chakra-table-cell-${recordIndex}-${header}`}
                  {...cellProps}
                >
                  {value}
                </Box>
              );
            })}
          </Box>
        );
      })}
    </Grid>
  );
};
