import { CheckboxCard } from '@/components/ui/checkbox-card';
import { Flex } from '@chakra-ui/react';
import { useDataTableContext } from '../context/useDataTableContext';

export const TableFilterTags = () => {
  const { table } = useDataTableContext();

  return (
    <Flex gap={'0.5rem'} flexFlow={'wrap'}>
      {table.getState().columnFilters.map(({ id, value }) => {
        const column = table.getColumn(id);
        const displayName = column?.columnDef.meta?.displayName ?? id;

        // Format the value for display
        const formatValue = (val: unknown): string => {
          if (Array.isArray(val)) {
            return val.join(', ');
          }
          if (val === null || val === undefined) {
            return '';
          }
          return String(val);
        };

        const displayValue = formatValue(value);
        const label = displayValue
          ? `${displayName}: ${displayValue}`
          : displayName;

        return (
          <CheckboxCard
            key={`${id}-${JSON.stringify(value)}`}
            checked
            label={label}
            size="sm"
            variant="outline"
            colorPalette="blue"
            onCheckedChange={(details) => {
              if (!details.checked) {
                table.setColumnFilters(
                  table.getState().columnFilters.filter((filter) => {
                    return (
                      filter.id !== id ||
                      JSON.stringify(filter.value) !== JSON.stringify(value)
                    );
                  })
                );
              }
            }}
          />
        );
      })}
    </Flex>
  );
};
