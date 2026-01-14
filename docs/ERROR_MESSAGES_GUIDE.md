# Error Messages Guide

This guide explains how to set custom error messages for form validation in `@bsol-oss/react-datatable5`.

## Overview

The library uses JSON Schema validation with AJV (Another JSON Schema Validator) to validate form data. Custom error messages are defined directly in your JSON Schema using the `errorMessages` field on each property.

**Key Points:**

- Error messages are defined per-field in the schema
- No default error messages are provided - you must define them
- Error messages can be translation keys for i18n integration
- If no error message is provided, a helpful fallback message will be shown in the console

## Basic Structure

Error messages are defined using the `errorMessages` object within each schema property:

```typescript
{
  type: 'string',
  minLength: 3,
  errorMessages: {
    required: 'This field is required',
    minLength: 'Value must be at least 3 characters',
  }
}
```

## Supported Validation Error Types

The following validation error types are supported:

| Error Type      | Description                                          | Schema Property              |
| --------------- | ---------------------------------------------------- | ---------------------------- |
| `required`      | Field is required but missing                        | `required: ['fieldName']`    |
| `minLength`     | String is too short                                  | `minLength: number`          |
| `maxLength`     | String is too long                                   | `maxLength: number`          |
| `pattern`       | String doesn't match regex pattern                   | `pattern: 'regex'`           |
| `minimum`       | Number is too small                                  | `minimum: number`            |
| `maximum`       | Number is too large                                  | `maximum: number`            |
| `multipleOf`    | Number is not a multiple of value                    | `multipleOf: number`         |
| `format`        | Value doesn't match format (email, date, time, etc.) | `format: 'email'`            |
| `type`          | Value type doesn't match schema type                 | `type: 'string'`             |
| `enum`          | Value not in allowed enum values                     | `enum: ['value1', 'value2']` |
| `minItems`      | Array has too few items                              | `minItems: number`           |
| `maxItems`      | Array has too many items                             | `maxItems: number`           |
| `uniqueItems`   | Array contains duplicate items                       | `uniqueItems: true`          |
| `minProperties` | Object has too few properties                        | `minProperties: number`      |
| `maxProperties` | Object has too many properties                       | `maxProperties: number`      |

## Examples

### String Validation

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
  },
  required: ['username', 'email', 'password'],
} as JSONSchema7;
```

### Number Validation

```typescript
const schema = {
  type: 'object',
  properties: {
    age: {
      type: 'number',
      minimum: 18,
      maximum: 120,
      errorMessages: {
        required: 'Age is required',
        minimum: 'Age must be at least 18',
        maximum: 'Age must be no more than 120',
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
  },
  required: ['age', 'price'],
} as JSONSchema7;
```

### Date and Time Validation

```typescript
const schema = {
  type: 'object',
  properties: {
    birthDate: {
      type: 'string',
      format: 'date',
      errorMessages: {
        required: 'Birth date is required',
        format: 'Please enter a valid date (YYYY-MM-DD)',
      },
    },
    appointmentTime: {
      type: 'string',
      format: 'time',
      errorMessages: {
        required: 'Appointment time is required',
        format: 'Please enter a valid time format (HH:mm)',
      },
    },
    createdAt: {
      type: 'string',
      format: 'date-time',
      errorMessages: {
        required: 'Created date is required',
        format: 'Please enter a valid date and time',
      },
    },
  },
  required: ['birthDate', 'appointmentTime'],
} as JSONSchema7;
```

### Enum Validation

```typescript
const schema = {
  type: 'object',
  properties: {
    category: {
      type: 'string',
      enum: ['electronics', 'clothing', 'food', 'books'],
      errorMessages: {
        required: 'Category is required',
        enum: 'Please select a valid category',
      },
    },
    status: {
      type: 'string',
      enum: ['active', 'inactive', 'pending'],
      errorMessages: {
        required: 'Status is required',
        enum: 'Please select a valid status',
      },
    },
  },
  required: ['category', 'status'],
} as JSONSchema7;
```

### Array Validation

```typescript
const schema = {
  type: 'object',
  properties: {
    tags: {
      type: 'array',
      items: {
        type: 'string',
      },
      minItems: 1,
      maxItems: 10,
      uniqueItems: true,
      errorMessages: {
        required: 'At least one tag is required',
        minItems: 'Please provide at least 1 tag',
        maxItems: 'Please provide no more than 10 tags',
        uniqueItems: 'Tags must be unique',
      },
    },
  },
  required: ['tags'],
} as JSONSchema7;
```

### Textarea Validation

```typescript
const schema = {
  type: 'object',
  properties: {
    description: {
      type: 'string',
      variant: 'text-area',
      minLength: 10,
      maxLength: 500,
      errorMessages: {
        required: 'Description is required',
        minLength: 'Description must be at least 10 characters long',
        maxLength: 'Description must be no more than 500 characters long',
      },
    },
  },
  required: ['description'],
} as JSONSchema7;
```

## Using Translation Keys (i18n)

Since the library doesn't provide default error messages, you can use translation keys that your i18n system will resolve:

```typescript
const schema = {
  type: 'object',
  properties: {
    username: {
      type: 'string',
      minLength: 3,
      errorMessages: {
        required: 'user.username.field_required',
        minLength: 'user.username.minLength_error',
      },
    },
  },
  required: ['username'],
} as JSONSchema7;
```

Then in your i18n translation files:

```json
{
  "user": {
    "username": {
      "field_required": "Username is required",
      "minLength_error": "Username must be at least 3 characters long"
    }
  }
}
```

## Nested Objects

For nested object properties, error messages are defined at the property level:

```typescript
const schema = {
  type: 'object',
  properties: {
    address: {
      type: 'object',
      properties: {
        street: {
          type: 'string',
          errorMessages: {
            required: 'Street address is required',
          },
        },
        city: {
          type: 'string',
          errorMessages: {
            required: 'City is required',
          },
        },
        zipCode: {
          type: 'string',
          pattern: '^\\d{5}$',
          errorMessages: {
            required: 'Zip code is required',
            pattern: 'Zip code must be 5 digits',
          },
        },
      },
      required: ['street', 'city', 'zipCode'],
    },
  },
} as JSONSchema7;
```

## Error Message Priority

1. **Required errors** take priority - if a field is both required and has other validation errors, only the required error is shown
2. **Multiple errors** for the same field (non-required) are combined with semicolons
3. **Custom messages** override fallback messages

## Fallback Behavior

If you don't provide an error message for a validation error:

1. A helpful debug message is logged to the console:

   ```
   [Form Validation] Missing error message for field 'username' with keyword 'minLength'.
   Add errorMessages.minLength to schema for field 'username'
   ```

2. A fallback message is displayed to the user:
   ```
   Missing error message for minLength. Add errorMessages.minLength to schema for field 'username'
   ```

**Best Practice:** Always provide error messages for all validation rules you use.

## Complete Example

Here's a complete form example with comprehensive error messages:

```typescript
import { useForm } from '@bsol-oss/react-datatable5';
import { DefaultForm } from '@bsol-oss/react-datatable5';
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
        pattern: '^[a-zA-Z0-9_]+$',
        errorMessages: {
          required: 'Username is required',
          minLength: 'Username must be at least 3 characters',
          maxLength: 'Username must be no more than 20 characters',
          pattern: 'Username can only contain letters, numbers, and underscores',
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
        pattern: '^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]',
        errorMessages: {
          required: 'Password is required',
          minLength: 'Password must be at least 8 characters long',
          pattern: 'Password must contain uppercase, lowercase, number, and special character',
        },
      },
      age: {
        type: 'number',
        minimum: 18,
        maximum: 120,
        errorMessages: {
          required: 'Age is required',
          minimum: 'You must be at least 18 years old',
          maximum: 'Please enter a valid age',
        },
      },
      bio: {
        type: 'string',
        variant: 'text-area',
        maxLength: 500,
        errorMessages: {
          maxLength: 'Bio must be no more than 500 characters',
        },
      },
    },
    required: ['username', 'email', 'password', 'age'],
  } as JSONSchema7;

  const form = useForm({
    schema,
    preLoadedValues: {},
  });

  return (
    <DefaultForm
      formConfig={{
        schema,
        onSubmit: async (data) => {
          console.log('Form submitted:', data);
          // Handle form submission
        },
        ...form,
      }}
    />
  );
};
```

## Tips and Best Practices

1. **Always provide error messages** for all validation rules to ensure a good user experience
2. **Use descriptive messages** that clearly explain what went wrong and how to fix it
3. **Consider i18n** - use translation keys if your app supports multiple languages
4. **Test validation** - make sure all error messages appear correctly when validation fails
5. **Keep messages concise** - users should quickly understand what's wrong
6. **Be consistent** - use similar wording patterns across your forms

## Troubleshooting

### Error messages not appearing

- Check that `errorMessages` is defined in the schema property
- Verify the error keyword matches the validation rule (e.g., `minLength` for `minLength` rule)
- Ensure the field is in the `required` array if it's a required field
- Check the browser console for debug messages about missing error messages

### Multiple errors showing

- This is expected behavior for non-required fields with multiple validation errors
- Required errors always take priority and hide other errors
- Consider simplifying validation rules if too many errors are confusing

### Translation keys not resolving

- The library doesn't handle translation - your i18n system should resolve the keys
- Make sure your translation system is set up to handle the keys you're using
- Consider using plain text messages if i18n isn't needed
