import { Flex, Grid, Text } from '@chakra-ui/react';
import { useState, useEffect, useCallback, useMemo } from 'react';
import { DatePickerInput, DatePickerLabels } from './DatePicker';
import { TimePicker } from '../TimePicker/TimePicker';
import { TimePickerLabels } from '../Form/components/types/CustomJSONSchema7';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

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
  defaultDate?: string; // YYYY-MM-DD format
  defaultTime?: TimeData; // Default time to use when date is entered
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
  defaultDate,
  defaultTime,
}: DateTimePickerProps) {
  console.debug('[DateTimePicker] Component initialized with props:', {
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
      console.debug('[DateTimePicker] getTimeFromValue called:', {
        val,
        timezone,
        showSeconds,
      });
      if (!val) {
        console.debug('[DateTimePicker] No value provided, returning nulls');
        return {
          hour12: null,
          minute: null,
          meridiem: null as 'am' | 'pm' | null,
          hour24: null,
          second: null,
        };
      }
      const dateObj = dayjs(val).tz(timezone);
      console.debug('[DateTimePicker] Parsed date object:', {
        original: val,
        timezone,
        isValid: dateObj.isValid(),
        formatted: dateObj.format('YYYY-MM-DD HH:mm:ss Z'),
        hour24: dateObj.hour(),
        minute: dateObj.minute(),
        second: dateObj.second(),
      });
      if (!dateObj.isValid()) {
        console.debug('[DateTimePicker] Invalid date object, returning nulls');
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
      console.debug('[DateTimePicker] Extracted time values:', result);
      return result;
    },
    [timezone, showSeconds]
  );

  const initialTime = getTimeFromValue(value);
  console.debug('[DateTimePicker] Initial time from value:', {
    value,
    initialTime,
  });

  // Normalize startTime to ignore milliseconds (needed for effectiveDefaultDate calculation)
  const normalizedStartTime = startTime
    ? dayjs(startTime).tz(timezone).millisecond(0).toISOString()
    : undefined;

  // Calculate effective defaultDate: use prop if provided, otherwise use startTime date, otherwise use today
  const effectiveDefaultDate = useMemo(() => {
    if (defaultDate) {
      return defaultDate;
    }
    if (
      normalizedStartTime &&
      dayjs(normalizedStartTime).tz(timezone).isValid()
    ) {
      return dayjs(normalizedStartTime).tz(timezone).format('YYYY-MM-DD');
    }
    return dayjs().tz(timezone).format('YYYY-MM-DD');
  }, [defaultDate, normalizedStartTime, timezone]);

  // Initialize time with default values if no value is provided
  const getInitialTimeValues = () => {
    if (value && initialTime.hour12 !== null) {
      return initialTime;
    }
    // If no value or no time in value, use defaultTime or 00:00
    if (defaultTime) {
      if (format === 'iso-date-time') {
        const defaultTime24 = defaultTime as TimeData24Hour;
        return {
          hour12: null,
          minute: defaultTime24.minute ?? 0,
          meridiem: null as 'am' | 'pm' | null,
          hour24: defaultTime24.hour ?? 0,
          second: showSeconds ? defaultTime24.second ?? 0 : null,
        };
      } else {
        const defaultTime12 = defaultTime as TimeData12Hour;
        return {
          hour12: defaultTime12.hour ?? 12,
          minute: defaultTime12.minute ?? 0,
          meridiem: defaultTime12.meridiem ?? 'am',
          hour24: null,
          second: null,
        };
      }
    }
    // Default to 00:00
    if (format === 'iso-date-time') {
      return {
        hour12: null,
        minute: 0,
        meridiem: null as 'am' | 'pm' | null,
        hour24: 0,
        second: showSeconds ? 0 : null,
      };
    } else {
      return {
        hour12: 12,
        minute: 0,
        meridiem: 'am' as 'am' | 'pm' | null,
        hour24: null,
        second: null,
      };
    }
  };

  const initialTimeValues = getInitialTimeValues();

  // Time state for 12-hour format
  const [hour12, setHour12] = useState<number | null>(initialTimeValues.hour12);
  const [minute, setMinute] = useState<number | null>(initialTimeValues.minute);
  const [meridiem, setMeridiem] = useState<'am' | 'pm' | null>(
    initialTimeValues.meridiem
  );

  // Time state for 24-hour format
  const [hour24, setHour24] = useState<number | null>(initialTimeValues.hour24);
  const [second, setSecond] = useState<number | null>(initialTimeValues.second);

  // Sync selectedDate and time states when value prop changes
  useEffect(() => {
    console.debug('[DateTimePicker] useEffect triggered - value changed:', {
      value,
      timezone,
      format,
    });

    // If value is null, undefined, or invalid, clear date but keep default time values
    if (!value || value === null || value === undefined) {
      console.debug(
        '[DateTimePicker] Value is null/undefined, clearing date but keeping default time'
      );
      setSelectedDate('');
      // Keep default time values instead of clearing them
      if (format === 'iso-date-time') {
        setHour24(defaultTime ? (defaultTime as TimeData24Hour).hour ?? 0 : 0);
        setMinute(
          defaultTime ? (defaultTime as TimeData24Hour).minute ?? 0 : 0
        );
        setSecond(
          showSeconds
            ? defaultTime
              ? (defaultTime as TimeData24Hour).second ?? 0
              : 0
            : null
        );
      } else {
        setHour12(
          defaultTime ? (defaultTime as TimeData12Hour).hour ?? 12 : 12
        );
        setMinute(
          defaultTime ? (defaultTime as TimeData12Hour).minute ?? 0 : 0
        );
        setMeridiem(
          defaultTime ? (defaultTime as TimeData12Hour).meridiem ?? 'am' : 'am'
        );
      }
      return;
    }

    // Check if value is valid
    const dateObj = dayjs(value).tz(timezone);
    if (!dateObj.isValid()) {
      console.debug(
        '[DateTimePicker] Invalid value, clearing date but keeping default time'
      );
      setSelectedDate('');
      // Keep default time values instead of clearing them
      if (format === 'iso-date-time') {
        setHour24(defaultTime ? (defaultTime as TimeData24Hour).hour ?? 0 : 0);
        setMinute(
          defaultTime ? (defaultTime as TimeData24Hour).minute ?? 0 : 0
        );
        setSecond(
          showSeconds
            ? defaultTime
              ? (defaultTime as TimeData24Hour).second ?? 0
              : 0
            : null
        );
      } else {
        setHour12(
          defaultTime ? (defaultTime as TimeData12Hour).hour ?? 12 : 12
        );
        setMinute(
          defaultTime ? (defaultTime as TimeData12Hour).minute ?? 0 : 0
        );
        setMeridiem(
          defaultTime ? (defaultTime as TimeData12Hour).meridiem ?? 'am' : 'am'
        );
      }
      return;
    }

    const dateString = getDateString(value);
    console.debug('[DateTimePicker] Setting selectedDate:', dateString);
    setSelectedDate(dateString);
    const timeData = getTimeFromValue(value);
    console.debug('[DateTimePicker] Updating time states:', {
      timeData,
    });
    setHour12(timeData.hour12);
    setMinute(timeData.minute);
    setMeridiem(timeData.meridiem);
    setHour24(timeData.hour24);
    setSecond(timeData.second);
  }, [value, getTimeFromValue, getDateString, timezone]);

  const handleDateChange = (date: string) => {
    console.debug('[DateTimePicker] handleDateChange called:', {
      date,
      timezone,
      showSeconds,
      currentTimeStates: { hour12, minute, meridiem, hour24, second },
    });

    // If date is empty or invalid, clear all fields
    if (!date || date === '') {
      console.debug('[DateTimePicker] Empty date, clearing all fields');
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
    console.debug('[DateTimePicker] Parsed date object:', {
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

    // Check if time values are null - if so, use defaultTime or set to 00:00
    const hasTimeValues =
      format === 'iso-date-time'
        ? hour24 !== null || minute !== null
        : hour12 !== null || minute !== null || meridiem !== null;

    let timeDataToUse: TimeData | undefined = undefined;
    if (!hasTimeValues) {
      // Use defaultTime if provided, otherwise default to 00:00
      if (defaultTime) {
        console.debug('[DateTimePicker] No time values set, using defaultTime');
        if (format === 'iso-date-time') {
          const defaultTime24 = defaultTime as TimeData24Hour;
          setHour24(defaultTime24.hour ?? 0);
          setMinute(defaultTime24.minute ?? 0);
          if (showSeconds) {
            setSecond(defaultTime24.second ?? 0);
          }
          timeDataToUse = {
            hour: defaultTime24.hour ?? 0,
            minute: defaultTime24.minute ?? 0,
            second: showSeconds ? defaultTime24.second ?? 0 : undefined,
          };
        } else {
          const defaultTime12 = defaultTime as TimeData12Hour;
          setHour12(defaultTime12.hour ?? 12);
          setMinute(defaultTime12.minute ?? 0);
          setMeridiem(defaultTime12.meridiem ?? 'am');
          timeDataToUse = {
            hour: defaultTime12.hour ?? 12,
            minute: defaultTime12.minute ?? 0,
            meridiem: defaultTime12.meridiem ?? 'am',
          };
        }
      } else {
        console.debug(
          '[DateTimePicker] No time values set, defaulting to 00:00'
        );
        if (format === 'iso-date-time') {
          setHour24(0);
          setMinute(0);
          if (showSeconds) {
            setSecond(0);
          }
          timeDataToUse = {
            hour: 0,
            minute: 0,
            second: showSeconds ? 0 : undefined,
          };
        } else {
          setHour12(12);
          setMinute(0);
          setMeridiem('am');
          timeDataToUse = {
            hour: 12,
            minute: 0,
            meridiem: 'am',
          };
        }
      }
    }

    // When showSeconds is false, ignore seconds from the date
    if (!showSeconds) {
      const dateWithoutSeconds = dateObj.second(0).millisecond(0).toISOString();
      console.debug(
        '[DateTimePicker] Updating date without seconds:',
        dateWithoutSeconds
      );
      updateDateTime(dateWithoutSeconds, timeDataToUse);
    } else {
      const dateWithSeconds = dateObj.toISOString();
      console.debug(
        '[DateTimePicker] Updating date with seconds:',
        dateWithSeconds
      );
      updateDateTime(dateWithSeconds, timeDataToUse);
    }
  };

  const handleTimeChange = (timeData: TimeData) => {
    console.debug('[DateTimePicker] handleTimeChange called:', {
      timeData,
      format,
      selectedDate,
      timezone,
    });
    if (format === 'iso-date-time') {
      const data = timeData as TimeData24Hour;
      console.debug(
        '[DateTimePicker] ISO format - setting 24-hour time:',
        data
      );
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
      console.debug('[DateTimePicker] 12-hour format - setting time:', data);
      setHour12(data.hour);
      setMinute(data.minute);
      setMeridiem(data.meridiem);
    }

    // Use selectedDate if valid, otherwise use effectiveDefaultDate or clear all fields
    if (!selectedDate || !dayjs(selectedDate).isValid()) {
      // If effectiveDefaultDate is available, use it instead of clearing
      if (effectiveDefaultDate && dayjs(effectiveDefaultDate).isValid()) {
        console.debug(
          '[DateTimePicker] No valid selectedDate, using effectiveDefaultDate:',
          effectiveDefaultDate
        );
        setSelectedDate(effectiveDefaultDate);
        const dateObj = dayjs(effectiveDefaultDate).tz(timezone);
        if (dateObj.isValid()) {
          updateDateTime(dateObj.toISOString(), timeData);
        } else {
          console.warn(
            '[DateTimePicker] Invalid effectiveDefaultDate, clearing fields'
          );
          setSelectedDate('');
          setHour12(null);
          setMinute(null);
          setMeridiem(null);
          setHour24(null);
          setSecond(null);
          onChange?.(undefined);
        }
        return;
      } else {
        console.debug(
          '[DateTimePicker] No valid selectedDate and no effectiveDefaultDate, keeping time values but no date'
        );
        // Keep the time values that were just set, but don't set a date
        // This should rarely happen as effectiveDefaultDate always defaults to today
        setSelectedDate('');
        onChange?.(undefined);
        return;
      }
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
    console.debug('[DateTimePicker] updateDateTime called:', {
      date,
      timeData,
      format,
      currentStates: { hour12, minute, meridiem, hour24, second },
    });
    if (!date || date === null || date === undefined) {
      console.debug(
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
        console.debug(
          '[DateTimePicker] All time values are null, clearing value'
        );
        onChange?.(undefined);
        return;
      }

      console.debug('[DateTimePicker] ISO format - setting time on date:', {
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
      console.debug('[DateTimePicker] Processing 12-hour format:', {
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

      console.debug('[DateTimePicker] Resolved time values:', { h, m, mer });

      // If all time values are null, clear the value
      if (h === null && m === null && mer === null) {
        console.debug(
          '[DateTimePicker] All time values are null, clearing value'
        );
        onChange?.(undefined);
        return;
      }

      console.debug('[DateTimePicker] 12-hour format - converting time:', {
        h,
        m,
        mer,
      });

      if (h !== null && mer !== null) {
        let hour24 = h;
        if (mer === 'am' && h === 12) hour24 = 0;
        else if (mer === 'pm' && h < 12) hour24 = h + 12;
        console.debug('[DateTimePicker] Converted to 24-hour:', {
          h,
          mer,
          hour24,
        });
        newDate.setHours(hour24);
      } else {
        console.debug(
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
        console.debug('[DateTimePicker] Skipping minute update - m is null');
      }
      newDate.setSeconds(0);
    }

    const finalISO = dayjs(newDate).tz(timezone).toISOString();
    console.debug('[DateTimePicker] Final ISO string to emit:', {
      newDate: newDate.toISOString(),
      timezone,
      finalISO,
    });
    onChange?.(finalISO);
  };

  const isISO = format === 'iso-date-time';

  // Determine minDate: prioritize explicit minDate prop, then fall back to startTime
  const effectiveMinDate = minDate
    ? minDate
    : normalizedStartTime && dayjs(normalizedStartTime).tz(timezone).isValid()
      ? dayjs(normalizedStartTime).tz(timezone).startOf('day').toDate()
      : undefined;

  // Log current state before render
  useEffect(() => {
    console.debug('[DateTimePicker] Current state before render:', {
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
    <Flex direction="column" gap={2}>
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
        readOnly={false}
      />

      <Grid templateColumns="1fr auto" alignItems="center" gap={2}>
        {isISO ? (
          <TimePicker
            format="24h"
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
            format="12h"
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
