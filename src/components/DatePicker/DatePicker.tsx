import {
  DatePicker as ChakraDatePicker,
  Flex,
  Icon,
  IconButton,
  InputGroup,
  Portal,
  type DateValue,
} from '@chakra-ui/react';
import { CalendarDate } from '@internationalized/date';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import React, { useMemo } from 'react';
import { MdDateRange } from 'react-icons/md';
import { DatePickerContext } from './datePickerContext';
import type { DatePickerLabels, DatePickerProps } from './datePickerTypes';
import { stringToCalendarDateValue, toCalendarDate } from './dateValueUtils';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(customParseFormat);

export type {
  CalendarProps,
  GetDateColorProps,
  GetVariantProps,
  DatePickerLabels,
  DatePickerProps,
} from './datePickerTypes';

export { DatePickerContext } from './datePickerContext';

const DEFAULT_TZ = 'Asia/Hong_Kong';

const defaultLabels: DatePickerLabels = {
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
};

/**
 * Inline single-date calendar (Chakra DatePicker). Used by UniversalPicker and stories.
 */
const DatePicker: React.FC<DatePickerProps> = ({
  labels = defaultLabels,
  onDateSelected,
  selected,
  firstDayOfWeek = 0,
  minDate,
  maxDate,
  monthsToDisplay = 1,
}) => {
  const tz = DEFAULT_TZ;
  const single = Array.isArray(selected) ? selected[0] : selected;
  const value = useMemo<DateValue[]>(() => {
    if (!single) return [];
    return [toCalendarDate(single, tz)];
  }, [single, tz]);

  const minV = minDate ? toCalendarDate(minDate, tz) : undefined;
  const maxV = maxDate ? toCalendarDate(maxDate, tz) : undefined;
  const n = Math.min(12, Math.max(1, monthsToDisplay));

  return (
    <DatePickerContext.Provider value={{ labels }}>
      <ChakraDatePicker.Root
        inline
        value={value}
        onValueChange={(e) => {
          const v = e.value[0];
          if (!v) return;
          const cal = v as CalendarDate;
          const iso = `${cal.year}-${String(cal.month).padStart(2, '0')}-${String(cal.day).padStart(2, '0')}`;
          const jsDate = dayjs
            .tz(iso, 'YYYY-MM-DD', tz)
            .startOf('day')
            .toDate();
          onDateSelected?.({ date: jsDate, selected: jsDate });
        }}
        min={minV}
        max={maxV}
        timeZone={tz}
        numOfMonths={n}
        startOfWeek={firstDayOfWeek}
        width="fit-content"
        borderWidth="1px"
        borderRadius="l3"
        p="2"
      >
        <ChakraDatePicker.Content>
          <ChakraDatePicker.View view="day">
            <ChakraDatePicker.Header />
            {n > 1 ? (
              <Flex gap="4" flexWrap="wrap" justify="center">
                {Array.from({ length: n }, (_, i) => (
                  <ChakraDatePicker.DayTable key={i} offset={i} />
                ))}
              </Flex>
            ) : (
              <ChakraDatePicker.DayTable />
            )}
          </ChakraDatePicker.View>
          <ChakraDatePicker.View view="month">
            <ChakraDatePicker.Header />
            <ChakraDatePicker.MonthTable />
          </ChakraDatePicker.View>
          <ChakraDatePicker.View view="year">
            <ChakraDatePicker.Header />
            <ChakraDatePicker.YearTable />
          </ChakraDatePicker.View>
        </ChakraDatePicker.Content>
      </ChakraDatePicker.Root>
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
  timezone = DEFAULT_TZ,
  minDate,
  maxDate,
  insideDialog = false,
  readOnly = false,
}: DatePickerInputProps) {
  const tz = timezone;

  const valueArr = useMemo<DateValue[]>(() => {
    if (value === undefined || value === null || value === '') return [];
    if (typeof value === 'string') {
      return stringToCalendarDateValue(value, tz);
    }
    return [toCalendarDate(value, tz)];
  }, [value, tz]);

  const minV = minDate ? toCalendarDate(minDate, tz) : undefined;
  const maxV = maxDate ? toCalendarDate(maxDate, tz) : undefined;

  const formatFn = (d: DateValue) => {
    const cal = d as CalendarDate;
    const iso = `${cal.year}-${String(cal.month).padStart(2, '0')}-${String(cal.day).padStart(2, '0')}`;
    return dayjs.tz(iso, 'YYYY-MM-DD', tz).format(displayFormat);
  };

  const parseFn = (input: string) => {
    if (!input.trim()) return undefined;
    let parsed = dayjs(input, displayFormat, true).tz(tz);
    if (!parsed.isValid()) parsed = dayjs(input).tz(tz);
    if (!parsed.isValid()) parsed = dayjs(input, dateFormat, true).tz(tz);
    if (!parsed.isValid()) return undefined;
    return new CalendarDate(parsed.year(), parsed.month() + 1, parsed.date());
  };

  return (
    <ChakraDatePicker.Root
      value={valueArr}
      onValueChange={(e) => {
        const v = e.value[0];
        if (!v) {
          onChange?.(undefined);
          return;
        }
        const cal = v as CalendarDate;
        const iso = `${cal.year}-${String(cal.month).padStart(2, '0')}-${String(cal.day).padStart(2, '0')}`;
        const formatted = dayjs.tz(iso, 'YYYY-MM-DD', tz).format(dateFormat);
        onChange?.(formatted);
      }}
      format={formatFn}
      parse={parseFn}
      placeholder={placeholder}
      readOnly={readOnly}
      timeZone={tz}
      min={minV}
      max={maxV}
      startOfWeek={0}
      closeOnSelect
    >
      <ChakraDatePicker.Control>
        <InputGroup
          endElement={
            <ChakraDatePicker.IndicatorGroup>
              <ChakraDatePicker.Trigger asChild>
                <IconButton
                  variant="ghost"
                  size="2xs"
                  aria-label="Open calendar"
                >
                  <Icon>
                    <MdDateRange />
                  </Icon>
                </IconButton>
              </ChakraDatePicker.Trigger>
            </ChakraDatePicker.IndicatorGroup>
          }
        >
          <ChakraDatePicker.Input />
        </InputGroup>
      </ChakraDatePicker.Control>
      <Portal disabled={insideDialog}>
        <ChakraDatePicker.Positioner>
          <ChakraDatePicker.Content minW="min-content">
            <ChakraDatePicker.View view="day">
              <ChakraDatePicker.Header />
              <ChakraDatePicker.DayTable />
            </ChakraDatePicker.View>
            <ChakraDatePicker.View view="month">
              <ChakraDatePicker.Header />
              <ChakraDatePicker.MonthTable />
            </ChakraDatePicker.View>
            <ChakraDatePicker.View view="year">
              <ChakraDatePicker.Header />
              <ChakraDatePicker.YearTable />
            </ChakraDatePicker.View>
          </ChakraDatePicker.Content>
        </ChakraDatePicker.Positioner>
      </Portal>
    </ChakraDatePicker.Root>
  );
}
