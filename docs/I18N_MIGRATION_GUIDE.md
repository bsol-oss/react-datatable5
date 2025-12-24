# i18n Migration Guide

## Overview

`@bsol-oss/react-datatable5` has removed the `react-i18next` dependency to reduce bundle size and allow consuming applications to use their preferred i18n solution. This guide explains how to migrate from the old i18n-based approach to the new label objects approach, and how to integrate your own i18n solution (like `react-i18next`) if needed.

## Why Was i18n Removed?

1. **Reduced Bundle Size**: Removing `react-i18next` reduces the library's bundle size
2. **Flexibility**: Consuming applications can use any i18n solution (react-i18next, react-intl, i18next, etc.)
3. **Simpler API**: Label objects provide a simpler, more explicit API
4. **No Configuration Required**: Components work out-of-the-box without i18n setup

## Migration Summary

### Before (Old Approach with react-i18next)

The library previously required `react-i18next` to be installed and configured:

```tsx
// ❌ Old approach - required react-i18next
import { useTranslation } from 'react-i18next';
import { DefaultForm } from '@bsol-oss/react-datatable5';

// Required i18n setup in your app
i18n.init({
  resources: {
    en: {
      translation: {
        'user.field_label': 'User',
        'user.field_required': 'User is required',
        'user.add_more': 'Add more users',
        // ... many more keys
      }
    }
  }
});

// Components automatically used i18n translations
<DefaultForm formConfig={{ schema, ... }} />
```

### After (New Approach with Label Objects)

The library now uses label objects passed as props:

```tsx
// ✅ New approach - no i18n dependency required
import { DefaultForm } from '@bsol-oss/react-datatable5';

// Provide labels directly as objects
const idPickerLabels = {
  undefined: 'User not found',
  addMore: 'Add more users',
  typeToSearch: 'Type to search users...',
  total: 'Total',
  showing: 'Showing',
  perPage: 'per page',
  emptySearchResult: 'No users found',
  initialResults: 'Start typing to search',
};

<DefaultForm
  formConfig={{
    schema,
    idPickerLabels, // Pass labels as props
    // ... other config
  }}
/>;
```

## Step-by-Step Migration

### Step 1: Remove react-i18next Dependency (if not used elsewhere)

If you're not using `react-i18next` elsewhere in your application, you can remove it:

```bash
npm uninstall react-i18next i18next
```

### Step 2: Identify Components Using i18n

The following components support label objects:

- **IdPicker**: `idPickerLabels`
- **DateTimePicker**: `dateTimePickerLabels`
- **EnumPicker**: `enumPickerLabels`
- **FilePicker**: `filePickerLabels`
- **Form Buttons**: `formButtonLabels`
- **TimePicker**: `timePickerLabels`

### Step 3: Convert i18n Translations to Label Objects

#### Option A: Direct Label Objects (Simplest)

If you have a simple application or want to avoid i18n setup:

```tsx
// Define labels directly
const englishLabels = {
  idPickerLabels: {
    undefined: 'User not found',
    addMore: 'Add more users',
    typeToSearch: 'Type to search...',
    total: 'Total',
    showing: 'Showing',
    perPage: 'per page',
    emptySearchResult: 'No results found',
    initialResults: 'Start typing to search',
  },
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
    backButtonLabel: 'Previous',
    forwardButtonLabel: 'Next',
  },
  formButtonLabels: {
    submit: 'Submit',
    reset: 'Reset',
    cancel: 'Cancel',
    confirm: 'Confirm',
  },
};

<DefaultForm
  formConfig={{
    schema,
    ...englishLabels,
  }}
/>;
```

#### Option B: Integrate with react-i18next (Recommended for Existing Apps)

If you're already using `react-i18next` in your application, create helper functions to convert translations to label objects:

```tsx
import { useTranslation } from 'react-i18next';
import {
  IdPickerLabels,
  DateTimePickerLabels,
  FormButtonLabels,
} from '@bsol-oss/react-datatable5';

// Helper function to create IdPicker labels from i18n
function useIdPickerLabels(fieldKey: string): IdPickerLabels {
  const { t } = useTranslation();

  return {
    undefined: t(`${fieldKey}.undefined`, { defaultValue: 'Not found' }),
    addMore: t(`${fieldKey}.add_more`, { defaultValue: 'Add more' }),
    typeToSearch: t(`${fieldKey}.type_to_search`, {
      defaultValue: 'Type to search...',
    }),
    total: t(`${fieldKey}.total`, { defaultValue: 'Total' }),
    showing: t(`${fieldKey}.showing`, { defaultValue: 'Showing' }),
    perPage: t(`${fieldKey}.per_page`, { defaultValue: 'per page' }),
    emptySearchResult: t(`${fieldKey}.empty_search_result`, {
      defaultValue: 'No results found',
    }),
    initialResults: t(`${fieldKey}.initial_results`, {
      defaultValue: 'Start typing to search',
    }),
  };
}

// Usage in component
function MyForm() {
  const idPickerLabels = useIdPickerLabels('user');

  return (
    <DefaultForm
      formConfig={{
        schema,
        idPickerLabels,
      }}
    />
  );
}
```

See [react-i18next Integration Example](./examples/react-i18next-integration.tsx) for complete examples.

### Step 4: Update Translation Files

Update your i18n translation files to match the new label object structure:

```json
// en.json
{
  "user": {
    "undefined": "User not found",
    "add_more": "Add more users",
    "type_to_search": "Type to search users...",
    "total": "Total",
    "showing": "Showing",
    "per_page": "per page",
    "empty_search_result": "No users found matching your search",
    "initial_results": "Start typing to search for users"
  },
  "date_picker": {
    "month_names_short": [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ],
    "weekday_names_short": ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    "back_button": "Previous",
    "forward_button": "Next"
  },
  "form": {
    "submit": "Submit",
    "reset": "Reset",
    "cancel": "Cancel",
    "confirm": "Confirm"
  }
}
```

### Step 5: Handle Field Labels and Error Messages

Field labels and error messages are now handled differently:

#### Field Labels

**Before:**

```tsx
// i18n automatically translated field labels
// Translation key: 'user.field_label'
```

**After:**

```tsx
// Option 1: Use schema.title (recommended)
const schema = {
  properties: {
    user: {
      type: 'string',
      title: 'User', // Direct label
    },
  },
};

// Option 2: Use i18n with schema.title
const schema = {
  properties: {
    user: {
      type: 'string',
      title: t('user.field_label'), // Translate before passing to schema
    },
  },
};
```

#### Error Messages

**Before:**

```tsx
// i18n automatically translated error messages
// Translation key: 'user.field_required'
```

**After:**

```tsx
// Define error messages directly in schema
const schema = {
  properties: {
    user: {
      type: 'string',
      errorMessages: {
        required: t('user.field_required'), // Translate before passing to schema
      },
    },
  },
};
```

See [Validation Documentation](./VALIDATION_I18N.md) for more details on error messages.

## Component-Specific Migration

### IdPicker

**Before:**

```tsx
// Automatically used i18n translations
<DefaultForm formConfig={{ schema }} />
```

**After:**

```tsx
const idPickerLabels = {
  undefined: t('user.undefined'),
  addMore: t('user.add_more'),
  typeToSearch: t('user.type_to_search'),
  // ... other labels
};

<DefaultForm
  formConfig={{
    schema,
    idPickerLabels,
  }}
/>;
```

### DateTimePicker

**Before:**

```tsx
// Automatically used i18n translations for months/weekdays
<DefaultForm formConfig={{ schema }} />
```

**After:**

```tsx
const dateTimePickerLabels = {
  monthNamesShort: [
    t('date.month_1'),
    t('date.month_2'), // ... etc
  ],
  weekdayNamesShort: [
    t('date.weekday_1'),
    t('date.weekday_2'), // ... etc
  ],
  backButtonLabel: t('date.back_button'),
  forwardButtonLabel: t('date.forward_button'),
};

<DefaultForm
  formConfig={{
    schema,
    dateTimePickerLabels,
  }}
/>;
```

### Form Buttons

**Before:**

```tsx
// Automatically used i18n translations
<DefaultForm formConfig={{ schema }} />
```

**After:**

```tsx
const formButtonLabels = {
  submit: t('form.submit'),
  reset: t('form.reset'),
  cancel: t('form.cancel'),
  confirm: t('form.confirm'),
};

<DefaultForm
  formConfig={{
    schema,
    formButtonLabels,
  }}
/>;
```

## Complete Migration Example

### Before (with react-i18next)

```tsx
import { useTranslation } from 'react-i18next';
import { DefaultForm } from '@bsol-oss/react-datatable5';

function UserForm() {
  const { t } = useTranslation();

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

  // i18n translations were automatically used
  return <DefaultForm formConfig={{ schema }} />;
}
```

### After (with react-i18next integration)

```tsx
import { useTranslation } from 'react-i18next';
import { DefaultForm, IdPickerLabels } from '@bsol-oss/react-datatable5';

function UserForm() {
  const { t } = useTranslation();

  // Create label objects from i18n translations
  const idPickerLabels: IdPickerLabels = {
    undefined: t('user.undefined'),
    addMore: t('user.add_more'),
    typeToSearch: t('user.type_to_search'),
    total: t('user.total'),
    showing: t('user.showing'),
    perPage: t('user.per_page'),
    emptySearchResult: t('user.empty_search_result'),
    initialResults: t('user.initial_results'),
  };

  const schema = {
    type: 'object',
    properties: {
      user: {
        type: 'string',
        title: t('user.field_label'), // Field label from i18n
        variant: 'id-picker',
        foreign_key: {
          table: 'users',
          column: 'id',
        },
        errorMessages: {
          required: t('user.field_required'), // Error message from i18n
        },
      },
    },
  };

  return (
    <DefaultForm
      formConfig={{
        schema,
        idPickerLabels, // Pass label object
      }}
    />
  );
}
```

### After (without i18n - direct labels)

```tsx
import { DefaultForm } from '@bsol-oss/react-datatable5';

function UserForm() {
  // Define labels directly (no i18n needed)
  const idPickerLabels = {
    undefined: 'User not found',
    addMore: 'Add more users',
    typeToSearch: 'Type to search users...',
    total: 'Total',
    showing: 'Showing',
    perPage: 'per page',
    emptySearchResult: 'No users found',
    initialResults: 'Start typing to search',
  };

  const schema = {
    type: 'object',
    properties: {
      user: {
        type: 'string',
        title: 'User', // Direct label
        variant: 'id-picker',
        foreign_key: {
          table: 'users',
          column: 'id',
        },
        errorMessages: {
          required: 'User is required', // Direct error message
        },
      },
    },
  };

  return (
    <DefaultForm
      formConfig={{
        schema,
        idPickerLabels,
      }}
    />
  );
}
```

## Benefits of the New Approach

1. **No i18n Dependency**: Library works without any i18n setup
2. **Explicit API**: Clear what labels are being used
3. **Flexible**: Use any i18n solution or none at all
4. **Type-Safe**: TypeScript types for all label objects
5. **Easier Testing**: No need to mock i18n in tests

## Common Issues and Solutions

### Issue: Labels not updating when language changes

**Solution:** Re-create label objects when language changes:

```tsx
function MyForm() {
  const { i18n, t } = useTranslation();
  const [lang, setLang] = useState(i18n.language);

  // Re-create labels when language changes
  const idPickerLabels = useMemo(
    () => ({
      undefined: t('user.undefined'),
      // ... other labels
    }),
    [t, lang]
  );

  // Update lang when i18n language changes
  useEffect(() => {
    const handleLanguageChange = (lng: string) => setLang(lng);
    i18n.on('languageChanged', handleLanguageChange);
    return () => i18n.off('languageChanged', handleLanguageChange);
  }, [i18n]);

  return <DefaultForm formConfig={{ schema, idPickerLabels }} />;
}
```

### Issue: Missing translation keys

**Solution:** Use `defaultValue` in translation calls or provide fallback labels:

```tsx
const idPickerLabels = {
  undefined: t('user.undefined', { defaultValue: 'Not found' }),
  addMore: t('user.add_more', { defaultValue: 'Add more' }),
  // ... always provide defaults
};
```

## Additional Resources

- [react-i18next Integration Example](./examples/react-i18next-integration.tsx) - Complete example with react-i18next
- [IdPicker Labels Documentation](./IDPICKER_LABELS.md) - Detailed IdPicker label documentation
- [Validation Documentation](./VALIDATION_I18N.md) - Error message handling
- [DefaultForm Usage](./DEFAULTFORM_USAGE.md) - Complete form usage guide

## Support

If you encounter issues during migration, please:

1. Check the [examples](./examples/) directory for complete working examples
2. Review component-specific documentation
3. Open an issue on GitHub with:
   - Your current code
   - Expected behavior
   - Actual behavior
   - Library version
