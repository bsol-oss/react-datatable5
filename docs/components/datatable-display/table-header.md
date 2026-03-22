# TableHeader

Renders the **header row** with sortable columns, pinning, and column menus. Exports header text types used for i18n.

## Source

[`src/components/DataTable/display/TableHeader.tsx`](../../../src/components/DataTable/display/TableHeader.tsx)

## Import

```tsx
import {
  TableHeader,
  type TableHeaderProps,
  type TableHeaderTexts,
} from '@bsol-oss/react-datatable5';
```

`TableHeaderTexts` is also re-exported from the package entry for convenience.

## API

### `TableHeaderTexts`

Strings for pin/sort menu items; can be overridden per column via `columnDef.meta.headerTexts`.

### `TableHeaderProps`

| Name         | Description                           |
| ------------ | ------------------------------------- |
| (see source) | Sticky header, selection column, etc. |

## Example

```tsx
<Table>
  <TableHeader />
  <TableBody />
</Table>
```

## Related

- [ColumnMeta](../datatable-core/column-meta.md)

## See also

- [Component index](../README.md)
