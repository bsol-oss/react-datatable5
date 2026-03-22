# DefaultTable

**Batteries-included** table: `Table` + `TableHeader` + `TableBody` + optional `TableFooter`, with `TableControls` wiring and **mobile** fallback.

## Source

[`src/components/DataTable/DefaultTable.tsx`](../../../src/components/DataTable/DefaultTable.tsx)

## Import

```tsx
import {
  DefaultTable,
  type DefaultTableProps,
} from '@bsol-oss/react-datatable5';
```

## API

### `DefaultTableProps`

| Name                                                                   | Description                                  |
| ---------------------------------------------------------------------- | -------------------------------------------- |
| `showHeader`, `showFooter`                                             | Toggle header/footer.                        |
| `tableProps`, `tableHeaderProps`, `tableBodyProps`, `tableFooterProps` | Pass-through to building blocks.             |
| `controlProps`                                                         | Props for `TableControls` / mobile controls. |
| `variant`                                                              | `''` or `'greedy'` layout.                   |
| `isLoading`                                                            | Shows skeleton via `TableBodySkeleton`.      |

## Example

```tsx
<DataTable {...datatable} columns={columns} data={data}>
  <DefaultTable />
</DataTable>
```

## Related

- [TableControls](../datatable-controls/table-controls.md)

## See also

- Stories: `src/stories/DataTable/`
- [Component index](../README.md)
