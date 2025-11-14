import { Button, Flex, Grid, Icon, Text } from '@chakra-ui/react';
import { useState } from 'react';
import DatePicker, { DatePickerLabels } from './DatePicker';
import { TimePicker } from '../TimePicker/TimePicker';
import { IsoTimePicker } from './IsoTimePicker';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { FaTrash } from 'react-icons/fa6';

dayjs.extend(utc);
dayjs.extend(timezone);

interface DateTimePickerProps {
  value?: string;
  onChange?: (date?: string) => void;
  format?: 'date-time' | 'iso-date-time';
  showSeconds?: boolean;
  labels?: DatePickerLabels;
  timezone?: string;
  startTime?: string;
}

interface TimeData12Hour {
  hour: number | null;
  minute: number | null;
  meridiem: 'am' | 'pm' | null;
}

interface TimeData24Hour {
  hour: number | null;
  minute: number | null;
  second?: number | null;
}

type TimeData = TimeData12Hour | TimeData24Hour;

export function DateTimePicker({
  value,
  onChange,
  format = 'date-time',
  showSeconds = false,
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
  },
  timezone = 'Asia/Hong_Kong',
  startTime,
}: DateTimePickerProps) {
  const [selectedDate, setSelectedDate] = useState<string>(value || '');

  // Time state for 12-hour format
  const [hour12, setHour12] = useState<number | null>(
    value ? dayjs(value).hour() % 12 || 12 : null
  );
  const [minute, setMinute] = useState<number | null>(
    value ? dayjs(value).minute() : null
  );
  const [meridiem, setMeridiem] = useState<'am' | 'pm' | null>(
    value ? (dayjs(value).hour() >= 12 ? 'pm' : 'am') : null
  );

  // Time state for 24-hour format
  const [hour24, setHour24] = useState<number | null>(
    value ? dayjs(value).hour() : null
  );
  const [second, setSecond] = useState<number | null>(
    showSeconds && value ? dayjs(value).second() : null
  );

  const handleDateChange = (date: string) => {
    setSelectedDate(date);
    // When showSeconds is false, ignore seconds from the date
    const dateObj = dayjs(date).tz(timezone);
    if (!showSeconds && dateObj.isValid()) {
      const dateWithoutSeconds = dateObj.second(0).millisecond(0).toISOString();
      updateDateTime(dateWithoutSeconds);
    } else {
      updateDateTime(dateObj.toISOString());
    }
  };

  const handleTimeChange = (timeData: TimeData) => {
    if (format === 'iso-date-time') {
      const data = timeData as TimeData24Hour;
      setHour24(data.hour);
      setMinute(data.minute);
      if (showSeconds) {
        setSecond(data.second ?? null);
      } else {
        // Ignore seconds - always set to null when showSeconds is false
        setSecond(null);
      }
    } else {
      const data = timeData as TimeData12Hour;
      setHour12(data.hour);
      setMinute(data.minute);
      setMeridiem(data.meridiem);
    }

    // Use selectedDate if valid, otherwise use today's date as fallback
    const dateToUse =
      selectedDate && dayjs(selectedDate).isValid()
        ? selectedDate
        : dayjs().tz(timezone).toISOString();

    const dateObj = dayjs(dateToUse).tz(timezone);
    if (dateObj.isValid()) {
      updateDateTime(dateObj.toISOString(), timeData);
    }
  };

  const updateDateTime = (date?: string, timeData?: TimeData) => {
    if (!date) {
      onChange?.(undefined);
      return;
    }

    // use dayjs to convert the date to the timezone
    const dateObj = dayjs(date).tz(timezone);
    if (!dateObj.isValid()) {
      return;
    }
    const newDate = dateObj.toDate();

    if (format === 'iso-date-time') {
      const data = timeData as TimeData24Hour | undefined;
      const h = data?.hour ?? hour24;
      const m = data?.minute ?? minute;
      // Always ignore seconds when showSeconds is false - set to 0
      const s = showSeconds ? data?.second ?? second ?? 0 : 0;

      if (h !== null) newDate.setHours(h);
      if (m !== null) newDate.setMinutes(m);
      newDate.setSeconds(s);
    } else {
      const data = timeData as TimeData12Hour | undefined;
      const h = data?.hour ?? hour12;
      const m = data?.minute ?? minute;
      const mer = data?.meridiem ?? meridiem;

      if (h !== null && mer !== null) {
        let hour24 = h;
        if (mer === 'am' && h === 12) hour24 = 0;
        else if (mer === 'pm' && h < 12) hour24 = h + 12;
        newDate.setHours(hour24);
      }
      if (m !== null) newDate.setMinutes(m);
      newDate.setSeconds(0);
    }

    onChange?.(dayjs(newDate).tz(timezone).toISOString());
  };

  const handleClear = () => {
    setSelectedDate('');
    setHour12(null);
    setHour24(null);
    setMinute(null);
    setSecond(null);
    setMeridiem(null);
    onChange?.(undefined);
  };

  const isISO = format === 'iso-date-time';

  // Normalize startTime to ignore milliseconds
  const normalizedStartTime = startTime
    ? dayjs(startTime).tz(timezone).millisecond(0).toISOString()
    : undefined;

  return (
    <Flex
      direction="column"
      gap={4}
      p={4}
      border="1px solid"
      borderColor="gray.200"
      borderRadius="md"
    >
      <DatePicker
        selected={
          selectedDate ? dayjs(selectedDate).tz(timezone).toDate() : new Date()
        }
        onDateSelected={({ date }: { date: Date }) =>
          handleDateChange(dayjs(date).tz(timezone).toISOString())
        }
        monthsToDisplay={1}
        labels={labels}
        minDate={
          normalizedStartTime &&
          dayjs(normalizedStartTime).tz(timezone).isValid()
            ? dayjs(normalizedStartTime).tz(timezone).startOf('day').toDate()
            : undefined
        }
      />

      <Grid templateColumns="1fr auto" alignItems="center" gap={4}>
        {isISO ? (
          <IsoTimePicker
            hour={hour24}
            setHour={setHour24}
            minute={minute}
            setMinute={setMinute}
            second={showSeconds ? second : null}
            setSecond={showSeconds ? setSecond : () => {}}
            onChange={handleTimeChange}
            startTime={normalizedStartTime}
            selectedDate={selectedDate}
            timezone={timezone}
          />
        ) : (
          <TimePicker
            hour={hour12}
            setHour={setHour12}
            minute={minute}
            setMinute={setMinute}
            meridiem={meridiem}
            setMeridiem={setMeridiem}
            onChange={handleTimeChange}
            startTime={normalizedStartTime}
            selectedDate={selectedDate}
            timezone={timezone}
          />
        )}

        <Button
          onClick={handleClear}
          size="sm"
          variant="outline"
          colorScheme="red"
        >
          <Icon as={FaTrash} />
        </Button>
      </Grid>

      {selectedDate && (
        <Flex gap={2}>
          <Text fontSize="sm" color={{ base: 'gray.600', _dark: 'gray.600' }}>
            {dayjs(value).format(
              isISO
                ? showSeconds
                  ? 'YYYY-MM-DD HH:mm:ss'
                  : 'YYYY-MM-DD HH:mm'
                : 'YYYY-MM-DD hh:mm A '
            )}
          </Text>
          <Text fontSize="sm" color={{ base: 'gray.600', _dark: 'gray.600' }}>
            {dayjs(value).tz(timezone).format('Z')}
          </Text>
          <Text fontSize="sm" color={{ base: 'gray.600', _dark: 'gray.600' }}>
            {timezone}
          </Text>
        </Flex>
      )}
    </Flex>
  );
}
