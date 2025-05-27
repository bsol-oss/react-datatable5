# TableHeader Text Configuration

The `TableHeader` component now supports configurable text strings through meta attributes. This allows you to customize the text displayed in the column header menu items.

## Features

- **Global Configuration**: Set default texts for all columns via the `defaultTexts` prop
- **Per-Column Configuration**: Override texts for specific columns via the `meta.headerTexts` property
- **Fallback System**: Unspecified texts fall back to sensible defaults

## Available Text Options

- `pinColumn`: Text for the "Pin Column" menu item (default: "Pin Column")
- `cancelPin`: Text for the "Cancel Pin" menu item (default: "Cancel Pin")
- `sortAscending`: Text for the "Sort Ascending" menu item (default: "Sort Ascending")
- `sortDescending`: Text for the "Sort Descending" menu item (default: "Sort Descending")
- `clearSorting`: Text for the "Clear Sorting" menu item (default: "Clear Sorting")

## Usage Examples

### 1. Using Default Texts

```tsx
import { TableHeader } from "@/components/DataTable/display/TableHeader";

// Uses built-in default texts
<TableHeader />
```

### 2. Customizing Default Texts for All Columns

```tsx
import { TableHeader } from "@/components/DataTable/display/TableHeader";

<TableHeader 
  defaultTexts={{
    pinColumn: "Pin This Column",
    sortAscending: "Sort A-Z",
    sortDescending: "Sort Z-A",
    clearSorting: "Remove Sorting"
  }}
/>
```

### 3. Per-Column Text Configuration

```tsx
import { createColumnHelper } from "@tanstack/react-table";

const columnHelper = createColumnHelper<YourDataType>();

const columns = [
  columnHelper.accessor("name", {
    header: "Customer Name",
    meta: {
      headerTexts: {
        pinColumn: "Pin Customer Names",
        sortAscending: "Sort Names A-Z",
        sortDescending: "Sort Names Z-A"
      }
    }
  }),
  columnHelper.accessor("email", {
    header: "Email Address",
    meta: {
      headerTexts: {
        pinColumn: "Pin Email Column",
        sortAscending: "Sort Emails Alphabetically"
      }
    }
  }),
  // Column without custom texts - will use defaults
  columnHelper.accessor("phone", {
    header: "Phone Number"
  })
];
```

### 4. Mixed Configuration

```tsx
// Set global defaults and override specific columns
<TableHeader 
  defaultTexts={{
    pinColumn: "Pin Column",
    sortAscending: "Sort A→Z",
    sortDescending: "Sort Z→A"
  }}
/>

// In your column definition:
const columns = [
  columnHelper.accessor("priority", {
    header: "Priority",
    meta: {
      headerTexts: {
        sortAscending: "Highest Priority First",
        sortDescending: "Lowest Priority First"
      }
      // pinColumn will use the default "Pin Column"
    }
  })
];
```

## Internationalization Support

This feature works well with internationalization libraries. You can pass translated strings:

```tsx
import { useTranslation } from 'react-i18next';

const MyComponent = () => {
  const { t } = useTranslation();
  
  return (
    <TableHeader 
      defaultTexts={{
        pinColumn: t('table.pinColumn'),
        sortAscending: t('table.sortAscending'),
        sortDescending: t('table.sortDescending'),
        clearSorting: t('table.clearSorting'),
        cancelPin: t('table.cancelPin')
      }}
    />
  );
};
```

## TypeScript Support

The text configuration is fully typed:

```tsx
import { TableHeaderTexts } from "@/components/DataTable/display/TableHeader";

const customTexts: TableHeaderTexts = {
  pinColumn: "Pin This Column",
  sortAscending: "Sort A-Z"
  // TypeScript will ensure only valid keys are used
};

<TableHeader defaultTexts={customTexts} />
``` 