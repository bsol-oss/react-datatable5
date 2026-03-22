# DatePicker module

Exports the default **DatePicker** calendar, **DatePickerContext**, **DatePickerInput**, and related prop types for building date selection UIs.

## Source

[`src/components/DatePicker/DatePicker.tsx`](../../../src/components/DatePicker/DatePicker.tsx)

## Import

```tsx
import DatePicker, {
  DatePickerInput,
  DatePickerContext,
  type DatePickerProps,
  type DatePickerInputProps,
  type DatePickerLabels,
} from '@bsol-oss/react-datatable5';
```

## Exports

| Export                 | Description                                                   |
| ---------------------- | ------------------------------------------------------------- |
| `DatePicker` (default) | Calendar via `useCalendar` + optional custom `render`.        |
| `DatePickerInput`      | Popover + input field for picking a single date as string.    |
| `DatePickerContext`    | Default label strings for month/weekday names and navigation. |

### `DatePickerProps` (summary)

| Name                  | Description                                                                    |
| --------------------- | ------------------------------------------------------------------------------ |
| `selected`            | `Date \| Date[]`                                                               |
| `onDateSelected`      | Callback with `{ date, selected }`.                                            |
| `minDate` / `maxDate` | Bounds.                                                                        |
| `monthsToDisplay`     | Number of months.                                                              |
| `labels`              | `DatePickerLabels` (month/weekday names, back/next, today/yesterday/tomorrow). |
| `render`              | Optional custom render using `CalendarRenderProps`.                            |

## Example

```tsx
<DatePicker
  selected={[value]}
  onDateSelected={({ date }) => setValue(date)}
  monthsToDisplay={1}
/>
```

## Related

- [RangeDatePicker](./range-date-picker.md)
- See also [`src/components/DatePicker/README.md`](../../../src/components/DatePicker/README.md) for broader date/time notes.

## See also

- Stories: `src/stories/DatePicker/`
- [Component index](../README.md)
