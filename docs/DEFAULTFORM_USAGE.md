# DefaultForm with JSON Schema Usage Guide

This guide provides comprehensive instructions for using the `DefaultForm` component with JSON Schema and internationalization (i18n) in the `@bsol-oss/react-datatable5` library.

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
- **Internationalization**: Full i18n support with `react-i18next`
- **Validation**: Built-in AJV validation with custom error messages
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
  "react-i18next": "^15.4.0",
  "ajv": "^8.0.0",
  "ajv-formats": "^2.0.0",
  "ajv-errors": "^2.0.0",
  "dayjs": "^1.0.0"
}
```

### Installation

```bash
npm install @bsol-oss/react-datatable5
npm install react react-hook-form react-i18next ajv ajv-formats ajv-errors dayjs
npm install @chakra-ui/react @tanstack/react-table @tanstack/react-query
```

## Basic Usage

### Minimal Example

```tsx
import { DefaultForm, useForm } from '@bsol-oss/react-datatable5';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

const MyForm = () => {
  const form = useForm({
    keyPrefix: 'user', // Optional: scopes translations under "user" namespace
    preLoadedValues: { name: 'John Doe' }, // Optional: pre-populate form
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
| `translate` | `UseTranslationResponse`                           | i18next translation function                        |
| `idMap`     | `Record<string, object>`                           | Map of IDs to objects (for IdPicker fields)         |
| `setIdMap`  | `Dispatch<SetStateAction<Record<string, object>>>` | Setter for idMap                                    |

### Using the `useForm` Hook

The `useForm` hook provides the necessary form state and translation setup:

```tsx
const form = useForm({
  keyPrefix: 'myForm', // Optional: scopes all translations under this prefix
  preLoadedValues: {
    /* initial values */
  }, // Optional: pre-populate form
});

// Returns:
// - form: React Hook Form instance
// - translate: i18next translation function
// - idMap: Map for IdPicker fields
// - setIdMap: Setter for idMap
```

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
    "column": "id",
    "display_column": "name"
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
    "column": "id",
    "display_column": "name"
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

## Translation JSON Structure

The form system uses a structured approach to translations with the `useFormI18n` hook providing simplified access to field-specific translations.

### Translation Key Convention

Translation keys follow the pattern: `{keyPrefix}.{fieldName}.{key}`

```json
{
  "en": {
    "user": {
      "name": {
        "field_label": "Full Name",
        "field_required": "Name is required"
      },
      "email": {
        "field_label": "Email Address",
        "field_required": "Email is required"
      }
    }
  }
}
```

### Standard Translation Keys

All fields support these standard keys:

| Key              | Description                  |
| ---------------- | ---------------------------- |
| `field_label`    | Field display label          |
| `field_required` | Required field error message |

### IdPicker-Specific Keys

IdPicker fields support additional translation keys:

| Key                   | Description             |
| --------------------- | ----------------------- |
| `undefined`           | "Not found" message     |
| `add_more`            | "Add more" button text  |
| `type_to_search`      | Search placeholder text |
| `total`               | "Total" label           |
| `showing`             | "Showing" label         |
| `per_page`            | "per page" text         |
| `empty_search_result` | No results message      |
| `initial_results`     | Initial state message   |

### Using `keyPrefix` for Scoped Translations

```tsx
// With keyPrefix: "user"
const form = useForm({ keyPrefix: 'user' });

// Translation keys become:
// user.name.field_label
// user.email.field_label
// etc.
```

## Complete Examples

### Example 1: Simple Form with Translations

```tsx
import { DefaultForm, useForm } from '@bsol-oss/react-datatable5';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

const SimpleForm = () => {
  const form = useForm({
    keyPrefix: 'user',
    preLoadedValues: {},
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

// Translation JSON
const translations = {
  en: {
    user: {
      name: {
        field_label: 'Full Name',
        field_required: 'Name is required',
      },
      email: {
        field_label: 'Email Address',
        field_required: 'Email is required',
      },
      age: {
        field_label: 'Age',
        field_required: 'Age is required',
      },
      bio: {
        field_label: 'Biography',
        field_required: 'Biography is required',
      },
    },
  },
  'zh-HK': {
    user: {
      name: {
        field_label: '全名',
        field_required: '必須填寫姓名',
      },
      email: {
        field_label: '電郵地址',
        field_required: '必須填寫電郵地址',
      },
      age: {
        field_label: '年齡',
        field_required: '必須填寫年齡',
      },
      bio: {
        field_label: '個人簡介',
        field_required: '必須填寫個人簡介',
      },
    },
  },
};
```

### Example 2: IdPicker Form with Complete Translations

```tsx
import { DefaultForm, useForm } from '@bsol-oss/react-datatable5';
import { useState } from 'react';

const IdPickerForm = () => {
  const form = useForm({
    keyPrefix: 'project',
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
          display_column: 'name',
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
          display_column: 'name',
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
        ...form,
        idMap,
        setIdMap,
      }}
    />
  );
};

// Complete Translation JSON for IdPicker
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
```

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

### Multi-language Support

```tsx
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const MultiLanguageForm = () => {
  const [currentLang, setCurrentLang] = useState('en');
  const { i18n } = useTranslation();

  const form = useForm({
    keyPrefix: 'user',
  });

  const [idMap, setIdMap] = useState({});

  const changeLanguage = (lang) => {
    setCurrentLang(lang);
    i18n.changeLanguage(lang);
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
          ...form,
          idMap,
          setIdMap,
        }}
      />
    </div>
  );
};
```

### Integration with i18next

```tsx
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Initialize i18next
i18n.use(initReactI18next).init({
  fallbackLng: 'en',
  lng: 'en',
  resources: {
    en: {
      translation: {
        // Your English translations
      },
    },
    'zh-HK': {
      translation: {
        // Your Traditional Chinese (Hong Kong) translations
      },
    },
  },
  interpolation: {
    escapeValue: false,
  },
});
```

This comprehensive guide covers all aspects of using `DefaultForm` with JSON Schema and internationalization. The component provides a powerful, flexible way to create forms with minimal code while maintaining full control over appearance, validation, and user experience.
