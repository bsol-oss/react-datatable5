# IdPicker Complete Guide

## Overview

The **IdPicker** component is a powerful form field that allows users to select items from a database table or API endpoint. It provides a modern combobox interface with search, keyboard navigation, and support for both single and multiple selection modes.

### Key Features

- 🔍 **Real-time search** with debounced API calls
- ⌨️ **Keyboard navigation** for accessibility
- 🏷️ **Tag-based display** for multiple selections
- 🎨 **Customizable display** with `renderDisplay` function
- 🌐 **Multilingual support** via label objects
- ⚡ **React Query integration** for efficient data fetching
- 📦 **Automatic caching** of selected items
- 🔄 **Loading states** with skeleton loaders

## Table of Contents

1. [Quick Start](#quick-start)
2. [Basic Usage](#basic-usage)
3. [Schema Configuration](#schema-configuration)
4. [Required Properties](#required-properties)
5. [Custom Query Functions](#custom-query-functions)
6. [Single vs Multiple Selection](#single-vs-multiple-selection)
7. [Customizing Display](#customizing-display)
8. [Customizing Labels](#customizing-labels)
9. [Advanced Patterns](#advanced-patterns)
10. [Troubleshooting](#troubleshooting)

## Quick Start

Here's the simplest IdPicker setup:

```tsx
import { DefaultForm } from '@bsol-oss/react-datatable5';
import { useForm } from '@bsol-oss/react-datatable5';
import { JSONSchema7 } from 'json-schema';

const MyForm = () => {
  const form = useForm({});

  const schema: JSONSchema7 = {
    type: 'object',
    properties: {
      user_id: {
        type: 'string',
        variant: 'id-picker',
        foreign_key: {
          table: 'users',
          column: 'id',
        },
        loadInitialValues: async ({ ids }) => {
          // Fetch users by IDs from your API
          const response = await fetch(`/api/users?ids=${ids.join(',')}`);
          const users = await response.json();
          return { data: users };
        },
      },
    },
  };

  return (
    <DefaultForm
      formConfig={{
        schema,
        serverUrl: 'http://localhost:8000',
        onSubmit: (data) => console.log(data),
        ...form,
      }}
    />
  );
};
```

## Basic Usage

### Single Selection

For selecting a single item, use `type: 'string'`:

```tsx
const schema: JSONSchema7 = {
  type: 'object',
  properties: {
    category_id: {
      type: 'string',
      variant: 'id-picker',
      foreign_key: {
        table: 'categories',
        column: 'id',
      },
      loadInitialValues: async ({ ids }) => {
        const response = await fetch(`/api/categories?ids=${ids.join(',')}`);
        const categories = await response.json();
        return { data: categories };
      },
    },
  },
};
```

### Multiple Selection

For selecting multiple items, use `type: 'array'`:

```tsx
const schema: JSONSchema7 = {
  type: 'object',
  properties: {
    team_members: {
      type: 'array',
      variant: 'id-picker',
      items: {
        type: 'string',
      },
      foreign_key: {
        table: 'users',
        column: 'id',
      },
      loadInitialValues: async ({ ids }) => {
        const response = await fetch(`/api/users?ids=${ids.join(',')}`);
        const users = await response.json();
        return { data: users };
      },
    },
  },
};
```

## Schema Configuration

### Required Properties

Every IdPicker field must have these properties:

| Property      | Type                    | Description                                 |
| ------------- | ----------------------- | ------------------------------------------- |
| `type`        | `'string'` or `'array'` | Single or multiple selection                |
| `variant`     | `'id-picker'`           | Identifies this as an IdPicker field        |
| `foreign_key` | `object`                | Defines the table/column and query function |

### Recommended Properties

| Property            | Type       | Description                                                                           |
| ------------------- | ---------- | ------------------------------------------------------------------------------------- |
| `loadInitialValues` | `function` | Loads records for display when form has initial values (recommended but not required) |

### Optional Properties

| Property        | Type                           | Description                                 |
| --------------- | ------------------------------ | ------------------------------------------- |
| `renderDisplay` | `(item: unknown) => ReactNode` | Custom function to render items             |
| `required`      | `string[]`                     | Array of required field names               |
| `gridColumn`    | `string`                       | CSS grid column span (default: `'span 12'`) |
| `gridRow`       | `string`                       | CSS grid row span (default: `'span 1'`)     |

### Complete Schema Example

```tsx
const schema: JSONSchema7 = {
  type: 'object',
  required: ['user_id', 'team_members'],
  properties: {
    user_id: {
      type: 'string',
      variant: 'id-picker',
      gridColumn: 'span 6', // Custom grid layout
      foreign_key: {
        table: 'users',
        column: 'id',
        customQueryFn: customUserQuery,
      },
      renderDisplay: renderUserDisplay, // Custom display
      loadInitialValues: async ({ ids }) => {
        const users = await fetchUsersByIds(ids);
        return { data: users };
      },
    },
    team_members: {
      type: 'array',
      variant: 'id-picker',
      items: { type: 'string' },
      foreign_key: {
        table: 'users',
        column: 'id',
        customQueryFn: customUserQuery,
      },
      loadInitialValues: async ({ ids }) => {
        const users = await fetchUsersByIds(ids);
        return { data: users };
      },
    },
  },
};
```

## Required Properties

### 1. `foreign_key` Object

Defines the data source for the IdPicker:

```tsx
foreign_key: {
  table: 'users',        // Table name (for reference)
  column: 'id',          // Column name (for reference)
  customQueryFn?: (params) => Promise<{ data: { data: T[], count: number }, idMap?: Record<string, T> }>
}
```

#### Using Default Query (with `serverUrl`)

If you provide `serverUrl` in `FormRoot`/`DefaultForm`, the IdPicker will automatically query:

```
GET {serverUrl}/api/{table}?offset=0&limit=50&searching={searchText}
```

**Example:**

```tsx
<DefaultForm
  formConfig={{
    schema,
    serverUrl: 'http://localhost:8000', // ← Enables default query
    ...form,
  }}
/>
```

#### Using Custom Query Function

For more control, provide `customQueryFn`:

```tsx
const customUserQuery = async ({
  searching,
  limit = 50,
  offset = 0,
  where,
}: CustomQueryFnParams) => {
  // Build your query
  const params = new URLSearchParams({
    limit: limit.toString(),
    offset: offset.toString(),
  });

  if (searching) {
    params.append('search', searching);
  }

  // Handle where clause for loading specific IDs
  if (where && where.length > 0) {
    const whereClause = where[0];
    if (whereClause.id === 'id' && whereClause.value) {
      const ids = Array.isArray(whereClause.value)
        ? whereClause.value
        : [whereClause.value];
      params.append('ids', ids.join(','));
    }
  }

  // Fetch from your API
  const response = await fetch(`/api/users?${params}`);
  const result = await response.json();

  // Transform to expected format
  const idMap = Object.fromEntries(
    result.data.map((user: User) => [user.id, user])
  );

  return {
    data: {
      data: result.data,
      count: result.count || result.data.length,
    },
    idMap, // Optional: pre-populate cache
  };
};

// Use in schema
foreign_key: {
  table: 'users',
  column: 'id',
  customQueryFn: customUserQuery,
}
```

## Custom Query Functions

### Query Function Parameters

```typescript
interface CustomQueryFnParams {
  searching?: string; // Search text from user input
  limit?: number; // Number of items to fetch (default: 50)
  offset?: number; // Pagination offset (default: 0)
  where?: Array<{
    // Filter conditions
    id: string;
    value: string | string[];
  }>;
}
```

### Expected Return Format

```typescript
{
  data: {
    data: T[];              // Array of items
    count: number;          // Total count (for pagination)
  };
  idMap?: Record<string, T>; // Optional: pre-populate cache
}
```

### Example: External API Integration

```tsx
const jsonPlaceholderQuery = async ({
  searching,
  limit = 50,
  offset = 0,
  where,
}: CustomQueryFnParams) => {
  // Handle loading specific IDs
  if (where && where.length > 0) {
    const whereClause = where[0];
    if (whereClause.id === 'id' && whereClause.value) {
      const ids = Array.isArray(whereClause.value)
        ? whereClause.value
        : [whereClause.value];

      // Fetch specific users by ID
      const userPromises = ids.map((id) =>
        fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
          .then((res) => res.json())
          .catch(() => null)
      );

      const users = (await Promise.all(userPromises)).filter(
        (user) => user !== null
      );

      return {
        data: {
          data: users,
          count: users.length,
        },
        idMap: Object.fromEntries(users.map((u) => [String(u.id), u])),
      };
    }
  }

  // Fetch all users
  const response = await fetch('https://jsonplaceholder.typicode.com/users');
  let users = await response.json();

  // Filter by search term
  if (searching) {
    const searchLower = searching.toLowerCase();
    users = users.filter(
      (user) =>
        user.name.toLowerCase().includes(searchLower) ||
        user.email.toLowerCase().includes(searchLower)
    );
  }

  // Paginate
  const paginated = users.slice(offset, offset + limit);

  return {
    data: {
      data: paginated,
      count: users.length,
    },
    idMap: Object.fromEntries(paginated.map((u) => [String(u.id), u])),
  };
};
```

## Single vs Multiple Selection

### Single Selection

- **Schema:** `type: 'string'`
- **Form value:** `string` (the selected ID)
- **Display:** Shows selected value above the combobox
- **Behavior:** Closes dropdown on selection

```tsx
{
  type: 'string',
  variant: 'id-picker',
  // ... rest of config
}
```

### Multiple Selection

- **Schema:** `type: 'array'` with `items: { type: 'string' }`
- **Form value:** `string[]` (array of selected IDs)
- **Display:** Shows selected items as removable tags
- **Behavior:** Keeps dropdown open after selection

```tsx
{
  type: 'array',
  variant: 'id-picker',
  items: {
    type: 'string',
  },
  // ... rest of config
}
```

## Customizing Display

The `renderDisplay` function allows you to customize how items appear in both the dropdown and selected tags.

### Basic Example

```tsx
import { Text, HStack } from '@chakra-ui/react';
import type { ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
}

const renderUser = (item: unknown): ReactNode => {
  const user = item as User;
  return (
    <HStack gap={2}>
      <Text fontWeight="medium">{user.name}</Text>
      <Text fontSize="sm" color="fg.muted">
        ({user.email})
      </Text>
    </HStack>
  );
};

// In schema
{
  renderDisplay: renderUser,
}
```

### Advanced Example with Badges

```tsx
import { Text, HStack, VStack, Badge } from '@chakra-ui/react';

const renderUserWithBadge = (item: unknown): ReactNode => {
  const user = item as User;
  return (
    <HStack gap={3} align="center" width="100%">
      <VStack gap={0} align="start" flex={1}>
        <Text fontWeight="semibold">{user.name}</Text>
        <Text fontSize="xs" color="fg.muted">
          {user.role} • {user.email}
        </Text>
      </VStack>
      <Badge colorPalette="blue" variant="subtle">
        {user.department}
      </Badge>
    </HStack>
  );
};
```

📖 **See [IdPicker Custom Display Documentation](./IDPICKER_CUSTOM_DISPLAY.md)** for more examples and patterns.

## Customizing Labels

Customize UI text (placeholders, buttons, messages) using the `idPickerLabels` prop:

```tsx
<DefaultForm
  formConfig={{
    schema,
    idPickerLabels: {
      typeToSearch: 'Search users...',
      emptySearchResult: 'No users found',
      addMore: 'Add another user',
      undefined: 'User not found',
      total: 'Total',
      showing: 'Showing',
      perPage: 'per page',
      initialResults: 'Start typing to search',
    },
    ...form,
  }}
/>
```

📖 **See [IdPicker Labels Documentation](./IDPICKER_LABELS.md)** for complete label reference and multilingual examples.

## Advanced Patterns

### Pattern 1: Conditional Display Based on User Role

```tsx
const renderUserWithRole = (item: unknown): ReactNode => {
  const user = item as User;
  const isAdmin = user.role === 'admin';

  return (
    <HStack gap={2}>
      <Text fontWeight={isAdmin ? 'bold' : 'normal'}>{user.name}</Text>
      {isAdmin && (
        <Badge colorPalette="red" size="sm">
          Admin
        </Badge>
      )}
    </HStack>
  );
};
```

### Pattern 2: Loading State Handling

The IdPicker automatically handles loading states, but you can customize the query function:

```tsx
const customQueryWithLoading = async (params: CustomQueryFnParams) => {
  // Add artificial delay to see loading states
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Your query logic here
  const response = await fetch('/api/users');
  const data = await response.json();

  return {
    data: {
      data: data.items,
      count: data.total,
    },
  };
};
```

### Pattern 3: Filtering by Related Data

```tsx
const queryUsersByDepartment = async ({
  searching,
  limit,
  offset,
}: CustomQueryFnParams) => {
  const params = new URLSearchParams({
    limit: limit?.toString() || '50',
    offset: offset?.toString() || '0',
    department: 'engineering', // Filter by department
  });

  if (searching) {
    params.append('search', searching);
  }

  const response = await fetch(`/api/users?${params}`);
  const result = await response.json();

  return {
    data: {
      data: result.data,
      count: result.count,
    },
  };
};
```

### Pattern 4: Combining Multiple IdPickers

```tsx
const schema: JSONSchema7 = {
  type: 'object',
  properties: {
    // Manager selection
    manager_id: {
      type: 'string',
      variant: 'id-picker',
      foreign_key: {
        table: 'users',
        column: 'id',
        customQueryFn: queryManagersOnly,
      },
      loadInitialValues: loadUserByIds,
    },
    // Team members (filtered by manager)
    team_members: {
      type: 'array',
      variant: 'id-picker',
      items: { type: 'string' },
      foreign_key: {
        table: 'users',
        column: 'id',
        customQueryFn: queryTeamMembers,
      },
      loadInitialValues: loadUserByIds,
    },
  },
};
```

## Recommended Properties

### 1. `loadInitialValues` Function

**Purpose:** Loads full record data for IDs that are already selected (e.g., when editing an existing form).

**When it's called:**

- On component mount if the form has initial values
- When IDs are selected but not yet in the `idMap` cache

**Function signature:**

```typescript
loadInitialValues: (params: { ids: string[] }) =>
  Promise<{
    data: Array<Record<string, any>>;
  }>;
```

**Example:**

```tsx
loadInitialValues: async ({ ids }) => {
  if (ids.length === 0) {
    return { data: [] };
  }

  // Fetch records from your API
  const response = await fetch(`/api/users?ids=${ids.join(',')}`);
  const users = await response.json();

  // Return in expected format
  return { data: users };
};
```

**Important:** This function is **recommended** for proper display of initial values. If missing, a warning will be logged to the console and the component will continue to work, but initial values may not display correctly.

## Troubleshooting

### Warning: "loadInitialValues is recommended"

**Problem:** The schema is missing the `loadInitialValues` function.

**Impact:** Initial values may not display correctly (showing IDs instead of human-readable text).

**Solution:** Add `loadInitialValues` to your schema:

```tsx
{
  type: 'string',
  variant: 'id-picker',
  foreign_key: { /* ... */ },
  loadInitialValues: async ({ ids }) => {
    // Your implementation
    return { data: [] };
  },
}
```

### Selected Items Show "Undefined"

**Problem:** The `idMap` doesn't contain the selected IDs, or `loadInitialValues` isn't working.

**Solutions:**

1. Ensure `loadInitialValues` is provided in the schema (check console for warnings)
2. Check that `loadInitialValues` is correctly implemented
3. Verify the API returns data in the expected format: `{ data: [...] }`
4. Ensure IDs match between the form value and the API response

### Search Not Working

**Problem:** The search functionality isn't filtering results.

**Solutions:**

1. If using `customQueryFn`, ensure you're handling the `searching` parameter
2. Check that your API endpoint supports search queries
3. Verify the search parameter name matches what your API expects

### Items Not Loading on Mount

**Problem:** Initial values aren't being loaded when the form mounts.

**Solutions:**

1. Ensure `loadInitialValues` is provided in the schema (check console for warnings)
2. Check that `loadInitialValues` is correctly implemented and working
3. Check that form initial values are set correctly
4. Verify the query function handles the `where` clause for loading specific IDs

### TypeScript Errors

**Problem:** Type errors with `renderDisplay` or query functions.

**Solutions:**

1. Type-assert the `item` parameter in `renderDisplay`:
   ```tsx
   const renderUser = (item: unknown): ReactNode => {
     const user = item as User; // ← Type assertion
     return <Text>{user.name}</Text>;
   };
   ```
2. Use proper types for query functions:
   ```tsx
   import type { CustomQueryFnParams } from '@bsol-oss/react-datatable5';
   ```

### Performance Issues

**Problem:** The component is slow or making too many API calls.

**Solutions:**

1. The search is automatically debounced (300ms), but you can adjust this
2. Ensure your `customQueryFn` implements proper pagination
3. Use `idMap` in the query response to pre-populate the cache
4. Keep `renderDisplay` functions lightweight

## Related Documentation

- **[IdPicker Labels](./IDPICKER_LABELS.md)** - Complete guide to customizing UI labels
- **[IdPicker Custom Display](./IDPICKER_CUSTOM_DISPLAY.md)** - Guide to customizing item display
- **[IdPicker Quick Reference](./IDPICKER_QUICK_REFERENCE.md)** - Quick comparison of customization options
- **[Form Usage Documentation](./DEFAULTFORM_USAGE.md)** - Complete form component guide

## Examples

- **[IdPicker Combobox Story](../src/stories/Form/IdPickerCombobox.stories.tsx)** - Live examples with public API
- **[IdPicker Multiple Selection Story](../src/stories/Form/IdPickerMultiple.stories.tsx)** - Multiple selection examples
- **[IdPicker Initial Values Story](../src/stories/Form/IdPickerInitialValues.stories.tsx)** - Loading initial values
- **[IdPicker I18n Story](../src/stories/Form/IdPickerI18n.stories.tsx)** - Multilingual examples
