import { MenuContent, MenuRoot, MenuTrigger } from '@/components/ui/menu';
import { Checkbox } from '@/components/ui/checkbox';
import { InputGroup } from '@/components/ui/input-group';
import {
  Box,
  Button,
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

export interface ColumnFilterMenuLabels {
  filterByLabel?: string;
  filterLabelsPlaceholder?: string;
  noFiltersMatchText?: string;
}

export interface ColumnFilterMenuProps {
  displayName: string;
  filterOptions: { label: string; value: string }[];
  filterVariant?: 'select' | 'tag';
  colorPalette: string;
  value?: string[] | string | undefined;
  onChange?: (value: string[] | string | undefined) => void;
  labels?: ColumnFilterMenuLabels;
}

export const ColumnFilterMenu = ({
  displayName,
  filterOptions,
  filterVariant,
  colorPalette,
  value: controlledValue,
  onChange,
  labels,
}: ColumnFilterMenuProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const [isOpen, setIsOpen] = useState(false);
  const [internalValue, setInternalValue] = useState<
    string[] | string | undefined
  >(undefined);
  const [pendingFilterValue, setPendingFilterValue] = useState<
    string[] | string | undefined
  >(undefined);
  const debouncedFilterValue = useDebounce(pendingFilterValue, 300);
  const lastAppliedValueRef = useRef<string>('__INITIAL__');

  // Use controlled value if provided, otherwise use internal state
  const currentFilterValue =
    controlledValue !== undefined ? controlledValue : internalValue;
  const isArrayFilter = filterVariant === 'tag';

  // Default labels
  const defaultLabels: Required<ColumnFilterMenuLabels> = {
    filterByLabel: 'Filter by',
    filterLabelsPlaceholder: 'Filter labels',
    noFiltersMatchText: 'No filters match your search',
  };
  const finalLabels = { ...defaultLabels, ...labels };

  // Apply debounced filter value via onChange callback
  useEffect(() => {
    const currentKey = JSON.stringify(debouncedFilterValue);
    // Only apply if the value has changed from what we last applied
    if (currentKey !== lastAppliedValueRef.current) {
      if (onChange) {
        onChange(debouncedFilterValue);
      } else {
        setInternalValue(debouncedFilterValue);
      }
      lastAppliedValueRef.current = currentKey;
    }
  }, [debouncedFilterValue, onChange]);

  // Sync internal value when controlled value changes
  useEffect(() => {
    if (controlledValue !== undefined) {
      setInternalValue(controlledValue);
      setPendingFilterValue(controlledValue);
      lastAppliedValueRef.current = JSON.stringify(controlledValue);
    }
  }, [controlledValue]);

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
            {finalLabels.filterByLabel} {displayName}
          </Heading>

          {/* Search Input */}
          <InputGroup startElement={<Icon as={MdSearch} />}>
            <Input
              placeholder={finalLabels.filterLabelsPlaceholder}
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
                  {finalLabels.noFiltersMatchText}
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
