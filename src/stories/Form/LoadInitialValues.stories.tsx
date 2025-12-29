import { DefaultForm } from '@/components/Form/components/core/DefaultForm';
import { useForm } from '@/components/Form/useForm';
import { Provider } from '@/components/ui/provider';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { JSONSchema7 } from 'json-schema';
import {
  CustomQueryFnParams,
  ForeignKeyProps,
} from '@/components/Form/components/fields/StringInputField';
import {
  Heading,
  Text,
  Box,
  VStack,
  HStack,
  Alert,
  Badge,
  Code,
  Separator,
  Button,
  Flex,
} from '@chakra-ui/react';
import { useState } from 'react';
import {
  loadInitialValues,
  LoadInitialValuesParams,
} from '@/components/Form/components/fields/useIdPickerData';

/**
 * Load Initial Values Function Story
 *
 * This story demonstrates the `loadInitialValues` function which can be used
 * to manually load initial values into the idMap for IdPicker fields.
 *
 * Key features demonstrated:
 * - Using loadInitialValues with customQueryFn
 * - Using loadInitialValues with default getTableData (fallback)
 * - Programmatically loading values into idMap
 * - Manual control over when to fetch initial values
 */

const meta = {
  title: 'react-datatable5/Form/LoadInitialValues',
  component: DefaultForm,
  parameters: {
    docs: {
      description: {
        component:
          'Demonstrates the loadInitialValues function for manually loading initial values into idMap',
      },
    },
  },
} satisfies Meta<typeof DefaultForm>;

type Story = StoryObj<typeof meta>;

export default meta;
const queryClient = new QueryClient();

// Mock product data
const mockProducts = [
  {
    id: 'prod-1',
    name: 'Laptop Pro 15',
    category: 'Electronics',
    price: 1299.99,
    stock: 45,
  },
  {
    id: 'prod-2',
    name: 'Wireless Mouse',
    category: 'Accessories',
    price: 29.99,
    stock: 120,
  },
  {
    id: 'prod-3',
    name: 'Mechanical Keyboard',
    category: 'Accessories',
    price: 149.99,
    stock: 78,
  },
  {
    id: 'prod-4',
    name: 'USB-C Hub',
    category: 'Accessories',
    price: 79.99,
    stock: 56,
  },
  {
    id: 'prod-5',
    name: 'Monitor 27"',
    category: 'Electronics',
    price: 399.99,
    stock: 32,
  },
];

// Custom query function for products
const customProductQueryFn = async ({
  searching,
  limit,
  offset,
  where,
}: CustomQueryFnParams) => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 300));

  let filteredProducts = [...mockProducts];

  // Handle where clause for fetching specific IDs
  if (where && where.length > 0) {
    const whereClause = where[0];
    if (whereClause.id === 'id' && whereClause.value) {
      if (Array.isArray(whereClause.value)) {
        filteredProducts = mockProducts.filter((prod) =>
          whereClause.value.includes(prod.id)
        );
      } else {
        filteredProducts = mockProducts.filter(
          (prod) => prod.id === whereClause.value
        );
      }
    }
  } else {
    // Filter by search term if provided
    if (searching) {
      const searchLower = searching.toLowerCase();
      filteredProducts = mockProducts.filter(
        (prod) =>
          prod.name.toLowerCase().includes(searchLower) ||
          prod.category.toLowerCase().includes(searchLower)
      );
    }
  }

  // Paginate results
  const paginatedProducts = filteredProducts.slice(offset, offset + limit);

  // Build idMap
  const idMap = Object.fromEntries(
    paginatedProducts.map((prod) => [prod.id, prod])
  );

  return {
    data: {
      data: paginatedProducts,
      count: filteredProducts.length,
    },
    idMap,
  };
};

export const LoadInitialValuesDemo: Story = {
  render: () => {
    return (
      <Provider>
        <QueryClientProvider client={queryClient}>
          <LoadInitialValuesDemoForm />
        </QueryClientProvider>
      </Provider>
    );
  },
  args: {
    formConfig: {
      schema: {} as JSONSchema7,
      serverUrl: '',
      idMap: {},
      setIdMap: () => {},
      form: {} as any,
      translate: { t: (key: string) => key, ready: true },
    },
  },
};

const LoadInitialValuesDemoForm = () => {
  const form = useForm({});
  const [loadingStatus, setLoadingStatus] = useState<string>('');
  const [loadedIds, setLoadedIds] = useState<string[]>([]);

  const schema = {
    type: 'object',
    title: 'Product Selection Form',
    properties: {
      featured_product: {
        type: 'string',
        variant: 'id-picker',
        foreign_key: {
          table: 'products',
          column: 'id',
          customQueryFn: customProductQueryFn,
        },
      },
      related_products: {
        type: 'array',
        variant: 'id-picker',
        items: {
          type: 'string',
        },
        foreign_key: {
          table: 'products',
          column: 'id',
          customQueryFn: customProductQueryFn,
        },
      },
    },
  } as JSONSchema7;

  // Function to manually load initial values
  const handleLoadInitialValues = async (
    ids: string[],
    useCustomFn: boolean = true
  ) => {
    setLoadingStatus('Loading...');
    try {
      const foreign_key: ForeignKeyProps = {
        table: 'products',
        column: 'id',
        ...(useCustomFn && { customQueryFn: customProductQueryFn }),
      };

      const params: LoadInitialValuesParams = {
        ids,
        foreign_key,
        serverUrl: 'http://localhost:8081',
        setIdMap: form.setIdMap,
      };

      const result = await loadInitialValues(params);

      setLoadingStatus(
        `Successfully loaded ${result.data.data.length} items into idMap`
      );
      setLoadedIds(ids);
      console.log('Loaded data:', result.data);
      console.log('Updated idMap:', result.idMap);
    } catch (error) {
      setLoadingStatus(
        `Error: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
      console.error('Error loading initial values:', error);
    }
  };

  return (
    <VStack gap={6} align="stretch" p={4}>
      {/* Header Documentation */}
      <Box p={6} borderRadius="lg" borderWidth="1px">
        <VStack gap={4} align="stretch">
          <Heading size="lg">loadInitialValues Function Demo</Heading>
          <Text>
            This story demonstrates the <Code>loadInitialValues</Code> function,
            which allows you to manually load initial values into the idMap for
            IdPicker fields. This is useful when you need to programmatically
            pre-populate the idMap before the form renders.
          </Text>

          <Alert.Root status="info" borderRadius="md">
            <Alert.Indicator />
            <Alert.Content>
              <Alert.Title>Function Features:</Alert.Title>
              <Alert.Description>
                <VStack gap={2} align="stretch" mt={2}>
                  <Text>
                    ✓ Uses <Code>customQueryFn</Code> if available, otherwise
                    falls back to <Code>getTableData</Code>
                  </Text>
                  <Text>
                    ✓ Automatically updates the idMap with fetched data
                  </Text>
                  <Text>
                    ✓ Returns both the fetched data and the idMap for further
                    use
                  </Text>
                  <Text>✓ Can be called programmatically at any time</Text>
                </VStack>
              </Alert.Description>
            </Alert.Content>
          </Alert.Root>

          <Separator />

          <Box mt={2}>
            <Heading size="sm" mb={2}>
              Available Products:
            </Heading>
            <VStack gap={2} align="stretch" fontFamily="mono" fontSize="sm">
              {mockProducts.map((prod) => (
                <HStack key={prod.id}>
                  <Badge colorPalette="blue">{prod.id}</Badge>
                  <Text>{prod.name}</Text>
                  <Text color="gray.500">(${prod.price})</Text>
                </HStack>
              ))}
            </VStack>
          </Box>
        </VStack>
      </Box>

      {/* Manual Loading Controls */}
      <Box p={6} borderRadius="lg" borderWidth="1px">
        <VStack gap={4} align="stretch">
          <Heading size="md">Manual Loading Controls</Heading>
          <Text>
            Use these buttons to manually load initial values into the idMap.
            This demonstrates how you can programmatically pre-populate the
            idMap before the form renders or when needed.
          </Text>

          <Flex gap={2} wrap="wrap">
            <Button
              onClick={() => handleLoadInitialValues(['prod-1'], true)}
              colorPalette="blue"
              size="sm"
            >
              Load Single (Custom Query)
            </Button>
            <Button
              onClick={() =>
                handleLoadInitialValues(['prod-2', 'prod-3'], true)
              }
              colorPalette="green"
              size="sm"
            >
              Load Multiple (Custom Query)
            </Button>
            <Button
              onClick={() =>
                handleLoadInitialValues(['prod-4', 'prod-5'], false)
              }
              colorPalette="orange"
              size="sm"
            >
              Load Multiple (Default Query)
            </Button>
            <Button
              onClick={() =>
                handleLoadInitialValues(
                  mockProducts.map((p) => p.id),
                  true
                )
              }
              colorPalette="purple"
              size="sm"
            >
              Load All Products
            </Button>
          </Flex>

          {loadingStatus && (
            <Alert.Root
              status={loadingStatus.startsWith('Error') ? 'error' : 'success'}
              borderRadius="md"
            >
              <Alert.Indicator />
              <Alert.Content>
                <Alert.Description>{loadingStatus}</Alert.Description>
              </Alert.Content>
            </Alert.Root>
          )}

          {loadedIds.length > 0 && (
            <Box p={3} bg="bg.subtle" borderRadius="md">
              <Text fontSize="sm" fontWeight="bold" mb={2}>
                Currently Loaded IDs:
              </Text>
              <HStack gap={2} wrap="wrap">
                {loadedIds.map((id) => (
                  <Badge key={id} colorPalette="green">
                    {id}
                  </Badge>
                ))}
              </HStack>
            </Box>
          )}
        </VStack>
      </Box>

      {/* Function Usage Example */}
      <Box p={6} borderRadius="lg" borderWidth="1px">
        <VStack gap={4} align="stretch">
          <Heading size="md">Function Usage</Heading>
          <Text>
            The <Code>loadInitialValues</Code> function can be used like this:
          </Text>

          <Box
            p={4}
            bg="gray.800"
            borderRadius="md"
            borderWidth="1px"
            borderColor="gray.600"
          >
            <Code
              colorScheme="gray"
              p={4}
              display="block"
              whiteSpace="pre-wrap"
              fontSize="sm"
            >
              {`import { loadInitialValues } from '@/components/Form/components/fields/useIdPickerData';

// With customQueryFn
const result = await loadInitialValues({
  ids: ['prod-1', 'prod-2'],
  foreign_key: {
    table: 'products',
    column: 'id',
    customQueryFn: customProductQueryFn,
  },
  serverUrl: 'http://localhost:8081',
  setIdMap: form.setIdMap,
});

// Without customQueryFn (uses getTableData)
const result = await loadInitialValues({
  ids: ['prod-3', 'prod-4'],
  foreign_key: {
    table: 'products',
    column: 'id',
    // No customQueryFn - will use getTableData
  },
  serverUrl: 'http://localhost:8081',
  setIdMap: form.setIdMap,
});

// Result contains:
// - result.data: { data: [...], count: number }
// - result.idMap: Record<string, object>
// The idMap is also automatically updated via setIdMap`}
            </Code>
          </Box>
        </VStack>
      </Box>

      {/* Interactive Demo Form */}
      <Box p={6} borderRadius="lg" borderWidth="1px" boxShadow="sm">
        <VStack gap={4} align="stretch">
          <Heading size="md">Form with IdPicker Fields</Heading>
          <Text>
            After loading initial values using the buttons above, the IdPicker
            fields below will be able to display those values. Try loading some
            IDs first, then select them in the form fields.
          </Text>

          <DefaultForm
            formConfig={{
              schema: schema as JSONSchema7,
              serverUrl: 'http://localhost:8081',
              onSubmit: async (data) => {
                console.log('Form submitted with data:', data);
                alert(
                  `Form submitted!\\n\\nFeatured Product: ${data.featured_product}\\nRelated Products: ${JSON.stringify(data.related_products)}`
                );
              },
              ...form,
            }}
          />
        </VStack>
      </Box>

      {/* Technical Details */}
      <Box p={6} borderRadius="lg" borderWidth="1px">
        <VStack gap={4} align="stretch">
          <Heading size="md">How It Works</Heading>
          <Text>
            The <Code>loadInitialValues</Code> function:
          </Text>

          <VStack gap={3} align="stretch" mt={2}>
            <HStack gap={4}>
              <Badge colorPalette="green" px={2} py={1}>
                1
              </Badge>
              <Text>
                Checks if <Code>customQueryFn</Code> is provided in{' '}
                <Code>foreign_key</Code>
              </Text>
            </HStack>
            <HStack gap={4}>
              <Badge colorPalette="green" px={2} py={1}>
                2
              </Badge>
              <Text>
                If customQueryFn exists, uses it with a where clause to fetch
                specific IDs
              </Text>
            </HStack>
            <HStack gap={4}>
              <Badge colorPalette="green" px={2} py={1}>
                3
              </Badge>
              <Text>
                Otherwise, falls back to <Code>getTableData</Code> with the same
                where clause
              </Text>
            </HStack>
            <HStack gap={4}>
              <Badge colorPalette="green" px={2} py={1}>
                4
              </Badge>
              <Text>
                Builds an idMap from the fetched data and updates it via{' '}
                <Code>setIdMap</Code>
              </Text>
            </HStack>
            <HStack gap={4}>
              <Badge colorPalette="green" px={2} py={1}>
                5
              </Badge>
              <Text>
                Returns both the data and idMap for further use if needed
              </Text>
            </HStack>
          </VStack>

          <Separator />

          <Box mt={4} p={4} bg="bg.subtle" borderRadius="md">
            <Text fontSize="sm" fontWeight="bold" mb={2}>
              Use Cases:
            </Text>
            <VStack gap={2} align="stretch">
              <Text fontSize="sm">
                • Pre-loading values when form data is fetched from an API
              </Text>
              <Text fontSize="sm">
                • Loading related data when a parent field changes
              </Text>
              <Text fontSize="sm">
                • Programmatically populating idMap before form render
              </Text>
              <Text fontSize="sm">• Refreshing idMap data when needed</Text>
            </VStack>
          </Box>
        </VStack>
      </Box>
    </VStack>
  );
};
