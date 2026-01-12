# EnumPicker Translation Guide

## ⚠️ Important: Use `renderDisplay` for Translation

> **🔑 Key Point:** Always use the `renderDisplay` function to translate enum values. This is the **primary and recommended method** for handling translations in EnumPicker components.

**Why `renderDisplay`?**

- ✅ Provides full control over how enum values are displayed
- ✅ Works seamlessly with i18n libraries (react-i18next, etc.)
- ✅ Supports dynamic translations based on context
- ✅ Allows complex rendering (icons, badges, custom components)
- ✅ Applied consistently across all EnumPicker variants

## Overview

The **EnumPicker** component supports translation and customization of enum values **exclusively through the `renderDisplay` function**. This allows you to provide human-readable labels for enum values without requiring i18n setup, or integrate with your existing i18n solution.

## Quick Reminder

**🚨 Always use `renderDisplay` to translate enum values!**

Instead of displaying raw enum values like `'active'`, `'inactive'`, you **must** use `renderDisplay` to show translated, human-readable labels. This ensures a consistent and user-friendly experience.

## Basic Usage

### Simple Translation

```tsx
const schema: JSONSchema7 = {
  type: 'object',
  properties: {
    status: {
      type: 'string',
      enum: ['active', 'inactive', 'pending'],
      variant: 'enum-picker',
      renderDisplay: (enumValue: string) => {
        const translations: Record<string, string> = {
          active: 'Active',
          inactive: 'Inactive',
          pending: 'Pending Review',
        };
        return translations[enumValue] ?? enumValue;
      },
    },
  },
};
```

### With i18n Library

If you're using an i18n library like `react-i18next`, you can integrate it directly:

```tsx
import { useTranslation } from 'react-i18next';

const MyForm = () => {
  const { t } = useTranslation();
  const form = useForm({});

  const schema: JSONSchema7 = {
    type: 'object',
    properties: {
      status: {
        type: 'string',
        enum: ['active', 'inactive', 'pending'],
        variant: 'enum-picker',
        renderDisplay: (enumValue: string) => {
          return t(`status.${enumValue}`);
        },
      },
    },
  };

  return (
    <DefaultForm
      formConfig={{
        schema,
        onSubmit: (data) => console.log(data),
        ...form,
      }}
    />
  );
};
```

### Multiple Selection with Translation

```tsx
const schema: JSONSchema7 = {
  type: 'object',
  properties: {
    priorities: {
      type: 'array',
      items: {
        type: 'string',
        enum: ['low', 'medium', 'high', 'critical'],
      },
      variant: 'enum-picker',
      renderDisplay: (enumValue: string) => {
        const labels: Record<string, string> = {
          low: 'Low Priority',
          medium: 'Medium Priority',
          high: 'High Priority',
          critical: 'Critical',
        };
        return labels[enumValue] ?? enumValue;
      },
    },
  },
};
```

### Radio Variant with Translation

```tsx
const schema: JSONSchema7 = {
  type: 'object',
  properties: {
    theme: {
      type: 'string',
      enum: ['light', 'dark', 'auto'],
      variant: 'radio',
      renderDisplay: (enumValue: string) => {
        const labels: Record<string, string> = {
          light: 'Light Mode',
          dark: 'Dark Mode',
          auto: 'Auto (System Default)',
        };
        return labels[enumValue] ?? enumValue;
      },
    },
  },
};
```

## Advanced Patterns

### Centralized Translation Function

Create a reusable translation helper:

```tsx
// utils/enumTranslations.ts
export const getEnumTranslation = (
  enumValue: string,
  translations: Record<string, string>
): string => {
  return translations[enumValue] ?? enumValue;
};

// In your schema
const statusTranslations = {
  active: 'Active',
  inactive: 'Inactive',
  pending: 'Pending Review',
};

const schema: JSONSchema7 = {
  type: 'object',
  properties: {
    status: {
      type: 'string',
      enum: ['active', 'inactive', 'pending'],
      variant: 'enum-picker',
      renderDisplay: (enumValue: string) =>
        getEnumTranslation(enumValue, statusTranslations),
    },
  },
};
```

### Dynamic Translation Based on Context

```tsx
const schema: JSONSchema7 = {
  type: 'object',
  properties: {
    language: {
      type: 'string',
      enum: ['en', 'zh-HK', 'zh-TW', 'zh-CN', 'ja', 'ko'],
      variant: 'enum-picker',
      renderDisplay: (enumValue: string) => {
        const languageNames: Record<string, string> = {
          en: 'English',
          'zh-HK': '繁體中文 (香港)',
          'zh-TW': '繁體中文 (台灣)',
          'zh-CN': '简体中文',
          ja: '日本語',
          ko: '한국어',
        };
        return languageNames[enumValue] ?? enumValue;
      },
    },
  },
};
```

### Complex Display with Icons or Badges

```tsx
import { HStack, Text, Badge } from '@chakra-ui/react';
import { ReactNode } from 'react';

const schema: JSONSchema7 = {
  type: 'object',
  properties: {
    priority: {
      type: 'string',
      enum: ['low', 'medium', 'high', 'critical'],
      variant: 'enum-picker',
      renderDisplay: (enumValue: string): ReactNode => {
        const config: Record<string, { label: string; color: string }> = {
          low: { label: 'Low', color: 'gray' },
          medium: { label: 'Medium', color: 'yellow' },
          high: { label: 'High', color: 'orange' },
          critical: { label: 'Critical', color: 'red' },
        };
        const { label, color } = config[enumValue] ?? {
          label: enumValue,
          color: 'gray',
        };
        return (
          <HStack gap={2}>
            <Badge colorPalette={color}>{label}</Badge>
          </HStack>
        );
      },
    },
  },
};
```

## Alternative: Using enumLabels

> **Note:** While `enumLabels` exists as an alternative, **`renderDisplay` is the recommended approach** for translations. Use `enumLabels` only for very simple, static translations.

If you prefer a simpler approach without a function, you can use the `enumLabels` property directly in the schema:

```tsx
const schema: JSONSchema7 = {
  type: 'object',
  properties: {
    status: {
      type: 'string',
      enum: ['active', 'inactive', 'pending'],
      variant: 'enum-picker',
      enumLabels: {
        active: 'Active',
        inactive: 'Inactive',
        pending: 'Pending Review',
      },
    },
  },
};
```

**⚠️ When to use `enumLabels` vs `renderDisplay`:**

- **Use `enumLabels`** only for very simple, static translations that never change
- **Use `renderDisplay`** (recommended) when you need:
  - Dynamic translations based on context
  - Integration with i18n libraries (react-i18next, etc.)
  - Complex rendering (icons, badges, custom components)
  - Conditional logic
  - Future-proof code that can easily adapt to changing requirements

## Key Points

> **🎯 Translation Rule:** Use `renderDisplay` for ALL enum value translations. This is not optional—it's the standard way to handle translations in EnumPicker.

✅ **Always use `renderDisplay` for translation** - Don't display raw enum values to users. This is the **primary translation mechanism**.

✅ **Return a string or ReactNode** - `renderDisplay` can return either, giving you flexibility for simple labels or complex UI elements.

✅ **Provide fallback** - Always handle unknown enum values gracefully with a fallback (e.g., `translations[enumValue] ?? enumValue`).

✅ **Works with all variants** - `renderDisplay` works consistently across:

- `enum-picker` (combobox)
- `radio` (radio buttons)
- Multiple selection (tags)

✅ **Applied everywhere** - Labels from `renderDisplay` appear in:

- Dropdown options
- Selected tags
- Radio button labels
- Form viewers

## Example: Complete Form

```tsx
import { DefaultForm } from '@bsol-oss/react-datatable5';
import { useForm } from '@bsol-oss/react-datatable5';
import { JSONSchema7 } from 'json-schema';

const MyForm = () => {
  const form = useForm({});

  const schema: JSONSchema7 = {
    type: 'object',
    properties: {
      status: {
        type: 'string',
        title: 'Status',
        enum: ['active', 'inactive', 'pending'],
        variant: 'enum-picker',
        renderDisplay: (enumValue: string) => {
          const translations = {
            active: 'Active',
            inactive: 'Inactive',
            pending: 'Pending Review',
          };
          return translations[enumValue] ?? enumValue;
        },
      },
      priorities: {
        type: 'array',
        title: 'Priorities',
        items: {
          type: 'string',
          enum: ['low', 'medium', 'high'],
        },
        variant: 'enum-picker',
        renderDisplay: (enumValue: string) => {
          const translations = {
            low: 'Low Priority',
            medium: 'Medium Priority',
            high: 'High Priority',
          };
          return translations[enumValue] ?? enumValue;
        },
      },
      theme: {
        type: 'string',
        title: 'Theme',
        enum: ['light', 'dark', 'auto'],
        variant: 'radio',
        renderDisplay: (enumValue: string) => {
          const translations = {
            light: 'Light Mode',
            dark: 'Dark Mode',
            auto: 'Auto',
          };
          return translations[enumValue] ?? enumValue;
        },
      },
    },
    required: ['status', 'theme'],
  };

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

## Summary

> **🎯 Remember:** **Always use `renderDisplay` to translate enum values!** This is the standard, recommended, and primary method for handling translations in EnumPicker components. It makes your forms user-friendly and ensures consistent translation behavior across all enum picker variants.

**Quick Checklist:**

- ✅ Use `renderDisplay` function in your schema for each enum field
- ✅ Provide translations for all enum values
- ✅ Include fallback handling for unknown values
- ✅ Works with i18n libraries or simple translation objects
- ✅ Supports both simple strings and complex React components
