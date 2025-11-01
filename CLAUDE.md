# CLAUDE.md

## Project Overview

**@bsol-oss/react-datatable5** is a React component library built on top of `@tanstack/react-table` and `@chakra-ui/react` that provides advanced data table and form components with built-in filtering, sorting, pagination, and JSON Schema validation.

## Architecture

### Core Component Structure

The library is organized into major component categories:

1. **DataTable** (`src/components/DataTable/`)

   - Client-side data tables with local state management
   - Server-side data tables with API integration
   - Uses `@tanstack/react-table` for table logic

2. **Form** (`src/components/Form/`)

   - JSON Schema-based form generation with validation
   - Uses `react-hook-form` for form state
   - AJV validation with multi-language support (en, zh-HK, zh-TW, zh-CN)

3. **DatePicker/TimePicker** (`src/components/DatePicker/`, `src/components/TimePicker/`)

   - Custom date/time picker components
   - Uses `@bsol-oss/dayzed-react19` and `dayjs`

4. **UI Utilities** (`src/components/ui/`)
   - Shared UI components and utilities

### DataTable Architecture

**Two main table variants:**

- **DataTable**: Client-side table with local data

  - Hook: `useDataTable()` - manages local state (sorting, filtering, pagination, etc.)
  - Component: `<DataTable>` wrapper
  - Display components: `<DefaultTable>`, `<TableCards>`, `<DataDisplay>`

- **DataTableServer**: Server-side table with API integration
  - Hook: `useDataTableServer({ url })` - manages state + API queries
  - Uses `@tanstack/react-query` for data fetching
  - Component: `<DataTableServer>` wrapper
  - Expected API response format: `{ data: TData[], count: number }`
  - Query params sent: `offset`, `limit`, `sorting`, `where`, `searching`

**Key state management:**

- All table state lives in hooks: `useDataTable()` or `useDataTableServer()`
- State includes: sorting, columnFilters, pagination, rowSelection, columnOrder, globalFilter, columnVisibility, density
- i18n integration via `react-i18next` with `keyPrefix` support

**Column customization via ColumnMeta:**

- Extended `@tanstack/react-table` with custom `ColumnMeta` interface (defined in `src/index.tsx:1-88`)
- Supports custom filters: `filterVariant` (text, range, select, tag, boolean, dateRange, custom)
- Display options: `showCustomDisplay`, `displayName`, `headerTexts`

### Form Architecture

**JSON Schema-based form system:**

- **Context**: `SchemaFormContext` provides schema, validation, submission logic to all form components
- **Validation**: Uses AJV (Another JSON Schema Validator) with formats
  - `validateData()` in `src/components/Form/utils/validateData.tsx`
  - Custom error messages via `errorMessages` field in schema properties
  - No default error messages - consuming apps handle translation
  - Strips empty values (null, undefined, empty strings) before validation
  - Validates before form submission with error display

**Form field components** (`src/components/Form/components/fields/`):

- Auto-generated from JSON Schema based on property types
- Field types: StringInputField, NumberInputField, BooleanPicker, DatePicker, DateTimePicker, EnumPicker, IdPicker, TagPicker, FilePicker
- Special renderers: ArrayRenderer, ObjectInput, RecordInput, ColumnRenderer
- SchemaRenderer intelligently selects the right field component based on schema
- Custom validation error messages via `errorMessages` field in schema properties

**Form viewers** (`src/components/Form/components/viewers/`):

- Read-only display versions of form fields

**Key form utilities** (`src/components/Form/utils/`):

- `validateData.tsx`: AJV validation with full schema support
- `removeIndex.tsx`: Translation key formatting
- `snakeToLabel.tsx`: Convert snake_case to labels
- `clearEmptyString.tsx`: Data cleanup before submission
- `getTableData.tsx`: Fetch data for ID picker dropdowns

### Build Configuration

**Rollup build** (`rollup.config.js`):

- Input: `src/index.tsx`
- Outputs:
  - CommonJS: `dist/index.js`
  - ES Module: `dist/index.mjs`
  - Type definitions: `dist/index.d.ts`
- Excludes: `src/stories/**/*` (Storybook stories not included in build)
- Path alias: `@/*` maps to `./src/*`

**TypeScript** (`tsconfig.json`):

- Target: ES2020
- Strict mode enabled
- Path mapping: `@/*` → `./src/*`
- React JSX: `react-jsx` transform

## Key Conventions

### Translation Integration

- All user-facing components support i18n via `react-i18next`
- DataTable hooks accept `keyPrefix` parameter for scoped translations
- Form validation messages support: en, zh-HK, zh-TW, zh-CN locales
- Use `translate` from hook return values for consistent i18n

### Component Labels and i18n

**Prefer labels in schema context over direct translate calls:**

- Components should use label objects from `SchemaFormContext` rather than calling `translate()` directly
- Label objects available in context: `idPickerLabels`, `dateTimePickerLabels`, `enumPickerLabels`, `filePickerLabels`
- Pattern: `labels?.labelName ?? translate(key) ?? fallbackText`
- This allows consuming applications to override labels via context without modifying translation files
- Label objects are passed via `FormRoot` props and made available through `useSchemaContext()`

**Label object types:**

- `IdPickerLabels`: Labels for ID picker component (undefined, addMore, typeToSearch, total, showing, perPage, emptySearchResult, initialResults)
- `DateTimePickerLabels`: Labels for date/time pickers (monthNamesShort, weekdayNamesShort, backButtonLabel, forwardButtonLabel)
- `EnumPickerLabels`: Labels for enum picker component (same structure as IdPickerLabels)
- `FilePickerLabels`: Labels for file picker component (fileDropzone, browseLibrary, dialogTitle, searchPlaceholder, loading, loadingFailed, noFilesFound, cancel, select)

**Example usage:**

```tsx
const { filePickerLabels } = useSchemaContext();
const formI18n = useFormI18n(column, prefix);

// Preferred: Use labels from context with fallbacks
<FileDropzone
  placeholder={filePickerLabels?.fileDropzone ?? formI18n.t('fileDropzone')}
/>

// Avoid: Direct translate calls without label context
<FileDropzone placeholder={formI18n.t('fileDropzone')} />
```

### Form Schema Patterns

- Forms are driven by JSON Schema (Draft 7)
- Required fields defined in schema's `required` array
- Format validation via `ajv-formats` (email, date, time, uuid, etc.)
- Custom error messages via `errorMessages` field in schema properties
- Always validate data before submission using `validateData()`

### Validation Error Messages

- **Helpful fallback messages**: When no custom error message is provided, shows a helpful reminder to add errorMessages to the schema (e.g., "Missing error message for required. Add errorMessages.required to schema for field 'username'")
- **Custom messages**: Define per-field error messages in schema:
  ```typescript
  {
    type: 'string',
    minLength: 3,
    errorMessages: {
      required: 'user.username.field_required',
      minLength: 'user.username.minLength_error'
    }
  }
  ```
- **Translation responsibility**: Consuming applications handle i18n translation
- **Error structure**: Returns `{ type, keyword, params, message? }` for custom handling
- **Empty value handling**: Automatically strips null, undefined, and empty strings before validation. If all values are stripped, uses empty object for validation to ensure proper schema validation.

### Component Composition

- DataTable/Form components use render props and children composition
- Controls are modular and can be used independently
- Display components (`<DefaultTable>`, `<DataDisplay>`, `<TableCards>`) are swappable

### Peer Dependencies

This library has extensive peer dependencies that must be installed in consuming projects:

- React 19+
- @chakra-ui/react 3.19+
- @tanstack/react-table 8.21+
- @tanstack/react-query 5.66+
- react-hook-form 7.54+
- react-i18next 15.4+
- ajv, ajv-formats, ajv-errors for validation
- dayjs for date handling
- See package.json `peerDependencies` for complete list

### Storybook for Development

- All components have corresponding stories in `src/stories/`
- Organized by feature: DataTable/, DataTableServer/, Form/, DatePicker/
- Stories demonstrate usage patterns and serve as live documentation
- Run `npm run storybook` to view interactive examples

## Common Development Patterns

### Creating a new DataTable

```tsx
const datatable = useDataTable({
  default: { pageSize: 20, sorting: [{ id: 'name', desc: false }] },
});
return (
  <DataTable columns={columns} data={data} {...datatable}>
    <DefaultTable />
  </DataTable>
);
```

### Creating a server-side DataTable

```tsx
const datatable = useDataTableServer({
  url: 'https://api.example.com/data',
  default: { pageSize: 10 },
});
return (
  <DataTableServer columns={columns} {...datatable}>
    <DefaultTable />
    <TablePagination />
  </DataTableServer>
);
```

### Form with validation

```tsx
<FormRoot
  schema={jsonSchema}
  validationLocale="zh-HK"
  onSubmit={async (data) => {
    /* handle submission */
  }}
>
  <FormBody />
</FormRoot>
```

### Custom column with filter

Define in column definition:

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

## Important Notes

- The library targets React 19 - ensure compatibility when making changes
- All table state is controlled via hooks - components are presentational
- TypeScript strict mode is enabled - maintain type safety
- Storybook stories excluded from production build via Rollup config
- Default timezone for forms: 'Asia/Hong_Kong' (configurable via context)

- do not check typescript error useless user specify
- do not use `color` directly, just always prefer to use the chakra ui v3 `colorPalette` and `variant`
