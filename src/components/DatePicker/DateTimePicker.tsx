import { Button, Flex, Grid, Icon, Text } from '@chakra-ui/react';
import { useState, useEffect, useCallback, useMemo } from 'react';
import { DatePickerInput } from './DatePickerInput';
import { DatePickerLabels } from './DatePicker';
import { TimePicker } from '../TimePicker/TimePicker';
import { IsoTimePicker } from './IsoTimePicker';
import { TimePickerLabels } from '../Form/components/types/CustomJSONSchema7';
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
  timePickerLabels?: TimePickerLabels;
  timezone?: string;
  startTime?: string;
  minDate?: Date;
  maxDate?: Date;
  portalled?: boolean;
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
  timePickerLabels,
  timezone = 'Asia/Hong_Kong',
  startTime,
  minDate,
  maxDate,
  portalled = false,
}: DateTimePickerProps) {
  console.log('[DateTimePicker] Component initialized with props:', {
    value,
    format,
    showSeconds,
    timezone,
    startTime,
    minDate,
    maxDate,
  });

  // Initialize selectedDate from value prop, converting ISO to YYYY-MM-DD format
  const getDateString = useCallback(
    (val?: string | null) => {
      if (!val) return '';
      const dateObj = dayjs(val).tz(timezone);
      return dateObj.isValid() ? dateObj.format('YYYY-MM-DD') : '';
    },
    [timezone]
  );

  const [selectedDate, setSelectedDate] = useState<string>(
    getDateString(value)
  );

  // Helper to get time values from value prop with timezone
  const getTimeFromValue = useCallback(
    (val?: string | null) => {
      console.log('[DateTimePicker] getTimeFromValue called:', {
        val,
        timezone,
        showSeconds,
      });
      if (!val) {
        console.log('[DateTimePicker] No value provided, returning nulls');
        return {
          hour12: null,
          minute: null,
          meridiem: null as 'am' | 'pm' | null,
          hour24: null,
          second: null,
        };
      }
      const dateObj = dayjs(val).tz(timezone);
      console.log('[DateTimePicker] Parsed date object:', {
        original: val,
        timezone,
        isValid: dateObj.isValid(),
        formatted: dateObj.format('YYYY-MM-DD HH:mm:ss Z'),
        hour24: dateObj.hour(),
        minute: dateObj.minute(),
        second: dateObj.second(),
      });
      if (!dateObj.isValid()) {
        console.log('[DateTimePicker] Invalid date object, returning nulls');
        return {
          hour12: null,
          minute: null,
          meridiem: null as 'am' | 'pm' | null,
          hour24: null,
          second: null,
        };
      }
      const hour24Value = dateObj.hour();
      const hour12Value = hour24Value % 12 || 12;
      const minuteValue = dateObj.minute();
      const meridiemValue: 'am' | 'pm' = hour24Value >= 12 ? 'pm' : 'am';
      const secondValue = showSeconds ? dateObj.second() : null;

      const result = {
        hour12: hour12Value,
        minute: minuteValue,
        meridiem: meridiemValue,
        hour24: hour24Value,
        second: secondValue,
      };
      console.log('[DateTimePicker] Extracted time values:', result);
      return result;
    },
    [timezone, showSeconds]
  );

  const initialTime = getTimeFromValue(value);
  console.log('[DateTimePicker] Initial time from value:', {
    value,
    initialTime,
  });

  // Time state for 12-hour format
  const [hour12, setHour12] = useState<number | null>(initialTime.hour12);
  const [minute, setMinute] = useState<number | null>(initialTime.minute);
  const [meridiem, setMeridiem] = useState<'am' | 'pm' | null>(
    initialTime.meridiem
  );

  // Time state for 24-hour format
  const [hour24, setHour24] = useState<number | null>(initialTime.hour24);
  const [second, setSecond] = useState<number | null>(initialTime.second);

  // Sync selectedDate and time states when value prop changes
  useEffect(() => {
    console.log('[DateTimePicker] useEffect triggered - value changed:', {
      value,
      timezone,
      format,
    });

    // If value is null, undefined, or invalid, clear all fields
    if (!value || value === null || value === undefined) {
      console.log(
        '[DateTimePicker] Value is null/undefined, clearing all fields'
      );
      setSelectedDate('');
      setHour12(null);
      setMinute(null);
      setMeridiem(null);
      setHour24(null);
      setSecond(null);
      return;
    }

    // Check if value is valid
    const dateObj = dayjs(value).tz(timezone);
    if (!dateObj.isValid()) {
      console.log('[DateTimePicker] Invalid value, clearing all fields');
      setSelectedDate('');
      setHour12(null);
      setMinute(null);
      setMeridiem(null);
      setHour24(null);
      setSecond(null);
      return;
    }

    const dateString = getDateString(value);
    console.log('[DateTimePicker] Setting selectedDate:', dateString);
    setSelectedDate(dateString);
    const timeData = getTimeFromValue(value);
    console.log('[DateTimePicker] Updating time states:', {
      timeData,
    });
    setHour12(timeData.hour12);
    setMinute(timeData.minute);
    setMeridiem(timeData.meridiem);
    setHour24(timeData.hour24);
    setSecond(timeData.second);
  }, [value, getTimeFromValue, getDateString, timezone]);

  const handleDateChange = (date: string) => {
    console.log('[DateTimePicker] handleDateChange called:', {
      date,
      timezone,
      showSeconds,
      currentTimeStates: { hour12, minute, meridiem, hour24, second },
    });

    // If date is empty or invalid, clear all fields
    if (!date || date === '') {
      console.log('[DateTimePicker] Empty date, clearing all fields');
      setSelectedDate('');
      setHour12(null);
      setMinute(null);
      setMeridiem(null);
      setHour24(null);
      setSecond(null);
      onChange?.(undefined);
      return;
    }

    setSelectedDate(date);
    // Parse the date string (YYYY-MM-DD) in the specified timezone
    const dateObj = dayjs.tz(date, timezone);
    console.log('[DateTimePicker] Parsed date object:', {
      date,
      timezone,
      isValid: dateObj.isValid(),
      isoString: dateObj.toISOString(),
      formatted: dateObj.format('YYYY-MM-DD HH:mm:ss Z'),
    });
    if (!dateObj.isValid()) {
      console.warn(
        '[DateTimePicker] Invalid date object in handleDateChange, clearing fields'
      );
      setSelectedDate('');
      setHour12(null);
      setMinute(null);
      setMeridiem(null);
      setHour24(null);
      setSecond(null);
      onChange?.(undefined);
      return;
    }
    // When showSeconds is false, ignore seconds from the date
    if (!showSeconds) {
      const dateWithoutSeconds = dateObj.second(0).millisecond(0).toISOString();
      console.log(
        '[DateTimePicker] Updating date without seconds:',
        dateWithoutSeconds
      );
      updateDateTime(dateWithoutSeconds);
    } else {
      const dateWithSeconds = dateObj.toISOString();
      console.log(
        '[DateTimePicker] Updating date with seconds:',
        dateWithSeconds
      );
      updateDateTime(dateWithSeconds);
    }
  };

  const handleTimeChange = (timeData: TimeData) => {
    console.log('[DateTimePicker] handleTimeChange called:', {
      timeData,
      format,
      selectedDate,
      timezone,
    });
    if (format === 'iso-date-time') {
      const data = timeData as TimeData24Hour;
      console.log('[DateTimePicker] ISO format - setting 24-hour time:', data);
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
      console.log('[DateTimePicker] 12-hour format - setting time:', data);
      setHour12(data.hour);
      setMinute(data.minute);
      setMeridiem(data.meridiem);
    }

    // Use selectedDate if valid, otherwise clear all fields
    if (!selectedDate || !dayjs(selectedDate).isValid()) {
      console.log(
        '[DateTimePicker] No valid selectedDate, clearing all fields'
      );
      setSelectedDate('');
      setHour12(null);
      setMinute(null);
      setMeridiem(null);
      setHour24(null);
      setSecond(null);
      onChange?.(undefined);
      return;
    }

    const dateObj = dayjs(selectedDate).tz(timezone);
    if (dateObj.isValid()) {
      updateDateTime(dateObj.toISOString(), timeData);
    } else {
      console.warn(
        '[DateTimePicker] Invalid date object in handleTimeChange, clearing fields'
      );
      setSelectedDate('');
      setHour12(null);
      setMinute(null);
      setMeridiem(null);
      setHour24(null);
      setSecond(null);
      onChange?.(undefined);
    }
  };

  const updateDateTime = (date?: string | null, timeData?: TimeData) => {
    console.log('[DateTimePicker] updateDateTime called:', {
      date,
      timeData,
      format,
      currentStates: { hour12, minute, meridiem, hour24, second },
    });
    if (!date || date === null || date === undefined) {
      console.log(
        '[DateTimePicker] No date provided, clearing all fields and calling onChange(undefined)'
      );
      setSelectedDate('');
      setHour12(null);
      setMinute(null);
      setMeridiem(null);
      setHour24(null);
      setSecond(null);
      onChange?.(undefined);
      return;
    }

    // use dayjs to convert the date to the timezone
    const dateObj = dayjs(date).tz(timezone);
    if (!dateObj.isValid()) {
      console.warn(
        '[DateTimePicker] Invalid date object in updateDateTime, clearing fields:',
        date
      );
      setSelectedDate('');
      setHour12(null);
      setMinute(null);
      setMeridiem(null);
      setHour24(null);
      setSecond(null);
      onChange?.(undefined);
      return;
    }
    const newDate = dateObj.toDate();

    if (format === 'iso-date-time') {
      const data = timeData as TimeData24Hour | undefined;
      // Use timeData values if provided, otherwise fall back to current state
      // But if timeData is explicitly provided with nulls, we need to check if all are null
      const h = data !== undefined ? data.hour : hour24;
      const m = data !== undefined ? data.minute : minute;
      // Always ignore seconds when showSeconds is false - set to 0
      const s = showSeconds
        ? data !== undefined
          ? data.second ?? null
          : second ?? 0
        : 0;

      // If all time values are null, clear the value
      if (h === null && m === null && (showSeconds ? s === null : true)) {
        console.log(
          '[DateTimePicker] All time values are null, clearing value'
        );
        onChange?.(undefined);
        return;
      }

      console.log('[DateTimePicker] ISO format - setting time on date:', {
        h,
        m,
        s,
        showSeconds,
      });

      if (h !== null) newDate.setHours(h);
      if (m !== null) newDate.setMinutes(m);
      newDate.setSeconds(s ?? 0);
    } else {
      const data = timeData as TimeData12Hour | undefined;
      console.log('[DateTimePicker] Processing 12-hour format:', {
        'data !== undefined': data !== undefined,
        'data?.hour': data?.hour,
        'data?.minute': data?.minute,
        'data?.meridiem': data?.meridiem,
        'current hour12': hour12,
        'current minute': minute,
        'current meridiem': meridiem,
      });
      // Use timeData values if provided, otherwise fall back to current state
      const h = data !== undefined ? data.hour : hour12;
      const m = data !== undefined ? data.minute : minute;
      const mer = data !== undefined ? data.meridiem : meridiem;

      console.log('[DateTimePicker] Resolved time values:', { h, m, mer });

      // If all time values are null, clear the value
      if (h === null && m === null && mer === null) {
        console.log(
          '[DateTimePicker] All time values are null, clearing value'
        );
        onChange?.(undefined);
        return;
      }

      console.log('[DateTimePicker] 12-hour format - converting time:', {
        h,
        m,
        mer,
      });

      if (h !== null && mer !== null) {
        let hour24 = h;
        if (mer === 'am' && h === 12) hour24 = 0;
        else if (mer === 'pm' && h < 12) hour24 = h + 12;
        console.log('[DateTimePicker] Converted to 24-hour:', {
          h,
          mer,
          hour24,
        });
        newDate.setHours(hour24);
      } else {
        console.log(
          '[DateTimePicker] Skipping hour update - h or mer is null:',
          {
            h,
            mer,
          }
        );
      }
      if (m !== null) {
        newDate.setMinutes(m);
      } else {
        console.log('[DateTimePicker] Skipping minute update - m is null');
      }
      newDate.setSeconds(0);
    }

    const finalISO = dayjs(newDate).tz(timezone).toISOString();
    console.log('[DateTimePicker] Final ISO string to emit:', {
      newDate: newDate.toISOString(),
      timezone,
      finalISO,
    });
    onChange?.(finalISO);
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

  // Determine minDate: prioritize explicit minDate prop, then fall back to startTime
  const effectiveMinDate = minDate
    ? minDate
    : normalizedStartTime && dayjs(normalizedStartTime).tz(timezone).isValid()
      ? dayjs(normalizedStartTime).tz(timezone).startOf('day').toDate()
      : undefined;

  // Log current state before render
  useEffect(() => {
    console.log('[DateTimePicker] Current state before render:', {
      isISO,
      hour12,
      minute,
      meridiem,
      hour24,
      second,
      selectedDate,
      normalizedStartTime,
      timezone,
    });
  }, [
    isISO,
    hour12,
    minute,
    meridiem,
    hour24,
    second,
    selectedDate,
    normalizedStartTime,
    timezone,
  ]);

  // Compute display text from current state
  const displayText = useMemo(() => {
    if (!selectedDate) return null;

    const dateObj = dayjs.tz(selectedDate, timezone);
    if (!dateObj.isValid()) return null;

    if (isISO) {
      // For ISO format, use hour24, minute, second
      if (hour24 === null || minute === null) return null;
      const dateTimeObj = dateObj
        .hour(hour24)
        .minute(minute)
        .second(second ?? 0);
      return dateTimeObj.format(
        showSeconds ? 'YYYY-MM-DD HH:mm:ss' : 'YYYY-MM-DD HH:mm'
      );
    } else {
      // For 12-hour format, use hour12, minute, meridiem
      if (hour12 === null || minute === null || meridiem === null) return null;
      // Convert to 24-hour format for dayjs
      let hour24Value = hour12;
      if (meridiem === 'am' && hour12 === 12) hour24Value = 0;
      else if (meridiem === 'pm' && hour12 < 12) hour24Value = hour12 + 12;
      const dateTimeObj = dateObj.hour(hour24Value).minute(minute).second(0);
      return dateTimeObj.format('YYYY-MM-DD hh:mm A');
    }
  }, [
    selectedDate,
    isISO,
    hour12,
    minute,
    meridiem,
    hour24,
    second,
    showSeconds,
    timezone,
  ]);

  const timezoneOffset = useMemo(() => {
    if (!selectedDate) return null;
    const dateObj = dayjs.tz(selectedDate, timezone);
    return dateObj.isValid() ? dateObj.format('Z') : null;
  }, [selectedDate, timezone]);

  return (
    <Flex
      direction="column"
      gap={4}
      p={4}
      border="1px solid"
      borderColor="gray.200"
      borderRadius="md"
    >
      <DatePickerInput
        value={selectedDate || undefined}
        onChange={(date) => {
          if (date) {
            handleDateChange(date);
          } else {
            setSelectedDate('');
            onChange?.(undefined);
          }
        }}
        placeholder="Select a date"
        dateFormat="YYYY-MM-DD"
        displayFormat="YYYY-MM-DD"
        labels={labels}
        timezone={timezone}
        minDate={effectiveMinDate}
        maxDate={maxDate}
        monthsToDisplay={1}
        readOnly={true}
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
            portalled={portalled}
            labels={timePickerLabels}
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
            portalled={portalled}
            labels={timePickerLabels}
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

      {displayText && (
        <Flex gap={2}>
          <Text fontSize="sm" color={{ base: 'gray.600', _dark: 'gray.600' }}>
            {displayText}
          </Text>
          {timezoneOffset && (
            <Text fontSize="sm" color={{ base: 'gray.600', _dark: 'gray.600' }}>
              {timezoneOffset}
            </Text>
          )}
          <Text fontSize="sm" color={{ base: 'gray.600', _dark: 'gray.600' }}>
            {timezone}
          </Text>
        </Flex>
      )}
    </Flex>
  );
}
