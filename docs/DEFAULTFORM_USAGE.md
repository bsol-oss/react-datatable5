# DefaultForm with JSON Schema Usage Guide

This guide provides comprehensive instructions for using the `DefaultForm` component with JSON Schema in the `@bsol-oss/react-datatable5` library.

Components work fully with label objects and direct error message strings - no i18n dependency required.

## Table of Contents

- [Overview](#overview)
- [Prerequisites](#prerequisites)
- [Basic Usage](#basic-usage)
- [JSON Schema Reference](#json-schema-reference)
- [Labels](#labels)
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

const MyForm = () => {
  const form = useForm({
    // preLoadedValues: { name: 'John Doe' }, // Optional: pre-populate form
  });

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
        ...form, // Spreads: { form, idMap, setIdMap, translate }
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
| `form`      | `UseFormReturn`                                    | React Hook Form instance (from `useForm()` hook)    |
| `idMap`     | `Record<string, object>`                           | Map of IDs to objects (for IdPicker fields)         |
| `setIdMap`  | `Dispatch<SetStateAction<Record<string, object>>>` | Setter for idMap                                    |

**Note:** The `form`, `idMap`, `setIdMap`, and `translate` values are all provided by spreading the return value of `useForm()` using `...form`.

### Using the `useForm` Hook

The `useForm` hook provides all necessary form state:

```tsx
const form = useForm({
  preLoadedValues: {
    /* initial values */
  }, // Optional: pre-populate form
  schema: jsonSchema, // Optional: schema for validation
  keyPrefix: 'myForm', // Optional: deprecated, kept for backward compatibility
});

// Returns an object with:
// - form: React Hook Form instance
// - idMap: Map for IdPicker fields
// - setIdMap: Setter for idMap
// - translate: Translate object (fallback, components prefer label objects)

// Spread it into formConfig:
<DefaultForm
  formConfig={{
    schema,
    serverUrl: 'https://api.example.com',
    ...form, // Spreads all four values
  }}
/>;
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

**Array with Date Range:**

```json
{
  "type": "array",
  "variant": "date-range",
  "items": {
    "type": "string",
    "format": "date"
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
- `timePickerLabels` - Labels for time picker components
- `formButtonLabels` - Labels for form buttons

See [IdPicker Labels Documentation](./IDPICKER_LABELS.md) for complete details.

### Date/Time Picker Labels

Provide labels for date and time pickers:

```tsx
<DefaultForm
  formConfig={{
    schema,
    serverUrl: 'https://api.example.com',
    dateTimePickerLabels: {
      monthNamesShort: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ],
      weekdayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      backButtonLabel: 'Back',
      forwardButtonLabel: 'Forward',
    },
    ...form,
  }}
/>
```

## Complete Examples

### Example 1: Simple Form

```tsx
import { DefaultForm, useForm } from '@bsol-oss/react-datatable5';

const SimpleForm = () => {
  const form = useForm({});

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
      }}
    />
  );
};
```

### Example 2: IdPicker Form with Label Objects

```tsx
import { DefaultForm, useForm } from '@bsol-oss/react-datatable5';

const IdPickerForm = () => {
  const form = useForm({});

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
      }}
    />
  );
};
```

### Example 3: Form with Validation and Custom Error Messages (Per-Field)

**Recommended approach:** Use `errorMessages` field in each property.

```tsx
import { DefaultForm, useForm } from '@bsol-oss/react-datatable5';

const ValidationForm = () => {
  const form = useForm({
    keyPrefix: 'user', // Optional: deprecated, kept for backward compatibility
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
        errorMessages: {
          required: 'user.username.field_required',
          minLength: 'user.username.minLength_error',
          maxLength: 'user.username.maxLength_error',
          pattern: 'user.username.pattern_error',
        },
      },
      email: {
        type: 'string',
        format: 'email',
        errorMessages: {
          required: 'user.email.field_required',
          format: 'user.email.format_error',
        },
      },
      password: {
        type: 'string',
        minLength: 8,
        errorMessages: {
          required: 'user.password.field_required',
          minLength: 'user.password.minLength_error',
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
          console.log('Registration data:', data);
        },
        ...form,
      }}
    />
  );
};
```

### Example 4: Form with Root-Level Error Messages (Legacy)

**Alternative approach:** Use `errorMessage` at the root level (still supported but less flexible).

```tsx
import { DefaultForm, useForm } from '@bsol-oss/react-datatable5';

const LegacyValidationForm = () => {
  const form = useForm({});

  const schema = {
    type: 'object',
    required: ['name', 'email', 'message'],
    properties: {
      name: {
        type: 'string',
        minLength: 2,
      },
      email: {
        type: 'string',
        format: 'email',
      },
      message: {
        type: 'string',
        variant: 'text-area',
        minLength: 10,
      },
    },
    errorMessage: {
      required: {
        name: 'Name is required',
        email: 'Email is required',
        message: 'Message is required',
      },
      minLength: 'Please provide more details',
      format: 'Please enter a valid email address',
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
  }}
/>
```

### Custom Error Rendering

```tsx
import { Alert } from '@chakra-ui/react';

const customErrorRenderer = (error) => (
  <Alert.Root status="error">
    <Alert.Indicator />
    <Alert.Content>
      <Alert.Title>Validation Error!</Alert.Title>
      <Alert.Description>{error.message}</Alert.Description>
    </Alert.Content>
  </Alert.Root>
);

<DefaultForm
  formConfig={{
    schema,
    serverUrl: 'https://api.example.com',
    customErrorRenderer,
    ...form,
  }}
/>;
```

### Custom Success Rendering

Customize the success message displayed after form submission:

```tsx
import { Box, VStack, Text, Button, HStack } from '@chakra-ui/react';

<DefaultForm
  formConfig={{
    schema,
    serverUrl: 'https://api.example.com',
    onSubmit: async (data) => {
      console.log('Form submitted:', data);
      await new Promise((resolve) => setTimeout(resolve, 1000));
    },
    customSuccessRenderer: (resetHandler) => (
      <Box
        bg="green.50"
        border="2px solid"
        borderColor="green.200"
        borderRadius="lg"
        p={8}
        textAlign="center"
      >
        <VStack gap={6}>
          <Text fontSize="2xl" fontWeight="bold" color="green.700">
            Success!
          </Text>
          <Text color="green.600">
            Your form has been submitted successfully.
          </Text>
          <HStack gap={4}>
            <Button onClick={resetHandler} colorPalette="green">
              Submit Another Form
            </Button>
          </HStack>
        </VStack>
      </Box>
    ),
    ...form,
  }}
/>;
```

### Forms Inside Dialogs

When using `DefaultForm` inside a Chakra UI Dialog, set `insideDialog: true`:

```tsx
import { Dialog, Button } from '@chakra-ui/react';
import { useState } from 'react';

const FormInDialog = () => {
  const [open, setOpen] = useState(false);
  const form = useForm({});

  const schema = {
    type: 'object',
    properties: {
      name: {
        type: 'string',
        minLength: 2,
      },
      email: {
        type: 'string',
        format: 'email',
      },
    },
    required: ['name', 'email'],
  };

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Form Dialog</Button>
      <Dialog.Root open={open} onOpenChange={(e) => setOpen(e.open)}>
        <Dialog.Content>
          <DefaultForm
            formConfig={{
              schema,
              serverUrl: 'https://api.example.com',
              onSubmit: (data) => {
                console.log('Form submitted:', data);
                setOpen(false);
              },
              insideDialog: true, // Important for proper dialog behavior
              ...form,
            }}
          />
        </Dialog.Content>
      </Dialog.Root>
    </>
  );
};
```

### Preloaded Values

Populate form fields with initial values:

```tsx
const form = useForm({
  preLoadedValues: {
    name: 'John Doe',
    email: 'john.doe@example.com',
    age: 30,
    isActive: true,
    status: 'active',
    tags: ['react', 'typescript'],
    address: {
      street: '123 Main Street',
      city: 'Hong Kong',
    },
  },
});

<DefaultForm
  formConfig={{
    schema,
    serverUrl: 'https://api.example.com',
    onSubmit: (data) => {
      console.log('Submitted:', data);
    },
    ...form,
  }}
/>;
```

### Multi-language Support (Using Label Objects)

**Recommended approach:** Switch label objects based on language.

```tsx
import { useState } from 'react';
import { Button, Flex } from '@chakra-ui/react';

const MultiLanguageForm = () => {
  const [currentLang, setCurrentLang] = useState<'en' | 'zh-HK'>('en');
  const form = useForm({});

  // Define labels for each language
  const labels = {
    en: {
      idPickerLabels: {
        undefined: 'User not found',
        addMore: 'Add more users',
        typeToSearch: 'Type to search users...',
        total: 'Total',
        showing: 'Showing',
        perPage: 'per page',
        emptySearchResult: 'No users found matching your search',
        initialResults: 'Start typing to search for users',
      },
    },
    'zh-HK': {
      idPickerLabels: {
        undefined: '找不到用戶',
        addMore: '新增更多用戶',
        typeToSearch: '輸入以搜尋用戶...',
        total: '總數',
        showing: '顯示',
        perPage: '每頁',
        emptySearchResult: '找不到符合的用戶',
        initialResults: '開始輸入以搜尋用戶',
      },
    },
  };

  const schema = {
    type: 'object',
    properties: {
      user: {
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
    <Flex direction="column" gap={4}>
      <Flex gap={2}>
        <Button
          onClick={() => setCurrentLang('en')}
          colorPalette={currentLang === 'en' ? 'blue' : 'gray'}
        >
          English
        </Button>
        <Button
          onClick={() => setCurrentLang('zh-HK')}
          colorPalette={currentLang === 'zh-HK' ? 'blue' : 'gray'}
        >
          繁體中文 (香港)
        </Button>
      </Flex>

      <DefaultForm
        formConfig={{
          schema,
          serverUrl: 'https://api.example.com',
          ...labels[currentLang], // Use labels for current language
          ...form,
        }}
      />
    </Flex>
  );
};
```

This comprehensive guide covers all aspects of using `DefaultForm` with JSON Schema. Components work fully with label objects and direct error message strings - no i18n dependency required. The component provides a powerful, flexible way to create forms with minimal code while maintaining full control over appearance, validation, and user experience.
