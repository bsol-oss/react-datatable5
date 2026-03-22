# DefaultTableServer

Same as `DefaultTable`, but **`isLoading`** defaults from `DataTableServerContext` (React Query `isLoading`).

## Source

[`src/components/DataTable/DefaultTableServer.tsx`](../../../src/components/DataTable/DefaultTableServer.tsx)

## Import

```tsx
import {
  DefaultTableServer,
  type DefaultTableServerProps,
} from '@bsol-oss/react-datatable5';
```

## Example

```tsx
<DataTableServer columns={columns} {...datatable}>
  <DefaultTableServer />
</DataTableServer>
```

## Related

- [DefaultTable](./default-table.md)
- [DataTableServer](../datatable-core/data-table-server.md)

## See also

- [Component index](../README.md)
