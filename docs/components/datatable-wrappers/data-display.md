# DataDisplay

**Card/grid** layout for a single row model: renders each cell in a responsive grid. Honors `columnDef.meta.showCustomDisplay`, `gridColumn`, `gridRow`, and `displayName`.

## Source

[`src/components/DataTable/display/DataDisplay.tsx`](../../../src/components/DataTable/display/DataDisplay.tsx)

## Import

```tsx
import { DataDisplay, type DataDisplayProps } from '@bsol-oss/react-datatable5';
```

## API

### `DataDisplayProps`

| Name      | Description                                          |
| --------- | ---------------------------------------------------- |
| `variant` | `'horizontal'`, `'stats'`, or `''` (default layout). |

## Example

```tsx
<DataTable {...datatable} columns={columns} data={data}>
  <DataDisplay />
</DataTable>
```

## Related

- [ColumnMeta](../datatable-core/column-meta.md)
- [RecordDisplay](./record-display.md)

## See also

- [Component index](../README.md)
