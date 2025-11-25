import { Checkbox } from '@/components/ui/checkbox';
import { Box, Card, CardBodyProps, Grid, Text } from '@chakra-ui/react';
import { flexRender, Row } from '@tanstack/react-table';
import { ReactNode } from 'react';
import { useDataTableContext } from '../context/useDataTableContext';
import {
  isRowSelected,
  canRowSelect,
  createRowToggleHandler,
} from '../utils/selectors';

export interface TableCardsProps<TData> {
  isSelectable?: boolean;
  showDisplayNameOnly?: boolean;
  renderTitle?: (row: Row<TData>) => ReactNode | undefined;
  cardBodyProps?: CardBodyProps;
}

export const DefaultCardTitle = () => {
  return <></>;
};

export const TableCards = <TData,>({
  isSelectable = false,
  showDisplayNameOnly = false,
  renderTitle = DefaultCardTitle,
  cardBodyProps = {},
}: TableCardsProps<TData>) => {
  const { table, rowSelection, setRowSelection } = useDataTableContext();

  return (
    <>
      {table.getRowModel().rows.map((row) => {
        return (
          <Card.Root key={`chakra-table-card-${row.id}`} flex={'1 0 20rem'}>
            <Card.Body
              display={'flex'}
              flexFlow={'column'}
              gap={'0.5rem'}
              {...cardBodyProps}
            >
              {isSelectable && (
                <Checkbox
                  {...{
                    checked: isRowSelected(row.id, rowSelection),
                    disabled: !canRowSelect(row),
                    // indeterminate: row.getIsSomeSelected(),
                    onChange: createRowToggleHandler(
                      row,
                      rowSelection,
                      setRowSelection
                    ),
                  }}
                ></Checkbox>
              )}
              {renderTitle(row as Row<TData>)}
              <Grid templateColumns={'auto 1fr'} gap={'1rem'}>
                {row.getVisibleCells().map((cell) => {
                  return (
                    <Box
                      key={`chakra-table-cardcell-${cell.id}`}
                      display="contents"
                    >
                      <Box>
                        {showDisplayNameOnly && (
                          <Text fontWeight={'bold'}>
                            {cell.column.columnDef.meta?.displayName ??
                              cell.column.id}
                          </Text>
                        )}
                        {!showDisplayNameOnly && (
                          <>
                            {flexRender(
                              cell.column.columnDef.header,
                              // @ts-expect-error Assuming the CellContext interface is the same as HeaderContext
                              cell.getContext()
                            )}
                          </>
                        )}
                      </Box>
                      <Box justifySelf={'end'}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </Box>
                    </Box>
                  );
                })}
              </Grid>
            </Card.Body>
          </Card.Root>
        );
      })}
    </>
  );
};
