# TableComponent

**Render-prop** wrapper that exposes the TanStack `Table` instance from context.

## Source

[`src/components/DataTable/display/TableComponent.tsx`](../../../src/components/DataTable/display/TableComponent.tsx)

## Import

```tsx
import {
  TableComponent,
  type TableRendererProps,
} from '@bsol-oss/react-datatable5';
```

## API

### `TableRendererProps<TData>`

| Name     | Description                             |
| -------- | --------------------------------------- |
| `render` | `(table: Table<TData>) => ReactElement` |

## Example

```tsx
<TableComponent<MyRow>
  render={(table) => <pre>{JSON.stringify(table.getState(), null, 2)}</pre>}
/>
```

## Related

- [useDataTableContext](../datatable-hooks/use-data-table-context.md)

## See also

- [Component index](../README.md)
