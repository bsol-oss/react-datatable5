# getRangeDates

Pure helper to build a **date range** selection (first click → anchor, second click → end or reset).

## Source

[`src/components/DatePicker/getRangeDates.tsx`](../../../src/components/DatePicker/getRangeDates.tsx)

## Import

```tsx
import {
  getRangeDates,
  type GetRangeDatesProps,
} from '@bsol-oss/react-datatable5';
```

## Behavior

- Returns `undefined` if not selectable.
- Empty selection → adds the clicked date.
- One date → adds second endpoint in chronological order.
- Two dates → restarts range with the new date.

## Related

- [RangeDatePicker](./range-date-picker.md)
- [TableFilters](../datatable-controls/table-filters.md) (date range filters)

## See also

- [Component index](../README.md)
