# Table

Chakra-based **table shell** with optional empty state, loading slot, column resize, and responsive column hiding.

## Source

[`src/components/DataTable/display/Table.tsx`](../../../src/components/DataTable/display/Table.tsx)

## Import

```tsx
import { Table, type TableProps } from '@bsol-oss/react-datatable5';
```

## API

### `TableProps`

Extends Chakra `TableRootProps` with:

| Name               | Description                                                                           |
| ------------------ | ------------------------------------------------------------------------------------- |
| `children`         | `TableHeader` + `TableBody` + optional `TableFooter`.                                 |
| `showLoading`      | Show loading UI.                                                                      |
| `loadingComponent` | Custom loading node.                                                                  |
| `emptyComponent`   | Shown when there are no rows.                                                         |
| `canResize`        | Enable column resize; when `false`, `responsivePriority` on columns may hide columns. |
| `showSelector`     | Show row selection column integration.                                                |

## Example

```tsx
<Table>
  <TableHeader />
  <TableBody />
</Table>
```

## Related

- [TableHeader](./table-header.md)
- [TableBody](./table-body.md)

## See also

- [Component index](../README.md)
