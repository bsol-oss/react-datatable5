# ColumnMeta module augmentation

TypeScript augmentation on `@tanstack/react-table` that extends `ColumnMeta` with display, filtering, and layout options used by this library.

## Source

[`src/index.tsx`](../../../src/index.tsx) (module augmentation block; not a separate runtime module)

## Import

There is nothing to import for the augmentation itself. It applies when you use `@tanstack/react-table` column definitions with `meta`:

```tsx
import type { ColumnDef } from '@tanstack/react-table';

const columns: ColumnDef<MyRow>[] = [
  {
    id: 'status',
    meta: {
      displayName: 'Status',
      filterVariant: 'select',
      filterOptions: [{ label: 'Active', value: 'active' }],
    },
  },
];
```

## Augmented fields

| Field                    | Purpose                                                                                 |
| ------------------------ | --------------------------------------------------------------------------------------- |
| `showCustomDisplay`      | When `true`, `DataDisplay` uses the column cell renderer for the value.                 |
| `displayName`            | Header / label text for the column.                                                     |
| `headerTexts`            | Strings for pin/sort actions in the header menu.                                        |
| `filterVariant`          | Built-in filter UI: `text`, `range`, `select`, `tag`, `boolean`, `dateRange`, `custom`. |
| `filterOptions`          | Options for `select` filters.                                                           |
| `filterRangeConfig`      | Min/max/step/defaults for `range` filters.                                              |
| `renderFilter`           | Custom filter UI when `filterVariant` is `custom`.                                      |
| `responsivePriority`     | Lower numbers hide first when the table is narrow (`canResize={false}`).                |
| `gridColumn` / `gridRow` | Grid placement for `DataDisplay` layout.                                                |

## Related

- [DataDisplay](../datatable-wrappers/data-display.md)
- [TableFilter](../datatable-controls/table-filters.md)

## See also

- [Component index](../README.md)
