# TextCell

Opinionated **cell renderer** for text, links, badges, copy-to-clipboard, and **global filter highlight**.

## Source

[`src/components/DataTable/display/TextCell.tsx`](../../../src/components/DataTable/display/TextCell.tsx)

## Import

```tsx
import { TextCell, type TextCellProps } from '@bsol-oss/react-datatable5';
```

## API

### `TextCellProps` (high level)

| Name                                               | Description                        |
| -------------------------------------------------- | ---------------------------------- |
| `text`                                             | Primary value.                     |
| `href`                                             | Renders external link with icon.   |
| `onClick`                                          | Button-style cell.                 |
| `isCopyable`                                       | Copy action (uses `TextWithCopy`). |
| `isBadge`, `badgeColor`, `colorPalette`            | Badge display.                     |
| `alignEnd`                                         | Text alignment.                    |
| `label`, `children`, `containerProps`, `textProps` | Legacy layout API.                 |

Reads `globalFilter` from `useDataTableContext` for search highlighting when inside a `DataTable`.

## Example

```tsx
{
  accessorKey: 'name',
  cell: (info) => <TextCell text={info.getValue() as string} isCopyable />,
}
```

## See also

- [Component index](../README.md)
