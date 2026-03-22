# TableControls

Layout wrapper for **toolbar controls**: filters, search, pagination helpers, density, etc.

## Source

[`src/components/DataTable/controls/TableControls.tsx`](../../../src/components/DataTable/controls/TableControls.tsx)

## Import

```tsx
import {
  TableControls,
  type TableControlsProps,
} from '@bsol-oss/react-datatable5';
```

## API

### `TableControlsProps`

| Name         | Description                                              |
| ------------ | -------------------------------------------------------- |
| `children`   | Control components (`GlobalFilter`, `Pagination`, etc.). |
| (see source) | Additional layout / styling props.                       |

## Example

```tsx
<DataTable {...datatable} columns={cols} data={data}>
  <TableControls>
    <GlobalFilter />
    <Pagination />
  </TableControls>
  <DefaultTable />
</DataTable>
```

## Related

- [DefaultTable](../datatable-wrappers/default-table.md)

## See also

- [Component index](../README.md)
