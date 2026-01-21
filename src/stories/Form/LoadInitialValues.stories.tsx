import { DefaultForm } from '@/components/Form/components/core/DefaultForm';
import { useForm } from '@/components/Form/useForm';
import { Provider } from '@/components/ui/provider';
import type { StoryObj } from '@storybook/react-vite';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CustomQueryFnParams } from '@/components/Form/components/types/CustomJSONSchema7';
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
  LoadInitialValuesParams,
  LoadInitialValuesResult,
} from '@/components/Form/components/fields/useIdPickerData';
import { CustomJSONSchema7 } from '@/components/Form/components/types/CustomJSONSchema7';

/**
 * Load Initial Values Function Story
 *
 * This story demonstrates the `loadInitialValues` function which is only
 * meaningful for id-picker fields. It loads records by their IDs so they can
 * be displayed in a human-readable format.
 *
 * Key features demonstrated:
 * - loadInitialValues is at the same level as renderDisplay in schema
 * - Only meaningful when variant === 'id-picker'
 * - Loads records by ID for human-readable display
 * - Uses customQueryFn to fetch data
 * - Custom loadInitialValues implementation in schema
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
};

type Story = StoryObj;

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
  name: 'Load Initial Values Demo',
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
      schema: {
        type: 'object',
        properties: {},
      } as CustomJSONSchema7,
      idMap: {},
      setIdMap: () => {},
      form: {} as any,
      translate: { t: (key: string) => key, ready: true },
    },
  },
};

export const SchemaLevelLoadInitialValues: Story = {
  name: 'Schema Level Load Initial Values',
  render: () => {
    return (
      <Provider>
        <QueryClientProvider client={queryClient}>
          <SchemaLevelLoadInitialValuesForm />
        </QueryClientProvider>
      </Provider>
    );
  },
  args: {
    formConfig: {
      schema: {
        type: 'object',
        properties: {},
      } as CustomJSONSchema7,
      idMap: {},
      setIdMap: () => {},
      form: {} as any,
      translate: { t: (key: string) => key, ready: true },
    },
  },
};

const LoadInitialValuesDemoForm = () => {
  const [loadingStatus, setLoadingStatus] = useState<string>('');
  const [loadedIds, setLoadedIds] = useState<string[]>([]);

  // Default loadInitialValues implementation
  const defaultLoadInitialValues = async (
    params: LoadInitialValuesParams
  ): Promise<LoadInitialValuesResult> => {
    if (!params.ids || params.ids.length === 0) {
      return { data: { data: [], count: 0 }, idMap: {} };
    }

    const { customQueryFn } = params;

    if (!customQueryFn) {
      throw new Error('customQueryFn is required. serverUrl has been removed.');
    }

    const { data, idMap: returnedIdMap } = await customQueryFn({
      searching: '',
      limit: params.ids.length,
      offset: 0,
      where: [
        {
          id: 'id',
          value: params.ids.length === 1 ? params.ids[0] : params.ids,
        },
      ],
    });

    if (returnedIdMap && Object.keys(returnedIdMap).length > 0) {
      params.setIdMap((state) => {
        return { ...state, ...returnedIdMap } as Record<string, unknown>;
      });
    }

    return { data, idMap: returnedIdMap || {} };
  };

  const schema: CustomJSONSchema7 = {
    type: 'object',
    title: 'Product Selection Form',
    properties: {
      featured_product: {
        type: 'string',
        variant: 'id-picker',
        customQueryFn: customProductQueryFn,
        loadInitialValues: defaultLoadInitialValues, // Required for id-picker: loads records for human-readable display
      } as CustomJSONSchema7,
      related_products: {
        type: 'array',
        variant: 'id-picker',
        items: {
          type: 'string',
        },
        customQueryFn: customProductQueryFn,
        loadInitialValues: defaultLoadInitialValues, // Required for id-picker: loads records for human-readable display
      } as CustomJSONSchema7,
    },
  };

  const form = useForm({ schema });

  // Function to manually load initial values using schema's loadInitialValues
  const handleLoadInitialValues = async (ids: string[]) => {
    setLoadingStatus('Loading...');
    try {
      const params: LoadInitialValuesParams = {
        ids,
        customQueryFn: customProductQueryFn,
        setIdMap: form.setIdMap,
      };

      // Use schema's loadInitialValues (required)
      const featuredProductSchema = schema.properties
        ?.featured_product as CustomJSONSchema7;
      if (!featuredProductSchema?.loadInitialValues) {
        throw new Error('loadInitialValues is required in schema');
      }
      const result = await featuredProductSchema.loadInitialValues(params);

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
            which is only meaningful for id-picker fields. It loads records by
            their IDs so they can be displayed in a human-readable format. The
            function is defined at the same level as <Code>renderDisplay</Code>{' '}
            in the schema.
          </Text>

          <Alert.Root status="info" borderRadius="md">
            <Alert.Indicator />
            <Alert.Content>
              <Alert.Title>Function Features:</Alert.Title>
              <Alert.Description>
                <VStack gap={2} align="stretch" mt={2}>
                  <Text>
                    ✓ Can be provided at schema level (like{' '}
                    <Code>renderDisplay</Code>)
                  </Text>
                  <Text>
                    ✓ Required for id-picker fields: loads records by id for
                    human-readable display
                  </Text>
                  <Text>
                    ✓ Uses <Code>customQueryFn</Code> from{' '}
                    <Code>customQueryFn</Code> to fetch data
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
              onClick={() => handleLoadInitialValues(['prod-1'])}
              colorPalette="blue"
              size="sm"
            >
              Load Single
            </Button>
            <Button
              onClick={() => handleLoadInitialValues(['prod-2', 'prod-3'])}
              colorPalette="green"
              size="sm"
            >
              Load Multiple
            </Button>
            <Button
              onClick={() => handleLoadInitialValues(['prod-4', 'prod-5'])}
              colorPalette="orange"
              size="sm"
            >
              Load Multiple (Different IDs)
            </Button>
            <Button
              onClick={() =>
                handleLoadInitialValues(mockProducts.map((p) => p.id))
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
            The <Code>loadInitialValues</Code> function must be provided in the
            schema for IdPicker fields. It works just like{' '}
            <Code>renderDisplay</Code>:
          </Text>

          <Separator />

          <Box>
            <Heading size="sm" mb={2}>
              Schema-Level (Required for id-picker)
            </Heading>
            <Text mb={2}>
              Provide <Code>loadInitialValues</Code> in the schema at the same
              level as <Code>renderDisplay</Code>. It is required for id-picker
              fields to load records by id for human-readable display:
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
                {`const schema = {
  type: 'string',
  variant: 'id-picker',
  customQueryFn: customProductQueryFn,
  renderDisplay: (item) => item.name,
  loadInitialValues: async (params) => {
    // Custom implementation
    // Can add caching, logging, or custom logic here
    const result = await customProductQueryFn({
      searching: '',
      limit: params.ids.length,
      offset: 0,
      where: [{
        id: 'id',
        value: params.ids,
      }],
    });
    
    // Update idMap
    params.setIdMap((state) => ({
      ...state,
      ...result.idMap,
    }));
    
    return {
      data: result.data,
      idMap: result.idMap,
    };
  },
};`}
              </Code>
            </Box>
          </Box>

          <Box>
            <Heading size="sm" mb={2}>
              Calling Schema's loadInitialValues
            </Heading>
            <Text mb={2}>
              You can call the schema's <Code>loadInitialValues</Code> function
              programmatically:
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
                {`// Get loadInitialValues from schema
const loadInitialValuesFn = schema.properties.featured_product.loadInitialValues;

// Call it programmatically
const result = await loadInitialValuesFn({
  ids: ['prod-1', 'prod-2'],
  customQueryFn: customProductQueryFn, // Required
  setIdMap: form.setIdMap,
});

// Result contains:
// - result.data: { data: [...], count: number }
// - result.idMap: Record<string, object>
// The idMap is also automatically updated via setIdMap`}
              </Code>
            </Box>
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
              schema: schema,
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
            The <Code>loadInitialValues</Code> function is only meaningful for
            id-picker fields. It loads records by their IDs so they can be
            displayed in a human-readable format:
          </Text>

          <VStack gap={3} align="stretch" mt={2}>
            <HStack gap={4}>
              <Badge colorPalette="green" px={2} py={1}>
                1
              </Badge>
              <Text>
                Required in schema for fields with{' '}
                <Code>variant: 'id-picker'</Code>
              </Text>
            </HStack>
            <HStack gap={4}>
              <Badge colorPalette="green" px={2} py={1}>
                2
              </Badge>
              <Text>
                Uses <Code>customQueryFn</Code> with a where clause to fetch
                records by their IDs
              </Text>
            </HStack>
            <HStack gap={4}>
              <Badge colorPalette="green" px={2} py={1}>
                3
              </Badge>
              <Text>
                Builds an idMap from the fetched data and updates it via{' '}
                <Code>setIdMap</Code>
              </Text>
            </HStack>
            <HStack gap={4}>
              <Badge colorPalette="green" px={2} py={1}>
                4
              </Badge>
              <Text>
                The idMap is used by <Code>renderDisplay</Code> to show
                human-readable labels instead of just IDs
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

// Story 2: Schema-level loadInitialValues
const SchemaLevelLoadInitialValuesForm = () => {
  // Custom loadInitialValues implementation
  const customLoadInitialValues = async (
    params: LoadInitialValuesParams
  ): Promise<LoadInitialValuesResult> => {
    console.log('Custom loadInitialValues called with IDs:', params.ids);

    // Add custom logic (e.g., logging, caching, etc.)
    const startTime = Date.now();

    // customQueryFn is required
    const { customQueryFn } = params;
    if (!customQueryFn) {
      throw new Error('customQueryFn is required. serverUrl has been removed.');
    }

    const { data, idMap: returnedIdMap } = await customQueryFn({
      searching: '',
      limit: params.ids.length,
      offset: 0,
      where: [
        {
          id: 'id',
          value: params.ids.length === 1 ? params.ids[0] : params.ids,
        },
      ],
    });

    if (returnedIdMap && Object.keys(returnedIdMap).length > 0) {
      params.setIdMap((state) => {
        return { ...state, ...returnedIdMap } as Record<string, unknown>;
      });
    }

    const duration = Date.now() - startTime;
    console.log(`Loaded ${params.ids.length} items in ${duration}ms`);

    return { data, idMap: returnedIdMap || {} };
  };

  // Default loadInitialValues for related_products
  const defaultLoadInitialValuesForRelated = async (
    params: LoadInitialValuesParams
  ): Promise<LoadInitialValuesResult> => {
    if (!params.ids || params.ids.length === 0) {
      return { data: { data: [], count: 0 }, idMap: {} };
    }

    const { customQueryFn } = params;

    if (!customQueryFn) {
      throw new Error('customQueryFn is required. serverUrl has been removed.');
    }

    const { data, idMap: returnedIdMap } = await customQueryFn({
      searching: '',
      limit: params.ids.length,
      offset: 0,
      where: [
        {
          id: 'id',
          value: params.ids.length === 1 ? params.ids[0] : params.ids,
        },
      ],
    });

    if (returnedIdMap && Object.keys(returnedIdMap).length > 0) {
      params.setIdMap((state) => {
        return { ...state, ...returnedIdMap } as Record<string, unknown>;
      });
    }

    return { data, idMap: returnedIdMap || {} };
  };

  const schema: CustomJSONSchema7 = {
    type: 'object',
    title: 'Product Selection with Custom loadInitialValues',
    loadInitialValues: async () => ({
      data: { data: [], count: 0 },
      idMap: {},
    }), // Dummy for root schema
    properties: {
      featured_product: {
        type: 'string',
        variant: 'id-picker',
        customQueryFn: customProductQueryFn,
        renderDisplay: (item: any) => `${item.name} ($${item.price})`,
        loadInitialValues: customLoadInitialValues, // Custom implementation for id-picker: loads records for human-readable display
      } as CustomJSONSchema7,
      related_products: {
        type: 'array',
        variant: 'id-picker',
        items: {
          type: 'string',
        },
        customQueryFn: customProductQueryFn,
        renderDisplay: (item: any) => `${item.name} - ${item.category}`,
        loadInitialValues: defaultLoadInitialValuesForRelated, // Required for id-picker: loads records for human-readable display
      } as CustomJSONSchema7,
    },
  };

  const form = useForm({
    schema,
    preLoadedValues: {
      featured_product: 'prod-2',
      related_products: ['prod-1', 'prod-3'],
    },
  });

  return (
    <VStack gap={6} align="stretch" p={4}>
      {/* Header Documentation */}
      <Box p={6} borderRadius="lg" borderWidth="1px">
        <VStack gap={4} align="stretch">
          <Heading size="lg">Schema-Level loadInitialValues</Heading>
          <Text>
            This example demonstrates using <Code>loadInitialValues</Code> at
            the schema level, just like <Code>renderDisplay</Code>. The{' '}
            <Code>featured_product</Code> field uses a custom implementation,
            while <Code>related_products</Code> uses the default implementation.
          </Text>

          <Alert.Root status="success" borderRadius="md">
            <Alert.Indicator />
            <Alert.Content>
              <Alert.Title>Key Points:</Alert.Title>
              <Alert.Description>
                <VStack gap={2} align="stretch" mt={2}>
                  <Text>
                    ✓ <Code>loadInitialValues</Code> is at the same level as{' '}
                    <Code>renderDisplay</Code> in the schema
                  </Text>
                  <Text>
                    ✓ Custom implementation can add logging, caching, or other
                    custom logic
                  </Text>
                  <Text>
                    ✓ Required in schema for IdPicker fields (throws error if
                    missing)
                  </Text>
                  <Text>
                    ✓ The hook automatically uses schema's{' '}
                    <Code>loadInitialValues</Code>
                  </Text>
                </VStack>
              </Alert.Description>
            </Alert.Content>
          </Alert.Root>

          <Separator />

          <Box mt={2}>
            <Heading size="sm" mb={2}>
              Pre-loaded Values:
            </Heading>
            <VStack gap={2} align="stretch" fontFamily="mono" fontSize="sm">
              <HStack>
                <Badge colorPalette="blue">featured_product</Badge>
                <Code>prod-2</Code>
                <Text>(Wireless Mouse - uses custom loadInitialValues)</Text>
              </HStack>
              <HStack>
                <Badge colorPalette="blue">related_products</Badge>
                <Code>['prod-1', 'prod-3']</Code>
                <Text>
                  (Laptop Pro 15, Mechanical Keyboard - uses schema's
                  loadInitialValues)
                </Text>
              </HStack>
            </VStack>
          </Box>
        </VStack>
      </Box>

      {/* Schema Example */}
      <Box p={6} borderRadius="lg" borderWidth="1px">
        <VStack gap={4} align="stretch">
          <Heading size="md">Schema Definition</Heading>
          <Text>
            Notice how <Code>loadInitialValues</Code> is defined at the same
            level as <Code>renderDisplay</Code>:
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
              {`const schema = {
  type: 'object',
  properties: {
    featured_product: {
      type: 'string',
      variant: 'id-picker',
      customQueryFn: customProductQueryFn,
      renderDisplay: (item) => \`\${item.name} (\$\${item.price})\`,
      loadInitialValues: customLoadInitialValues, // ← Custom implementation
    },
    related_products: {
      type: 'array',
      variant: 'id-picker',
      customQueryFn: customProductQueryFn,
      renderDisplay: (item) => \`\${item.name} - \${item.category}\`,
      loadInitialValues: defaultLoadInitialValues, // Required
    },
  },
};`}
            </Code>
          </Box>
        </VStack>
      </Box>

      {/* Interactive Demo Form */}
      <Box p={6} borderRadius="lg" borderWidth="1px" boxShadow="sm">
        <VStack gap={4} align="stretch">
          <Heading size="md">Form with Schema-Level loadInitialValues</Heading>
          <Text>
            The form below has pre-loaded values. The{' '}
            <Code>featured_product</Code> field uses a custom{' '}
            <Code>loadInitialValues</Code> implementation (check console for
            logs), while <Code>related_products</Code> uses the default
            implementation from the schema.
          </Text>

          <DefaultForm
            formConfig={{
              schema: schema,
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

      {/* Comparison */}
      <Box p={6} borderRadius="lg" borderWidth="1px">
        <VStack gap={4} align="stretch">
          <Heading size="md">Schema-Level Implementation</Heading>
          <Text>
            <Code>loadInitialValues</Code> must be defined in the schema for
            IdPicker fields. It follows the same pattern as{' '}
            <Code>renderDisplay</Code>:
          </Text>

          <VStack gap={4} align="stretch" mt={2}>
            <Box p={4} bg="bg.subtle" borderRadius="md">
              <Heading size="sm" mb={2} color="green.600">
                Schema-Level (Required)
              </Heading>
              <VStack gap={2} align="stretch" fontSize="sm">
                <Text>✓ Required in schema for IdPicker fields</Text>
                <Text>✓ Same pattern as renderDisplay</Text>
                <Text>✓ Automatically used by the hook</Text>
                <Text>✓ Consistent with other schema-level customizations</Text>
                <Text>✓ Can be called programmatically from schema</Text>
              </VStack>
            </Box>
          </VStack>
        </VStack>
      </Box>
    </VStack>
  );
};
