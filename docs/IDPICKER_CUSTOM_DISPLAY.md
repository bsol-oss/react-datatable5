# IdPicker Custom Item Display

## Overview

The IdPicker component allows you to customize how items are displayed in both the combobox dropdown and selected tags using the `renderDisplay` property in your JSON Schema. This enables you to show rich, formatted information beyond just a simple text field.

## When to Use Custom Display

Use `renderDisplay` when you want to:

- Show multiple fields for each item (e.g., name + email)
- Add visual elements like badges, icons, or avatars
- Format text with different styles or colors
- Create a more informative and user-friendly selection interface
- Display complex data structures in a readable way

## Basic Usage

The `renderDisplay` property accepts a function that receives the item object and returns a ReactNode.

### Function Signature

```typescript
renderDisplay: (item: unknown) => ReactNode;
```

### Simple Example

```tsx
import { Text, HStack } from '@chakra-ui/react';
import type { ReactNode } from 'react';

// Define your data type
interface User {
  id: string;
  name: string;
  email: string;
}

// Create a render function
const renderUserDisplay = (item: unknown): ReactNode => {
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

// Use in schema
const schema = {
  type: 'object',
  properties: {
    user_id: {
      type: 'string',
      variant: 'id-picker',
      foreign_key: {
        table: 'users',
        column: 'id',
      },
      renderDisplay: renderUserDisplay, // ← Add custom display function
    },
  },
};
```

## Advanced Examples

### Example 1: Multiple Fields with Badges

Display user information with department badge:

```tsx
import { Text, HStack, VStack, Badge } from '@chakra-ui/react';
import type { ReactNode } from 'react';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  department: string;
}

const renderTeamMemberWithBadge = (item: unknown): ReactNode => {
  const member = item as TeamMember;

  const departmentColors: Record<string, string> = {
    Engineering: 'blue',
    Design: 'purple',
    Marketing: 'pink',
    Sales: 'green',
    HR: 'orange',
    Finance: 'yellow',
  };

  return (
    <HStack gap={3} align="center" width="100%">
      <VStack gap={0} align="start" flex={1}>
        <Text fontWeight="semibold">{member.name}</Text>
        <Text fontSize="xs" color="fg.muted">
          {member.role}
        </Text>
      </VStack>
      <Badge
        colorPalette={departmentColors[member.department] || 'gray'}
        variant="subtle"
      >
        {member.department}
      </Badge>
    </HStack>
  );
};
```

### Example 2: With Avatar Icon

Show user with an avatar:

```tsx
import { Text, HStack, VStack, Avatar } from '@chakra-ui/react';
import type { ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

const renderUserWithAvatar = (item: unknown): ReactNode => {
  const user = item as User;
  return (
    <HStack gap={3}>
      <Avatar size="sm" name={user.name} src={user.avatar} />
      <VStack gap={0} align="start">
        <Text fontWeight="medium">{user.name}</Text>
        <Text fontSize="xs" color="fg.muted">
          {user.email}
        </Text>
      </VStack>
    </HStack>
  );
};
```

### Example 3: Conditional Formatting

Display items with conditional styling:

```tsx
import { Text, HStack, Icon } from '@chakra-ui/react';
import { LuCheckCircle, LuXCircle } from 'react-icons/lu';
import type { ReactNode } from 'react';

interface Product {
  id: string;
  name: string;
  stock: number;
  price: number;
}

const renderProductWithStock = (item: unknown): ReactNode => {
  const product = item as Product;
  const inStock = product.stock > 0;

  return (
    <HStack gap={2} width="100%">
      <Icon color={inStock ? 'green.500' : 'red.500'}>
        {inStock ? <LuCheckCircle /> : <LuXCircle />}
      </Icon>
      <VStack gap={0} align="start" flex={1}>
        <Text fontWeight="medium">{product.name}</Text>
        <Text fontSize="xs" color="fg.muted">
          Stock: {product.stock} • ${product.price}
        </Text>
      </VStack>
    </HStack>
  );
};
```

### Example 4: Compact Tag Display

Create a compact display optimized for tags (when items are selected):

```tsx
import { Text, HStack } from '@chakra-ui/react';
import type { ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  department: string;
}

const renderCompactUserTag = (item: unknown): ReactNode => {
  const user = item as User;
  return (
    <HStack gap={1}>
      <Text>{user.name}</Text>
      <Text fontSize="xs" color="fg.muted">
        • {user.department}
      </Text>
    </HStack>
  );
};
```

### Example 5: Hierarchical Data

Display nested/hierarchical information:

```tsx
import { Text, VStack, HStack } from '@chakra-ui/react';
import type { ReactNode } from 'react';

interface Category {
  id: string;
  name: string;
  parent?: {
    name: string;
  };
  itemCount: number;
}

const renderCategoryWithParent = (item: unknown): ReactNode => {
  const category = item as Category;
  return (
    <VStack gap={0} align="start" width="100%">
      <HStack gap={2}>
        <Text fontWeight="semibold">{category.name}</Text>
        <Text fontSize="xs" color="fg.muted">
          ({category.itemCount} items)
        </Text>
      </HStack>
      {category.parent && (
        <Text fontSize="xs" color="fg.muted">
          in {category.parent.name}
        </Text>
      )}
    </VStack>
  );
};
```

## Complete Form Example

Here's a full example with custom rendering:

```tsx
import { DefaultForm } from '@bsol-oss/react-datatable5';
import { useForm } from '@bsol-oss/react-datatable5';
import { Text, HStack, VStack, Badge } from '@chakra-ui/react';
import type { ReactNode } from 'react';
import { JSONSchema7 } from 'json-schema';

interface Employee {
  id: string;
  name: string;
  email: string;
  department: string;
  role: string;
}

// Custom render function
const renderEmployee = (item: unknown): ReactNode => {
  const employee = item as Employee;
  return (
    <HStack gap={3} align="center" width="100%">
      <VStack gap={0} align="start" flex={1}>
        <Text fontWeight="semibold">{employee.name}</Text>
        <Text fontSize="xs" color="fg.muted">
          {employee.role} • {employee.email}
        </Text>
      </VStack>
      <Badge colorPalette="blue" variant="subtle">
        {employee.department}
      </Badge>
    </HStack>
  );
};

// Custom query function (fetch from API)
const fetchEmployees = async ({ searching, limit, offset }) => {
  const response = await fetch(
    `/api/employees?search=${searching}&limit=${limit}&offset=${offset}`
  );
  const data = await response.json();

  const idMap = Object.fromEntries(
    data.data.map((emp: Employee) => [emp.id, emp])
  );

  return { data, idMap };
};

const MyForm = () => {
  const form = useForm({ keyPrefix: '' });

  const schema: JSONSchema7 = {
    type: 'object',
    required: ['employee_id'],
    properties: {
      // Single selection with custom display
      employee_id: {
        type: 'string',
        variant: 'id-picker',
        foreign_key: {
          table: 'employees',
          column: 'id',
          customQueryFn: fetchEmployees,
        },
        renderDisplay: renderEmployee, // ← Custom display function
      },

      // Multiple selection with custom display
      team_members: {
        type: 'array',
        variant: 'id-picker',
        items: {
          type: 'string',
        },
        foreign_key: {
          table: 'employees',
          column: 'id',
          customQueryFn: fetchEmployees,
        },
        renderDisplay: renderEmployee, // ← Same function works for both
      },
    },
  };

  return (
    <DefaultForm
      formConfig={{
        schema,
        serverUrl: 'http://localhost:8000',
        onSubmit: async (data) => {
          console.log('Form submitted:', data);
        },
        ...form,
      }}
    />
  );
};

export default MyForm;
```

## Important Notes

### 1. Where `renderDisplay` is Used

The `renderDisplay` function is used in **two places**:

- **Combobox dropdown items** - Each option in the dropdown
- **Selected tags** - The display of selected items (for both single and multiple selection)

Both locations use the same render function, so design your display to work well in both contexts.

### 2. TypeScript Type Safety

Always type-assert the `item` parameter to your specific data type:

```tsx
const renderUser = (item: unknown): ReactNode => {
  const user = item as User; // ← Type assertion
  return <Text>{user.name}</Text>;
};
```

### 3. Keep Tag Displays Compact

Since selected items appear as tags (especially in multiple selection), keep your display relatively compact:

```tsx
// Good for tags - compact
const renderCompact = (item: unknown): ReactNode => {
  const user = item as User;
  return <Text>{user.name}</Text>;
};

// Less ideal for tags - too large
const renderVerbose = (item: unknown): ReactNode => {
  const user = item as User;
  return (
    <VStack>
      <Text fontSize="lg">{user.name}</Text>
      <Text>{user.email}</Text>
      <Text>{user.department}</Text>
      <Badge>{user.role}</Badge>
    </VStack>
  );
};
```

### 4. Fallback Behavior

If you don't provide `renderDisplay`, the component will use `defaultRenderDisplay` which stringifies the item using `JSON.stringify(item)`.

### 5. Performance Considerations

The render function is called for every item in the list, so:

- Keep rendering logic simple and fast
- Avoid heavy computations inside the render function
- Use `useMemo` for expensive calculations if needed

```tsx
// If you have expensive color calculations
const getDepartmentColor = useMemo(() => {
  return (dept: string) => {
    // Complex color logic here
    return colorMap[dept];
  };
}, []);

const renderEmployee = (item: unknown): ReactNode => {
  const emp = item as Employee;
  return (
    <HStack>
      <Text>{emp.name}</Text>
      <Badge colorPalette={getDepartmentColor(emp.department)}>
        {emp.department}
      </Badge>
    </HStack>
  );
};
```

### 6. Accessibility

Ensure your custom display maintains good accessibility:

- Use sufficient color contrast
- Don't rely solely on color to convey information
- Keep text readable at small sizes
- Test with screen readers if possible

## Common Use Cases

### E-commerce Product Selection

```tsx
const renderProduct = (item: unknown): ReactNode => {
  const product = item as Product;
  return (
    <HStack gap={3}>
      <img src={product.thumbnail} width="40" height="40" alt="" />
      <VStack gap={0} align="start">
        <Text fontWeight="medium">{product.name}</Text>
        <Text fontSize="xs" color="fg.muted">
          ${product.price} • {product.stock} in stock
        </Text>
      </VStack>
    </HStack>
  );
};
```

### Task Assignment

```tsx
const renderUser = (item: unknown): ReactNode => {
  const user = item as User;
  const isOnline = user.status === 'online';
  return (
    <HStack gap={2}>
      <Box
        width="8px"
        height="8px"
        borderRadius="full"
        bg={isOnline ? 'green.500' : 'gray.300'}
      />
      <Text>{user.name}</Text>
      <Text fontSize="xs" color="fg.muted">
        @{user.username}
      </Text>
    </HStack>
  );
};
```

### Location/Address Selection

```tsx
const renderLocation = (item: unknown): ReactNode => {
  const location = item as Location;
  return (
    <VStack gap={0} align="start">
      <Text fontWeight="semibold">{location.name}</Text>
      <Text fontSize="xs" color="fg.muted">
        {location.address}, {location.city}
      </Text>
      <Text fontSize="xs" color="fg.muted">
        {location.country}
      </Text>
    </VStack>
  );
};
```

## Debugging Tips

If your custom display isn't working:

1. **Check the console for errors** - TypeScript type mismatches will show up here
2. **Verify the item structure** - Log the item to see what data you're receiving:
   ```tsx
   const renderDebug = (item: unknown): ReactNode => {
     console.log('Item received:', item);
     return <Text>Debug</Text>;
   };
   ```
3. **Ensure the function returns a ReactNode** - Strings, numbers, JSX, and null are all valid
4. **Check that renderDisplay is in the correct schema location** - It should be a sibling of `type`, `variant`, and `foreign_key`

## renderDisplay Function

| Feature           | `renderDisplay`                                              |
| ----------------- | ------------------------------------------------------------ | ------------------------- |
| Complexity        | Custom/Complex                                               |
| Returns           | Any ReactNode (JSX, components, etc.)                        |
| Styling           | Full Chakra UI styling                                       |
| Multiple fields   | ✅ Yes                                                       |
| Fallback          | Uses `defaultRenderDisplay` (JSON.stringify) if not provided |
| Icons/Badges      | ❌ No                                                        | ✅ Yes                    |
| Conditional logic | ❌ No                                                        | ✅ Yes                    |
| Setup             | Just specify column name                                     | Define render function    |
| Performance       | Fastest                                                      | Slightly slower (minimal) |

## See Also

- [IdPicker Labels Documentation](./IDPICKER_LABELS.md) - How to customize UI labels (buttons, placeholders, etc.)
- [Form Usage Documentation](./DEFAULTFORM_USAGE.md) - Complete form component guide
- [IdPicker Multiple Selection Story](../src/stories/Form/IdPickerMultiple.stories.tsx) - Live examples with renderDisplay
- [IdPicker Combobox Story](../src/stories/Form/IdPickerCombobox.stories.tsx) - Basic IdPicker examples
