# IdPicker Quick Reference

## What's the Difference?

When working with IdPicker, there are **two different types of customization**:

### 1. UI Labels (Buttons, Placeholders, Messages)

These are the **interface labels** like "Type to search", "Add more", "No results found", etc.

📖 See: [IdPicker Labels Documentation](./IDPICKER_LABELS.md)

**Set via:** `idPickerLabels` prop on `FormRoot`/`DefaultForm`

```tsx
<DefaultForm
  formConfig={{
    schema,
    idPickerLabels: {
      typeToSearch: 'Search users...', // ← Placeholder text
      emptySearchResult: 'No users found', // ← Empty state message
      addMore: 'Add another user', // ← Button text
      undefined: 'User not found', // ← Error message
    },
    ...form,
  }}
/>
```

### 2. Item Display (What Each Option Shows)

This is **how each item/option** is rendered in the dropdown and selected tags.

📖 See: [IdPicker Custom Display Documentation](./IDPICKER_CUSTOM_DISPLAY.md)

**Set via:** `renderDisplay` function in schema

```tsx
const renderUser = (item: unknown): ReactNode => {
  const user = item as User;
  return (
    <HStack>
      <Text fontWeight="bold">{user.name}</Text>
      <Text color="gray">({user.email})</Text>
    </HStack>
  );
};

const schema = {
  type: 'object',
  properties: {
    user_id: {
      type: 'string',
      variant: 'id-picker',
      foreign_key: {
        /* ... */
      },
      renderDisplay: renderUser, // ← Custom item display
    },
  },
};
```

## Visual Comparison

```
┌─────────────────────────────────────────┐
│  Select User                            │  ← Field Label (from i18n)
├─────────────────────────────────────────┤
│  Search users...            🔽          │  ← typeToSearch (UI Label)
└─────────────────────────────────────────┘
  │
  └─ Opens dropdown ▼

  ┌─────────────────────────────────────────┐
  │ ┌─────────────────────────────────────┐ │
  │ │ Alice Chen (alice@example.com)    ✓│ │ ← renderDisplay (Item Display)
  │ └─────────────────────────────────────┘ │
  │ ┌─────────────────────────────────────┐ │
  │ │ Bob Wong (bob@example.com)          │ │ ← renderDisplay (Item Display)
  │ └─────────────────────────────────────┘ │
  │ ┌─────────────────────────────────────┐ │
  │ │ Charlie Lee (charlie@example.com)   │ │ ← renderDisplay (Item Display)
  │ └─────────────────────────────────────┘ │
  │                                         │
  │  No users found                         │ ← emptySearchResult (UI Label)
  └─────────────────────────────────────────┘
```

## Complete Example

Here's a complete example showing both types of customization:

```tsx
import { DefaultForm } from '@bsol-oss/react-datatable5';
import { useForm } from '@bsol-oss/react-datatable5';
import { Text, HStack, Badge } from '@chakra-ui/react';
import type { ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  department: string;
}

const MyForm = () => {
  const form = useForm({ keyPrefix: '' });

  // 1. Define how each item should be displayed (renderDisplay)
  const renderUser = (item: unknown): ReactNode => {
    const user = item as User;
    return (
      <HStack gap={2}>
        <Text fontWeight="medium">{user.name}</Text>
        <Text fontSize="sm" color="gray.600">
          {user.email}
        </Text>
        <Badge colorPalette="blue">{user.department}</Badge>
      </HStack>
    );
  };

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
        renderDisplay: renderUser, // ← Custom item display
      },
    },
  };

  return (
    <DefaultForm
      formConfig={{
        schema,
        serverUrl: 'http://localhost:8000',
        onSubmit: (data) => console.log(data),

        // 2. Define UI labels (idPickerLabels)
        idPickerLabels: {
          typeToSearch: 'Search for users...',
          emptySearchResult: 'No users match your search',
          addMore: 'Add User',
          undefined: 'User not found',
          initialResults: 'Start typing to find users',
        },

        ...form,
      }}
    />
  );
};
```

## Quick Decision Guide

**Need to customize the combobox items (show email, badge, avatar, etc.)?**
→ Use `renderDisplay` in schema  
→ See: [Custom Display Docs](./IDPICKER_CUSTOM_DISPLAY.md)

**Need to translate or customize UI text (placeholder, buttons, messages)?**
→ Use `idPickerLabels` prop or i18n  
→ See: [Labels Docs](./IDPICKER_LABELS.md)

**Need both?**
→ Use both! They work together perfectly. ✨

## Common Scenarios

### Scenario 1: Simple Text Customization

**Goal:** Change placeholder text from default to "Type to find users"

**Solution:** Use `idPickerLabels`

```tsx
<DefaultForm
  formConfig={{
    idPickerLabels: {
      typeToSearch: 'Type to find users',
    },
  }}
/>
```

### Scenario 2: Show Email with Name

**Goal:** Display "Alice Chen (alice@example.com)" instead of just "Alice Chen"

**Solution:** Use `renderDisplay`

```tsx
const renderUser = (item: unknown): ReactNode => {
  const user = item as User;
  return `${user.name} (${user.email})`;
};

// In schema:
{
  user_id: {
    renderDisplay: renderUser,
  }
}
```

### Scenario 3: Multilingual UI

**Goal:** Support English and Chinese UI labels

**Solution:** Use `idPickerLabels` with language switching

```tsx
const labels = {
  en: {
    typeToSearch: 'Type to search...',
    emptySearchResult: 'No results',
  },
  zh: {
    typeToSearch: '輸入以搜尋...',
    emptySearchResult: '找不到結果',
  },
};

<DefaultForm
  formConfig={{
    idPickerLabels: labels[currentLanguage],
  }}
/>;
```

### Scenario 4: Rich Visual Display

**Goal:** Show users with avatars, roles, and department badges

**Solution:** Use `renderDisplay` with Chakra UI components

```tsx
const renderRichUser = (item: unknown): ReactNode => {
  const user = item as User;
  return (
    <HStack gap={3}>
      <Avatar size="sm" name={user.name} src={user.avatar} />
      <VStack gap={0} align="start" flex={1}>
        <Text fontWeight="semibold">{user.name}</Text>
        <Text fontSize="xs" color="gray.600">
          {user.role}
        </Text>
      </VStack>
      <Badge>{user.department}</Badge>
    </HStack>
  );
};
```

## TypeScript Types

Both customization options have proper TypeScript support:

```tsx
import type { IdPickerLabels } from '@bsol-oss/react-datatable5';
import type { ReactNode } from 'react';

// UI Labels type
const myLabels: IdPickerLabels = {
  typeToSearch: 'Search...',
  emptySearchResult: 'No results',
  addMore: 'Add more',
  undefined: 'Not found',
  total: 'Total',
  showing: 'Showing',
  perPage: 'per page',
  initialResults: 'Start typing',
};

// Item Display function type
const myRenderDisplay: (item: unknown) => ReactNode = (item) => {
  const user = item as User;
  return <Text>{user.name}</Text>;
};
```

## Related Documentation

- **[IdPicker Custom Display](./IDPICKER_CUSTOM_DISPLAY.md)** - Full guide on customizing item display
- **[IdPicker Labels](./IDPICKER_LABELS.md)** - Full guide on customizing UI labels
- **[Form Usage](./DEFAULTFORM_USAGE.md)** - Complete form component documentation
