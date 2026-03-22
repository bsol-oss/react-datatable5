# Pagination

Pagination UI bound to the table’s pagination state from `DataTableContext`.

## Source

[`src/components/DataTable/controls/Pagination.tsx`](../../../src/components/DataTable/controls/Pagination.tsx)

## Import

```tsx
import { Pagination } from '@bsol-oss/react-datatable5';
```

## When to use

- Place below the table (often with `PageSizeControl` inside `TableControls` or nearby).

## Example

```tsx
<DataTableServer {...props}>
  <DefaultTableServer />
  <Pagination />
</DataTableServer>
```

## Related

- [PageSizeControl](./page-size-control.md)

## See also

- [Component index](../README.md)
