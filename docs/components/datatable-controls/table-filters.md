# TableFilters (TableFilter)

Renders **per-column filters** based on `column.columnDef.meta.filterVariant` (`text`, `range`, `select`, `tag`, `boolean`, `dateRange`, `custom`).

## Source

[`src/components/DataTable/controls/TableFilters.tsx`](../../../src/components/DataTable/controls/TableFilters.tsx)

## Import

```tsx
import { TableFilter } from '@bsol-oss/react-datatable5';
```

## When to use

- Inside `FilterDialog` or any custom layout that should list all active column filters.
- Requires `meta` on columns; see [ColumnMeta](../datatable-core/column-meta.md).

## Example

```tsx
// Usually used internally by FilterDialog
<TableFilter />
```

## Related

- [FilterDialog](./filter-dialog.md)
- [RangeDatePicker](../date-picker/range-date-picker.md)

## See also

- [Component index](../README.md)
