import {
  DatePicker as ChakraDatePicker,
  Flex,
  type DateValue,
} from '@chakra-ui/react';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import React, { useMemo } from 'react';
import { dateValueToFilterDate, toCalendarDate } from './dateValueUtils';

dayjs.extend(utc);
dayjs.extend(timezone);

const DEFAULT_TZ = 'Asia/Hong_Kong';

export interface RangeDatePickerLabels {
  monthNamesFull: string[];
  weekdayNamesShort: string[];
  backButtonLabel?: string;
  forwardButtonLabel?: string;
}

export interface RangeDatePickerProps {
  onDateSelected?: (obj: {
    selected: Date[];
    selectable: boolean;
    date: Date;
  }) => void;
  selected?: Date[];
  firstDayOfWeek?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  /** @deprecated No-op; kept for story compatibility */
  showOutsideDays?: boolean;
  /** @deprecated No-op; kept for story compatibility */
  date?: Date;
  minDate?: Date;
  maxDate?: Date;
  monthsToDisplay?: number;
  labels?: RangeDatePickerLabels;
  withPopover?: boolean;
  open?: boolean;
  onOpenChange?: (details: { open: boolean }) => void;
  trigger?: React.ReactNode;
  displayFormat?: string;
  placeholder?: string;
  closeOnInteractOutside?: boolean;
  portalled?: boolean;
  /** IANA timezone for wall dates */
  timezone?: string;
}

const RangeDatePicker: React.FC<RangeDatePickerProps> = ({
  selected = [],
  onDateSelected,
  firstDayOfWeek = 0,
  minDate,
  maxDate,
  monthsToDisplay = 2,
  timezone: tz = DEFAULT_TZ,
}) => {
  const value = useMemo<DateValue[]>(() => {
    if (selected.length >= 2) {
      return [toCalendarDate(selected[0], tz), toCalendarDate(selected[1], tz)];
    }
    if (selected.length === 1) {
      return [toCalendarDate(selected[0], tz)];
    }
    return [];
  }, [selected, tz]);

  const minV = minDate ? toCalendarDate(minDate, tz) : undefined;
  const maxV = maxDate ? toCalendarDate(maxDate, tz) : undefined;
  const n = Math.min(12, Math.max(1, monthsToDisplay));

  return (
    <ChakraDatePicker.Root
      inline
      selectionMode="range"
      value={value}
      onValueChange={(e) => {
        const vals = e.value;
        if (vals.length >= 2) {
          const d0 = dateValueToFilterDate(vals[0], tz);
          const d1 = dateValueToFilterDate(vals[1], tz);
          const sorted = d0 <= d1 ? [d0, d1] : [d1, d0];
          onDateSelected?.({
            selected: sorted,
            selectable: true,
            date: sorted[1],
          });
        } else if (vals.length === 1) {
          const d0 = dateValueToFilterDate(vals[0], tz);
          onDateSelected?.({
            selected: [d0],
            selectable: true,
            date: d0,
          });
        }
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
  );
};

export default RangeDatePicker;
