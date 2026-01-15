# IdPicker Complete Guide

The **IdPicker** component is a powerful searchable combobox field for selecting records by ID. It supports both single and multiple selection, with built-in search functionality, loading states, and custom display rendering.

## Table of Contents

- [Overview](#overview)
- [Basic Usage](#basic-usage)
- [Schema Configuration](#schema-configuration)
- [Required Functions](#required-functions)
- [Custom Functions](#custom-functions)
  - [itemToValue](#itemtovalue-optional)
  - [renderDisplay](#renderdisplay-optional)
- [Single vs Multiple Selection](#single-vs-multiple-selection)
- [Customization Options](#customization-options)
- [Labels and Internationalization](#labels-and-internationalization)
- [Examples](#examples)
- [Best Practices](#best-practices)
- [Common Issues](#common-issues)

## Overview

The IdPicker component provides:

- **Searchable dropdown**: Type to search and filter options
- **Async data loading**: Fetches data from your API as you type
- **Initial value loading**: Automatically loads selected values for display
- **Custom rendering**: Display items using custom React components
- **Single or multiple selection**: Choose one or many items
- **Loading states**: Shows skeletons and spinners during data fetching
- **Error handling**: Displays error messages when data loading fails

## Basic Usage

### Single Selection

```tsx
import { FormRoot, FormBody } from '@bsol-oss/react-datatable5';
import { useForm } from '@bsol-oss/react-datatable5'';

const MyForm = () => {
  const form = useForm();

  const schema = {
    type: 'object',
    properties: {
      category_id: {
        type: 'string',
        variant: 'id-picker',
        title: 'Category',
        customQueryFn: async (params) => {
          // Fetch categories from your API
          const response = await fetch('/api/categories', {
            method: 'POST',
            body: JSON.stringify({
              searching: params.searching || '',
              limit: params.limit || 50,
              offset: params.offset || 0,
            }),
          });
          const result = await response.json();
          return {
            data: { data: result.items, count: result.total },
            idMap: {}, // Optional: pre-populate idMap
          };
        },
        loadInitialValues: async (params) => {
          // Load selected category for display
          if (!params.ids || params.ids.length === 0) {
            return { data: { data: [], count: 0 }, idMap: {} };
          }
          const { customQueryFn } = params;
          const { data, idMap } = await customQueryFn({
            searching: '',
            limit: params.ids.length,
            offset: 0,
            where: [{ id: 'id', value: params.ids }],
          });
          if (idMap && Object.keys(idMap).length > 0) {
            params.setIdMap((state) => ({ ...state, ...idMap }));
          }
          return { data, idMap: idMap || {} };
        },
      },
    },
  };

  return (
    <FormRoot
      schema={schema}
      onSubmit={(data) => console.log('Submitted:', data)}
      {...form}
    >
      <FormBody />
    </FormRoot>
  );
};
```

### Multiple Selection

For multiple selection, use `type: 'array'`:

```tsx
const schema = {
  type: 'object',
  properties: {
    tags: {
      type: 'array',
      variant: 'id-picker',
      title: 'Tags',
      items: {
        type: 'string',
      },
      customQueryFn: async (params) => {
        // Same as single selection
      },
      loadInitialValues: async (params) => {
        // Same as single selection
      },
    },
  },
};
```

## Schema Configuration

### Required Properties

| Property            | Type          | Required | Description                                  |
| ------------------- | ------------- | -------- | -------------------------------------------- |
| `variant`           | `'id-picker'` | Yes      | Must be set to `'id-picker'`                 |
| `customQueryFn`     | `Function`    | Yes      | Function to fetch search results             |
| `loadInitialValues` | `Function`    | Yes      | Function to load selected values for display |

### Optional Properties

| Property        | Type                       | Description                                                      |
| --------------- | -------------------------- | ---------------------------------------------------------------- |
| `renderDisplay` | `(item: any) => ReactNode` | Custom function to render items in dropdown and selected display |
| `itemToValue`   | `(item: any) => string`    | Extract the ID/value from an item (default: tries `item.id`)     |
| `gridColumn`    | `string`                   | CSS grid column span (default: `'span 12'`)                      |
| `gridRow`       | `string`                   | CSS grid row span (default: `'span 1'`)                          |
| `title`         | `string`                   | Field label                                                      |
| `required`      | `string[]`                 | Array of required field names                                    |

## Required Functions

### 1. `customQueryFn`

Fetches search results as the user types. This function is called with debounced search text.

**Signature:**

```typescript
type CustomQueryFn = (params: {
  searching?: string;
  limit?: number;
  offset?: number;
  where?: { id: string; value: string | string[] }[];
}) => Promise<{
  data: { data: any[]; count: number };
  idMap?: Record<string, object>;
}>;
```

**Parameters:**

- `searching`: The search query text (debounced by 300ms)
- `limit`: Maximum number of results to return (default: 50)
- `offset`: Pagination offset (default: 0)
- `where`: Array of filter conditions (used by `loadInitialValues`)

**Returns:**

- `data`: Object with `data` array and `count` number
- `idMap`: Optional map of ID to record object (for caching)

**Example:**

```tsx
customQueryFn: async (params) => {
  const response = await axios.post('/api/users/search', {
    search: params.searching || '',
    limit: params.limit || 50,
    offset: params.offset || 0,
  });

  // Create idMap for caching
  const idMap: Record<string, any> = {};
  response.data.items.forEach((user: any) => {
    idMap[user.id] = user;
  });

  return {
    data: {
      data: response.data.items,
      count: response.data.total,
    },
    idMap, // Optional but recommended for performance
  };
};
```

### 2. `loadInitialValues`

Loads the full record data for selected IDs so they can be displayed in a human-readable format. This is called automatically when the form loads with pre-filled values.

**Signature:**

```typescript
type LoadInitialValues = (params: {
  ids: string[];
  customQueryFn: CustomQueryFn;
  setIdMap: React.Dispatch<React.SetStateAction<Record<string, object>>>;
}) => Promise<{
  data: { data: any[]; count: number };
  idMap: Record<string, object>;
}>;
```

**Parameters:**

- `ids`: Array of selected IDs that need to be loaded
- `customQueryFn`: The same function provided in schema (for reuse)
- `setIdMap`: Function to update the idMap cache

**Example:**

```tsx
loadInitialValues: async (params) => {
  if (!params.ids || params.ids.length === 0) {
    return { data: { data: [], count: 0 }, idMap: {} };
  }

  const { customQueryFn, setIdMap } = params;

  // Use customQueryFn to fetch records by ID
  const { data, idMap: returnedIdMap } = await customQueryFn({
    searching: '',
    limit: params.ids.length,
    offset: 0,
    where: [
      {
        id: 'id', // The field name to filter by
        value: params.ids.length === 1 ? params.ids[0] : params.ids,
      },
    ],
  });

  // Update the idMap cache
  if (returnedIdMap && Object.keys(returnedIdMap).length > 0) {
    setIdMap((state) => ({ ...state, ...returnedIdMap }));
  }

  return { data, idMap: returnedIdMap || {} };
};
```

**Helper Function:**

You can create a reusable helper:

```tsx
const createDefaultLoadInitialValues = () => {
  return async (
    params: LoadInitialValuesParams
  ): Promise<LoadInitialValuesResult> => {
    if (!params.ids || params.ids.length === 0) {
      return { data: { data: [], count: 0 }, idMap: {} };
    }

    const { customQueryFn, setIdMap } = params;

    if (!customQueryFn) {
      throw new Error('customQueryFn is required');
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

    if (returnedIdMap && Object.keys(idMap).length > 0) {
      setIdMap((state) => ({ ...state, ...returnedIdMap }));
    }

    return { data, idMap: returnedIdMap || {} };
  };
};

// Usage in schema
loadInitialValues: createDefaultLoadInitialValues();
```

## Custom Functions

### `itemToValue` (Optional)

Extracts the ID/value from a record object. This function determines what value is stored in the form when an item is selected. Default behavior tries `item.id`, then falls back to stringifying the item.

**Signature:**

```typescript
type ItemToValue = (item: any) => string;
```

**When to Use:**

- Your records use a different field as the identifier (e.g., `username`, `code`, `slug`)
- You need composite keys (e.g., `${categoryId}-${productId}`)
- You want to store a different value than the record's ID

**Default Behavior:**

If `itemToValue` is not provided, the component will:

1. Try `item.id`
2. Try `item._id`
3. Fall back to `String(item)`

**Examples:**

```tsx
// Example 1: Use username instead of id as the value
itemToValue: (item) => {
  return item.username;
};

// Example 2: Use a composite key
itemToValue: (item) => {
  return `${item.categoryId}-${item.productId}`;
};

// Example 3: Use a code field
itemToValue: (item) => {
  return item.code || item.id;
};

// Example 4: Use slug for SEO-friendly URLs
itemToValue: (item) => {
  return item.slug;
};

// Example 5: Handle nullable values
itemToValue: (item) => {
  if (!item || !item.id) {
    throw new Error('Item must have an id');
  }
  return String(item.id);
};
```

**Important Notes:**

1. **Consistency with `loadInitialValues`**: If you use a custom `itemToValue`, your `loadInitialValues` function must be able to load records by that value. For example, if `itemToValue` returns `username`, then `loadInitialValues` should filter by `username`, not `id`.

2. **Type Safety**: The returned value must be a string. If your identifier is a number, convert it: `String(item.id)`.

3. **Uniqueness**: The value returned by `itemToValue` must be unique across all items. Duplicate values will cause issues.

**Example with Custom `itemToValue` and Matching `loadInitialValues`:**

```tsx
{
  type: 'string',
  variant: 'id-picker',
  title: 'Select User by Username',
  itemToValue: (user) => user.username, // Store username instead of id
  customQueryFn: async (params) => {
    // Your search function
  },
  loadInitialValues: async (params) => {
    // Must load by username since itemToValue returns username
    if (!params.ids || params.ids.length === 0) {
      return { data: { data: [], count: 0 }, idMap: {} };
    }

    const { customQueryFn, setIdMap } = params;

    // Filter by username field, not id
    const { data, idMap } = await customQueryFn({
      searching: '',
      limit: params.ids.length,
      offset: 0,
      where: [
        {
          id: 'username', // ← Filter by username field
          value: params.ids.length === 1 ? params.ids[0] : params.ids,
        },
      ],
    });

    // Create idMap using username as key (matching itemToValue)
    const usernameIdMap: Record<string, any> = {};
    data.data.forEach((user) => {
      usernameIdMap[user.username] = user;
    });

    if (Object.keys(usernameIdMap).length > 0) {
      setIdMap((state) => ({ ...state, ...usernameIdMap }));
    }

    return { data, idMap: usernameIdMap };
  },
}
```

### `renderDisplay` (Optional)

Custom function to render items in both the dropdown list and the selected display area. This function controls how items appear to users throughout the component. If not provided, uses `defaultRenderDisplay` which tries common fields like `name`, `title`, `label`, `displayName`, etc.

**Signature:**

```typescript
type RenderDisplay = (item: any) => ReactNode;
```

**When to Use:**

- Your records don't have standard fields like `name` or `title`
- You want to show multiple fields or rich content (avatars, badges, icons)
- You need conditional rendering based on item properties
- You want consistent branding/styling across dropdown and selected items

**Default Behavior:**

If `renderDisplay` is not provided, the component will try these fields in order:

1. `item.name`
2. `item.title`
3. `item.label`
4. `item.displayName`
5. `item.text`
6. Falls back to `String(item)`

**Examples:**

```tsx
// Example 1: Simple string display
renderDisplay: (item) => item.name;

// Example 2: Custom React component with avatar
renderDisplay: (item) => (
  <Flex gap={2} align="center">
    <Avatar src={item.avatar_url} size="sm" />
    <Box>
      <Text fontWeight="medium">{item.name}</Text>
      <Text fontSize="sm" color="gray.500">
        {item.email}
      </Text>
    </Box>
  </Flex>
);

// Example 3: Display with badge/status indicator
renderDisplay: (item) => (
  <Flex gap={2} align="center">
    <Text fontWeight="bold">{item.name}</Text>
    <Badge colorPalette={item.status === 'active' ? 'green' : 'gray'}>
      {item.status}
    </Badge>
  </Flex>
);

// Example 4: Complex multi-line display
renderDisplay: (item) => (
  <Box>
    <Text fontWeight="bold">{item.name}</Text>
    <Text fontSize="sm" color="gray.500">
      {item.email} • {item.department}
    </Text>
    {item.role && (
      <Text fontSize="xs" color="gray.400">
        {item.role}
      </Text>
    )}
  </Box>
);

// Example 5: Conditional rendering based on item type
renderDisplay: (item) => {
  if (item.type === 'user') {
    return (
      <Flex gap={2} align="center">
        <Avatar src={item.avatar} size="sm" />
        <Text>{item.name}</Text>
      </Flex>
    );
  }
  return (
    <Flex gap={2} align="center">
      <Icon name="Building" />
      <Text>{item.name}</Text>
    </Flex>
  );
};

// Example 6: Display with icon and metadata
renderDisplay: (item) => (
  <Flex gap={2} align="center" width="100%">
    <Icon name="File" size="sm" />
    <Box flex="1">
      <Text fontWeight="medium" truncate>
        {item.filename}
      </Text>
      <Text fontSize="sm" color="gray.500">
        {item.size} • {item.modifiedDate}
      </Text>
    </Box>
  </Flex>
);

// Example 7: Product display with price and stock
renderDisplay: (item) => (
  <Flex gap={2} justify="space-between" width="100%">
    <Box>
      <Text fontWeight="medium">{item.name}</Text>
      <Text fontSize="sm" color="gray.500">
        SKU: {item.sku}
      </Text>
    </Box>
    <Box textAlign="right">
      <Text fontWeight="bold" colorPalette="green">
        ${item.price}
      </Text>
      <Text fontSize="xs" color={item.stock > 0 ? 'gray.500' : 'red.500'}>
        {item.stock > 0 ? `${item.stock} in stock` : 'Out of stock'}
      </Text>
    </Box>
  </Flex>
);

// Example 8: Category with parent hierarchy
renderDisplay: (item) => (
  <Box>
    <Text fontWeight="medium">{item.name}</Text>
    {item.parent && (
      <Text fontSize="xs" color="gray.500">
        Parent: {item.parent.name}
      </Text>
    )}
  </Box>
);
```

**Best Practices:**

1. **Keep it Simple**: For dropdown items, simpler displays are better. Users scan quickly, so avoid overly complex layouts.

2. **Consistent Styling**: The same `renderDisplay` is used for both dropdown items and selected items. Design accordingly.

3. **Handle Missing Data**: Always handle cases where fields might be undefined:

   ```tsx
   renderDisplay: (item) => <Text>{item.name || 'Unnamed Item'}</Text>;
   ```

4. **Performance**: Avoid heavy computations in `renderDisplay`. It's called for every visible item.

5. **Accessibility**: Ensure your rendered content is accessible. Use semantic HTML and proper ARIA labels when needed.

6. **Dark Mode**: If using Chakra UI color tokens, they automatically adapt to dark mode. Use `colorPalette` instead of hardcoded colors.

**Using with `itemToValue`:**

When using both `renderDisplay` and `itemToValue`, remember:

- `renderDisplay` controls **what users see**
- `itemToValue` controls **what gets stored in the form**

```tsx
{
  type: 'string',
  variant: 'id-picker',
  title: 'Select Product',
  // What users see
  renderDisplay: (product) => (
    <Flex gap={2}>
      <Text fontWeight="bold">{product.name}</Text>
      <Badge>${product.price}</Badge>
    </Flex>
  ),
  // What gets stored (could be different from what's displayed)
  itemToValue: (product) => product.sku, // Store SKU instead of ID
  // ... rest of config
}
```

## Single vs Multiple Selection

### Single Selection

- **Schema type**: `type: 'string'`
- **Form value**: Single string (ID)
- **Component**: `IdPickerSingle`
- **Display**: Shows selected item above input, or in input when selected
- **Clear button**: X button appears when value is selected

```tsx
{
  type: 'string',
  variant: 'id-picker',
  title: 'Select User',
  customQueryFn: userQueryFn,
  loadInitialValues: defaultLoadInitialValues,
}
```

### Multiple Selection

- **Schema type**: `type: 'array'` with `items: { type: 'string' }`
- **Form value**: Array of strings (IDs)
- **Component**: `IdPickerMultiple`
- **Display**: Shows selected items as removable tags above input
- **Selection**: Can select multiple items without closing dropdown

```tsx
{
  type: 'array',
  variant: 'id-picker',
  title: 'Select Tags',
  items: {
    type: 'string',
  },
  customQueryFn: tagQueryFn,
  loadInitialValues: defaultLoadInitialValues,
}
```

## Customization Options

### Grid Layout

Control field positioning using CSS Grid:

```tsx
{
  type: 'string',
  variant: 'id-picker',
  gridColumn: 'span 6', // Half width
  gridRow: 'span 2',    // Two rows tall
  // ...
}
```

### Custom Validation

Add validation using JSON Schema:

```tsx
{
  type: 'string',
  variant: 'id-picker',
  title: 'Required Category',
  // ... other config
}

// In schema root
{
  type: 'object',
  required: ['category_id'], // Makes field required
  properties: {
    category_id: { /* ... */ }
  }
}
```

### Custom Error Messages

Use `errorMessages` in schema:

```tsx
{
  type: 'string',
  variant: 'id-picker',
  errorMessages: {
    required: 'Please select a category',
  },
}
```

## Labels and Internationalization

IdPicker supports custom labels through the `idPickerLabels` prop in `FormRoot`:

```tsx
<FormRoot
  schema={schema}
  idPickerLabels={{
    undefined: 'Item not found',
    addMore: 'Add more items',
    typeToSearch: 'Type to search...',
    total: 'Total items',
    showing: 'Showing',
    perPage: 'per page',
    emptySearchResult: 'No results found',
    initialResults: 'Start typing to search',
  }}
  {...form}
>
  <FormBody />
</FormRoot>
```

**Label Properties:**

| Property            | Default                    | Description                                            |
| ------------------- | -------------------------- | ------------------------------------------------------ |
| `undefined`         | `'Undefined'`              | Shown when selected ID cannot be found                 |
| `addMore`           | `'Add more'`               | Button text for adding more items (multiple selection) |
| `typeToSearch`      | `'Type to search'`         | Placeholder text in input                              |
| `total`             | `'Total'`                  | Label for total count                                  |
| `showing`           | `'Showing'`                | Label for "showing X of Y"                             |
| `perPage`           | `'per page'`               | Label for per page count                               |
| `emptySearchResult` | `'No results found'`       | Shown when search returns no results                   |
| `initialResults`    | `'Start typing to search'` | Shown when dropdown is empty and no search entered     |

## Examples

### Example 1: User Selection with Avatar

```tsx
const schema = {
  type: 'object',
  properties: {
    assigned_to: {
      type: 'string',
      variant: 'id-picker',
      title: 'Assign To',
      customQueryFn: async (params) => {
        const response = await axios.post('/api/users/search', {
          search: params.searching || '',
          limit: params.limit || 50,
        });
        return {
          data: {
            data: response.data.users,
            count: response.data.total,
          },
        };
      },
      renderDisplay: (user) => (
        <Flex gap={2} align="center">
          <Avatar src={user.avatar_url} size="sm" />
          <Box>
            <Text fontWeight="medium">{user.name}</Text>
            <Text fontSize="sm" color="gray.500">
              {user.email}
            </Text>
          </Box>
        </Flex>
      ),
      loadInitialValues: createDefaultLoadInitialValues(),
    },
  },
};
```

### Example 2: Multiple Tag Selection

```tsx
const schema = {
  type: 'object',
  properties: {
    tags: {
      type: 'array',
      variant: 'id-picker',
      title: 'Tags',
      items: { type: 'string' },
      customQueryFn: async (params) => {
        const response = await axios.get('/api/tags', {
          params: {
            search: params.searching,
            limit: params.limit,
          },
        });
        return {
          data: {
            data: response.data.tags,
            count: response.data.total,
          },
        };
      },
      loadInitialValues: createDefaultLoadInitialValues(),
    },
  },
};
```

### Example 3: Custom Value Extraction

Using username instead of ID as the value:

```tsx
const schema = {
  type: 'object',
  properties: {
    selected_by_username: {
      type: 'string',
      variant: 'id-picker',
      title: 'Select User',
      customQueryFn: userQueryFn,
      itemToValue: (user) => user.username, // Use username as value
      loadInitialValues: async (params) => {
        // Since we use username as value, load by username
        if (!params.ids || params.ids.length === 0) {
          return { data: { data: [], count: 0 }, idMap: {} };
        }

        // Fetch all users and filter by username
        const { data: allData } = await userQueryFn({
          searching: '',
          limit: 100,
          offset: 0,
        });

        const matchingUsers = allData.data.filter((user) =>
          params.ids.includes(user.username)
        );

        // Create idMap using username as key
        const usernameIdMap: Record<string, any> = {};
        matchingUsers.forEach((user) => {
          usernameIdMap[user.username] = user;
        });

        if (Object.keys(usernameIdMap).length > 0) {
          params.setIdMap((state) => ({ ...state, ...usernameIdMap }));
        }

        return {
          data: { data: matchingUsers, count: matchingUsers.length },
          idMap: usernameIdMap,
        };
      },
    },
  },
};
```

### Example 4: Pre-filled Form Values

```tsx
const form = useForm({
  preLoadedValues: {
    category_id: 'cat-123',
    tags: ['tag-1', 'tag-2'],
  },
});

// The loadInitialValues function will automatically be called
// to load the records for 'cat-123', 'tag-1', and 'tag-2'
```

### Example 5: Using `renderDisplay` and `itemToValue` Together

This example shows how to use both functions together for a product picker that displays rich information but stores SKU codes:

```tsx
const schema = {
  type: 'object',
  properties: {
    product_sku: {
      type: 'string',
      variant: 'id-picker',
      title: 'Select Product',
      // Display rich product information
      renderDisplay: (product) => (
        <Flex gap={3} align="center" width="100%">
          <Avatar src={product.image_url} size="md" />
          <Box flex="1">
            <Text fontWeight="bold">{product.name}</Text>
            <Text fontSize="sm" color="gray.500">
              {product.category} • SKU: {product.sku}
            </Text>
          </Box>
          <Box textAlign="right">
            <Text fontWeight="bold" colorPalette="green">
              ${product.price}
            </Text>
            <Badge colorPalette={product.in_stock ? 'green' : 'red'} size="sm">
              {product.in_stock ? 'In Stock' : 'Out of Stock'}
            </Badge>
          </Box>
        </Flex>
      ),
      // Store SKU instead of ID
      itemToValue: (product) => product.sku,
      customQueryFn: async (params) => {
        const response = await axios.post('/api/products/search', {
          search: params.searching || '',
          limit: params.limit || 50,
        });

        const idMap: Record<string, any> = {};
        response.data.products.forEach((product: any) => {
          idMap[product.sku] = product; // Use SKU as key
        });

        return {
          data: {
            data: response.data.products,
            count: response.data.total,
          },
          idMap,
        };
      },
      loadInitialValues: async (params) => {
        if (!params.ids || params.ids.length === 0) {
          return { data: { data: [], count: 0 }, idMap: {} };
        }

        const { customQueryFn, setIdMap } = params;

        // Load by SKU since itemToValue returns SKU
        const { data, idMap } = await customQueryFn({
          searching: '',
          limit: params.ids.length,
          offset: 0,
          where: [
            {
              id: 'sku', // Filter by SKU field
              value: params.ids.length === 1 ? params.ids[0] : params.ids,
            },
          ],
        });

        if (idMap && Object.keys(idMap).length > 0) {
          setIdMap((state) => ({ ...state, ...idMap }));
        }

        return { data, idMap: idMap || {} };
      },
    },
  },
};
```

### Example 6: Advanced `renderDisplay` with Conditional Styling

This example shows conditional rendering based on item properties:

```tsx
const schema = {
  type: 'object',
  properties: {
    assigned_user: {
      type: 'string',
      variant: 'id-picker',
      title: 'Assign To',
      renderDisplay: (user) => {
        const isOnline = user.status === 'online';
        const isAway = user.status === 'away';

        return (
          <Flex gap={2} align="center" width="100%">
            <Box position="relative">
              <Avatar src={user.avatar_url} size="sm" />
              <Box
                position="absolute"
                bottom="0"
                right="0"
                width="10px"
                height="10px"
                borderRadius="full"
                bg={isOnline ? 'green.500' : isAway ? 'yellow.500' : 'gray.400'}
                border="2px solid"
                borderColor="white"
              />
            </Box>
            <Box flex="1">
              <Text fontWeight="medium">{user.name}</Text>
              <Text fontSize="sm" color="gray.500">
                {user.role} • {user.department}
              </Text>
            </Box>
            {user.isManager && (
              <Badge colorPalette="purple" size="sm">
                Manager
              </Badge>
            )}
          </Flex>
        );
      },
      customQueryFn: userQueryFn,
      loadInitialValues: createDefaultLoadInitialValues(),
    },
  },
};
```

## Best Practices

### 1. Always Provide `loadInitialValues`

Without `loadInitialValues`, selected values will show as IDs instead of human-readable text. Always provide this function.

### 2. Use `idMap` for Caching

Return `idMap` from `customQueryFn` to cache records and avoid unnecessary API calls:

```tsx
customQueryFn: async (params) => {
  const response = await fetchData(params);

  // Create idMap for caching
  const idMap: Record<string, any> = {};
  response.data.items.forEach((item) => {
    idMap[item.id] = item;
  });

  return {
    data: response.data,
    idMap, // Include for caching
  };
};
```

### 3. Reuse `customQueryFn` in `loadInitialValues`

Don't duplicate API logic. Use the provided `customQueryFn`:

```tsx
loadInitialValues: async (params) => {
  const { customQueryFn } = params;
  // Reuse customQueryFn instead of duplicating API call
  return await customQueryFn({
    searching: '',
    limit: params.ids.length,
    where: [{ id: 'id', value: params.ids }],
  });
};
```

### 4. Provide Custom `renderDisplay` for Better UX

Default rendering may not be ideal. Provide a custom `renderDisplay` for better user experience:

```tsx
renderDisplay: (item) => (
  <Flex gap={2}>
    <Text fontWeight="bold">{item.name}</Text>
    <Badge>{item.status}</Badge>
  </Flex>
);
```

**Tips for `renderDisplay`:**

- Keep dropdown items compact and scannable
- Use consistent styling with your application's design system
- Handle edge cases (missing fields, null values)
- Consider dark mode compatibility when using colors
- Test with long text to ensure proper truncation

### 7. Use `itemToValue` When Needed

Only use `itemToValue` when you need to store a different value than the record's ID:

```tsx
// Good: When you need to store username instead of ID
itemToValue: (user) => user.username;

// Avoid: Don't use if default behavior (item.id) works fine
// Just omit itemToValue if item.id is sufficient
```

**Remember:** When using `itemToValue`, always update `loadInitialValues` to load by that value.

### 5. Handle Loading States

The component automatically shows loading states, but ensure your API responds quickly. Consider:

- Debouncing search (already handled - 300ms)
- Limiting results (default: 50)
- Using pagination for large datasets

### 6. Error Handling

Handle errors in `customQueryFn`:

```tsx
customQueryFn: async (params) => {
  try {
    const response = await fetchData(params);
    return { data: response.data, idMap: {} };
  } catch (error) {
    console.error('Failed to fetch:', error);
    // Return empty data - component will show error state
    return { data: { data: [], count: 0 }, idMap: {} };
  }
};
```

## Common Issues

### Issue: Selected values show as IDs instead of names

**Solution:** Ensure `loadInitialValues` is provided and working correctly. Check that it's loading records and updating `idMap`.

### Issue: Search doesn't work

**Solution:**

1. Verify `customQueryFn` is provided
2. Check that `customQueryFn` handles the `searching` parameter
3. Ensure the function returns data in the correct format: `{ data: { data: [], count: 0 } }`

### Issue: Initial values not loading

**Solution:**

1. Check that `loadInitialValues` is provided
2. Verify `preLoadedValues` in `useForm` contains the correct field names
3. Ensure `loadInitialValues` uses `where` parameter correctly to filter by ID

### Issue: Multiple selection not working

**Solution:** Ensure schema uses `type: 'array'` with `items: { type: 'string' }`:

```tsx
{
  type: 'array',        // ← Must be array
  variant: 'id-picker',
  items: {
    type: 'string',     // ← Array items are strings (IDs)
  },
}
```

### Issue: Custom `itemToValue` not working with `loadInitialValues`

**Solution:** When using custom `itemToValue`, update `loadInitialValues` to load by that value, not by `id`:

```tsx
// If itemToValue returns username
itemToValue: (item) => item.username;

// Then loadInitialValues must load by username
loadInitialValues: async (params) => {
  // Load by username, not by id
  const { data } = await customQueryFn({
    where: [{ id: 'username', value: params.ids }],
  });
  // ...
};
```

**Also ensure:**

- The `idMap` uses the same key as `itemToValue` returns
- Your `customQueryFn` supports filtering by that field

### Issue: `renderDisplay` not showing correctly

**Solution:**

1. **Check return type**: `renderDisplay` must return a `ReactNode`. Ensure you're returning valid JSX or a string:

   ```tsx
   // ✅ Good
   renderDisplay: (item) => <Text>{item.name}</Text>;
   renderDisplay: (item) => item.name;

   // ❌ Bad - returns undefined
   renderDisplay: (item) => {
     if (item.name) {
       return <Text>{item.name}</Text>;
     }
     // Missing return for else case
   };
   ```

2. **Handle missing fields**: Always provide fallbacks:

   ```tsx
   renderDisplay: (item) => <Text>{item.name || item.title || 'Unnamed'}</Text>;
   ```

3. **Check component imports**: Ensure all Chakra UI components are imported:
   ```tsx
   import { Flex, Text, Avatar, Badge } from '@chakra-ui/react';
   ```

### Issue: Items showing as `[object Object]` or similar

**Solution:** This happens when `renderDisplay` is not provided and the default fallback can't find a display field. Provide a `renderDisplay` function:

```tsx
// If your items don't have name/title/label fields
renderDisplay: (item) => {
  // Use whatever field contains the display text
  return item.displayName || item.text || String(item.id);
};
```

### Issue: Component shows "Undefined" for selected items

**Solution:**

1. Check that `idMap` is being populated correctly
2. Verify `loadInitialValues` is updating `idMap` via `setIdMap`
3. Ensure the ID in form value matches the key in `idMap`

### Issue: Performance issues with large datasets

**Solution:**

1. Limit results in `customQueryFn` (default is 50)
2. Implement server-side search filtering
3. Use `idMap` caching to avoid refetching
4. Consider pagination for very large datasets

---

For more examples, see the Storybook stories in `src/stories/Form/IdPicker*.stories.tsx`.
