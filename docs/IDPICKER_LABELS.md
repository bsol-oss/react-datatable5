# IdPicker Labels Documentation

## Overview

This document covers how to customize **UI labels** for the IdPicker component (buttons, placeholders, error messages, etc.).

> **📝 Note:** If you want to customize how **items/options are displayed** in the combobox dropdown (e.g., showing name + email), see [IdPicker Custom Display Documentation](./IDPICKER_CUSTOM_DISPLAY.md).

The IdPicker component supports two ways to provide UI labels:

1. **i18n translation keys** (via `react-i18next`)
2. **Label objects** (via `FormRoot` props) - **Preferred when translations don't exist**

This document explains how to set IdPicker UI labels when translation keys are not available in your i18n configuration.

## Label Priority

The IdPicker component follows this priority order for labels:

```
idPickerLabels prop → i18n translation → fallback text
```

This allows you to override or provide labels without modifying your translation files.

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

## Method 1: Using Label Objects (Recommended)

When you don't have i18n translations set up, or want to override existing translations, pass the `idPickerLabels` prop to `FormRoot` or `DefaultForm`.

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

### Example: Multilingual Without i18n Setup

If you want to support multiple languages without setting up i18n, you can switch label objects:

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

## Method 2: Using i18n Translation Keys

If you have i18n set up with `react-i18next`, you can provide translations for each field individually.

### Translation Key Pattern

For a field named `user_id`, the IdPicker will look for these translation keys:

```
{field_name}.undefined
{field_name}.add_more
{field_name}.type_to_search
{field_name}.total
{field_name}.showing
{field_name}.per_page
{field_name}.empty_search_result
{field_name}.initial_results
{field_name}.loading
{field_name}.loading_failed
```

### Example: i18n Configuration

```tsx
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  fallbackLng: 'en',
  lng: 'en',
  resources: {
    en: {
      translation: {
        // For field: user_id
        'user_id.field_label': 'Select User',
        'user_id.field_required': 'User is required',
        'user_id.undefined': 'User not found',
        'user_id.add_more': 'Add user',
        'user_id.type_to_search': 'Search for users...',
        'user_id.total': 'Total',
        'user_id.showing': 'Showing',
        'user_id.per_page': 'per page',
        'user_id.empty_search_result': 'No users found',
        'user_id.initial_results': 'Start typing to search',
        'user_id.loading': 'Loading users...',
        'user_id.loading_failed': 'Failed to load users',

        // For field: category_id
        'category_id.field_label': 'Select Category',
        'category_id.undefined': 'Category not found',
        'category_id.type_to_search': 'Search categories...',
        // ... other keys
      },
    },
    'zh-HK': {
      translation: {
        'user_id.field_label': '選擇用戶',
        'user_id.field_required': '必須選擇用戶',
        'user_id.undefined': '找不到用戶',
        'user_id.add_more': '新增用戶',
        'user_id.type_to_search': '搜尋用戶...',
        'user_id.total': '總數',
        'user_id.showing': '顯示',
        'user_id.per_page': '每頁',
        'user_id.empty_search_result': '找不到用戶',
        'user_id.initial_results': '開始輸入以搜尋',
        // ... other keys
      },
    },
  },
});
```

## Comparison: Label Objects vs i18n

### Use Label Objects When:

✅ You don't have i18n set up  
✅ You want quick prototyping without translation files  
✅ You have simple language switching needs  
✅ All IdPicker fields should share the same labels  
✅ You want to override existing translations globally

### Use i18n When:

✅ You have comprehensive i18n infrastructure  
✅ Each IdPicker field needs different labels  
✅ You need to support many languages  
✅ You want field-specific customization  
✅ Your app already uses `react-i18next`

## Hybrid Approach

You can combine both methods. Label objects will take priority over i18n translations:

```tsx
<DefaultForm
  formConfig={{
    schema,
    serverUrl: 'http://localhost:8000',
    onSubmit: (data) => console.log(data),
    // Global labels that override i18n
    idPickerLabels: {
      typeToSearch: 'Search...', // Overrides all type_to_search i18n keys
      emptySearchResult: 'No results', // Overrides all empty_search_result keys
    },
    // Other labels will fall back to i18n translations
    ...form,
  }}
/>
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
- [Validation and i18n](./VALIDATION_I18N.md) - Validation and internationalization
- [IdPicker Combobox Story](../src/stories/Form/IdPickerCombobox.stories.tsx) - Live examples
- [Custom Labels Story](../src/stories/Form/CustomLabels.stories.tsx) - Examples of overriding labels
