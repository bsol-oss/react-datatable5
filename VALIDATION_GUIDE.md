# Form Validation Guide

This guide explains how to implement validation in forms using `@bsol-oss/react-datatable5`. The library uses **JSON Schema** (Draft 7) with **AJV** (Another JSON Schema Validator) for validation, providing a powerful and flexible validation system.

## Table of Contents

- [Overview](#overview)
- [How Validation Works](#how-validation-works)
- [Defining Error Messages](#defining-error-messages)
- [Validation Rules](#validation-rules)
- [Empty Value Handling](#empty-value-handling)
- [Examples](#examples)
- [Best Practices](#best-practices)
- [Troubleshooting](#troubleshooting)

## Overview

### Key Features

- **JSON Schema-based**: Define validation rules using standard JSON Schema Draft 7
- **AJV Validation**: Uses AJV with format validation support (email, date, time, uuid, etc.)
- **Custom Error Messages**: Define error messages per field and validation type via `errorMessages` field
- **Automatic Empty Value Handling**: Strips null, undefined, and empty strings before validation
- **React Hook Form Integration**: Seamlessly integrates with react-hook-form for form state management
- **No Default Messages**: Consuming applications are responsible for providing all error messages

### Validation Flow

1. User submits form or field loses focus (depending on validation mode)
2. Form values are cleaned (empty values stripped)
3. Data is validated against JSON Schema using AJV
4. Errors are converted to react-hook-form format
5. Error messages are displayed using custom messages from `errorMessages` field

## How Validation Works

### Validation Process

The validation process follows these steps:

```typescript
// 1. Form values are collected
const formValues = { username: 'john', email: '', age: 15 };

// 2. Empty values are stripped
const cleanedValues = { username: 'john', age: 15 };

// 3. Validation against schema
const { isValid, errors } = validateData(cleanedValues, schema);

// 4. Errors converted to field errors
const fieldErrors = convertAjvErrorsToFieldErrors(errors, schema);

// 5. Errors displayed in form fields
```

### Integration with React Hook Form

The library uses a custom AJV resolver that integrates with react-hook-form:

```typescript
import { ajvResolver } from '@/components/Form/utils/ajvResolver';

const form = useForm({
  resolver: ajvResolver(schema),
  // ... other form config
});
```

The resolver automatically:

- Strips empty values before validation
- Validates data against the schema
- Converts AJV errors to react-hook-form field errors
- Provides helpful fallback messages when error messages are missing

## Defining Error Messages

### Per-Field Error Messages (Recommended)

The recommended approach is to define error messages directly in each schema property using the `errorMessages` field:

```typescript
const schema = {
  type: 'object',
  properties: {
    username: {
      type: 'string',
      minLength: 3,
      maxLength: 20,
      pattern: '^[a-zA-Z0-9]+$',
      errorMessages: {
        required: 'Username is required',
        minLength: 'Username must be at least 3 characters long',
        maxLength: 'Username must be no more than 20 characters long',
        pattern: 'Username can only contain letters and numbers',
      },
    },
    email: {
      type: 'string',
      format: 'email',
      errorMessages: {
        required: 'Email is required',
        format: 'Please enter a valid email address',
      },
    },
  },
  required: ['username', 'email'],
} as JSONSchema7;
```

### Error Message Structure

The `errorMessages` field is an object that maps validation keywords to error messages:

```typescript
errorMessages?: {
  required?: string;
  minLength?: string;
  maxLength?: string;
  pattern?: string;
  minimum?: string;
  maximum?: string;
  format?: string;
  type?: string;
  enum?: string;
  // ... other validation keywords
}
```

### Using i18n Translation Keys

You can use translation keys instead of plain strings. The consuming application is responsible for translating these:

```typescript
const schema = {
  type: 'object',
  properties: {
    username: {
      type: 'string',
      minLength: 3,
      errorMessages: {
        required: 'user.username.field_required', // i18n key
        minLength: 'user.username.minLength_error', // i18n key
      },
    },
  },
  required: ['username'],
} as JSONSchema7;
```

### Missing Error Messages

If an error message is not provided for a validation rule, the system will:

1. Log a debug message to the console
2. Display a helpful fallback message: `"Missing error message for {keyword}. Add errorMessages.{keyword} to schema for field '{fieldName}'"`

**Important**: Always provide error messages for all validation rules to ensure a good user experience.

## Validation Rules

### String Validation

#### Required Fields

```typescript
{
  type: 'object',
  properties: {
    name: {
      type: 'string',
      errorMessages: {
        required: 'Name is required',
      },
    },
  },
  required: ['name'],
}
```

#### Length Constraints

```typescript
{
  type: 'string',
  minLength: 3,
  maxLength: 100,
  errorMessages: {
    minLength: 'Must be at least 3 characters',
    maxLength: 'Must be no more than 100 characters',
  },
}
```

#### Pattern Matching

```typescript
{
  type: 'string',
  pattern: '^[a-zA-Z0-9]+$',
  errorMessages: {
    pattern: 'Only letters and numbers are allowed',
  },
}
```

#### Format Validation

Supported formats include: `email`, `date`, `date-time`, `time`, `uri`, `uuid`, and more (via ajv-formats).

```typescript
{
  type: 'string',
  format: 'email',
  errorMessages: {
    format: 'Please enter a valid email address',
  },
}
```

### Number Validation

#### Minimum and Maximum

```typescript
{
  type: 'number',
  minimum: 18,
  maximum: 120,
  errorMessages: {
    minimum: 'Must be at least 18',
    maximum: 'Must be no more than 120',
  },
}
```

#### Multiple Of

```typescript
{
  type: 'number',
  multipleOf: 0.01,
  errorMessages: {
    multipleOf: 'Must be a multiple of 0.01',
  },
}
```

### Enum Validation

```typescript
{
  type: 'string',
  enum: ['option1', 'option2', 'option3'],
  errorMessages: {
    enum: 'Please select a valid option',
  },
}
```

### Array Validation

```typescript
{
  type: 'array',
  minItems: 1,
  maxItems: 10,
  items: {
    type: 'string',
  },
  errorMessages: {
    minItems: 'At least one item is required',
    maxItems: 'No more than 10 items allowed',
  },
}
```

### Object Validation

```typescript
{
  type: 'object',
  required: ['field1', 'field2'],
  properties: {
    field1: { type: 'string' },
    field2: { type: 'number' },
  },
  errorMessages: {
    // Object-level error messages
  },
}
```

## Empty Value Handling

### Automatic Empty Value Stripping

Before validation, the system automatically strips:

- `null` values
- `undefined` values
- Empty strings (`""`)
- Arrays containing only empty values

This ensures that:

- Optional fields don't trigger validation errors when empty
- Required fields properly validate when empty
- Validation focuses on actual data values

### Example

```typescript
// Input form values
const formValues = {
  username: 'john',
  email: '', // Empty string
  age: null, // Null value
  tags: undefined, // Undefined
};

// After stripping empty values
const cleanedValues = {
  username: 'john',
  // email, age, tags are removed
};

// Validation runs on cleanedValues
```

### Required Field Validation

Required fields are validated after empty value stripping:

```typescript
{
  type: 'object',
  properties: {
    email: {
      type: 'string',
      format: 'email',
      errorMessages: {
        required: 'Email is required',
      },
    },
  },
  required: ['email'],
}
```

If `email` is empty (null, undefined, or empty string), it will be stripped, and the required validation will fail.

## Examples

### Basic Form with Validation

```typescript
import { DefaultForm } from '@/components/Form/components/core/DefaultForm';
import { useForm } from '@/components/Form/useForm';
import { JSONSchema7 } from 'json-schema';

const MyForm = () => {
  const schema = {
    type: 'object',
    title: 'User Registration',
    properties: {
      username: {
        type: 'string',
        minLength: 3,
        maxLength: 20,
        errorMessages: {
          required: 'Username is required',
          minLength: 'Username must be at least 3 characters',
          maxLength: 'Username must be no more than 20 characters',
        },
      },
      email: {
        type: 'string',
        format: 'email',
        errorMessages: {
          required: 'Email is required',
          format: 'Please enter a valid email address',
        },
      },
      age: {
        type: 'number',
        minimum: 18,
        maximum: 120,
        errorMessages: {
          minimum: 'You must be at least 18 years old',
          maximum: 'Age must be less than 120',
        },
      },
    },
    required: ['username', 'email'],
  } as JSONSchema7;

  const form = useForm({
    schema,
  });

  return (
    <DefaultForm
      formConfig={{
        schema,
        onSubmit: (data) => {
          console.log('Form submitted:', data);
        },
        ...form,
      }}
    />
  );
};
```

### Complex Validation Example

```typescript
const productSchema = {
  type: 'object',
  title: 'Product Form',
  properties: {
    name: {
      type: 'string',
      minLength: 3,
      maxLength: 100,
      errorMessages: {
        required: 'Product name is required',
        minLength: 'Product name must be at least 3 characters long',
        maxLength: 'Product name must be no more than 100 characters long',
      },
    },
    price: {
      type: 'number',
      minimum: 0.01,
      maximum: 999999.99,
      errorMessages: {
        required: 'Price is required',
        minimum: 'Price must be at least 0.01',
        maximum: 'Price must be no more than 999999.99',
      },
    },
    category: {
      type: 'string',
      enum: ['electronics', 'clothing', 'food', 'books'],
      errorMessages: {
        required: 'Category is required',
        enum: 'Please select a valid category',
      },
    },
    description: {
      type: 'string',
      maxLength: 500,
      errorMessages: {
        maxLength: 'Description must be no more than 500 characters long',
      },
    },
    releaseDate: {
      type: 'string',
      format: 'date',
      errorMessages: {
        format: 'Please enter a valid date format (YYYY-MM-DD)',
      },
    },
    tags: {
      type: 'array',
      minItems: 1,
      maxItems: 10,
      items: {
        type: 'string',
      },
      errorMessages: {
        minItems: 'At least one tag is required',
        maxItems: 'No more than 10 tags allowed',
      },
    },
  },
  required: ['name', 'price', 'category'],
} as JSONSchema7;
```

### Password Validation with Pattern

```typescript
const passwordSchema = {
  type: 'object',
  properties: {
    password: {
      type: 'string',
      minLength: 8,
      pattern: '^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]',
      errorMessages: {
        required: 'Password is required',
        minLength: 'Password must be at least 8 characters long',
        pattern:
          'Password must contain at least one letter, one number, and one special character',
      },
    },
    confirmPassword: {
      type: 'string',
      errorMessages: {
        required: 'Please confirm your password',
      },
    },
  },
  required: ['password', 'confirmPassword'],
} as JSONSchema7;
```

## Best Practices

### 1. Always Provide Error Messages

Always define error messages for all validation rules. Missing error messages result in unhelpful fallback messages.

```typescript
// ❌ Bad: Missing error messages
{
  type: 'string',
  minLength: 3,
  // No errorMessages defined
}

// ✅ Good: Complete error messages
{
  type: 'string',
  minLength: 3,
  errorMessages: {
    required: 'This field is required',
    minLength: 'Must be at least 3 characters',
  },
}
```

### 2. Use Descriptive Error Messages

Make error messages clear and actionable:

```typescript
// ❌ Bad: Vague message
errorMessages: {
  minLength: 'Too short',
}

// ✅ Good: Clear and actionable
errorMessages: {
  minLength: 'Username must be at least 3 characters long',
}
```

### 3. Use i18n Keys for Multi-language Support

If your application supports multiple languages, use translation keys:

```typescript
errorMessages: {
  required: 'user.username.field_required',
  minLength: 'user.username.minLength_error',
}
```

### 4. Validate Before Submission

The form automatically validates before submission. Ensure your schema includes all necessary validation rules:

```typescript
const schema = {
  type: 'object',
  properties: {
    // ... all fields with validation
  },
  required: ['field1', 'field2'], // Required fields
};
```

### 5. Test Edge Cases

Test your validation with:

- Empty values
- Boundary values (min/max)
- Invalid formats
- Special characters in patterns

### 6. Keep Schemas Maintainable

Organize your schemas in separate files for better maintainability:

```typescript
// schemas/userSchema.ts
export const userSchema = {
  type: 'object',
  properties: {
    // ... user fields
  },
} as JSONSchema7;
```

## Troubleshooting

### Error Messages Not Displaying

**Problem**: Error messages are not showing up in the form.

**Solutions**:

1. Check that `errorMessages` is defined in the schema property
2. Verify the validation keyword matches (e.g., `minLength` not `min_length`)
3. Check browser console for debug messages
4. Ensure the field is in the `required` array if testing required validation

### Validation Not Triggering

**Problem**: Validation is not running when expected.

**Solutions**:

1. Ensure the schema is properly passed to `useForm`
2. Check that validation rules are correctly defined in the schema
3. Verify that empty values are being handled correctly (they are stripped before validation)

### Pattern Validation Not Working

**Problem**: Regex pattern validation is not working as expected.

**Solutions**:

1. Ensure the pattern is a valid JavaScript regex (without delimiters)
2. Escape special characters properly (e.g., `\\d` for digits)
3. Test your pattern in a regex tester first
4. Check that the pattern string is correct (no extra quotes)

### Format Validation Failing

**Problem**: Format validation (email, date, etc.) is not working.

**Solutions**:

1. Verify the format is supported by ajv-formats
2. Check that the input value matches the expected format
3. For dates, ensure the format matches (e.g., `YYYY-MM-DD` for `date` format)

### Required Fields Not Validating

**Problem**: Required fields are not being validated.

**Solutions**:

1. Ensure the field name is in the `required` array at the schema root
2. Check that empty values are being properly stripped (this is automatic)
3. Verify the field name matches exactly (case-sensitive)

## Additional Resources

- [JSON Schema Specification](https://json-schema.org/)
- [AJV Documentation](https://ajv.js.org/)
- [React Hook Form Documentation](https://react-hook-form.com/)
- [AJV Formats](https://github.com/ajv-validator/ajv-formats)

## Summary

Form validation in `@bsol-oss/react-datatable5` is:

- **Schema-driven**: Define validation rules using JSON Schema
- **Flexible**: Support for strings, numbers, arrays, objects, and more
- **Customizable**: Define error messages per field and validation type
- **Automatic**: Empty value handling and error conversion happen automatically
- **Developer-friendly**: Helpful debug messages when error messages are missing

Remember: Always provide error messages for all validation rules to ensure a good user experience!
