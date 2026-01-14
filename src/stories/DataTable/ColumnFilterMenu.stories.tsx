import { ColumnFilterMenu } from '@/components/DataTable/controls/ColumnFilterMenu';
import { Provider } from '@/components/ui/provider';
import { Box, Flex, Text, VStack, HStack, Code, Badge } from '@chakra-ui/react';
import type { Meta, StoryObj } from '@storybook/react';
import { data } from '../product_data';
import { useState, useEffect } from 'react';
import axios from 'axios';

const meta: Meta = {
  title: 'react-datatable5/DataTable/ColumnFilterMenu',
  component: ColumnFilterMenu,
  parameters: {
    docs: {
      description: {
        component:
          'ColumnFilterMenu is a reusable filter control component that can be integrated with public filter APIs. It supports both single-select (select variant) and multi-select (tag variant) filtering modes.',
      },
    },
  },
  argTypes: {},
};

type Story = StoryObj;

export default meta;

// Helper to generate color palette based on column ID
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

// Component to display current filter state (simulating API query params)
const FilterStateDisplay = ({
  filters,
}: {
  filters: Array<{ column: string; value: unknown }>;
}) => {
  return (
    <Box
      p={4}
      bg="bg.subtle"
      borderRadius="md"
      borderWidth="1px"
      borderColor="border.emphasized"
    >
      <Text fontSize="sm" fontWeight="bold" mb={2}>
        Current Filter State (API Query Params):
      </Text>
      <Code
        display="block"
        p={2}
        borderRadius="sm"
        bg="bg.surface"
        fontSize="xs"
        whiteSpace="pre-wrap"
      >
        {JSON.stringify(
          {
            filters: filters.map((f) => ({
              column: f.column,
              value: f.value,
            })),
            // Simulated API format
            where: filters.reduce(
              (acc, filter) => {
                acc[filter.column] = filter.value;
                return acc;
              },
              {} as Record<string, unknown>
            ),
          },
          null,
          2
        )}
      </Code>
    </Box>
  );
};

// Component to display filtered results count
const FilteredResultsCount = ({
  filtered,
  total,
}: {
  filtered: number;
  total: number;
}) => {
  return (
    <HStack gap={2}>
      <Badge colorPalette="blue">{filtered} filtered</Badge>
      <Text fontSize="sm" color="fg.muted">
        of {total} total
      </Text>
    </HStack>
  );
};

export const SelectVariant: Story = {
  name: 'Select Variant (Single Selection) - Standalone',
  args: {},
  render: () => {
    const [brandFilter, setBrandFilter] = useState<string | undefined>(
      undefined
    );

    const handleBrandChange = (value: string | string[] | undefined) => {
      setBrandFilter(value as string | undefined);
    };

    const brandOptions = [
      { label: 'Apple', value: 'Apple' },
      { label: 'Samsung', value: 'Samsung' },
      { label: 'OPPO', value: 'OPPO' },
      { label: 'Huawei', value: 'Huawei' },
      { label: 'Microsoft Surface', value: 'Microsoft Surface' },
      { label: 'Infinix', value: 'Infinix' },
      { label: 'HP Pavilion', value: 'HP Pavilion' },
    ];

    // Filter data based on selected brand
    const filteredData = brandFilter
      ? data.filter((item) => item.brand === brandFilter)
      : data;

    return (
      <Provider>
        <Box p={4}>
          <VStack align="stretch" gap={4}>
            <Box>
              <Text fontSize="lg" fontWeight="bold" mb={2}>
                Select Variant - Single Selection Filter (Standalone)
              </Text>
              <Text fontSize="sm" color="fg.muted" mb={4}>
                The select variant allows users to choose a single filter value.
                Perfect for mutually exclusive filters like brand selection.
                This example shows standalone usage without DataTable context.
              </Text>
            </Box>

            <VStack align="stretch" gap={4}>
              <Box>
                <Text fontSize="sm" fontWeight="medium" mb={2}>
                  Filter Control:
                </Text>
                <ColumnFilterMenu
                  displayName="Brand"
                  filterOptions={brandOptions}
                  filterVariant="select"
                  colorPalette={getColorForColumn('brand')}
                  value={brandFilter}
                  onChange={handleBrandChange}
                />
              </Box>

              <FilteredResultsCount
                filtered={filteredData.length}
                total={data.length}
              />
              <FilterStateDisplay
                filters={
                  brandFilter ? [{ column: 'brand', value: brandFilter }] : []
                }
              />
            </VStack>
          </VStack>
        </Box>
      </Provider>
    );
  },
};

export const TagVariant: Story = {
  name: 'Tag Variant (Multi-Selection) - Standalone',
  args: {},
  render: () => {
    const [categoryFilter, setCategoryFilter] = useState<string[] | undefined>(
      undefined
    );

    const handleCategoryChange = (value: string | string[] | undefined) => {
      setCategoryFilter(value as string[] | undefined);
    };

    const categoryOptions = [
      { label: 'Smartphones', value: 'smartphones' },
      { label: 'Laptops', value: 'laptops' },
      { label: 'Fragrances', value: 'fragrances' },
      { label: 'Skincare', value: 'skincare' },
      { label: 'Groceries', value: 'groceries' },
      { label: 'Home Decoration', value: 'home-decoration' },
      { label: 'Furniture', value: 'furniture' },
      { label: 'Tops', value: 'tops' },
      { label: 'Womens Dresses', value: 'womens-dresses' },
      { label: 'Womens Shoes', value: 'womens-shoes' },
    ];

    // Filter data based on selected categories
    const filteredData = categoryFilter
      ? data.filter((item) => categoryFilter.includes(item.category))
      : data;

    return (
      <Provider>
        <Box p={4}>
          <VStack align="stretch" gap={4}>
            <Box>
              <Text fontSize="lg" fontWeight="bold" mb={2}>
                Tag Variant - Multi-Selection Filter (Standalone)
              </Text>
              <Text fontSize="sm" color="fg.muted" mb={4}>
                The tag variant allows users to select multiple filter values
                simultaneously. Ideal for categories, tags, or any scenario
                where multiple selections are needed. This example shows
                standalone usage without DataTable context.
              </Text>
            </Box>

            <VStack align="stretch" gap={4}>
              <Box>
                <Text fontSize="sm" fontWeight="medium" mb={2}>
                  Filter Control:
                </Text>
                <ColumnFilterMenu
                  displayName="Category"
                  filterOptions={categoryOptions}
                  filterVariant="tag"
                  colorPalette={getColorForColumn('category')}
                  value={categoryFilter}
                  onChange={handleCategoryChange}
                />
              </Box>

              <FilteredResultsCount
                filtered={filteredData.length}
                total={data.length}
              />
              <FilterStateDisplay
                filters={
                  categoryFilter
                    ? [{ column: 'category', value: categoryFilter }]
                    : []
                }
              />
            </VStack>
          </VStack>
        </Box>
      </Provider>
    );
  },
};

export const WithSearch: Story = {
  name: 'With Search Functionality - Standalone',
  args: {},
  render: () => {
    const [brandFilter, setBrandFilter] = useState<string[] | undefined>(
      undefined
    );

    const handleBrandChange = (value: string | string[] | undefined) => {
      setBrandFilter(value as string[] | undefined);
    };

    // Large list to demonstrate search
    const allBrands = [
      { label: 'Apple', value: 'Apple' },
      { label: 'Samsung', value: 'Samsung' },
      { label: 'OPPO', value: 'OPPO' },
      { label: 'Huawei', value: 'Huawei' },
      { label: 'Microsoft Surface', value: 'Microsoft Surface' },
      { label: 'Infinix', value: 'Infinix' },
      { label: 'HP Pavilion', value: 'HP Pavilion' },
      {
        label: 'Impression of Acqua Di Gio',
        value: 'Impression of Acqua Di Gio',
      },
      { label: 'Royal_Mirage', value: 'Royal_Mirage' },
      { label: 'Fog Scent Xpressio', value: 'Fog Scent Xpressio' },
      { label: 'Al Munakh', value: 'Al Munakh' },
      { label: 'Lord - Al-Rehab', value: 'Lord - Al-Rehab' },
      { label: "L'Oreal Paris", value: "L'Oreal Paris" },
      { label: 'Hemani Tea', value: 'Hemani Tea' },
      { label: 'Dermive', value: 'Dermive' },
      { label: 'ROREC White Rice', value: 'ROREC White Rice' },
      { label: 'Fair & Clear', value: 'Fair & Clear' },
      { label: 'Saaf & Khaas', value: 'Saaf & Khaas' },
      { label: 'Bake Parlor Big', value: 'Bake Parlor Big' },
      { label: 'Baking Food Items', value: 'Baking Food Items' },
    ];

    // Filter data based on selected brands
    const filteredData = brandFilter
      ? data.filter((item) => brandFilter.includes(item.brand))
      : data;

    return (
      <Provider>
        <Box p={4}>
          <VStack align="stretch" gap={4}>
            <Box>
              <Text fontSize="lg" fontWeight="bold" mb={2}>
                Search Functionality (Standalone)
              </Text>
              <Text fontSize="sm" color="fg.muted" mb={4}>
                The component includes built-in search functionality with
                debouncing. Type in the search box to filter through large lists
                of options. This example shows standalone usage without
                DataTable context.
              </Text>
            </Box>

            <VStack align="stretch" gap={4}>
              <Box>
                <Text fontSize="sm" fontWeight="medium" mb={2}>
                  Filter Control (with search):
                </Text>
                <ColumnFilterMenu
                  displayName="Brand"
                  filterOptions={allBrands}
                  filterVariant="tag"
                  colorPalette={getColorForColumn('brand')}
                  value={brandFilter}
                  onChange={handleBrandChange}
                />
              </Box>

              <FilteredResultsCount
                filtered={filteredData.length}
                total={data.length}
              />
              <FilterStateDisplay
                filters={
                  brandFilter ? [{ column: 'brand', value: brandFilter }] : []
                }
              />
            </VStack>
          </VStack>
        </Box>
      </Provider>
    );
  },
};

// Simulated API integration component
const ApiIntegrationExample = () => {
  const [brandFilter, setBrandFilter] = useState<string | undefined>(undefined);
  const [categoryFilter, setCategoryFilter] = useState<string[] | undefined>(
    undefined
  );

  const handleBrandChange = (value: string | string[] | undefined) => {
    setBrandFilter(value as string | undefined);
  };

  const handleCategoryChange = (value: string | string[] | undefined) => {
    setCategoryFilter(value as string[] | undefined);
  };
  const [isLoading, setIsLoading] = useState(false);
  const [apiResponse, setApiResponse] = useState<string>('');
  const [apiError, setApiError] = useState<string>('');

  // Real API call when filters change (debounced)
  useEffect(() => {
    const filters: Array<{ column: string; value: unknown }> = [];
    if (brandFilter) filters.push({ column: 'brand', value: brandFilter });
    if (categoryFilter)
      filters.push({ column: 'category', value: categoryFilter });

    // Build query parameters
    const queryParams = filters.reduce(
      (acc, filter) => {
        acc[filter.column] = filter.value;
        return acc;
      },
      {} as Record<string, unknown>
    );

    // Debounce API calls
    const timeoutId = setTimeout(async () => {
      if (Object.keys(queryParams).length === 0) {
        setApiResponse('');
        setApiError('');
        return;
      }

      setIsLoading(true);
      setApiError('');

      try {
        // Example: Using httpbin.org to demonstrate real API call with query params
        // In a real application, replace this with your actual API endpoint
        const response = await axios.get('https://httpbin.org/get', {
          params: {
            ...queryParams,
            // Additional metadata for demonstration
            timestamp: new Date().toISOString(),
          },
        });

        // Filter data locally for demo (in real app, server would handle filtering)
        let filteredData = data;
        if (brandFilter) {
          filteredData = filteredData.filter(
            (item) => item.brand === brandFilter
          );
        }
        if (categoryFilter) {
          filteredData = filteredData.filter((item) =>
            categoryFilter.includes(item.category)
          );
        }

        const apiResponseData = {
          endpoint: '/api/products',
          method: 'GET',
          queryParams: response.data.args, // httpbin returns query params in args
          requestUrl: response.data.url,
          response: {
            data: filteredData,
            count: filteredData.length,
          },
          // Real API response metadata
          status: response.status,
          statusText: response.statusText,
          headers: response.headers,
        };

        setApiResponse(JSON.stringify(apiResponseData, null, 2));
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setApiError(
            `API Error: ${error.message}${error.response ? ` (${error.response.status})` : ''}`
          );
          setApiResponse(
            JSON.stringify(
              {
                error: error.message,
                status: error.response?.status,
                statusText: error.response?.statusText,
                data: error.response?.data,
              },
              null,
              2
            )
          );
        } else {
          setApiError(
            `Error: ${error instanceof Error ? error.message : 'Unknown error'}`
          );
        }
      } finally {
        setIsLoading(false);
      }
    }, 500); // Debounce delay

    return () => clearTimeout(timeoutId);
  }, [brandFilter, categoryFilter]);

  const brandOptions = [
    { label: 'Apple', value: 'Apple' },
    { label: 'Samsung', value: 'Samsung' },
    { label: 'OPPO', value: 'OPPO' },
    { label: 'Huawei', value: 'Huawei' },
  ];

  const categoryOptions = [
    { label: 'Smartphones', value: 'smartphones' },
    { label: 'Laptops', value: 'laptops' },
    { label: 'Fragrances', value: 'fragrances' },
    { label: 'Skincare', value: 'skincare' },
  ];

  // Calculate filtered count
  let filteredData = data;
  if (brandFilter) {
    filteredData = filteredData.filter((item) => item.brand === brandFilter);
  }
  if (categoryFilter) {
    filteredData = filteredData.filter((item) =>
      categoryFilter.includes(item.category)
    );
  }

  const filters: Array<{ column: string; value: unknown }> = [];
  if (brandFilter) filters.push({ column: 'brand', value: brandFilter });
  if (categoryFilter)
    filters.push({ column: 'category', value: categoryFilter });

  return (
    <VStack align="stretch" gap={4}>
      <Box>
        <Text fontSize="sm" fontWeight="medium" mb={2}>
          Filter Controls:
        </Text>
        <Flex gap={2} flexWrap="wrap">
          <ColumnFilterMenu
            displayName="Brand"
            filterOptions={brandOptions}
            filterVariant="select"
            colorPalette={getColorForColumn('brand')}
            value={brandFilter}
            onChange={handleBrandChange}
          />
          <ColumnFilterMenu
            displayName="Category"
            filterOptions={categoryOptions}
            filterVariant="tag"
            colorPalette={getColorForColumn('category')}
            value={categoryFilter}
            onChange={handleCategoryChange}
          />
        </Flex>
      </Box>

      <FilteredResultsCount
        filtered={filteredData.length}
        total={data.length}
      />

      {isLoading && (
        <Box
          p={2}
          bg="bg.subtle"
          borderRadius="md"
          borderWidth="1px"
          borderColor="border.emphasized"
        >
          <Text fontSize="sm" color="fg.muted">
            Loading API response...
          </Text>
        </Box>
      )}

      {apiError && (
        <Box
          p={4}
          bg="red.50"
          borderRadius="md"
          borderWidth="1px"
          borderColor="red.200"
        >
          <Text fontSize="sm" fontWeight="bold" color="red.600" mb={2}>
            API Error:
          </Text>
          <Text fontSize="sm" color="red.700">
            {apiError}
          </Text>
        </Box>
      )}

      {apiResponse && !isLoading && (
        <Box
          p={4}
          bg="bg.subtle"
          borderRadius="md"
          borderWidth="1px"
          borderColor="border.emphasized"
        >
          <Text fontSize="sm" fontWeight="bold" mb={2}>
            Real API Response (using axios):
          </Text>
          <Text fontSize="xs" color="fg.muted" mb={2}>
            Note: Using httpbin.org/get for demonstration. In production,
            replace with your actual API endpoint.
          </Text>
          <Code
            display="block"
            p={2}
            borderRadius="sm"
            bg="bg.surface"
            fontSize="xs"
            whiteSpace="pre-wrap"
            maxH="300px"
            overflowY="auto"
          >
            {apiResponse}
          </Code>
        </Box>
      )}

      <FilterStateDisplay filters={filters} />
    </VStack>
  );
};

export const PublicApiIntegration: Story = {
  name: 'Public API Integration Example - Standalone',
  args: {},
  render: () => {
    return (
      <Provider>
        <Box p={4}>
          <VStack align="stretch" gap={4}>
            <Box>
              <Text fontSize="lg" fontWeight="bold" mb={2}>
                Public API Integration (Standalone)
              </Text>
              <Text fontSize="sm" color="fg.muted" mb={4}>
                This example demonstrates how ColumnFilterMenu can be integrated
                with public filter APIs without requiring DataTable context. The
                component automatically updates filter state via onChange
                callback, which can be used to construct API query parameters.
                The filter state is debounced and ready for API consumption.
              </Text>
            </Box>

            <ApiIntegrationExample />
          </VStack>
        </Box>
      </Provider>
    );
  },
};

export const MultipleFilters: Story = {
  name: 'Multiple Filter Controls - Standalone',
  args: {},
  render: () => {
    const [brandFilter, setBrandFilter] = useState<string | undefined>(
      undefined
    );
    const [categoryFilter, setCategoryFilter] = useState<string[] | undefined>(
      undefined
    );

    const handleBrandChange = (value: string | string[] | undefined) => {
      setBrandFilter(value as string | undefined);
    };

    const handleCategoryChange = (value: string | string[] | undefined) => {
      setCategoryFilter(value as string[] | undefined);
    };

    const brandOptions = [
      { label: 'Apple', value: 'Apple' },
      { label: 'Samsung', value: 'Samsung' },
      { label: 'OPPO', value: 'OPPO' },
      { label: 'Huawei', value: 'Huawei' },
    ];

    const categoryOptions = [
      { label: 'Smartphones', value: 'smartphones' },
      { label: 'Laptops', value: 'laptops' },
      { label: 'Fragrances', value: 'fragrances' },
      { label: 'Skincare', value: 'skincare' },
      { label: 'Groceries', value: 'groceries' },
    ];

    // Filter data based on selected filters
    let filteredData = data;
    if (brandFilter) {
      filteredData = filteredData.filter((item) => item.brand === brandFilter);
    }
    if (categoryFilter) {
      filteredData = filteredData.filter((item) =>
        categoryFilter.includes(item.category)
      );
    }

    const filters: Array<{ column: string; value: unknown }> = [];
    if (brandFilter) filters.push({ column: 'brand', value: brandFilter });
    if (categoryFilter)
      filters.push({ column: 'category', value: categoryFilter });

    return (
      <Provider>
        <Box p={4}>
          <VStack align="stretch" gap={4}>
            <Box>
              <Text fontSize="lg" fontWeight="bold" mb={2}>
                Multiple Filter Controls (Standalone)
              </Text>
              <Text fontSize="sm" color="fg.muted" mb={4}>
                Use multiple ColumnFilterMenu components together to create
                complex filtering interfaces. Each filter operates independently
                and can be combined for advanced filtering scenarios. This
                example shows standalone usage without DataTable context.
              </Text>
            </Box>

            <VStack align="stretch" gap={4}>
              <Box>
                <Text fontSize="sm" fontWeight="medium" mb={2}>
                  Filter Controls:
                </Text>
                <Flex gap={2} flexWrap="wrap">
                  <ColumnFilterMenu
                    displayName="Brand"
                    filterOptions={brandOptions}
                    filterVariant="select"
                    colorPalette={getColorForColumn('brand')}
                    value={brandFilter}
                    onChange={handleBrandChange}
                  />
                  <ColumnFilterMenu
                    displayName="Category"
                    filterOptions={categoryOptions}
                    filterVariant="tag"
                    colorPalette={getColorForColumn('category')}
                    value={categoryFilter}
                    onChange={handleCategoryChange}
                  />
                </Flex>
              </Box>

              <FilteredResultsCount
                filtered={filteredData.length}
                total={data.length}
              />
              <FilterStateDisplay filters={filters} />
            </VStack>
          </VStack>
        </Box>
      </Provider>
    );
  },
};
