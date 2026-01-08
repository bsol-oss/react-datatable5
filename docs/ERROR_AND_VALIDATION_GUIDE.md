# Error and Validation Guide

This comprehensive guide covers all aspects of error handling and validation in `@bsol-oss/react-datatable5`. The library uses **JSON Schema** (Draft 7) with **AJV** (Another JSON Schema Validator) for validation, integrated with **react-hook-form** for form state management.

## Table of Contents

- [Overview](#overview)
- [Validation Errors](#validation-errors)
  - [How Validation Works](#how-validation-works)
  - [Defining Error Messages](#defining-error-messages)
  - [Validation Rules](#validation-rules)
  - [Empty Value Handling](#empty-value-handling)
- [Form Submission Errors](#form-submission-errors)
  - [Error States](#error-states)
  - [Custom Error Rendering](#custom-error-rendering)
  - [Error Handling in onSubmit](#error-handling-in-onsubmit)
- [Error Display](#error-display)
  - [Field-Level Errors](#field-level-errors)
  - [Form-Level Errors](#form-level-errors)
  - [Error Priority](#error-priority)
- [Best Practices](#best-practices)
- [Troubleshooting](#troubleshooting)
- [Examples](#examples)

## Overview

### Types of Errors

The library handles two main types of errors:

1. **Validation Errors**: Client-side validation errors that occur when form data doesn't match the JSON Schema
2. **Submission Errors**: Server-side or API errors that occur during form submission

### Key Features

- **JSON Schema-based**: Define validation rules using standard JSON Schema Draft 7
- **AJV Validation**: Uses AJV with format validation support (email, date, time, uuid, etc.)
- **Custom Error Messages**: Define error messages per field and validation type via `errorMessages` field
- **Automatic Empty Value Handling**: Strips null, undefined, and empty strings before validation
- **React Hook Form Integration**: Seamlessly integrates with react-hook-form for form state management
- **Custom Error Rendering**: Support for custom error display components
- **Error State Management**: Built-in error state tracking for submission errors

## Validation Errors

### How Validation Works

The validation process follows these steps:

1. **Form Submission or Field Blur**: Validation triggers on form submission or when a field loses focus (depending on validation mode)
2. **Empty Value Stripping**: Null, undefined, and empty strings are automatically stripped
3. **Schema Validation**: Data is validated against JSON Schema using AJV
4. **Error Conversion**: AJV errors are converted to react-hook-form field errors
5. **Error Display**: Error messages are displayed using custom messages from `errorMessages` field

```typescript
// Validation flow
const formValues = { username: 'john', email: '', age: 15 };

// 1. Empty values are stripped
const cleanedValues = { username: 'john', age: 15 };

// 2. Validation against schema
const { isValid, errors } = validateData(cleanedValues, schema);

// 3. Errors converted to field errors
const fieldErrors = convertAjvErrorsToFieldErrors(errors, schema);

// 4. Errors displayed in form fields
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

### Defining Error Messages

#### Per-Field Error Messages (Recommended)

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

#### Error Message Structure

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

#### Using i18n Translation Keys

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

#### Missing Error Messages

If an error message is not provided for a validation rule, the system will:

1. Log a debug message to the console
2. Display a helpful fallback message: `"Missing error message for {keyword}. Add errorMessages.{keyword} to schema for field '{fieldName}'"`

**Important**: Always provide error messages for all validation rules to ensure a good user experience.

### Validation Rules

#### String Validation

**Required Fields:**

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

**Length Constraints:**

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

**Pattern Matching:**

```typescript
{
  type: 'string',
  pattern: '^[a-zA-Z0-9]+$',
  errorMessages: {
    pattern: 'Only letters and numbers are allowed',
  },
}
```

**Format Validation:**
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

#### Number Validation

**Minimum and Maximum:**

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

**Multiple Of:**

```typescript
{
  type: 'number',
  multipleOf: 0.01,
  errorMessages: {
    multipleOf: 'Must be a multiple of 0.01',
  },
}
```

#### Enum Validation

```typescript
{
  type: 'string',
  enum: ['option1', 'option2', 'option3'],
  errorMessages: {
    enum: 'Please select a valid option',
  },
}
```

#### Array Validation

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

### Empty Value Handling

#### Automatic Empty Value Stripping

Before validation, the system automatically strips:

- `null` values
- `undefined` values
- Empty strings (`""`)
- Arrays containing only empty values

This ensures that:

- Optional fields don't trigger validation errors when empty
- Required fields properly validate when empty
- Validation focuses on actual data values

**Example:**

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

#### Required Field Validation

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

## Form Submission Errors

### Error States

The form maintains several error-related states that you can access:

```typescript
const {
  isError, // Boolean: true if submission error occurred
  error, // Unknown: The error object from submission
  isSubmiting, // Boolean: true while submission is in progress
  isSuccess, // Boolean: true if submission succeeded
} = useSchemaContext();
```

### Custom Error Rendering

You can provide a custom error renderer to display submission errors:

```typescript
<FormRoot
  schema={schema}
  customErrorRenderer={(error) => {
    // Handle different error types
    if (error instanceof Error) {
      return (
        <Alert.Root status="error">
          <Alert.Title>Error</Alert.Title>
          <Alert.Description>{error.message}</Alert.Description>
        </Alert.Root>
      );
    }

    // Handle API errors
    if (error && typeof error === 'object' && 'response' in error) {
      const apiError = error as { response?: { data?: { message?: string } } };
      return (
        <Alert.Root status="error">
          <Alert.Title>Submission Failed</Alert.Title>
          <Alert.Description>
            {apiError.response?.data?.message || 'An error occurred'}
          </Alert.Description>
        </Alert.Root>
      );
    }

    return (
      <Alert.Root status="error">
        <Alert.Title>An unexpected error occurred</Alert.Title>
      </Alert.Root>
    );
  }}
  // ... other props
>
  <FormBody />
</FormRoot>
```

### Error Handling in onSubmit

The `onSubmit` handler should handle errors appropriately:

```typescript
<FormRoot
  schema={schema}
  onSubmit={async (data) => {
    try {
      const response = await api.post('/users', data);
      // Success handling
      console.log('User created:', response.data);
    } catch (error) {
      // Error is automatically caught and stored in context
      // You can also throw to ensure error state is set
      throw error;
    }
  }}
  // ... other props
>
  <FormBody />
</FormRoot>
```

**Note**: Errors thrown in `onSubmit` are automatically caught and stored in the form context. The `isError` state will be set to `true`, and the error will be available via `customErrorRenderer` or through the context.

## Error Display

### Field-Level Errors

Field-level errors are automatically displayed below each input field using Chakra UI's `Field.ErrorText` component:

```typescript
// Field component automatically displays errors
<Field
  label="Username"
  required={isRequired}
  errorText={fieldError}  // Error message from validation
  invalid={!!fieldError}  // Visual indicator
>
  <Input {...register('username')} />
</Field>
```

Errors are extracted from react-hook-form errors using the `getFieldError` utility:

```typescript
const {
  formState: { errors },
} = useFormContext();
const fieldError = getFieldError(errors, 'username');
```

### Form-Level Errors

Form-level errors (submission errors) can be displayed using the `customErrorRenderer` prop or by accessing the error state:

```typescript
const { isError, error } = useSchemaContext();

if (isError) {
  return (
    <Alert.Root status="error">
      <Alert.Title>Error</Alert.Title>
      <Alert.Description>
        {error instanceof Error ? error.message : 'An error occurred'}
      </Alert.Description>
    </Alert.Root>
  );
}
```

### Error Priority

Error priority is handled as follows:

1. **Required Errors** (Highest Priority): Required field errors take precedence over other validation errors
2. **Field-Specific Errors**: Other validation errors (minLength, pattern, etc.) are shown if no required error exists
3. **Form-Level Errors**: Submission errors are shown separately from field validation errors

The `getFieldError` utility implements this priority:

```typescript
// Check for form-level required errors first (highest priority)
const requiredError = errors['#.required'];
if (requiredError) {
  return extractErrorMessage(requiredError);
}

// If no required errors, return field-specific error
const fieldError = errors[fieldName];
if (fieldError) {
  return extractErrorMessage(fieldError);
}
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

### 4. Handle Submission Errors Gracefully

Always provide a `customErrorRenderer` for better user experience:

```typescript
<FormRoot
  customErrorRenderer={(error) => {
    // Extract meaningful error message
    const message = extractErrorMessage(error);
    return (
      <Alert.Root status="error">
        <Alert.Title>Error</Alert.Title>
        <Alert.Description>{message}</Alert.Description>
      </Alert.Root>
    );
  }}
  // ... other props
/>
```

### 5. Validate Before Submission

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

### 6. Test Edge Cases

Test your validation with:

- Empty values
- Boundary values (min/max)
- Invalid formats
- Special characters in patterns
- Network errors during submission

### 7. Keep Schemas Maintainable

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
5. Verify that the field name matches exactly (case-sensitive)

### Validation Not Triggering

**Problem**: Validation is not running when expected.

**Solutions**:

1. Ensure the schema is properly passed to `useForm`
2. Check that validation rules are correctly defined in the schema
3. Verify that empty values are being handled correctly (they are stripped before validation)
4. Check that the AJV resolver is properly configured

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

### Submission Errors Not Displaying

**Problem**: Submission errors are not showing up.

**Solutions**:

1. Ensure `customErrorRenderer` is provided if you want custom error display
2. Check that errors are being thrown in `onSubmit`
3. Verify that `isError` state is being checked in your component
4. Check browser console for error details

## Examples

### Complete Form with Validation and Error Handling

```typescript
import { DefaultForm } from '@/components/Form/components/core/DefaultForm';
import { useForm } from '@/components/Form/useForm';
import { Alert } from '@chakra-ui/react';
import { JSONSchema7 } from 'json-schema';

const UserRegistrationForm = () => {
  const schema = {
    type: 'object',
    title: 'User Registration',
    properties: {
      username: {
        type: 'string',
        minLength: 3,
        maxLength: 20,
        pattern: '^[a-zA-Z0-9]+$',
        errorMessages: {
          required: 'Username is required',
          minLength: 'Username must be at least 3 characters',
          maxLength: 'Username must be no more than 20 characters',
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
    required: ['username', 'email', 'password'],
  } as JSONSchema7;

  const form = useForm({
    schema,
  });

  return (
    <DefaultForm
      formConfig={{
        schema,
        onSubmit: async (data) => {
          try {
            const response = await fetch('/api/users', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(data),
            });

            if (!response.ok) {
              throw new Error('Failed to create user');
            }

            console.log('User created:', await response.json());
          } catch (error) {
            // Error is automatically caught and stored
            throw error;
          }
        },
        customErrorRenderer: (error) => {
          return (
            <Alert.Root status="error" mb={4}>
              <Alert.Title>Registration Failed</Alert.Title>
              <Alert.Description>
                {error instanceof Error
                  ? error.message
                  : 'An error occurred during registration. Please try again.'}
              </Alert.Description>
            </Alert.Root>
          );
        },
        ...form,
      }}
    />
  );
};
```

### Form with i18n Error Messages

```typescript
const schema = {
  type: 'object',
  properties: {
    username: {
      type: 'string',
      minLength: 3,
      errorMessages: {
        required: 'user.username.required', // i18n key
        minLength: 'user.username.minLength', // i18n key
      },
    },
  },
  required: ['username'],
} as JSONSchema7;

// In your i18n translation files:
// en.json
{
  "user": {
    "username": {
      "required": "Username is required",
      "minLength": "Username must be at least 3 characters"
    }
  }
}

// The consuming application is responsible for translating these keys
```

### Handling API Error Responses

```typescript
<FormRoot
  schema={schema}
  onSubmit={async (data) => {
    try {
      const response = await axios.post('/api/users', data);
      return response.data;
    } catch (error) {
      // Axios errors have a response property
      if (axios.isAxiosError(error) && error.response) {
        // Extract error message from API response
        const message = error.response.data?.message || 'An error occurred';
        throw new Error(message);
      }
      throw error;
    }
  }}
  customErrorRenderer={(error) => {
    // Handle different error types
    if (error instanceof Error) {
      return (
        <Alert.Root status="error">
          <Alert.Title>Error</Alert.Title>
          <Alert.Description>{error.message}</Alert.Description>
        </Alert.Root>
      );
    }
    return null;
  }}
  // ... other props
>
  <FormBody />
</FormRoot>
```

## Summary

Error and validation handling in `@bsol-oss/react-datatable5` is:

- **Schema-driven**: Define validation rules using JSON Schema
- **Flexible**: Support for strings, numbers, arrays, objects, and more
- **Customizable**: Define error messages per field and validation type
- **Automatic**: Empty value handling and error conversion happen automatically
- **Developer-friendly**: Helpful debug messages when error messages are missing
- **Comprehensive**: Handles both validation errors and submission errors

**Key Takeaways**:

1. Always provide `errorMessages` for all validation rules
2. Use descriptive, actionable error messages
3. Provide `customErrorRenderer` for better submission error handling
4. Test edge cases and error scenarios
5. Use i18n keys for multi-language support

For more details on specific validation rules, see the [VALIDATION_GUIDE.md](../VALIDATION_GUIDE.md) in the project root.
