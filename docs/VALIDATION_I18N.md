# Validation Messages Guide

This guide provides comprehensive instructions for providing validation messages in the `@bsol-oss/react-datatable5` form system.

Validation messages are provided directly as strings in the schema's `errorMessages` field - no i18n dependency required.

## Table of Contents

- [Overview](#overview)
- [Validation Message Types](#validation-message-types)
- [Providing Validation Messages](#providing-validation-messages)
- [Complete Examples](#complete-examples)
- [Best Practices](#best-practices)

## Overview

The form validation system uses [AJV (Another JSON Schema Validator)](https://ajv.js.org/) with the [ajv-errors](https://github.com/ajv-validator/ajv-errors) plugin to provide custom error messages.

Validation messages are provided as **direct strings** in the schema's `errorMessages` field - no i18n dependency required.

**Key Components:**

- `buildErrorMessages()`: Main utility for building error message configurations
- `buildRequiredErrors()`: Helper for creating required field error messages
- `createErrorMessage()`: Convenient wrapper combining required and validation errors

## Validation Message Types

### 1. Required Field Errors

**When triggered:** A required field is left empty or undefined.

**Schema location:** `schema.required` array

**Message location:** `errorMessage.required[fieldName]`

```typescript
// JSON Schema
{
  "required": ["username", "email"]
}

// Error Messages
{
  "errorMessage": {
    "required": {
      "username": "Username is required",
      "email": "Email is required"
    }
  }
}
```

**Using buildRequiredErrors:**

```typescript
// Using buildRequiredErrors helper
const errorMessage = buildErrorMessages({
  required: buildRequiredErrors(
    ['username', 'email'],
    (field) => `${field} is required`
  ),
});
```

### 2. String Validation Errors

#### minLength

**When triggered:** String length is less than the specified minimum.

**Schema property:** `minLength: number`

```typescript
{
  "type": "string",
  "minLength": 3
}
```

**Error message:**

```typescript
{
  "errorMessage": {
    "properties": {
      "username": {
        "minLength": "Username must be at least 3 characters"
      }
    }
  }
}
```

#### maxLength

**When triggered:** String length exceeds the specified maximum.

**Schema property:** `maxLength: number`

```typescript
{
  "type": "string",
  "maxLength": 50
}
```

**Error message:**

```typescript
{
  "errorMessage": {
    "properties": {
      "username": {
        "maxLength": "Username cannot exceed 50 characters"
      }
    }
  }
}
```

#### pattern

**When triggered:** String doesn't match the specified regular expression.

**Schema property:** `pattern: string` (regex)

```typescript
{
  "type": "string",
  "pattern": "^[a-zA-Z0-9]+$"
}
```

**Error message:**

```typescript
{
  "errorMessage": {
    "properties": {
      "username": {
        "pattern": "Username can only contain letters and numbers"
      }
    }
  }
}
```

### 3. Number Validation Errors

#### minimum

**When triggered:** Number is less than the specified minimum value.

**Schema property:** `minimum: number`

```typescript
{
  "type": "number",
  "minimum": 18
}
```

**Error message:**

```typescript
{
  "errorMessage": {
    "properties": {
      "age": {
        "minimum": "Age must be at least 18"
      }
    }
  }
}
```

#### maximum

**When triggered:** Number exceeds the specified maximum value.

**Schema property:** `maximum: number`

```typescript
{
  "type": "number",
  "maximum": 120
}
```

**Error message:**

```typescript
{
  "errorMessage": {
    "properties": {
      "age": {
        "maximum": "Age cannot exceed 120"
      }
    }
  }
}
```

#### multipleOf

**When triggered:** Number is not a multiple of the specified value.

**Schema property:** `multipleOf: number`

```typescript
{
  "type": "number",
  "multipleOf": 5
}
```

**Error message:**

```typescript
{
  "errorMessage": {
    "properties": {
      "quantity": {
        "multipleOf": "Quantity must be a multiple of 5"
      }
    }
  }
}
```

### 4. Format Validation Errors

**When triggered:** String doesn't match the specified format (email, date, time, uri, uuid, etc.).

**Schema property:** `format: string`

**Supported formats** (via ajv-formats):

- `email`
- `date`
- `time`
- `date-time`
- `uri` / `url`
- `uuid`
- `ipv4` / `ipv6`
- `hostname`
- `json-pointer`
- `regex`

```typescript
{
  "type": "string",
  "format": "email"
}
```

**Error message:**

```typescript
{
  "errorMessage": {
    "properties": {
      "email": {
        "format": "Please enter a valid email address"
      }
    }
  }
}
```

### 5. Type Validation Errors

**When triggered:** Value doesn't match the expected JSON Schema type.

**Schema property:** `type: string`

**Supported types:** `string`, `number`, `integer`, `boolean`, `array`, `object`, `null`

```typescript
{
  "type": "number"
}
```

**Error message:**

```typescript
{
  "errorMessage": {
    "properties": {
      "age": {
        "type": "Age must be a number"
      }
    }
  }
}
```

### 6. Enum Validation Errors

**When triggered:** Value is not one of the allowed enum values.

**Schema property:** `enum: any[]`

```typescript
{
  "type": "string",
  "enum": ["active", "inactive", "pending"]
}
```

**Error message:**

```typescript
{
  "errorMessage": {
    "properties": {
      "status": {
        "enum": "Status must be active, inactive, or pending"
      }
    }
  }
}
```

### 7. Global Fallback Errors

**When triggered:** No field-specific error message is provided.

**Usage:** Provide default messages for all validation types.

```typescript
{
  "errorMessage": {
    "minLength": "This field is too short",
    "maxLength": "This field is too long",
    "minimum": "Value is too small",
    "maximum": "Value is too large",
    "format": "Invalid format",
    "type": "Invalid type",
    "pattern": "Invalid pattern",
    "enum": "Invalid value"
  }
}
```

## Providing Validation Messages

### Solution 1: Direct Strings in Schema (Recommended - No i18n Required)

**This is the simplest approach** - provide error messages directly as strings in your schema. No i18n setup needed.

**Best for:** Simple forms, quick prototyping, or when you don't want to set up i18n.

```typescript
import { buildErrorMessages } from '@bsol-oss/react-datatable5';

// Define error messages as direct strings (no i18n required)
const errorMessage = buildErrorMessages({
  required: {
    username: 'Username is required',
    email: 'Email is required',
  },
  properties: {
    username: {
      minLength: 'Username must be at least 3 characters',
      pattern: 'Username can only contain letters and numbers',
    },
    email: {
      format: 'Please enter a valid email address',
    },
  },
});

const schema = {
  type: 'object',
  properties: {
    username: {
      type: 'string',
      minLength: 3,
      pattern: '^[a-zA-Z0-9]+$',
    },
    email: {
      type: 'string',
      format: 'email',
    },
  },
  required: ['username', 'email'],
  errorMessage,
};
```

**No translation file needed** - messages are provided directly in the schema. If you need multiple languages, you can switch schemas dynamically.

```typescript
import {
  buildErrorMessages,
  buildRequiredErrors,
} from '@bsol-oss/react-datatable5';

// Generate required errors with pattern
const requiredFields = [
  'username',
  'email',
  'password',
  'firstName',
  'lastName',
];

const errorMessage = buildErrorMessages({
  required: buildRequiredErrors(
    requiredFields,
    (field) => `${field}.field_required`,
    'user' // prefix
  ),
  properties: {
    username: {
      minLength: 'user.username.minLength',
      maxLength: 'user.username.maxLength',
    },
    password: {
      minLength: 'user.password.minLength',
      pattern: 'user.password.pattern',
    },
  },
});

// Result:
// {
//   required: {
//     username: "user.username.field_required",
//     email: "user.email.field_required",
//     password: "user.password.field_required",
//     firstName: "user.firstName.field_required",
//     lastName: "user.lastName.field_required"
//   },
//   properties: { ... }
// }
```

### Solution 2: Using createErrorMessage Wrapper

**Best for:** Clean, readable code when you have both required and validation errors. Uses direct strings for all error messages.

```typescript
import {
  createErrorMessage,
  buildRequiredErrors,
  buildFieldErrors,
} from '@bsol-oss/react-datatable5';

const errorMessage = createErrorMessage(
  // Required field errors
  buildRequiredErrors(
    ['name', 'price', 'category'],
    (field) => `${field} is required`
  ),
  // Field-specific validation errors
  buildFieldErrors({
    name: {
      minLength: 'Name must be at least 3 characters',
      maxLength: 'Name cannot exceed 100 characters',
    },
    price: {
      minimum: 'Price must be at least 0.01',
      maximum: 'Price cannot exceed 999999.99',
    },
    sku: {
      pattern: 'SKU must match pattern ABC-123456',
    },
  }),
  // Global fallbacks (optional)
  {
    format: 'Invalid format',
    type: 'Invalid type',
  }
);
```

## Complete Examples

### Example 1: User Registration Form (Direct Strings - No i18n Required)

```typescript
import {
  buildErrorMessages,
  buildRequiredErrors
} from "@bsol-oss/react-datatable5";

// No i18n setup needed - use direct strings
  fallbackLng: "en",
  resources: {
    en: {
      translation: {
        user: {
          username: {
            field_required: "Username is required",
            field_label: "Username",
            minLength: "Username must be at least {{min}} characters",
            maxLength: "Username cannot exceed {{max}} characters",
            pattern: "Username can only contain letters, numbers, and underscores"
          },
          email: {
            field_required: "Email is required",
            field_label: "Email Address",
            format: "Please enter a valid email address"
          },
          password: {
            field_required: "Password is required",
            field_label: "Password",
            minLength: "Password must be at least {{min}} characters",
            pattern: "Password must contain letters, numbers, and special characters"
          },
          age: {
            field_required: "Age is required",
            field_label: "Age",
            minimum: "You must be at least {{min}} years old",
            maximum: "Age cannot exceed {{max}}",
            type: "Age must be a number"
          }
        },
        validation: {
          format: "Invalid format",
          type: "Invalid type"
        }
      }
    },
    "zh-HK": {
      translation: {
        user: {
          username: {
            field_required: "必須填寫用戶名稱",
            field_label: "用戶名稱",
            minLength: "用戶名稱至少需要 {{min}} 個字元",
            maxLength: "用戶名稱不能超過 {{max}} 個字元",
            pattern: "用戶名稱只能包含字母、數字和底線"
          },
          email: {
            field_required: "必須填寫電郵地址",
            field_label: "電郵地址",
            format: "請輸入有效的電郵地址"
          },
          password: {
            field_required: "必須填寫密碼",
            field_label: "密碼",
            minLength: "密碼至少需要 {{min}} 個字元",
            pattern: "密碼必須包含字母、數字和特殊字元"
          },
          age: {
            field_required: "必須填寫年齡",
            field_label: "年齡",
            minimum: "您必須至少 {{min}} 歲",
            maximum: "年齡不能超過 {{max}}",
            type: "年齡必須是數字"
          }
        },
        validation: {
          format: "格式無效",
          type: "類型無效"
        }
      }
    }
  }
});

// Build error messages with direct strings (no i18n required)
const errorMessage = buildErrorMessages({
  required: {
    username: "Username is required",
    email: "Email is required",
    password: "Password is required",
    age: "Age is required"
  },
  properties: {
    username: {
      minLength: "Username must be at least 3 characters",
      maxLength: "Username cannot exceed 20 characters",
      pattern: "Username can only contain letters, numbers, and underscores"
    },
    email: {
      format: "Please enter a valid email address"
    },
    password: {
      minLength: "Password must be at least 8 characters",
      pattern: "Password must contain letters, numbers, and special characters"
    },
    age: {
      minimum: "You must be at least 18 years old",
      maximum: "Age cannot exceed 120",
      type: "Age must be a number"
    }
  },
  // Global fallbacks
  format: "Invalid format",
  type: "Invalid type"
});

// JSON Schema
const schema = {
  type: "object",
  properties: {
    username: {
      type: "string",
      minLength: 3,
      maxLength: 20,
      pattern: "^[a-zA-Z0-9_]+$"
    },
    email: {
      type: "string",
      format: "email"
    },
    password: {
      type: "string",
      minLength: 8,
      pattern: "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]"
    },
    age: {
      type: "number",
      minimum: 18,
      maximum: 120
    }
  },
  required: ["username", "email", "password", "age"],
  errorMessage
};

// Usage in form
const UserRegistrationForm = () => {
  const form = useForm();

  return (
    <DefaultForm
      formConfig={{
        schema,
        serverUrl: "https://api.example.com",
        onSubmit: async (data) => {
          console.log("User registered:", data);
        },
        ...form
      }}
    />
  );
};
```

### Example 2: Product Form with All Validation Types

```typescript
const errorMessage = buildErrorMessages({
  required: buildRequiredErrors(
    ['name', 'sku', 'price', 'category', 'stock'],
    (field) => `${field}.field_required`,
    'product'
  ),
  properties: {
    name: {
      minLength: 'product.name.minLength', // String: too short
      maxLength: 'product.name.maxLength', // String: too long
    },
    sku: {
      pattern: 'product.sku.pattern', // String: invalid pattern
    },
    description: {
      maxLength: 'product.description.maxLength',
    },
    price: {
      minimum: 'product.price.minimum', // Number: too small
      maximum: 'product.price.maximum', // Number: too large
    },
    stock: {
      minimum: 'product.stock.minimum',
      multipleOf: 'product.stock.multipleOf', // Number: not multiple of
    },
    weight: {
      type: 'product.weight.type', // Type: not a number
    },
    category: {
      enum: 'product.category.enum', // Enum: invalid value
    },
    manufactureDate: {
      format: 'product.manufactureDate.format', // Format: invalid date
    },
    website: {
      format: 'product.website.format', // Format: invalid URL
    },
  },
  // Global fallbacks
  minLength: 'validation.minLength',
  maxLength: 'validation.maxLength',
  minimum: 'validation.minimum',
  maximum: 'validation.maximum',
  pattern: 'validation.pattern',
  format: 'validation.format',
  type: 'validation.type',
  enum: 'validation.enum',
  multipleOf: 'validation.multipleOf',
});

const schema = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
      minLength: 3,
      maxLength: 100,
    },
    sku: {
      type: 'string',
      pattern: '^[A-Z]{3}-\\d{6}$', // e.g., ABC-123456
    },
    description: {
      type: 'string',
      maxLength: 500,
    },
    price: {
      type: 'number',
      minimum: 0.01,
      maximum: 999999.99,
    },
    stock: {
      type: 'number',
      minimum: 0,
      multipleOf: 5, // Stock must be in increments of 5
    },
    weight: {
      type: 'number',
    },
    category: {
      type: 'string',
      enum: ['electronics', 'clothing', 'food', 'books', 'toys'],
    },
    manufactureDate: {
      type: 'string',
      format: 'date',
    },
    website: {
      type: 'string',
      format: 'uri',
    },
  },
  required: ['name', 'sku', 'price', 'category', 'stock'],
  errorMessage,
};
```

### Example 3: Nested Objects and Arrays

```typescript
// For nested objects, use dot notation in translation keys
const errorMessage = buildErrorMessages({
  required: {
    "address.street": "address.street.field_required",
    "address.city": "address.street.field_required",
    "address.zipCode": "address.zipCode.field_required"
  },
  properties: {
    address: {
      properties: {
        street: {
          minLength: "address.street.minLength"
        },
        zipCode: {
          pattern: "address.zipCode.pattern"
        }
      }
    },
    phoneNumbers: {
      minItems: "user.phoneNumbers.minItems",
      items: {
        pattern: "user.phoneNumbers.items.pattern"
      }
    }
  }
});

const schema = {
  type: "object",
  properties: {
    address: {
      type: "object",
      properties: {
        street: {
          type: "string",
          minLength: 5
        },
        city: {
          type: "string"
        },
        zipCode: {
          type: "string",
          pattern: "^\\d{5}$"
        }
      },
      required: ["street", "city", "zipCode"]
    },
    phoneNumbers: {
      type: "array",
      minItems: 1,
      items: {
        type: "string",
        pattern: "^\\d{3}-\\d{3}-\\d{4}$"
      }
    }
  },
  errorMessage
};

// Translation keys
{
  "en": {
    "address": {
      "street": {
        "field_required": "Street address is required",
        "minLength": "Street address must be at least 5 characters"
      },
      "city": {
        "field_required": "City is required"
      },
      "zipCode": {
        "field_required": "ZIP code is required",
        "pattern": "ZIP code must be 5 digits"
      }
    },
    "user": {
      "phoneNumbers": {
        "minItems": "At least one phone number is required",
        "items": {
          "pattern": "Phone number must be in format: 123-456-7890"
        }
      }
    }
  }
}
```

## Best Practices

### 1. Organize Translation Keys Hierarchically

```typescript
// Good: Hierarchical structure
{
  "user": {
    "profile": {
      "firstName": {
        "field_required": "...",
        "minLength": "..."
      }
    }
  }
}

// Avoid: Flat structure
{
  "user_profile_firstName_field_required": "...",
  "user_profile_firstName_minLength": "..."
}
```

### 2. Use Consistent Naming Conventions

**Recommended patterns:**

- Required fields: `{entity}.{field}.field_required`
- Field labels: `{entity}.{field}.field_label`
- Validation errors: `{entity}.{field}.{validationType}`
- Global fallbacks: `validation.{validationType}`

### 3. Leverage keyPrefix in useForm

```typescript
const form = useForm({
  keyPrefix: 'user.registration',
});

// All translation keys will be prefixed:
// user.registration.username.field_required
// user.registration.email.format
```

### 4. Create Reusable Error Message Configurations

```typescript
// errorMessages.ts
export const commonValidationErrors = {
  email: {
    format: 'validation.email.format',
  },
  phone: {
    pattern: 'validation.phone.pattern',
  },
  url: {
    format: 'validation.url.format',
  },
};

export const buildUserErrorMessages = (prefix: string) => {
  return buildErrorMessages({
    required: buildRequiredErrors(
      ['email', 'password'],
      (field) => `${field}.field_required`,
      prefix
    ),
    properties: {
      email: commonValidationErrors.email,
      website: commonValidationErrors.url,
    },
  });
};
```

### 5. Provide Helpful, User-Friendly Messages

```typescript
// Good: Clear and actionable
'Username must be at least 3 characters';
'Email address is required';
'Password must contain at least one letter, one number, and one special character';

// Avoid: Technical jargon
'minLength validation failed';
'Format pattern mismatch';
'Invalid schema constraint';
```

### 6. Use Interpolation for Dynamic Values

```typescript
// Translation file
{
  "product": {
    "price": {
      "minimum": "Price must be at least ${{limit}}",
      "maximum": "Price cannot exceed ${{limit}}"
    }
  }
}

// The {{limit}} will be automatically replaced with the schema constraint
```

### 7. Test All Validation Messages

```typescript
// Create a test form that triggers all validation errors
const TestValidationForm = () => {
  const [language, setLanguage] = useState("en");

  return (
    <>
      <LanguageSwitcher onChange={setLanguage} />
      <FormRoot schema={schema}>
        <FormBody />
      </FormRoot>
    </>
  );
};

// Manually test:
// 1. Switch languages
// 2. Submit empty form (test required errors)
// 3. Enter invalid values (test validation errors)
// 4. Verify all error messages display correctly
```

### 8. Maintain Translation Files

```typescript
// Create a script to extract all validation keys from schemas
// scripts/extract-validation-keys.ts

const extractValidationKeys = (schema: JSONSchema7) => {
  const keys = new Set<string>();

  // Extract required field keys
  if (schema.errorMessage?.required) {
    Object.values(schema.errorMessage.required).forEach((key) => keys.add(key));
  }

  // Extract property validation keys
  if (schema.errorMessage?.properties) {
    Object.values(schema.errorMessage.properties).forEach((fieldErrors) => {
      Object.values(fieldErrors).forEach((key) => keys.add(key));
    });
  }

  return Array.from(keys);
};
```

### 9. Fallback Strategy

Always provide global fallbacks for better UX:

```typescript
const errorMessage = buildErrorMessages({
  required: {
    /* field-specific */
  },
  properties: {
    /* field-specific */
  },
  // Global fallbacks ensure users always see meaningful errors
  minLength: 'validation.minLength',
  maxLength: 'validation.maxLength',
  minimum: 'validation.minimum',
  maximum: 'validation.maximum',
  pattern: 'validation.pattern',
  format: 'validation.format',
  type: 'validation.type',
  enum: 'validation.enum',
});
```

### 10. Document Validation Rules

Add comments in your schema or maintain a separate validation documentation:

```typescript
const schema = {
  properties: {
    // Username: 3-20 alphanumeric characters
    username: {
      type: 'string',
      minLength: 3,
      maxLength: 20,
      pattern: '^[a-zA-Z0-9]+$',
    },
    // Email: must be valid email format
    email: {
      type: 'string',
      format: 'email',
    },
    // Password: 8+ chars with letters, numbers, special chars
    password: {
      type: 'string',
      minLength: 8,
      pattern: '^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]',
    },
  },
};
```

## Summary

**All validation message types:**

1. ✅ `required` - Required field errors
2. ✅ `minLength` - String minimum length
3. ✅ `maxLength` - String maximum length
4. ✅ `pattern` - String pattern/regex validation
5. ✅ `minimum` - Number minimum value
6. ✅ `maximum` - Number maximum value
7. ✅ `multipleOf` - Number must be multiple of
8. ✅ `format` - String format validation (email, date, url, etc.)
9. ✅ `type` - Type validation (string, number, boolean, etc.)
10. ✅ `enum` - Enum value validation

**Available utilities:**

- `buildErrorMessages()` - Main builder for error message configuration
- `buildRequiredErrors()` - Helper for required field errors
- `buildFieldErrors()` - Helper for field-specific validation errors
- `createErrorMessage()` - Convenient wrapper combining all error types

**Error message format:**

- **Direct strings**: `"Username is required"`
- Provide error messages directly in the schema's `errorMessages` field
- All error messages are provided as strings - no i18n dependency required

For more examples, see the Storybook stories at `src/stories/Form/validation.stories.tsx`.
