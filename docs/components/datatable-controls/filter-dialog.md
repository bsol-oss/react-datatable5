# FilterDialog

Button that opens a **dialog** containing column filters (`TableFilter`) and a reset action.

## Source

[`src/components/DataTable/controls/FilterDialog.tsx`](../../../src/components/DataTable/controls/FilterDialog.tsx)

## Import

```tsx
import { FilterDialog } from '@bsol-oss/react-datatable5';
```

## API

### `EditFilterButtonProps`

| Name   | Description                          |
| ------ | ------------------------------------ |
| `icon` | Optional icon (default filter icon). |

Labels (`filterButtonText`, `filterTitle`, `filterClose`) come from `tableLabel` via `useDataTableContext`.

## Example

```tsx
<FilterDialog />
```

## Related

- [TableFilters / TableFilter](./table-filters.md)
- [ResetFilteringButton](./reset-filtering-button.md)

## See also

- [Component index](../README.md)
