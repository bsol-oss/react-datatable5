import { Flex } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useDataTableContext } from '../context/useDataTableContext';
import { ColumnFilterMenu } from './ColumnFilterMenu';

// Generate a color based on column id for visual distinction
const getColorForColumn = (id: string): string => {
  const colors = [
    'blue',
    'green',
    'purple',
    'orange',
    'pink',
    'cyan',
    'teal',
    'red',
  ];
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = id.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
};

export interface TableFilterTagsProps {
  filterTagsOptions?: {
    column: string;
    options: {
      label: string;
      value: string;
    }[];
  }[];
}

export const TableFilterTags = ({
  filterTagsOptions = [],
}: TableFilterTagsProps = {}) => {
  const { table, tableLabel } = useDataTableContext();

  // Get columns from filterTagsOptions
  const columnsWithFilters = useMemo(() => {
    if (filterTagsOptions.length === 0) {
      return [];
    }

    return filterTagsOptions
      .map((option) => {
        const column = table.getColumn(option.column);
        if (!column || !column.getCanFilter()) {
          return null;
        }

        const meta = column.columnDef.meta;
        const displayName = meta?.displayName ?? column.id;
        const filterVariant = meta?.filterVariant;

        if (!column) {
          return null;
        }

        return {
          columnId: option.column,
          displayName,
          filterOptions: option.options,
          filterVariant: (filterVariant === 'tag' ? 'tag' : 'select') as
            | 'select'
            | 'tag',
          colorPalette: getColorForColumn(option.column),
          column,
        };
      })
      .filter(
        (
          col
        ): col is {
          columnId: string;
          displayName: string;
          filterOptions: { label: string; value: string }[];
          filterVariant: 'select' | 'tag';
          colorPalette: string;
          column: NonNullable<ReturnType<typeof table.getColumn>>;
        } => col !== null && col.column !== null && col.column !== undefined
      );
  }, [table, filterTagsOptions]);

  if (columnsWithFilters.length === 0) {
    return null;
  }

  return (
    <Flex gap={2} flexWrap="wrap">
      {columnsWithFilters.map((column) => {
        const filterValue = column.column.getFilterValue() as
          | string
          | string[]
          | undefined;
        return (
          <ColumnFilterMenu
            key={column.columnId}
            displayName={column.displayName}
            filterOptions={column.filterOptions}
            filterVariant={column.filterVariant}
            colorPalette={column.colorPalette}
            value={filterValue}
            onChange={(value) => column.column.setFilterValue(value)}
            labels={{
              filterByLabel: tableLabel.filterByLabel,
              filterLabelsPlaceholder: tableLabel.filterLabelsPlaceholder,
              noFiltersMatchText: tableLabel.noFiltersMatchText,
            }}
          />
        );
      })}
    </Flex>
  );
};
