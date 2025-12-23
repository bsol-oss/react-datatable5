# IdPicker Labels Documentation

## Overview

This document covers how to customize **UI labels** for the IdPicker component (buttons, placeholders, error messages, etc.).

> **📝 Note:** If you want to customize how **items/options are displayed** in the combobox dropdown (e.g., showing name + email), see [IdPicker Custom Display Documentation](./IDPICKER_CUSTOM_DISPLAY.md).

The IdPicker component uses label objects (via `FormRoot` props) to provide all UI labels. Components work fully with label objects - no i18n dependency required.

## Label Priority

The IdPicker component uses label objects with fallback text:

```
idPickerLabels prop → fallback text
```

## Available IdPicker Labels

The `IdPickerLabels` interface includes the following properties:

| Label Key           | Description                                | Example Usage            |
| ------------------- | ------------------------------------------ | ------------------------ |
| `undefined`         | Text shown when an item is not found       | "Item not found"         |
| `addMore`           | Label for the add more button              | "Add more items"         |
| `typeToSearch`      | Placeholder text for search input          | "Type to search..."      |
| `total`             | Label for total count                      | "Total"                  |
| `showing`           | Label for showing count                    | "Showing"                |
| `perPage`           | Label for per page count                   | "per page"               |
| `emptySearchResult` | Message when search returns no results     | "No results found"       |
| `initialResults`    | Message shown before user starts searching | "Start typing to search" |

## Using Label Objects

Pass the `idPickerLabels` prop to `FormRoot` or `DefaultForm` to provide all necessary labels.

### Example: Basic Usage

```tsx
import { DefaultForm } from '@bsol-oss/react-datatable5';
import { useForm } from '@bsol-oss/react-datatable5';

const MyForm = () => {
  const form = useForm({ keyPrefix: '' });

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
      },
    },
  };

  return (
    <DefaultForm
      formConfig={{
        schema,
        serverUrl: 'http://localhost:8000',
        onSubmit: (data) => console.log(data),
        // Provide all IdPicker labels here
        idPickerLabels: {
          undefined: 'User not found',
          addMore: 'Add another user',
          typeToSearch: 'Search for users...',
          total: 'Total users',
          showing: 'Showing',
          perPage: 'per page',
          emptySearchResult: 'No users found matching your search',
          initialResults: 'Start typing to search for users',
        },
        ...form,
      }}
    />
  );
};
```

### Example: Multiple IdPicker Fields

```tsx
import { DefaultForm } from '@bsol-oss/react-datatable5';

const MultipleIdPickersForm = () => {
  const form = useForm({ keyPrefix: '' });

  const schema = {
    type: 'object',
    properties: {
      // Single selection
      category_id: {
        type: 'string',
        variant: 'id-picker',
        foreign_key: {
          table: 'categories',
          column: 'id',
        },
      },
      // Multiple selection
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
      },
    },
  };

  return (
    <DefaultForm
      formConfig={{
        schema,
        serverUrl: 'http://localhost:8000',
        onSubmit: (data) => console.log(data),
        // These labels apply to ALL IdPicker fields in the form
        idPickerLabels: {
          undefined: 'Item not found',
          addMore: 'Add more',
          typeToSearch: 'Type to search...',
          total: 'Total',
          showing: 'Showing',
          perPage: 'per page',
          emptySearchResult: 'No results found',
          initialResults: 'Click to search',
        },
        ...form,
      }}
    />
  );
};
```

### Example: Multilingual Support

To support multiple languages, switch label objects:

```tsx
import { useState } from 'react';
import { DefaultForm } from '@bsol-oss/react-datatable5';

const MultilingualForm = () => {
  const form = useForm({ keyPrefix: '' });
  const [language, setLanguage] = useState<'en' | 'zh'>('en');

  const labels = {
    en: {
      undefined: 'User not found',
      addMore: 'Add more users',
      typeToSearch: 'Type to search users...',
      total: 'Total',
      showing: 'Showing',
      perPage: 'per page',
      emptySearchResult: 'No users found',
      initialResults: 'Start typing to search',
    },
    zh: {
      undefined: '找不到用戶',
      addMore: '新增更多用戶',
      typeToSearch: '輸入以搜尋用戶...',
      total: '總數',
      showing: '顯示',
      perPage: '每頁',
      emptySearchResult: '找不到用戶',
      initialResults: '開始輸入以搜尋',
    },
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
      },
    },
  };

  return (
    <>
      <button onClick={() => setLanguage('en')}>English</button>
      <button onClick={() => setLanguage('zh')}>中文</button>

      <DefaultForm
        formConfig={{
          schema,
          serverUrl: 'http://localhost:8000',
          onSubmit: (data) => console.log(data),
          idPickerLabels: labels[language],
          ...form,
        }}
      />
    </>
  );
};
```

## TypeScript Types

The `IdPickerLabels` interface is exported from the library:

```tsx
import { IdPickerLabels } from '@bsol-oss/react-datatable5';

const myLabels: IdPickerLabels = {
  undefined: 'Not found',
  addMore: 'Add more',
  typeToSearch: 'Search...',
  total: 'Total',
  showing: 'Showing',
  perPage: 'per page',
  emptySearchResult: 'No results',
  initialResults: 'Start typing',
};
```

All properties in `IdPickerLabels` are optional, so you only need to provide the labels you want to override.

## Common Pitfalls

### ❌ Forgetting to Spread form

```tsx
// Wrong - form state not included
<DefaultForm
  formConfig={{
    schema,
    serverUrl: 'http://localhost:8000',
    idPickerLabels: {
      /* ... */
    },
  }}
/>
```

```tsx
// Correct
<DefaultForm
  formConfig={{
    schema,
    serverUrl: 'http://localhost:8000',
    idPickerLabels: {
      /* ... */
    },
    ...form, // ← Don't forget this!
  }}
/>
```

### ❌ Setting Labels on Schema

```tsx
// Wrong - labels don't go in schema
const schema = {
  type: 'object',
  properties: {
    user_id: {
      type: 'string',
      variant: 'id-picker',
      idPickerLabels: {
        /* ... */
      }, // ← This doesn't work
      foreign_key: {
        table: 'users',
        column: 'id',
      },
    },
  },
};
```

```tsx
// Correct - labels go in formConfig
<DefaultForm
  formConfig={{
    schema,
    idPickerLabels: {
      /* ... */
    }, // ← Labels go here
    ...form,
  }}
/>
```

### ❌ Using FormRoot Instead of DefaultForm

If you're using `FormRoot` directly, make sure to pass the labels:

```tsx
import { FormRoot, FormBody } from '@bsol-oss/react-datatable5';

<FormRoot
  schema={schema}
  serverUrl="http://localhost:8000"
  onSubmit={(data) => console.log(data)}
  idPickerLabels={{
    typeToSearch: 'Search...',
    emptySearchResult: 'No results',
  }}
>
  <FormBody />
</FormRoot>;
```

## See Also

- **[IdPicker Custom Display](./IDPICKER_CUSTOM_DISPLAY.md)** - How to customize item/option display in the combobox
- [Form Usage Documentation](./DEFAULTFORM_USAGE.md) - Complete form component guide
- [Validation Documentation](./VALIDATION_I18N.md) - Validation error messages
- [IdPicker Combobox Story](../src/stories/Form/IdPickerCombobox.stories.tsx) - Live examples
- [Custom Labels Story](../src/stories/Form/CustomLabels.stories.tsx) - Examples of overriding labels
