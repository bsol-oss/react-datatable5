# TableBody

Renders **data rows** for the current page from `useDataTableContext().table`.

## Source

[`src/components/DataTable/display/TableBody.tsx`](../../../src/components/DataTable/display/TableBody.tsx)

## Import

```tsx
import { TableBody, type TableBodyProps } from '@bsol-oss/react-datatable5';
```

## API

### `TableBodyProps`

| Name         | Description                           |
| ------------ | ------------------------------------- |
| (see source) | Row rendering, selection column, etc. |

Also exports `TableRowSelectorProps` for row selection UI.

## Example

```tsx
<Table>
  <TableHeader />
  <TableBody />
</Table>
```

## Related

- [Table](./table.md)

## See also

- [Component index](../README.md)
