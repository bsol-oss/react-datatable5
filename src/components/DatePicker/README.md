# Date/Time Picker Components

This directory contains a comprehensive set of date and time picker components that support all the common date/time formats specified in JSON Schema and ISO standards.

## Available Components

### 1. DatePicker (Existing)
- **Format**: `date` - YYYY-MM-DD
- **Example**: `2024-01-15`
- **File**: `DatePicker.tsx`
- **Usage**: Standard date selection using a calendar interface

```tsx
import DatePicker from './DatePicker';

<DatePicker
  selected={[selectedDate]}
  onDateSelected={({ date }) => setSelectedDate(date)}
  monthsToDisplay={1}
/>
```

### 2. TimePicker (Existing - Enhanced)
- **Format**: `time` - HH:mm:ss with timezone (12-hour format)
- **Example**: `14:30:00Z`
- **File**: `../TimePicker/TimePicker.tsx`
- **Usage**: 12-hour time selection with AM/PM

```tsx
import { TimePicker } from '../TimePicker/TimePicker';

<TimePicker
  hour={hour}
  setHour={setHour}
  minute={minute}
  setMinute={setMinute}
  meridiem={meridiem}
  setMeridiem={setMeridiem}
  onChange={handleTimeChange}
/>
```

### 3. IsoTimePicker (New)
- **Format**: `iso-time` - HH:mm:ss (24-hour format)
- **Example**: `14:30:00`
- **File**: `IsoTimePicker.tsx`
- **Usage**: 24-hour time selection with seconds

```tsx
import { IsoTimePicker } from './IsoTimePicker';

<IsoTimePicker
  hour={hour}
  setHour={setHour}
  minute={minute}
  setMinute={setMinute}
  second={second}
  setSecond={setSecond}
  onChange={handleTimeChange}
/>
```

### 4. DateTimePicker (New)
- **Formats**: 
  - `date-time` - YYYY-MM-DDTHH:mm:ssZ (with timezone)
  - `iso-date-time` - YYYY-MM-DDTHH:mm:ss (without timezone)
- **Examples**: 
  - `2024-01-15T14:30:00Z`
  - `2024-01-15T14:30:00`
- **File**: `DateTimePicker.tsx`
- **Usage**: Combined date and time selection

```tsx
import { DateTimePicker } from './DateTimePicker';

// For date-time format (with timezone)
<DateTimePicker
  value={selectedDateTime}
  onChange={handleDateTimeChange}
  format="date-time"
/>

// For iso-date-time format (without timezone)
<DateTimePicker
  value={selectedDateTime}
  onChange={handleDateTimeChange}
  format="iso-date-time"
  showSeconds={true}
/>
```

### 5. DurationPicker (New)
- **Format**: `duration` - ISO 8601 duration format
- **Example**: `P1Y2M3DT4H5M6S` (1 year, 2 months, 3 days, 4 hours, 5 minutes, 6 seconds)
- **File**: `DurationPicker.tsx`
- **Usage**: Duration input with support for years, months, days, hours, minutes, seconds

```tsx
import { DurationPicker } from './DurationPicker';

<DurationPicker
  value={duration}
  onChange={setDuration}
  showYears={true}
  showMonths={true}
  showDays={true}
  showHours={true}
  showMinutes={true}
  showSeconds={true}
/>
```

### 6. UniversalPicker (New)
- **Formats**: All supported formats
- **File**: `UniversalPicker.tsx`
- **Usage**: Single component that can handle any format based on props

```tsx
import { UniversalPicker } from './UniversalPicker';

<UniversalPicker
  format="iso-date-time"
  value={value}
  onChange={setValue}
/>
```

## Format Reference

| Format Name | Description | Example | Component |
|-------------|-------------|---------|-----------|
| `date` | Date only | `2024-01-15` | DatePicker |
| `time` | Time with timezone (12-hour) | `14:30:00Z` | TimePicker |
| `date-time` | Full datetime with timezone | `2024-01-15T14:30:00Z` | DateTimePicker |
| `iso-time` | Time without timezone (24-hour) | `14:30:00` | IsoTimePicker |
| `iso-date-time` | Full datetime without timezone | `2024-01-15T14:30:00` | DateTimePicker |
| `duration` | ISO 8601 duration | `P1Y2M3DT4H5M6S` | DurationPicker |

## Features

### Common Features (All Components)
- Built with Chakra UI v3
- TypeScript support
- Consistent styling and behavior
- Clear/reset functionality
- Keyboard navigation support
- Real-time value display

### TimePicker Features
- 12-hour format with AM/PM
- Auto-advance between fields
- Keyboard shortcuts (`:` to advance)
- Customizable meridiem labels

### IsoTimePicker Features
- 24-hour format
- Seconds support
- Auto-advance between fields
- Validation for valid time ranges

### DateTimePicker Features
- Combines date and time selection
- Support for both timezone and non-timezone formats
- Optional seconds display
- Synchronized date and time updates

### DurationPicker Features
- Support for all ISO 8601 duration components
- Configurable component visibility
- Real-time ISO string generation
- Input validation

## Usage in Forms

These components are designed to work seamlessly with React Hook Form and other form libraries:

```tsx
import { useFormContext } from 'react-hook-form';
import { UniversalPicker } from './UniversalPicker';

const MyFormField = ({ name, format }) => {
  const { watch, setValue } = useFormContext();
  const value = watch(name);

  return (
    <UniversalPicker
      format={format}
      value={value}
      onChange={(newValue) => setValue(name, newValue)}
    />
  );
};
```

## Demo Component

See `PickerDemo.tsx` for a comprehensive demonstration of all picker components in action.

## Known Issues

1. DatePicker type definitions need to be updated for better TypeScript integration
2. Some components use `@ts-expect-error` comments where the dayzed library types need improvement

## Contributing

When adding new picker formats or features:

1. Follow the established component structure
2. Ensure Chakra UI v3 compatibility
3. Add TypeScript definitions
4. Include comprehensive examples
5. Update this README with new formats/components 