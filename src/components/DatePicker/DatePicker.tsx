import {
  Button,
  Grid,
  Icon,
  IconButton,
  Input,
  Popover,
  Portal,
} from '@chakra-ui/react';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import React, { createContext, useState, useEffect, useRef } from 'react';
import { MdDateRange } from 'react-icons/md';
import { InputGroup } from '../ui/input-group';
import { useCalendar, type CalendarRenderProps } from './useCalendar';
import { Calendar } from './Calendar';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(customParseFormat);

export interface CalendarProps extends CalendarRenderProps {
  firstDayOfWeek?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
}

export interface GetDateColorProps {
  today: boolean;
  selected: boolean;
  selectable: boolean;
}

export interface GetVariantProps {
  today: boolean;
  selected: boolean;
  selectable: boolean;
}

export interface DatePickerProps {
  onDateSelected?: (obj: { date: Date; selected: Date | Date[] }) => void;
  selected: Date | Date[];
  firstDayOfWeek?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  showOutsideDays?: boolean;
  date?: Date;
  minDate?: Date;
  maxDate?: Date;
  monthsToDisplay?: number;
  labels?: {
    monthNamesShort: string[];
    weekdayNamesShort: string[];
    backButtonLabel?: string;
    forwardButtonLabel?: string;
    todayLabel?: string;
    yesterdayLabel?: string;
    tomorrowLabel?: string;
  };
  render?: (calendarData: CalendarRenderProps) => React.ReactNode;
}

export interface DatePickerLabels {
  monthNamesShort: string[];
  weekdayNamesShort: string[];
  backButtonLabel?: string;
  forwardButtonLabel?: string;
  todayLabel?: string;
  yesterdayLabel?: string;
  tomorrowLabel?: string;
}

export const DatePickerContext = createContext<{
  labels: DatePickerLabels;
}>({
  labels: {
    monthNamesShort: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ],
    weekdayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    backButtonLabel: 'Back',
    forwardButtonLabel: 'Next',
    todayLabel: 'Today',
    yesterdayLabel: 'Yesterday',
    tomorrowLabel: 'Tomorrow',
  },
});

const DatePicker: React.FC<DatePickerProps> = ({
  labels = {
    monthNamesShort: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ],
    weekdayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    backButtonLabel: 'Back',
    forwardButtonLabel: 'Next',
    todayLabel: 'Today',
    yesterdayLabel: 'Yesterday',
    tomorrowLabel: 'Tomorrow',
  },
  onDateSelected,
  selected,
  firstDayOfWeek,
  showOutsideDays,
  date,
  minDate,
  maxDate,
  monthsToDisplay,
  render,
}) => {
  const calendarData = useCalendar({
    onDateSelected,
    selected,
    firstDayOfWeek,
    showOutsideDays,
    date,
    minDate,
    maxDate,
    monthsToDisplay,
  });

  return (
    <DatePickerContext.Provider value={{ labels }}>
      {render ? (
        render(calendarData)
      ) : (
        <Calendar
          {...{
            ...calendarData,
            firstDayOfWeek,
          }}
        />
      )}
    </DatePickerContext.Provider>
  );
};

export default DatePicker;

export interface DatePickerInputProps {
  value?: string | Date;
  onChange?: (date?: string) => void;
  placeholder?: string;
  dateFormat?: string;
  displayFormat?: string;
  labels?: DatePickerLabels;
  timezone?: string;
  minDate?: Date;
  maxDate?: Date;
  firstDayOfWeek?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  showOutsideDays?: boolean;
  monthsToDisplay?: number;
  insideDialog?: boolean;
  readOnly?: boolean;
  showHelperButtons?: boolean;
}

export function DatePickerInput({
  value,
  onChange,
  placeholder = 'Select a date',
  dateFormat = 'YYYY-MM-DD',
  displayFormat = 'YYYY-MM-DD',
  labels = {
    monthNamesShort: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ],
    weekdayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    backButtonLabel: 'Back',
    forwardButtonLabel: 'Next',
    todayLabel: 'Today',
    yesterdayLabel: 'Yesterday',
    tomorrowLabel: 'Tomorrow',
  },
  timezone = 'Asia/Hong_Kong',
  minDate,
  maxDate,
  firstDayOfWeek,
  showOutsideDays,
  monthsToDisplay = 1,
  insideDialog = false,
  readOnly = false,
  showHelperButtons = true,
}: DatePickerInputProps) {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const initialFocusEl = useRef<HTMLInputElement>(null);
  // Sync inputValue with value prop changes
  useEffect(() => {
    if (value) {
      const formatted =
        typeof value === 'string'
          ? dayjs(value).tz(timezone).isValid()
            ? dayjs(value).tz(timezone).format(displayFormat)
            : ''
          : dayjs(value).tz(timezone).format(displayFormat);
      setInputValue(formatted);
    } else {
      setInputValue('');
    }
  }, [value, timezone, displayFormat]);

  // Convert value to Date object for DatePicker
  const selectedDate = value
    ? typeof value === 'string'
      ? dayjs(value).tz(timezone).isValid()
        ? dayjs(value).tz(timezone).toDate()
        : new Date()
      : value
    : new Date();

  // Shared function to parse and validate input value
  const parseAndValidateInput = (inputVal: string) => {
    // If empty, clear the value
    if (!inputVal.trim()) {
      onChange?.(undefined);
      setInputValue('');
      return;
    }

    // Try parsing with displayFormat first
    let parsedDate = dayjs(inputVal, displayFormat, true);

    // If that fails, try common date formats
    if (!parsedDate.isValid()) {
      parsedDate = dayjs(inputVal);
    }

    // If still invalid, try parsing with dateFormat
    if (!parsedDate.isValid()) {
      parsedDate = dayjs(inputVal, dateFormat, true);
    }

    // If valid, check constraints and update
    if (parsedDate.isValid()) {
      const dateObj = parsedDate.tz(timezone).toDate();

      // Check min/max constraints
      if (minDate && dateObj < minDate) {
        // Invalid: before minDate, reset to prop value
        resetToPropValue();
        return;
      }
      if (maxDate && dateObj > maxDate) {
        // Invalid: after maxDate, reset to prop value
        resetToPropValue();
        return;
      }

      // Valid date - format and update
      const formattedDate = parsedDate.tz(timezone).format(dateFormat);
      const formattedDisplay = parsedDate.tz(timezone).format(displayFormat);
      onChange?.(formattedDate);
      setInputValue(formattedDisplay);
    } else {
      // Invalid date - reset to prop value
      resetToPropValue();
    }
  };

  // Helper function to reset input to prop value
  const resetToPropValue = () => {
    if (value) {
      const formatted =
        typeof value === 'string'
          ? dayjs(value).tz(timezone).isValid()
            ? dayjs(value).tz(timezone).format(displayFormat)
            : ''
          : dayjs(value).tz(timezone).format(displayFormat);
      setInputValue(formatted);
    } else {
      setInputValue('');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only update the input value, don't parse yet
    setInputValue(e.target.value);
  };

  const handleInputBlur = () => {
    // Parse and validate when input loses focus
    parseAndValidateInput(inputValue);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Parse and validate when Enter is pressed
    if (e.key === 'Enter') {
      e.preventDefault();
      parseAndValidateInput(inputValue);
    }
  };

  const handleDateSelected = ({ date }: { date: Date }) => {
    console.debug('[DatePickerInput] handleDateSelected called:', {
      date: date.toISOString(),
      timezone,
      dateFormat,
      formattedDate: dayjs(date).tz(timezone).format(dateFormat),
    });
    const formattedDate = dayjs(date).tz(timezone).format(dateFormat);
    console.debug(
      '[DatePickerInput] Calling onChange with formatted date:',
      formattedDate
    );
    onChange?.(formattedDate);
    setOpen(false);
  };

  // Helper function to get dates in the correct timezone
  const getToday = () => dayjs().tz(timezone).startOf('day').toDate();
  const getYesterday = () =>
    dayjs().tz(timezone).subtract(1, 'day').startOf('day').toDate();
  const getTomorrow = () =>
    dayjs().tz(timezone).add(1, 'day').startOf('day').toDate();

  // Check if a date is within min/max constraints
  const isDateValid = (date: Date) => {
    if (minDate) {
      const minDateStart = dayjs(minDate).tz(timezone).startOf('day').toDate();
      const dateStart = dayjs(date).tz(timezone).startOf('day').toDate();
      if (dateStart < minDateStart) return false;
    }
    if (maxDate) {
      const maxDateStart = dayjs(maxDate).tz(timezone).startOf('day').toDate();
      const dateStart = dayjs(date).tz(timezone).startOf('day').toDate();
      if (dateStart > maxDateStart) return false;
    }
    return true;
  };

  const handleHelperButtonClick = (date: Date) => {
    if (isDateValid(date)) {
      handleDateSelected({ date });
    }
  };

  const today = getToday();
  const yesterday = getYesterday();
  const tomorrow = getTomorrow();

  const datePickerContent = (
    <Grid gap={2}>
      {showHelperButtons && (
        <Grid templateColumns="repeat(3, 1fr)" gap={2}>
          <Button
            size="sm"
            variant="outline"
            onClick={() => handleHelperButtonClick(yesterday)}
            disabled={!isDateValid(yesterday)}
          >
            {labels.yesterdayLabel ?? 'Yesterday'}
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => handleHelperButtonClick(today)}
            disabled={!isDateValid(today)}
          >
            {labels.todayLabel ?? 'Today'}
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => handleHelperButtonClick(tomorrow)}
            disabled={!isDateValid(tomorrow)}
          >
            {labels.tomorrowLabel ?? 'Tomorrow'}
          </Button>
        </Grid>
      )}
      <DatePicker
        selected={selectedDate}
        onDateSelected={handleDateSelected}
        labels={labels}
        minDate={minDate}
        maxDate={maxDate}
        firstDayOfWeek={firstDayOfWeek}
        showOutsideDays={showOutsideDays}
        monthsToDisplay={monthsToDisplay}
      />
    </Grid>
  );

  return (
    <Popover.Root
      open={open}
      onOpenChange={(e) => setOpen(e.open)}
      closeOnInteractOutside={false}
      autoFocus={false}
      initialFocusEl={() => initialFocusEl.current}
    >
      <InputGroup
        endElement={
          <Popover.Trigger asChild>
            <IconButton
              variant="ghost"
              size="2xs"
              aria-label="Open calendar"
              onClick={() => setOpen(true)}
            >
              <Icon>
                <MdDateRange />
              </Icon>
            </IconButton>
          </Popover.Trigger>
        }
      >
        <Input
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          readOnly={readOnly}
          ref={initialFocusEl}
        />
      </InputGroup>
      <Portal disabled={insideDialog}>
        <Popover.Positioner>
          <Popover.Content width="fit-content" minH="25rem">
            <Popover.Body>{datePickerContent}</Popover.Body>
          </Popover.Content>
        </Popover.Positioner>
      </Portal>
    </Popover.Root>
  );
}
