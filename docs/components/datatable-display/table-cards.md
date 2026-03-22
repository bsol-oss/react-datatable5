# TableCards

Renders rows as **cards** instead of a classic HTML table (alternative to `DefaultTable` table layout).

## Source

[`src/components/DataTable/display/TableCards.tsx`](../../../src/components/DataTable/display/TableCards.tsx)

## Import

```tsx
import {
  TableCards,
  DefaultCardTitle,
  type TableCardsProps,
} from '@bsol-oss/react-datatable5';
```

## API

### `TableCardsProps<TData>`

| Name         | Description                                  |
| ------------ | -------------------------------------------- |
| (see source) | Card layout and cell rendering for each row. |

`DefaultCardTitle` is a helper subcomponent for card titles.

## Example

```tsx
<DataTable {...datatable} columns={columns} data={data}>
  <TableCardContainer>
    <TableCards />
  </TableCardContainer>
</DataTable>
```

## Related

- [CardHeader](./card-header.md)

## See also

- [Component index](../README.md)
