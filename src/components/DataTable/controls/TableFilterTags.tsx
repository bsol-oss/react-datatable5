import { MenuContent, MenuRoot, MenuTrigger } from '@/components/ui/menu';
import { Checkbox } from '@/components/ui/checkbox';
import { InputGroup } from '@/components/ui/input-group';
import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Icon,
  Input,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useMemo, useState, useEffect, useRef } from 'react';
import { useDebounce } from '@uidotdev/usehooks';
import { MdFilterList, MdSearch } from 'react-icons/md';
import { useDataTableContext } from '../context/useDataTableContext';

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

interface ColumnFilterMenuProps {
  columnId: string;
  displayName: string;
  filterOptions: { label: string; value: string }[];
  filterVariant?: 'select' | 'tag';
  colorPalette: string;
}

const ColumnFilterMenu = ({
  columnId,
  displayName,
  filterOptions,
  filterVariant,
  colorPalette,
}: ColumnFilterMenuProps) => {
  const { table, tableLabel } = useDataTableContext();
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const [isOpen, setIsOpen] = useState(false);
  const [pendingFilterValue, setPendingFilterValue] = useState<
    string[] | string | undefined
  >(undefined);
  const debouncedFilterValue = useDebounce(pendingFilterValue, 300);
  const lastAppliedValueRef = useRef<string>('__INITIAL__');

  const column = table.getColumn(columnId);
  const currentFilterValue = column?.getFilterValue();
  const isArrayFilter = filterVariant === 'tag';

  // Apply debounced filter value to column
  useEffect(() => {
    const currentKey = JSON.stringify(debouncedFilterValue);
    // Only apply if the value has changed from what we last applied
    if (currentKey !== lastAppliedValueRef.current) {
      column?.setFilterValue(debouncedFilterValue);
      lastAppliedValueRef.current = currentKey;
    }
  }, [debouncedFilterValue, column]);

  // Debounced filter update function
  const debouncedSetFilterValue = (value: string[] | string | undefined) => {
    setPendingFilterValue(value);
  };

  // Get active count for this column
  const activeCount = useMemo(() => {
    if (!currentFilterValue) return 0;
    if (isArrayFilter) {
      return (currentFilterValue as string[]).length;
    }
    return 1;
  }, [currentFilterValue, isArrayFilter]);

  // Filter options based on debounced search term
  const filteredOptions = useMemo(() => {
    if (!debouncedSearchTerm.trim()) {
      return filterOptions;
    }
    const searchLower = debouncedSearchTerm.toLowerCase();
    return filterOptions.filter((option) =>
      option.label.toLowerCase().includes(searchLower)
    );
  }, [filterOptions, debouncedSearchTerm]);

  if (!column) return null;

  return (
    <MenuRoot open={isOpen} onOpenChange={(details) => setIsOpen(details.open)}>
      <MenuTrigger asChild>
        <Button variant="outline" size="sm" gap={2}>
          <Icon as={MdFilterList} />
          <Text>
            {displayName} {activeCount > 0 && `(${activeCount})`}
          </Text>
        </Button>
      </MenuTrigger>
      <MenuContent maxW="20rem" minW="18rem">
        <VStack align="stretch" gap={2} p={2}>
          {/* Header */}
          <Heading size="sm" px={2}>
            {tableLabel.filterByLabel} {displayName}
          </Heading>

          {/* Search Input */}
          <InputGroup startElement={<Icon as={MdSearch} />}>
            <Input
              placeholder={tableLabel.filterLabelsPlaceholder}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </InputGroup>

          {/* Filter Options List */}
          <Box
            maxH="20rem"
            overflowY="auto"
            css={{
              '&::-webkit-scrollbar': {
                width: '8px',
              },
              '&::-webkit-scrollbar-track': {
                background: 'transparent',
              },
              '&::-webkit-scrollbar-thumb': {
                background: 'var(--chakra-colors-border-emphasized)',
                borderRadius: '4px',
              },
              '&::-webkit-scrollbar-thumb:hover': {
                background: 'var(--chakra-colors-border-subtle)',
              },
            }}
          >
            <VStack align="stretch" gap={1}>
              {filteredOptions.length === 0 ? (
                <Text px={2} py={4} color="fg.muted" textAlign="center">
                  {tableLabel.noFiltersMatchText}
                </Text>
              ) : (
                filteredOptions.map((option) => {
                  const isActive = isArrayFilter
                    ? (currentFilterValue as string[])?.includes(
                        option.value
                      ) ?? false
                    : currentFilterValue === option.value;

                  const handleToggle = () => {
                    if (isArrayFilter) {
                      // Handle array-based filters (tag variant)
                      const currentArray =
                        (currentFilterValue as string[]) ?? [];
                      if (isActive) {
                        // Remove from filter
                        const newArray = currentArray.filter(
                          (v) => v !== option.value
                        );
                        if (newArray.length === 0) {
                          debouncedSetFilterValue(undefined);
                        } else {
                          debouncedSetFilterValue(newArray);
                        }
                      } else {
                        // Add to filter
                        if (!currentArray.includes(option.value)) {
                          debouncedSetFilterValue([
                            ...currentArray,
                            option.value,
                          ]);
                        }
                      }
                    } else {
                      // Handle single value filters (select variant)
                      if (isActive) {
                        debouncedSetFilterValue(undefined);
                      } else {
                        debouncedSetFilterValue(option.value);
                      }
                    }
                  };

                  return (
                    <Box
                      key={option.value}
                      px={2}
                      py={1.5}
                      borderRadius="md"
                      cursor="pointer"
                      _hover={{
                        bg: 'bg.subtle',
                      }}
                      onClick={handleToggle}
                    >
                      <HStack gap={2} align="start">
                        <Box
                          onClick={(e) => {
                            e.stopPropagation();
                          }}
                        >
                          <Checkbox
                            checked={isActive}
                            colorPalette={colorPalette}
                            onCheckedChange={(details) => {
                              if (isArrayFilter) {
                                // Handle array-based filters (tag variant)
                                const currentArray =
                                  (currentFilterValue as string[]) ?? [];
                                if (details.checked) {
                                  // Add to filter
                                  if (!currentArray.includes(option.value)) {
                                    debouncedSetFilterValue([
                                      ...currentArray,
                                      option.value,
                                    ]);
                                  }
                                } else {
                                  // Remove from filter
                                  const newArray = currentArray.filter(
                                    (v) => v !== option.value
                                  );
                                  if (newArray.length === 0) {
                                    debouncedSetFilterValue(undefined);
                                  } else {
                                    debouncedSetFilterValue(newArray);
                                  }
                                }
                              } else {
                                // Handle single value filters (select variant)
                                if (details.checked) {
                                  debouncedSetFilterValue(option.value);
                                } else {
                                  debouncedSetFilterValue(undefined);
                                }
                              }
                            }}
                          />
                        </Box>
                        <Box flex={1} minW={0}>
                          <HStack gap={2} align="center">
                            <Box
                              w={3}
                              h={3}
                              borderRadius="full"
                              bg={`${colorPalette}.500`}
                              flexShrink={0}
                            />
                            <Text fontSize="sm" fontWeight="medium" truncate>
                              {option.label}
                            </Text>
                          </HStack>
                        </Box>
                      </HStack>
                    </Box>
                  );
                })
              )}
            </VStack>
          </Box>
        </VStack>
      </MenuContent>
    </MenuRoot>
  );
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
  const { table } = useDataTableContext();

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

        return {
          columnId: option.column,
          displayName,
          filterOptions: option.options,
          filterVariant: filterVariant === 'tag' ? 'tag' : 'select',
          colorPalette: getColorForColumn(option.column),
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
        } => col !== null
      );
  }, [table, filterTagsOptions]);

  if (columnsWithFilters.length === 0) {
    return null;
  }

  return (
    <Flex gap={2} flexWrap="wrap">
      {columnsWithFilters.map((column) => (
        <ColumnFilterMenu
          key={column.columnId}
          columnId={column.columnId}
          displayName={column.displayName}
          filterOptions={column.filterOptions}
          filterVariant={column.filterVariant}
          colorPalette={column.colorPalette}
        />
      ))}
    </Flex>
  );
};
