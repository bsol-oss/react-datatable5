# RangeDatePicker

Calendar for selecting a **date range** (or related range UX) with labels and styling hooks.

## Source

[`src/components/DatePicker/RangeDatePicker.tsx`](../../../src/components/DatePicker/RangeDatePicker.tsx)

## Import

```tsx
import RangeDatePicker, {
  type RangeDatePickerProps,
  type RangeDatePickerLabels,
} from '@bsol-oss/react-datatable5';
```

## API

### `RangeDatePickerProps` (summary)

| Name                  | Description                          |
| --------------------- | ------------------------------------ |
| `selectedDates`       | Current range array.                 |
| `onDateSelected`      | Selection handler.                   |
| `minDate` / `maxDate` | Bounds.                              |
| `labels`              | `RangeDatePickerLabels` for UI copy. |

See the source file for the full prop list and default export usage.

## Example

```tsx
<RangeDatePicker
  selectedDates={range}
  onDateSelected={({ selectedDates }) => setRange(selectedDates)}
/>
```

## Related

- [getRangeDates](./get-range-dates.md)

## See also

- [Component index](../README.md)
