# PageSizeControl

Control to change **page size** (rows per page) for client or server tables.

## Source

[`src/components/DataTable/controls/PageSizeControl.tsx`](../../../src/components/DataTable/controls/PageSizeControl.tsx)

## Import

```tsx
import { PageSizeControl } from '@bsol-oss/react-datatable5';
```

## API

### `PageSizeControlProps`

| Name        | Description                                                          |
| ----------- | -------------------------------------------------------------------- |
| `pageSizes` | Optional list of page-size options (default `[10, 20, 30, 40, 50]`). |

## Example

```tsx
<TableControls>
  <PageSizeControl />
</TableControls>
```

## Related

- [Pagination](./pagination.md)

## See also

- [Component index](../README.md)
