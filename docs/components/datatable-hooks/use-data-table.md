# useDataTable

Hook that holds **local** table state: sorting, filters, pagination, row selection, column visibility, density, and global filter.

## Source

[`src/components/DataTable/useDataTable.tsx`](../../../src/components/DataTable/useDataTable.tsx)

## Import

```tsx
import { useDataTable } from '@bsol-oss/react-datatable5';
```

## API

### `UseDataTableProps`

| Name      | Description                                                                                                                                                       |
| --------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `default` | Optional `DataTableDefaultState`: initial `sorting`, `pagination`, `rowSelection`, `columnFilters`, `columnOrder`, `columnVisibility`, `globalFilter`, `density`. |

### `UseDataTableReturn`

Returns state values and `set*` handlers compatible with `DataTable` props.

Default pagination: `pageIndex: 0`, `pageSize: 10`. Default `density`: `'sm'`.

## Example

```tsx
const datatable = useDataTable({
  default: {
    pageSize: 20,
    sorting: [{ id: 'name', desc: false }],
  },
});

return <DataTable {...datatable} columns={columns} data={data} />;
```

## Related

- [DataTable](../datatable-core/data-table.md)

## See also

- [Component index](../README.md)
