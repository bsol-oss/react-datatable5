# DefaultForm with JSON Schema Usage Guide

This guide provides comprehensive instructions for using the `DefaultForm` component with JSON Schema in the `@bsol-oss/react-datatable5` library.

Components work fully with label objects and direct error message strings - no i18n dependency required.

## Table of Contents

- [Overview](#overview)
- [Prerequisites](#prerequisites)
- [Basic Usage](#basic-usage)
- [JSON Schema Reference](#json-schema-reference)
- [Translation JSON Structure](#translation-json-structure)
- [Complete Examples](#complete-examples)
- [Advanced Topics](#advanced-topics)

## Overview

The `DefaultForm` component is a powerful form builder that automatically generates forms from JSON Schema definitions. It supports:

- **Automatic Field Generation**: Creates appropriate input fields based on JSON Schema types
- **Label Objects**: Provide labels via props (no i18n required)
- **Validation**: Built-in AJV validation with custom error messages (direct strings)
- **Flexible Layout**: Grid-based layout with customizable field positioning
- **Rich Field Types**: Support for strings, numbers, dates, arrays, objects, and custom components

## Prerequisites

### Peer Dependencies

This library requires the following peer dependencies to be installed in your project:

```json
{
  "react": "^19.0.0",
  "@chakra-ui/react": "^3.19.0",
  "@tanstack/react-table": "^8.21.0",
  "@tanstack/react-query": "^5.66.0",
  "react-hook-form": "^7.54.0",
  "ajv": "^8.0.0",
  "ajv-formats": "^2.0.0",
  "ajv-errors": "^2.0.0",
  "dayjs": "^1.0.0"
}
```

### Installation

```bash
npm install @bsol-oss/react-datatable5
npm install react react-hook-form ajv ajv-formats ajv-errors dayjs
npm install @chakra-ui/react @tanstack/react-table @tanstack/react-query
```

## Basic Usage

### Minimal Example

```tsx
import { DefaultForm, useForm } from '@bsol-oss/react-datatable5';
import { useState } from 'react';

const MyForm = () => {
  const form = useForm({
    // preLoadedValues: { name: 'John Doe' }, // Optional: pre-populate form
  });

  const [idMap, setIdMap] = useState({});

  const schema = {
    type: 'object',
    required: ['name', 'email'],
    properties: {
      name: {
        type: 'string',
        minLength: 2,
        maxLength: 50,
      },
      email: {
        type: 'string',
        format: 'email',
      },
      age: {
        type: 'integer',
        minimum: 18,
        maximum: 120,
      },
    },
  };

  return (
    <DefaultForm
      formConfig={{
        schema,
        serverUrl: 'https://api.example.com',
        onSubmit: (data) => {
          console.log('Form submitted:', data);
        },
        ...form,
        idMap,
        setIdMap,
      }}
    />
  );
};
```

### Required Props

The `DefaultForm` component requires the following props through `formConfig`:

| Prop        | Type                                               | Description                                         |
| ----------- | -------------------------------------------------- | --------------------------------------------------- |
| `schema`    | `CustomJSONSchema7`                                | JSON Schema definition for the form                 |
| `serverUrl` | `string`                                           | Base URL for API requests (used by IdPicker fields) |
| `form`      | `UseFormReturn`                                    | React Hook Form instance from `useForm()`           |
| `idMap`     | `Record<string, object>`                           | Map of IDs to objects (for IdPicker fields)         |
| `setIdMap`  | `Dispatch<SetStateAction<Record<string, object>>>` | Setter for idMap                                    |

### Using the `useForm` Hook

The `useForm` hook provides the necessary form state:

```tsx
const form = useForm({
  preLoadedValues: {
    /* initial values */
  }, // Optional: pre-populate form
  schema: jsonSchema, // Optional: schema for validation
});

// Returns:
// - form: React Hook Form instance
// - idMap: Map for IdPicker fields
// - setIdMap: Setter for idMap
```

Components use label objects passed via props (e.g., `idPickerLabels`, `filePickerLabels`) for all labels.

## JSON Schema Reference

The `DefaultForm` component supports all JSON Schema Draft 7 types with additional custom properties for enhanced functionality.

### Supported Field Types

#### String Fields

```json
{
  "type": "string",
  "minLength": 2,
  "maxLength": 100,
  "pattern": "^[a-zA-Z0-9]+$"
}
```

**String Variants:**

- **Default**: Standard text input
- **`text-area`**: Multi-line textarea
- **`id-picker`**: Dropdown with search and pagination
- **`enum`**: Select dropdown (when `enum` property is provided)

```json
{
  "type": "string",
  "variant": "text-area",
  "minLength": 10
}
```

#### Number Fields

```json
{
  "type": "number", // or "integer"
  "minimum": 0,
  "maximum": 100,
  "multipleOf": 5
}
```

#### Boolean Fields

```json
{
  "type": "boolean"
}
```

#### Date/Time Fields

```json
{
  "type": "string",
  "format": "date" // or "time", "date-time"
}
```

#### Array Fields

```json
{
  "type": "array",
  "items": {
    "type": "string"
  },
  "minItems": 1,
  "maxItems": 10
}
```

**Array with IdPicker:**

```json
{
  "type": "array",
  "variant": "id-picker",
  "items": {
    "type": "string"
  },
  "foreign_key": {
    "table": "users",
    "column": "id"
  }
}
```

#### Object Fields

```json
{
  "type": "object",
  "properties": {
    "street": { "type": "string" },
    "city": { "type": "string" }
  },
  "required": ["street", "city"]
}
```

### Custom Schema Properties

#### Layout Control

```json
{
  "type": "string",
  "gridColumn": "1 / 3", // CSS Grid column span
  "gridRow": "2" // CSS Grid row
}
```

#### Field Visibility

```json
{
  "type": "string",
  "showLabel": false // Hide field label
}
```

#### Date/Time Formatting

```json
{
  "type": "string",
  "format": "date",
  "dateFormat": "YYYY-MM-DD", // Input format
  "displayDateFormat": "MMM DD, YYYY" // Display format
}
```

#### Foreign Key Configuration (for IdPicker)

```json
{
  "type": "string",
  "variant": "id-picker",
  "foreign_key": {
    "table": "users",
    "column": "id"
  }
}
```

#### Custom Rendering

```json
{
  "type": "string",
  "variant": "custom-input",
  "inputRender": "MyCustomComponent"
}
```

## Labels

Components work fully with label objects. Pass labels via props to customize all user-facing text.

### Label Objects

All components support label objects passed via props:

- `idPickerLabels` - Labels for IdPicker components
- `filePickerLabels` - Labels for FilePicker components
- `enumPickerLabels` - Labels for EnumPicker components
- `dateTimePickerLabels` - Labels for date/time pickers
- `formButtonLabels` - Labels for form buttons

See [IdPicker Labels Documentation](./IDPICKER_LABELS.md) for complete details.

## Complete Examples

### Example 1: Simple Form

````tsx
import { DefaultForm, useForm } from '@bsol-oss/react-datatable5';
import { useState } from 'react';

const SimpleForm = () => {
  const form = useForm({
  });

  const [idMap, setIdMap] = useState({});

  const schema = {
    type: 'object',
    required: ['name', 'email'],
    properties: {
      name: {
        type: 'string',
        minLength: 2,
        maxLength: 50,
      },
      email: {
        type: 'string',
        format: 'email',
      },
      age: {
        type: 'integer',
        minimum: 18,
        maximum: 120,
      },
      bio: {
        type: 'string',
        variant: 'text-area',
        minLength: 10,
      },
    },
  };

  return (
    <DefaultForm
      formConfig={{
        schema,
        serverUrl: 'https://api.example.com',
        onSubmit: (data) => {
          console.log('Form submitted:', data);
        },
        ...form,
        idMap,
        setIdMap,
      }}
    />
  );
};

// Labels can be provided via schema.title or label objects if needed

### Example 2: IdPicker Form with Label Objects

```tsx
import { DefaultForm, useForm } from '@bsol-oss/react-datatable5';
import { useState } from 'react';

const IdPickerForm = () => {
  const form = useForm({
  });

  const [idMap, setIdMap] = useState({});

  const schema = {
    type: 'object',
    required: ['manager', 'team_members'],
    properties: {
      manager: {
        type: 'string',
        variant: 'id-picker',
        foreign_key: {
          table: 'users',
          column: 'id',
        },
      },
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
        serverUrl: 'https://api.example.com',
        onSubmit: (data) => {
          console.log('Form submitted:', data);
        },
        // Provide labels via label objects
        idPickerLabels: {
          undefined: 'Item not found',
          addMore: 'Add more',
          typeToSearch: 'Type to search...',
          total: 'Total',
          showing: 'Showing',
          perPage: 'per page',
          emptySearchResult: 'No results found',
          initialResults: 'Start typing to search',
        },
        ...form,
        idMap,
        setIdMap,
      }}
    />
  );
};

const idPickerTranslations = {
  en: {
    project: {
      manager: {
        field_label: 'Project Manager',
        field_required: 'Please select a project manager',
        undefined: 'Manager not found',
        add_more: 'Add more managers',
        type_to_search: 'Type to search managers...',
        total: 'Total',
        showing: 'Showing',
        per_page: 'per page',
        empty_search_result: 'No managers found',
        initial_results: 'Start typing to search for managers',
      },
      team_members: {
        field_label: 'Team Members',
        field_required: 'Please select at least one team member',
        undefined: 'Member not found',
        add_more: 'Add more members',
        type_to_search: 'Search team members...',
        total: 'Total',
        showing: 'Showing',
        per_page: 'per page',
        empty_search_result: 'No team members found',
        initial_results: 'Click to search and select team members',
      },
    },
  },
  'zh-HK': {
    project: {
      manager: {
        field_label: '項目經理',
        field_required: '請選擇項目經理',
        undefined: '找不到經理',
        add_more: '新增更多經理',
        type_to_search: '輸入以搜尋經理...',
        total: '總數',
        showing: '顯示',
        per_page: '每頁',
        empty_search_result: '找不到符合的經理',
        initial_results: '開始輸入以搜尋經理',
      },
      team_members: {
        field_label: '團隊成員',
        field_required: '請至少選擇一個團隊成員',
        undefined: '找不到成員',
        add_more: '新增更多成員',
        type_to_search: '搜尋團隊成員...',
        total: '總數',
        showing: '顯示',
        per_page: '每頁',
        empty_search_result: '找不到團隊成員',
        initial_results: '點擊以搜尋及選擇團隊成員',
      },
    },
  },
};
````

### Example 3: Form with Validation and Custom Error Messages

```tsx
import {
  DefaultForm,
  useForm,
  buildErrorMessages,
} from '@bsol-oss/react-datatable5';

const ValidationForm = () => {
  const form = useForm({
    keyPrefix: 'registration',
  });

  const [idMap, setIdMap] = useState({});

  // Custom error messages
  const errorMessage = buildErrorMessages({
    required: {
      username: 'Username is required',
      email: 'Email address is required',
      password: 'Password is required',
    },
    properties: {
      username: {
        minLength: 'Username must be at least 3 characters',
        maxLength: 'Username cannot exceed 20 characters',
        pattern: 'Username can only contain letters and numbers',
      },
      email: {
        format: 'Please enter a valid email address',
      },
      password: {
        minLength: 'Password must be at least 8 characters',
      },
    },
  });

  const schema = {
    type: 'object',
    required: ['username', 'email', 'password'],
    properties: {
      username: {
        type: 'string',
        minLength: 3,
        maxLength: 20,
        pattern: '^[a-zA-Z0-9]+$',
      },
      email: {
        type: 'string',
        format: 'email',
      },
      password: {
        type: 'string',
        minLength: 8,
      },
    },
    errorMessage,
  };

  return (
    <DefaultForm
      formConfig={{
        schema,
        serverUrl: 'https://api.example.com',
        onSubmit: (data) => {
          console.log('Registration data:', data);
        },
        ...form,
        idMap,
        setIdMap,
      }}
    />
  );
};
```

## Advanced Topics

### Display Configuration

Control form appearance with `displayConfig`:

```tsx
<DefaultForm
  formConfig={{
    schema,
    serverUrl: 'https://api.example.com',
    displayConfig: {
      showTitle: true, // Show form title
      showSubmitButton: true, // Show submit button
      showResetButton: true, // Show reset button
    },
    ...form,
    idMap,
    setIdMap,
  }}
/>
```

### Custom Error Rendering

```tsx
const customErrorRenderer = (error) => (
  <Alert status="error">
    <AlertIcon />
    <AlertTitle>Validation Error!</AlertTitle>
    <AlertDescription>{error.message}</AlertDescription>
  </Alert>
);

<DefaultForm
  formConfig={{
    schema,
    serverUrl: 'https://api.example.com',
    customErrorRenderer,
    ...form,
    idMap,
    setIdMap,
  }}
/>;
```

### Multi-language Support (Optional - Using Label Objects)

**Recommended approach:** Switch label objects based on language.

```tsx
import { useState } from 'react';

const MultiLanguageForm = () => {
  const [currentLang, setCurrentLang] = useState('en');

  const form = useForm({});

  const [idMap, setIdMap] = useState({});

  // Define labels for each language
  const labels = {
    en: {
      idPickerLabels: {
        typeToSearch: 'Type to search...',
        emptySearchResult: 'No results found',
        // ... other labels
      },
    },
    'zh-HK': {
      idPickerLabels: {
        typeToSearch: '輸入以搜尋...',
        emptySearchResult: '找不到結果',
        // ... other labels
      },
    },
  };

  const changeLanguage = (lang) => {
    setCurrentLang(lang);
  };

  return (
    <div>
      <select
        value={currentLang}
        onChange={(e) => changeLanguage(e.target.value)}
      >
        <option value="en">English</option>
        <option value="zh-HK">繁體中文（香港）</option>
        <option value="zh-TW">繁體中文（台灣）</option>
        <option value="zh-CN">简体中文</option>
      </select>

      <DefaultForm
        formConfig={{
          schema,
          serverUrl: 'https://api.example.com',
          ...labels[currentLang], // Use labels for current language
          ...form,
          idMap,
          setIdMap,
        }}
      />
    </div>
  );
};
```

This comprehensive guide covers all aspects of using `DefaultForm` with JSON Schema. Components work fully with label objects and direct error message strings - no i18n dependency required. The component provides a powerful, flexible way to create forms with minimal code while maintaining full control over appearance, validation, and user experience.
