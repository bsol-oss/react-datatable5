# EnumPicker Translation Guide

## Overview

The **EnumPicker** component supports translation and customization of enum values through the `renderDisplay` function. This allows you to provide human-readable labels for enum values without requiring i18n setup.

## Quick Reminder

**Use `renderDisplay` to translate enum values!**

Instead of displaying raw enum values like `'active'`, `'inactive'`, you can use `renderDisplay` to show translated, human-readable labels.

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
  const form = useForm({ keyPrefix: '' });

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

**Note:** `enumLabels` is simpler but less flexible than `renderDisplay`. Use `renderDisplay` when you need:

- Dynamic translations based on context
- Integration with i18n libraries
- Complex rendering (icons, badges, etc.)
- Conditional logic

## Key Points

✅ **Always use `renderDisplay` for translation** - Don't display raw enum values to users

✅ **Return a string or ReactNode** - `renderDisplay` can return either

✅ **Provide fallback** - Always handle unknown enum values gracefully

✅ **Works with all variants** - `renderDisplay` works with:

- `enum-picker` (combobox)
- `radio` (radio buttons)
- Multiple selection (tags)

✅ **Applied everywhere** - Labels appear in:

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
  const form = useForm({ keyPrefix: '' });

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

**Remember:** Use `renderDisplay` to translate enum values and make your forms user-friendly! 🎯
