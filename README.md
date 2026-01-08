# @bsol-oss/react-datatable5

A powerful React component library built on top of `@tanstack/react-table` and `@chakra-ui/react` v3 that provides advanced data table and form components with built-in filtering, sorting, pagination, and JSON Schema validation.

## Features

### 📊 DataTable Components

- **Client-side DataTable**: Full-featured table with local state management
- **Server-side DataTable**: API-integrated table with automatic data fetching
- Advanced filtering (text, range, select, tag, boolean, dateRange, custom)
- Column sorting and reordering
- Pagination and row selection
- Responsive design with mobile-friendly card views
- Density controls and column visibility
- Customizable display components

### 📝 Form Components

- **JSON Schema-based forms**: Auto-generate forms from JSON Schema
- **AJV validation**: Full Draft 7 JSON Schema validation support
- Multi-language validation support (en, zh-HK, zh-TW, zh-CN)
- Custom error messages via schema configuration
- Field types: String, Number, Boolean, Date, DateTime, Enum, ID Picker, Tag, File
- Read-only form viewers
- Built-in form state management with `react-hook-form`

### 📅 Date & Time Pickers

- Custom date/time picker components
- Built-in calendar implementation (no external dependencies)
- `dayjs` integration for date formatting and manipulation
- Timezone support (default: Asia/Hong_Kong)

## Installation

```bash
npm install @bsol-oss/react-datatable5
```

### Peer Dependencies

This library requires the following peer dependencies to be installed in your project:

```bash
npm install react@^19.0.0 react-dom@^19.0.0
npm install @chakra-ui/react@^3.19.1
npm install @tanstack/react-table@^8.21.2
npm install @tanstack/react-query@^5.66.9
npm install react-hook-form@^7.54.2
npm install ajv@^8.12.0 ajv-formats@^3.0.1 ajv-errors@^3.0.0
npm install dayjs@^1.11.13
npm install react-icons@^5.4.0
npm install axios@^1.13.2
```

See `package.json` for the complete list of peer dependencies.

## Quick Start

### Client-side DataTable

```tsx
import {
  useDataTable,
  DataTable,
  DefaultTable,
} from '@bsol-oss/react-datatable5';

const columns = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
];

const data = [
  { name: 'John Doe', email: 'john@example.com' },
  { name: 'Jane Smith', email: 'jane@example.com' },
];

function MyTable() {
  const datatable = useDataTable({
    default: {
      pageSize: 20,
      sorting: [{ id: 'name', desc: false }],
    },
  });

  return (
    <DataTable columns={columns} data={data} {...datatable}>
      <DefaultTable />
    </DataTable>
  );
}
```

### Server-side DataTable

```tsx
import {
  useDataTableServer,
  DataTableServer,
  DefaultTable,
  Pagination,
} from '@bsol-oss/react-datatable5';

function MyServerTable() {
  const datatable = useDataTableServer({
    url: 'https://api.example.com/data',
    default: { pageSize: 10 },
  });

  return (
    <DataTableServer columns={columns} {...datatable}>
      <DefaultTable />
      <Pagination />
    </DataTableServer>
  );
}
```

### Form with JSON Schema

```tsx
import { FormRoot, FormBody } from '@bsol-oss/react-datatable5';

const schema = {
  type: 'object',
  required: ['username', 'email'],
  properties: {
    username: {
      type: 'string',
      minLength: 3,
      errorMessages: {
        required: 'Username is required',
        minLength: 'Username must be at least 3 characters',
      },
    },
    email: {
      type: 'string',
      format: 'email',
      errorMessages: {
        required: 'Email is required',
        format: 'Invalid email format',
      },
    },
  },
};

function MyForm() {
  return (
    <FormRoot
      schema={schema}
      validationLocale="en"
      onSubmit={async (data) => {
        console.log('Submitted:', data);
      }}
    >
      <FormBody />
    </FormRoot>
  );
}
```

## Documentation

- [Server-side DataTable Usage](./docs/DATATABLE_SERVER_USAGE.md)
- [ID Picker Guide](./docs/IDPICKER_GUIDE.md)
- [Enum Picker Translation](./docs/ENUMPICKER_TRANSLATION.md)
- [i18n Migration Guide](./docs/I18N_MIGRATION_GUIDE.md)
- [Validation Guide](./VALIDATION_GUIDE.md)
- [Deployment Guide](./docs/deployment.md)

## Development

### Storybook

View interactive examples and component documentation:

```bash
npm run storybook
```

Stories are organized by feature:

- `DataTable/` - Client-side table examples
- `DataTableServer/` - Server-side table examples
- `Form/` - Form component examples
- `DatePicker/` - Date/time picker examples

### Build

```bash
npm run build
```

### Lint

```bash
npm run lint
```

### Format

```bash
npm run format
```

## Key Features

### Column Customization

Define custom filters and display options in column metadata:

```tsx
{
  id: 'status',
  meta: {
    displayName: 'Status',
    filterVariant: 'select',
    filterOptions: [
      { label: 'Active', value: 'active' },
      { label: 'Inactive', value: 'inactive' }
    ]
  }
}
```

### Label Objects

Components use label objects from schema context for internationalization:

```tsx
<FormRoot
  schema={schema}
  idPickerLabels={{
    typeToSearch: 'Type to search...',
    total: 'Total',
    // ... other labels
  }}
>
  <FormBody />
</FormRoot>
```

## Requirements

- React 19+
- @chakra-ui/react 3.19+
- TypeScript (for type definitions)

## License

MIT

## Repository

[GitHub](https://github.com/bsol-oss/react-datatable5)
