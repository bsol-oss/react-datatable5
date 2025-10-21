# Validation Messages i18n Guide

This guide provides comprehensive instructions for internationalizing validation messages in the `@bsol-oss/react-datatable5` form system.

## Table of Contents

- [Overview](#overview)
- [Validation Message Types](#validation-message-types)
- [i18n Solutions](#i18n-solutions)
- [Complete Examples](#complete-examples)
- [Best Practices](#best-practices)

## Overview

The form validation system uses [AJV (Another JSON Schema Validator)](https://ajv.js.org/) with the [ajv-errors](https://github.com/ajv-validator/ajv-errors) plugin to provide custom error messages. All validation messages support internationalization through `react-i18next`.

**Key Components:**

- `buildErrorMessages()`: Main utility for building error message configurations
- `buildRequiredErrors()`: Helper for creating required field error messages
- `createErrorMessage()`: Convenient wrapper combining required and validation errors
- `useFormI18n()`: Hook for simplified field-level i18n access

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

**i18n pattern:**

```typescript
// Translation keys
{
  "en": {
    "user.username.field_required": "Username is required",
    "user.email.field_required": "Email is required"
  },
  "zh-HK": {
    "user.username.field_required": "必須填寫用戶名稱",
    "user.email.field_required": "必須填寫電郵地址"
  }
}

// Using buildRequiredErrors with i18n
const errorMessage = buildErrorMessages({
  required: buildRequiredErrors(
    ["username", "email"],
    (field) => `${field}.field_required`,
    "user" // prefix
  )
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

**i18n pattern:**

```typescript
{
  "en": {
    "user.username.minLength": "Username must be at least {{limit}} characters"
  },
  "zh-HK": {
    "user.username.minLength": "用戶名稱至少需要 {{limit}} 個字元"
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

**i18n pattern:**

```typescript
{
  "en": {
    "user.username.maxLength": "Username cannot exceed {{limit}} characters"
  },
  "zh-HK": {
    "user.username.maxLength": "用戶名稱不能超過 {{limit}} 個字元"
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

**i18n pattern:**

```typescript
{
  "en": {
    "user.username.pattern": "Username can only contain letters and numbers"
  },
  "zh-HK": {
    "user.username.pattern": "用戶名稱只能包含字母和數字"
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

**i18n pattern:**

```typescript
{
  "en": {
    "user.age.minimum": "Age must be at least {{limit}}"
  },
  "zh-HK": {
    "user.age.minimum": "年齡必須至少 {{limit}} 歲"
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

**i18n pattern:**

```typescript
{
  "en": {
    "user.age.maximum": "Age cannot exceed {{limit}}"
  },
  "zh-HK": {
    "user.age.maximum": "年齡不能超過 {{limit}} 歲"
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

**i18n pattern:**

```typescript
{
  "en": {
    "product.quantity.multipleOf": "Quantity must be a multiple of {{multipleOf}}"
  },
  "zh-HK": {
    "product.quantity.multipleOf": "數量必須是 {{multipleOf}} 的倍數"
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

**i18n pattern:**

```typescript
{
  "en": {
    "user.email.format": "Please enter a valid email address",
    "event.startDate.format": "Invalid date format",
    "settings.apiUrl.format": "Please enter a valid URL"
  },
  "zh-HK": {
    "user.email.format": "請輸入有效的電郵地址",
    "event.startDate.format": "日期格式無效",
    "settings.apiUrl.format": "請輸入有效的網址"
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

**i18n pattern:**

```typescript
{
  "en": {
    "user.age.type": "Age must be a number",
    "settings.enabled.type": "Must be true or false"
  },
  "zh-HK": {
    "user.age.type": "年齡必須是數字",
    "settings.enabled.type": "必須是真或假"
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

**i18n pattern:**

```typescript
{
  "en": {
    "user.status.enum": "Status must be one of: {{allowedValues}}"
  },
  "zh-HK": {
    "user.status.enum": "狀態必須是以下其中之一：{{allowedValues}}"
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

**i18n pattern:**

```typescript
{
  "en": {
    "validation.minLength": "This field is too short",
    "validation.maxLength": "This field is too long",
    "validation.minimum": "Value is too small",
    "validation.maximum": "Value is too large",
    "validation.format": "Invalid format",
    "validation.type": "Invalid type",
    "validation.pattern": "Invalid pattern",
    "validation.enum": "Invalid value"
  },
  "zh-HK": {
    "validation.minLength": "此欄位太短",
    "validation.maxLength": "此欄位太長",
    "validation.minimum": "數值太小",
    "validation.maximum": "數值太大",
    "validation.format": "格式無效",
    "validation.type": "類型無效",
    "validation.pattern": "格式無效",
    "validation.enum": "數值無效"
  }
}
```

## i18n Solutions

### Solution 1: Direct Translation Keys in Schema

**Best for:** Simple forms with few fields, when you want full control.

```typescript
import { buildErrorMessages } from '@bsol-oss/react-datatable5';

// Define error messages with i18n keys
const errorMessage = buildErrorMessages({
  required: {
    username: 'user.username.field_required',
    email: 'user.email.field_required',
  },
  properties: {
    username: {
      minLength: 'user.username.minLength',
      pattern: 'user.username.pattern',
    },
    email: {
      format: 'user.email.format',
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

**Translation file:**

```json
{
  "en": {
    "user": {
      "username": {
        "field_required": "Username is required",
        "minLength": "Username must be at least 3 characters",
        "pattern": "Username can only contain letters and numbers"
      },
      "email": {
        "field_required": "Email is required",
        "format": "Please enter a valid email address"
      }
    }
  },
  "zh-HK": {
    "user": {
      "username": {
        "field_required": "必須填寫用戶名稱",
        "minLength": "用戶名稱至少需要 3 個字元",
        "pattern": "用戶名稱只能包含字母和數字"
      },
      "email": {
        "field_required": "必須填寫電郵地址",
        "format": "請輸入有效的電郵地址"
      }
    }
  }
}
```

### Solution 2: Using buildRequiredErrors Helper

**Best for:** Forms with many required fields sharing a common pattern.

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

### Solution 3: Using createErrorMessage Wrapper

**Best for:** Clean, readable code when you have both required and validation errors.

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
    (field) => `${field}.field_required`,
    'product'
  ),
  // Field-specific validation errors
  buildFieldErrors({
    name: {
      minLength: 'product.name.minLength',
      maxLength: 'product.name.maxLength',
    },
    price: {
      minimum: 'product.price.minimum',
      maximum: 'product.price.maximum',
    },
    sku: {
      pattern: 'product.sku.pattern',
    },
  }),
  // Global fallbacks (optional)
  {
    format: 'validation.format',
    type: 'validation.type',
  }
);
```

### Solution 4: Mixed Approach (i18n + Plain Strings)

**Best for:** Prototyping or when some messages don't need translation.

```typescript
const errorMessage = buildErrorMessages({
  required: {
    username: 'user.username.field_required', // i18n key
    email: 'Email is required', // plain string
  },
  properties: {
    username: {
      minLength: 'user.username.minLength', // i18n key
    },
    password: {
      minLength: 'Password must be at least 8 characters', // plain string
    },
  },
  format: 'validation.format', // global i18n fallback
});
```

### Solution 5: Dynamic Error Messages with Interpolation

**Best for:** When error messages need to include dynamic values (limits, counts, etc.).

```typescript
// Translation file with interpolation
{
  "en": {
    "user": {
      "username": {
        "minLength": "Username must be at least {{min}} characters",
        "maxLength": "Username cannot exceed {{max}} characters"
      },
      "age": {
        "minimum": "You must be at least {{min}} years old",
        "maximum": "Age cannot exceed {{max}}"
      }
    }
  }
}

// Schema with error messages
const errorMessage = buildErrorMessages({
  properties: {
    username: {
      minLength: "user.username.minLength", // Will interpolate {{min}}
      maxLength: "user.username.maxLength"  // Will interpolate {{max}}
    },
    age: {
      minimum: "user.age.minimum",
      maximum: "user.age.maximum"
    }
  }
});
```

**Note:** AJV provides the actual constraint values automatically. The i18n system will receive them for interpolation.

### Solution 6: Using useFormI18n Hook (Component-Level)

**Best for:** Custom field components that need to access translations.

```typescript
import { useFormI18n } from "@bsol-oss/react-datatable5";

const CustomField = ({ column, prefix = "" }) => {
  const formI18n = useFormI18n(column, prefix);

  return (
    <div>
      {/* Field label */}
      <label>{formI18n.label()}</label>

      {/* Required error */}
      {error && <span>{formI18n.required()}</span>}

      {/* Custom translation */}
      <span>{formI18n.t('placeholder')}</span>
      <button>{formI18n.t('add_more')}</button>
    </div>
  );
};

// Translation keys used:
// - {prefix}{column}.field_label
// - {prefix}{column}.field_required
// - {prefix}{column}.placeholder
// - {prefix}{column}.add_more
```

## Complete Examples

### Example 1: User Registration Form (English + Chinese)

```typescript
import {
  buildErrorMessages,
  buildRequiredErrors
} from "@bsol-oss/react-datatable5";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Initialize i18n
i18n.use(initReactI18next).init({
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

// Build error messages
const errorMessage = buildErrorMessages({
  required: buildRequiredErrors(
    ["username", "email", "password", "age"],
    (field) => `${field}.field_required`,
    "user"
  ),
  properties: {
    username: {
      minLength: "user.username.minLength",
      maxLength: "user.username.maxLength",
      pattern: "user.username.pattern"
    },
    email: {
      format: "user.email.format"
    },
    password: {
      minLength: "user.password.minLength",
      pattern: "user.password.pattern"
    },
    age: {
      minimum: "user.age.minimum",
      maximum: "user.age.maximum",
      type: "user.age.type"
    }
  },
  // Global fallbacks
  format: "validation.format",
  type: "validation.type"
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
  const form = useForm({ keyPrefix: "user" });

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

**Available i18n utilities:**

- `buildErrorMessages()` - Main builder for error message configuration
- `buildRequiredErrors()` - Helper for required field errors
- `buildFieldErrors()` - Helper for field-specific validation errors
- `createErrorMessage()` - Convenient wrapper combining all error types
- `useFormI18n()` - Hook for component-level i18n access

**Translation key patterns:**

- Field labels: `{prefix}.{field}.field_label`
- Required errors: `{prefix}.{field}.field_required`
- Validation errors: `{prefix}.{field}.{validationType}`
- Global fallbacks: `validation.{validationType}`

For more examples, see the Storybook stories at `src/stories/Form/validation.stories.tsx`.
