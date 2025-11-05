import { Table, TableRowProps, Skeleton } from '@chakra-ui/react';
import { useState } from 'react';
import { useDataTableContext } from '../context/useDataTableContext';

export interface TableBodySkeletonProps {
  showSelector?: boolean;
  canResize?: boolean;
}

export const TableBodySkeleton = ({
  showSelector = false,
  canResize = true,
}: TableBodySkeletonProps) => {
  'use no memo';
  const { table } = useDataTableContext();
  const SELECTION_BOX_WIDTH = 20;
  const [hoveredRow, setHoveredRow] = useState<number>(-1);

  const handleRowHover = (index: number) => {
    setHoveredRow(index);
  };

  const getTdProps = (
    column: ReturnType<typeof table.getVisibleLeafColumns>[0]
  ) => {
    const tdProps = column.getIsPinned()
      ? {
          left: showSelector
            ? `${column.getStart('left') + SELECTION_BOX_WIDTH + table.getDensityValue() * 2}px`
            : `${column.getStart('left')}px`,
          position: 'relative' as const,
        }
      : {};
    return tdProps;
  };

  const getTrProps = ({
    hoveredRow,
    index,
  }: {
    hoveredRow: number;
    index: number;
  }): TableRowProps => {
    if (hoveredRow === -1) {
      return {};
    }
    if (hoveredRow === index) {
      return {
        opacity: '1',
      };
    }

    return {
      opacity: '0.8',
    };
  };

  // Get the number of skeleton rows based on current pageSize
  const pageSize = table.getState().pagination.pageSize;
  const visibleColumns = table.getVisibleLeafColumns();

  return (
    <Table.Body>
      {Array.from({ length: pageSize }).map((_, rowIndex) => {
        return (
          <Table.Row
            display={'flex'}
            key={`chakra-table-skeleton-row-${rowIndex}`}
            zIndex={1}
            onMouseEnter={() => handleRowHover(rowIndex)}
            onMouseLeave={() => handleRowHover(-1)}
            {...getTrProps({ hoveredRow, index: rowIndex })}
          >
            {showSelector && <TableRowSelectorSkeleton />}
            {visibleColumns.map((column, colIndex) => {
              return (
                <Table.Cell
                  padding={`${table.getDensityValue()}px`}
                  key={`chakra-table-skeleton-cell-${rowIndex}-${colIndex}`}
                  // styling resize and pinning start
                  flex={`${canResize ? '0' : '1'} 0 ${column.getSize()}px`}
                  // this is to avoid the cell from being too wide
                  minWidth={`0`}
                  {...{
                    color: {
                      base: 'colorPalette.900',
                      _dark: 'colorPalette.100',
                    },
                    bg: { base: 'colorPalette.50', _dark: 'colorPalette.950' },
                  }}
                  {...getTdProps(column)}
                >
                  <Skeleton height="20px" width="80%" />
                </Table.Cell>
              );
            })}
          </Table.Row>
        );
      })}
    </Table.Body>
  );
};

const TableRowSelectorSkeleton = () => {
  const { table } = useDataTableContext();
  const SELECTION_BOX_WIDTH = 20;

  return (
    <Table.Cell
      padding={`${table.getDensityValue()}px`}
      display={'grid'}
      {...{
        color: {
          base: 'colorPalette.900',
          _dark: 'colorPalette.100',
        },
        bg: { base: 'colorPalette.50', _dark: 'colorPalette.950' },
      }}
      justifyItems={'center'}
      alignItems={'center'}
    >
      <Skeleton
        width={`${SELECTION_BOX_WIDTH}px`}
        height={`${SELECTION_BOX_WIDTH}px`}
      />
    </Table.Cell>
  );
};
