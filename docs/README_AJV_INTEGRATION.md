# AJV Integration with React Hook Form

This document explains how the FormRoot component now integrates AJV validation with react-hook-form for comprehensive error handling and display.

## Overview

The FormRoot component has been updated to use AJV (Another JSON Schema Validator) for validation while maintaining full compatibility with react-hook-form's error handling system. This provides:

- **Comprehensive validation** using JSON Schema Draft 7
- **Real-time error display** in form fields
- **Type-safe error handling** with proper TypeScript support
- **Internationalization support** for error messages

## Key Components

### 1. AJV Resolver (`ajvResolver.tsx`)

The AJV resolver integrates AJV validation with react-hook-form:

```typescript
import { ajvResolver } from '@/components/Form/utils/ajvResolver';

// Use with react-hook-form
const form = useForm({
  resolver: ajvResolver(schema),
  // ... other options
});
```

### 2. Error Message Utilities (`getFieldError.tsx`)

Helper functions to extract and display error messages from react-hook-form errors:

```typescript
import { getFieldError } from '@/components/Form/utils/getFieldError';

// In a field component
const fieldError = getFieldError(errors, fieldName);
```

### 3. Updated Field Components

All form field components now display AJV validation errors:

- `StringInputField`
- `NumberInputField`
- `TextAreaInput`
- And other field components

## Usage Example

```typescript
import { FormRoot } from '@/components/Form/components/core/FormRoot';
import { useForm } from 'react-hook-form';
import { ajvResolver } from '@/components/Form/utils/ajvResolver';

const schema = {
  type: 'object',
  required: ['name', 'email'],
  properties: {
    name: {
      type: 'string',
      minLength: 2,
      maxLength: 50
    },
    email: {
      type: 'string',
      format: 'email'
    },
    age: {
      type: 'number',
      minimum: 18,
      maximum: 120
    }
  }
};

function MyForm() {
  const form = useForm({
    resolver: ajvResolver(schema),
    defaultValues: {
      name: '',
      email: '',
      age: 18
    }
  });

  return (
    <FormRoot
      schema={schema}
      form={form}
      // ... other props
    >
      {/* Form fields will automatically display validation errors */}
    </FormRoot>
  );
}
```

## Error Message Display

Field components automatically display validation errors with the following priority:

1. **Required field errors**: Uses i18n translation keys (e.g., `user.name.field_required`)
2. **Validation errors**: Shows the actual AJV error message
3. **Fallback**: Generic "Invalid value" message

## Schema Configuration

The AJV integration supports all JSON Schema Draft 7 features:

- **Type validation**: string, number, boolean, array, object
- **Format validation**: email, date, time, uuid, etc.
- **String constraints**: minLength, maxLength, pattern
- **Number constraints**: minimum, maximum, multipleOf
- **Array constraints**: minItems, maxItems, uniqueItems
- **Object constraints**: required, additionalProperties

## Custom Error Messages

You can customize error messages using the `buildErrorMessages` utility:

```typescript
import { buildErrorMessages } from '@/components/Form/utils/buildErrorMessages';

const schema = {
  type: 'object',
  properties: {
    email: {
      type: 'string',
      format: 'email',
    },
  },
  errorMessage: buildErrorMessages({
    properties: {
      email: {
        format: 'Please enter a valid email address',
      },
    },
  }),
};
```

## Migration Notes

- **Backward compatible**: Existing forms continue to work without changes
- **Enhanced validation**: New forms get comprehensive AJV validation
- **Better error display**: More detailed and user-friendly error messages
- **Type safety**: Improved TypeScript support for error handling

## Troubleshooting

### Common Issues

1. **Type errors**: Ensure your schema matches the expected TypeScript types
2. **Error not displaying**: Check that the field name matches the schema property path
3. **Validation not working**: Verify the resolver is properly configured in useForm

### Debug Mode

Enable debug logging by setting the console log in `validateData.tsx`:

```typescript
// In validateData.tsx
console.log(errors, data); // This will show validation errors in console
```
