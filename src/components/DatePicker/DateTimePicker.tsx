import {
  Button,
  DatePicker as ChakraDatePicker,
  Icon,
  Input,
  Portal,
  Stack,
  type DateValue,
} from '@chakra-ui/react';
import { CalendarDate } from '@internationalized/date';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { useEffect, useMemo, useState } from 'react';
import { LuCalendar } from 'react-icons/lu';
import {
  DateTimePickerLabels,
  TimePickerLabels,
} from '../Form/components/types/CustomJSONSchema7';
import { stringToCalendarDateValue, toCalendarDate } from './dateValueUtils';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(customParseFormat);

interface DateTimePickerProps {
  value?: string;
  onChange?: (date?: string) => void;
  format?: 'date-time' | 'iso-date-time';
  showSeconds?: boolean;
  labels?: DateTimePickerLabels;
  timePickerLabels?: TimePickerLabels;
  timezone?: string;
  startTime?: string;
  minDate?: Date;
  maxDate?: Date;
  /** When true, calendar portal attaches to document (recommended outside dialogs). */
  portalled?: boolean;
  defaultDate?: string;
  defaultTime?: {
    hour: number | null;
    minute: number | null;
    second?: number | null;
    meridiem?: 'am' | 'pm' | null;
  };
  showQuickActions?: boolean;
  quickActionLabels?: {
    yesterday?: string;
    today?: string;
    tomorrow?: string;
    plus7Days?: string;
  };
  showTimezoneSelector?: boolean;
  timezoneOffset?: string;
  onTimezoneOffsetChange?: (offset: string) => void;
}

export function DateTimePicker({
  value,
  onChange,
  format = 'date-time',
  showSeconds = false,
  timezone: tz = 'Asia/Hong_Kong',
  minDate,
  maxDate,
  portalled = true,
}: DateTimePickerProps) {
  const isIso = format === 'iso-date-time';
  const parsed = useMemo(() => {
    if (!value) return null;
    const d = dayjs(value).tz(tz);
    return d.isValid() ? d : null;
  }, [value, tz]);

  const [dateValues, setDateValues] = useState<DateValue[]>([]);
  const [timeStr, setTimeStr] = useState('00:00');

  useEffect(() => {
    if (parsed?.isValid()) {
      setDateValues(stringToCalendarDateValue(parsed.format('YYYY-MM-DD'), tz));
      setTimeStr(
        showSeconds ? parsed.format('HH:mm:ss') : parsed.format('HH:mm')
      );
    } else {
      setDateValues([]);
      setTimeStr(showSeconds ? '00:00:00' : '00:00');
    }
  }, [parsed, tz, showSeconds]);

  const minV = minDate ? toCalendarDate(minDate, tz) : undefined;
  const maxV = maxDate ? toCalendarDate(maxDate, tz) : undefined;

  const emitFromParts = (dv: DateValue[], t: string) => {
    const cal = dv[0] as CalendarDate | undefined;
    if (!cal) {
      onChange?.(undefined);
      return;
    }
    const iso = `${cal.year}-${String(cal.month).padStart(2, '0')}-${String(cal.day).padStart(2, '0')}`;
    const timePadded = showSeconds
      ? t
      : t.includes(':') && t.split(':').length === 2
        ? `${t}:00`
        : t;
    const dj = dayjs.tz(`${iso} ${timePadded}`, 'YYYY-MM-DD HH:mm:ss', tz);
    if (!dj.isValid()) {
      onChange?.(undefined);
      return;
    }
    if (isIso) {
      onChange?.(dj.format('YYYY-MM-DDTHH:mm:ss'));
    } else {
      onChange?.(dj.format('YYYY-MM-DDTHH:mm:ssZ'));
    }
  };

  return (
    <Stack gap={2} maxW="24rem">
      <ChakraDatePicker.Root
        value={dateValues}
        onValueChange={(e) => {
          const next = e.value;
          setDateValues(next);
          if (next[0]) emitFromParts(next, timeStr);
        }}
        closeOnSelect={false}
        timeZone={tz}
        min={minV}
        max={maxV}
      >
        <ChakraDatePicker.Control>
          <ChakraDatePicker.Trigger asChild unstyled>
            <Button
              variant="outline"
              width="full"
              justifyContent="space-between"
            >
              <ChakraDatePicker.ValueText placeholder="Select date and time" />
              <Icon>
                <LuCalendar />
              </Icon>
            </Button>
          </ChakraDatePicker.Trigger>
        </ChakraDatePicker.Control>
        <Portal disabled={!portalled}>
          <ChakraDatePicker.Positioner>
            <ChakraDatePicker.Content>
              <ChakraDatePicker.View view="day">
                <ChakraDatePicker.Header />
                <ChakraDatePicker.DayTable />
                <Input
                  type="time"
                  step={showSeconds ? 1 : 60}
                  value={timeStr}
                  onChange={(e) => {
                    const v = e.currentTarget.value;
                    setTimeStr(v);
                    if (dateValues[0]) emitFromParts(dateValues, v);
                  }}
                  mt="2"
                  size="sm"
                />
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
    </Stack>
  );
}
