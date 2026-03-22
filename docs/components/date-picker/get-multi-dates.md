# getMultiDates

Pure helper to **toggle a date** in a multi-select `Date[]` when the user clicks a day.

## Source

[`src/components/DatePicker/getMultiDates.tsx`](../../../src/components/DatePicker/getMultiDates.tsx)

## Import

```tsx
import {
  getMultiDates,
  type GetMultiDatesProps,
} from '@bsol-oss/react-datatable5';
```

## Behavior

- If the day is not `selectable`, returns the previous `selectedDates` unchanged.
- If the day is already selected, removes it; otherwise appends it.

## Example

```tsx
const next = getMultiDates({
  selected: alreadySelected,
  selectable: true,
  selectedDate: clickedDay,
  selectedDates: current,
});
```

## See also

- [Component index](../README.md)
