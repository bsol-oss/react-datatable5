# CalendarDisplay

Calendar **event** view over tabular row data (maps rows to timed events and renders a calendar grid).

## Source

[`src/components/DataTable/display/CalendarDisplay.tsx`](../../../src/components/DataTable/display/CalendarDisplay.tsx)

## Import

```tsx
import {
  CalendarDisplay,
  type CalendarDisplayProps,
  type CalendarEvent,
} from '@bsol-oss/react-datatable5';
```

## API

### `CalendarEvent<TData>`

Describes how to read start/end/title from a row (see source for fields).

### `CalendarDisplayProps<TData>`

Large prop surface for views, navigation, and event rendering—see implementation file for full typing.

## Example

```tsx
<DataTable {...datatable} columns={columns} data={data}>
  <CalendarDisplay />
</DataTable>
```

## See also

- Stories: `src/stories/DataTable/`
- [Component index](../README.md)
