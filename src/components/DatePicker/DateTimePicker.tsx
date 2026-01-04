import {
  Button,
  Combobox,
  Flex,
  Grid,
  Input,
  InputGroup,
  Popover,
  Portal,
  Select,
  Text,
  useFilter,
  useListCollection,
} from '@chakra-ui/react';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import React, { useEffect, useMemo, useState, type ChangeEvent } from 'react';
import { BsClock } from 'react-icons/bs';
import { MdDateRange } from 'react-icons/md';
import {
  DateTimePickerLabels,
  TimePickerLabels,
} from '../Form/components/types/CustomJSONSchema7';
import { useCalendar } from './useCalendar';

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
}

interface TimeOption12h {
  label: string;
  value: string;
  hour: number; // 1-12
  minute: number;
  meridiem: 'am' | 'pm';
  searchText: string;
  durationText?: string;
}

interface TimeOption24h {
  label: string;
  value: string;
  hour: number; // 0-23
  minute: number;
  second: number;
  searchText: string;
  durationText?: string;
}

type TimeOption = TimeOption12h | TimeOption24h;

export function DateTimePicker({
  value,
  onChange,
  format = 'date-time',
  showSeconds = false,
  labels = {
    monthNamesShort: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ],
    weekdayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    backButtonLabel: 'Back',
    forwardButtonLabel: 'Forward',
  },
  timePickerLabels,
  timezone: tz = 'Asia/Hong_Kong',
  startTime,
  minDate,
  maxDate,
  portalled = false,
  defaultDate,
  defaultTime,
  showQuickActions = false,
  quickActionLabels = {
    yesterday: 'Yesterday',
    today: 'Today',
    tomorrow: 'Tomorrow',
    plus7Days: '+7 Days',
  },
  showTimezoneSelector = false,
}: DateTimePickerProps) {
  const is24Hour = format === 'iso-date-time' || showSeconds;
  const {
    monthNamesShort = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ],
    weekdayNamesShort = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    backButtonLabel = 'Back',
    forwardButtonLabel = 'Forward',
  } = labels;

  // Parse value to get date and time
  const parsedValue = useMemo(() => {
    if (!value) return null;
    const dateObj = dayjs(value).tz(tz);
    if (!dateObj.isValid()) return null;
    return dateObj;
  }, [value, tz]);

  // Initialize date state
  const [selectedDate, setSelectedDate] = useState<Date | null>(() => {
    if (parsedValue) {
      return parsedValue.toDate();
    }
    if (defaultDate) {
      const defaultDateObj = dayjs(defaultDate).tz(tz);
      return defaultDateObj.isValid() ? defaultDateObj.toDate() : new Date();
    }
    return new Date();
  });

  // Initialize time state
  const [hour, setHour] = useState<number | null>(() => {
    if (parsedValue) {
      return parsedValue.hour();
    }
    if (defaultTime?.hour !== null && defaultTime?.hour !== undefined) {
      return defaultTime.hour;
    }
    return null;
  });

  const [minute, setMinute] = useState<number | null>(() => {
    if (parsedValue) {
      return parsedValue.minute();
    }
    if (defaultTime?.minute !== null && defaultTime?.minute !== undefined) {
      return defaultTime.minute;
    }
    return null;
  });

  const [second, setSecond] = useState<number | null>(() => {
    if (parsedValue) {
      return parsedValue.second();
    }
    if (defaultTime?.second !== null && defaultTime?.second !== undefined) {
      return defaultTime.second;
    }
    return showSeconds ? 0 : null;
  });

  const [meridiem, setMeridiem] = useState<'am' | 'pm' | null>(() => {
    if (parsedValue) {
      const h = parsedValue.hour();
      return h < 12 ? 'am' : 'pm';
    }
    if (defaultTime?.meridiem !== null && defaultTime?.meridiem !== undefined) {
      return defaultTime.meridiem;
    }
    return is24Hour ? null : 'am';
  });

  // Popover state - separate for date, time, and timezone
  const [datePopoverOpen, setDatePopoverOpen] = useState(false);
  const [timePopoverOpen, setTimePopoverOpen] = useState(false);
  const [timezonePopoverOpen, setTimezonePopoverOpen] = useState(false);
  const [calendarPopoverOpen, setCalendarPopoverOpen] = useState(false);

  // Timezone offset state
  const [timezoneOffset, setTimezoneOffset] = useState<string>(() => {
    if (parsedValue) {
      return parsedValue.format('Z');
    }
    // Default to +08:00
    return '+08:00';
  });

  // Sync timezone offset when value changes

  // Generate timezone offset options (UTC-12 to UTC+14)
  const timezoneOffsetOptions = useMemo(() => {
    const options: { value: string; label: string }[] = [];
    for (let offset = -12; offset <= 14; offset++) {
      const sign = offset >= 0 ? '+' : '-';
      const hours = Math.abs(offset).toString().padStart(2, '0');
      const value = `${sign}${hours}:00`;
      const label = `UTC${sign}${hours}:00`;
      options.push({ value, label });
    }
    return options;
  }, []);

  // Create collection for Select
  const { collection: timezoneCollection } = useListCollection({
    initialItems: timezoneOffsetOptions,
    itemToString: (item) => item.label,
    itemToValue: (item) => item.value,
  });

  // Date input state
  const [dateInputValue, setDateInputValue] = useState('');

  // Sync date input value with selected date
  useEffect(() => {
    if (selectedDate) {
      const formatted = dayjs(selectedDate).tz(tz).format('YYYY-MM-DD');
      setDateInputValue(formatted);
    } else {
      setDateInputValue('');
    }
  }, [selectedDate, tz]);

  // Parse and validate date input
  const parseAndValidateDateInput = (inputVal: string) => {
    // If empty, clear the value
    if (!inputVal.trim()) {
      setSelectedDate(null);
      updateDateTime(null, hour, minute, second, meridiem);
      return;
    }

    // Try parsing with common date formats
    let parsedDate = dayjs(inputVal, 'YYYY-MM-DD', true);

    // If that fails, try other common formats
    if (!parsedDate.isValid()) {
      parsedDate = dayjs(inputVal);
    }

    // If valid, check constraints and update
    if (parsedDate.isValid()) {
      const dateObj = parsedDate.tz(tz).toDate();

      // Check min/max constraints
      if (minDate && dateObj < minDate) {
        // Invalid: before minDate, reset to current selected date
        if (selectedDate) {
          const formatted = dayjs(selectedDate).tz(tz).format('YYYY-MM-DD');
          setDateInputValue(formatted);
        } else {
          setDateInputValue('');
        }
        return;
      }
      if (maxDate && dateObj > maxDate) {
        // Invalid: after maxDate, reset to current selected date
        if (selectedDate) {
          const formatted = dayjs(selectedDate).tz(tz).format('YYYY-MM-DD');
          setDateInputValue(formatted);
        } else {
          setDateInputValue('');
        }
        return;
      }

      // Valid date - update selected date
      setSelectedDate(dateObj);
      updateDateTime(dateObj, hour, minute, second, meridiem);
      // Format and update input value
      const formatted = parsedDate.tz(tz).format('YYYY-MM-DD');
      setDateInputValue(formatted);
    } else {
      // Invalid date - reset to current selected date
      if (selectedDate) {
        const formatted = dayjs(selectedDate).tz(tz).format('YYYY-MM-DD');
        setDateInputValue(formatted);
      } else {
        setDateInputValue('');
      }
    }
  };

  const handleDateInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDateInputValue(e.target.value);
  };

  const handleDateInputBlur = () => {
    parseAndValidateDateInput(dateInputValue);
  };

  const handleDateInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      parseAndValidateDateInput(dateInputValue);
    }
  };

  // Helper functions to get dates in the correct timezone
  const getToday = () => dayjs().tz(tz).startOf('day').toDate();
  const getYesterday = () =>
    dayjs().tz(tz).subtract(1, 'day').startOf('day').toDate();
  const getTomorrow = () =>
    dayjs().tz(tz).add(1, 'day').startOf('day').toDate();
  const getPlus7Days = () =>
    dayjs().tz(tz).add(7, 'day').startOf('day').toDate();

  // Check if a date is within min/max constraints
  const isDateValid = (date: Date) => {
    if (minDate) {
      const minDateStart = dayjs(minDate).tz(tz).startOf('day').toDate();
      const dateStart = dayjs(date).tz(tz).startOf('day').toDate();
      if (dateStart < minDateStart) return false;
    }
    if (maxDate) {
      const maxDateStart = dayjs(maxDate).tz(tz).startOf('day').toDate();
      const dateStart = dayjs(date).tz(tz).startOf('day').toDate();
      if (dateStart > maxDateStart) return false;
    }
    return true;
  };

  // Handle quick action button clicks
  const handleQuickActionClick = (date: Date) => {
    if (isDateValid(date)) {
      setSelectedDate(date);
      updateDateTime(date, hour, minute, second, meridiem);
      // Close the calendar popover if open
      setCalendarPopoverOpen(false);
    }
  };

  // Display text for buttons
  const dateDisplayText = useMemo(() => {
    if (!selectedDate) return 'Select date';
    return dayjs(selectedDate).tz(tz).format('YYYY-MM-DD');
  }, [selectedDate, tz]);

  const timeDisplayText = useMemo(() => {
    if (hour === null || minute === null) return 'Select time';
    if (is24Hour) {
      // 24-hour format: never show meridiem, always use 24-hour format (0-23)
      const hour24 = hour >= 0 && hour <= 23 ? hour : hour % 24;
      const s = second ?? 0;
      if (showSeconds) {
        return `${hour24.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
      }
      return `${hour24.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
    } else {
      // 12-hour format: always show meridiem (AM/PM)
      const hour12 = hour >= 1 && hour <= 12 ? hour : hour % 12;

      if (meridiem === null) return 'Select time';
      const hourDisplay = hour12.toString();
      const minuteDisplay = minute.toString().padStart(2, '0');
      return `${hourDisplay}:${minuteDisplay} ${meridiem.toUpperCase()}`;
    }
  }, [hour, minute, second, meridiem, is24Hour, showSeconds]);

  const timezoneDisplayText = useMemo(() => {
    if (!showTimezoneSelector) return '';
    // Show offset as is (e.g., "+08:00")
    return timezoneOffset;
  }, [timezoneOffset, showTimezoneSelector]);

  // Update selectedDate when value changes externally
  useEffect(() => {
    if (parsedValue) {
      setSelectedDate(parsedValue.toDate());
      setHour(parsedValue.hour());
      setMinute(parsedValue.minute());
      setSecond(parsedValue.second());
      if (!is24Hour) {
        const h = parsedValue.hour();
        setMeridiem(h < 12 ? 'am' : 'pm');
      }
    }
  }, [parsedValue, is24Hour]);

  // Combine date and time and call onChange
  const updateDateTime = (
    newDate: Date | null,
    newHour: number | null,
    newMinute: number | null,
    newSecond: number | null,
    newMeridiem: 'am' | 'pm' | null,
    timezoneOffsetOverride?: string
  ) => {
    if (!newDate || newHour === null || newMinute === null) {
      onChange?.(undefined);
      return;
    }

    // Convert 12-hour to 24-hour if needed
    let hour24 = newHour;
    if (!is24Hour && newMeridiem) {
      // In 12-hour format, hour should be 1-12
      // If hour is > 12, it might already be in 24-hour format, convert it first
      let hour12 = newHour;
      if (newHour > 12) {
        // Hour is in 24-hour format, convert to 12-hour first
        if (newHour === 12) {
          hour12 = 12;
        } else {
          hour12 = newHour - 12;
        }
      }

      // Now convert 12-hour to 24-hour format (0-23)
      if (newMeridiem === 'am') {
        if (hour12 === 12) {
          hour24 = 0; // 12 AM = 0:00
        } else {
          hour24 = hour12; // 1-11 AM = 1-11
        }
      } else {
        // PM
        if (hour12 === 12) {
          hour24 = 12; // 12 PM = 12:00
        } else {
          hour24 = hour12 + 12; // 1-11 PM = 13-23
        }
      }
    } else if (!is24Hour && !newMeridiem) {
      // If in 12-hour mode but no meridiem, assume the hour is already in 12-hour format
      // and default to AM (or keep as is if it's a valid 12-hour value)
      // This shouldn't happen in normal flow, but handle it gracefully
      hour24 = newHour;
    }

    // If timezone selector is enabled, create date-time without timezone conversion
    // to ensure the selected timestamp matches the picker values exactly
    if (showTimezoneSelector) {
      // Use override if provided, otherwise use state value
      const offsetToUse = timezoneOffsetOverride ?? timezoneOffset;

      // Create date-time from the Date object without timezone conversion
      // Extract year, month, day from the date
      const year = newDate.getFullYear();
      const month = newDate.getMonth();
      const day = newDate.getDate();

      // Create a date-time string with the exact values from the picker
      const formattedDateTime = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}T${String(hour24).padStart(2, '0')}:${String(newMinute).padStart(2, '0')}:${String(newSecond ?? 0).padStart(2, '0')}`;
      onChange?.(`${formattedDateTime}${offsetToUse}`);
      return;
    }

    // Normal mode: use timezone conversion
    let dateTime = dayjs(newDate)
      .tz(tz)
      .hour(hour24)
      .minute(newMinute)
      .second(newSecond ?? 0)
      .millisecond(0);

    if (!dateTime.isValid()) {
      onChange?.(undefined);
      return;
    }

    // Format based on format prop
    if (format === 'iso-date-time') {
      onChange?.(dateTime.format('YYYY-MM-DDTHH:mm:ss'));
    } else {
      // date-time format with timezone
      onChange?.(dateTime.format('YYYY-MM-DDTHH:mm:ssZ'));
    }
  };

  // Handle date selection
  const handleDateSelected = ({
    date,
  }: {
    date: Date;
    selected: Date | Date[];
  }) => {
    setSelectedDate(date);
    updateDateTime(date, hour, minute, second, meridiem);
  };

  // Handle time change
  const handleTimeChange = (
    newHour: number | null,
    newMinute: number | null,
    newSecond: number | null,
    newMeridiem: 'am' | 'pm' | null
  ) => {
    setHour(newHour);
    setMinute(newMinute);
    if (is24Hour) {
      setSecond(newSecond);
    } else {
      setMeridiem(newMeridiem);
    }
    if (selectedDate) {
      updateDateTime(selectedDate, newHour, newMinute, newSecond, newMeridiem);
    }
  };

  // Calendar hook
  const calendarProps = useCalendar({
    selected: selectedDate || undefined,
    date: selectedDate || undefined,
    minDate,
    maxDate,
    monthsToDisplay: 1,
    onDateSelected: handleDateSelected,
  });

  // Generate time options
  const timeOptions = useMemo<TimeOption[]>(() => {
    const options: TimeOption[] = [];

    // Get start time for comparison if provided
    let startDateTime: dayjs.Dayjs | null = null;
    let shouldFilterByDate = false;
    if (startTime && selectedDate) {
      const startDateObj = dayjs(startTime).tz(tz);
      const selectedDateObj = dayjs(selectedDate).tz(tz);

      if (startDateObj.isValid() && selectedDateObj.isValid()) {
        startDateTime = startDateObj;
        shouldFilterByDate =
          startDateObj.format('YYYY-MM-DD') ===
          selectedDateObj.format('YYYY-MM-DD');
      }
    }

    if (is24Hour) {
      // Generate 24-hour format options
      for (let h = 0; h < 24; h++) {
        for (let m = 0; m < 60; m += 15) {
          // Filter out times that would result in negative duration
          if (startDateTime && selectedDate && shouldFilterByDate) {
            const selectedDateObj = dayjs(selectedDate).tz(tz);
            const optionDateTime = selectedDateObj
              .hour(h)
              .minute(m)
              .second(0)
              .millisecond(0);

            if (optionDateTime.isBefore(startDateTime)) {
              continue;
            }
          }

          // Calculate duration if startTime is provided
          let durationText: string | undefined;
          if (startDateTime && selectedDate) {
            const selectedDateObj = dayjs(selectedDate).tz(tz);
            const optionDateTime = selectedDateObj
              .hour(h)
              .minute(m)
              .second(0)
              .millisecond(0);

            if (
              optionDateTime.isValid() &&
              optionDateTime.isAfter(startDateTime)
            ) {
              const diffMs = optionDateTime.diff(startDateTime);
              const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
              const diffMinutes = Math.floor(
                (diffMs % (1000 * 60 * 60)) / (1000 * 60)
              );
              const diffSeconds = Math.floor((diffMs % (1000 * 60)) / 1000);

              if (diffHours > 0 || diffMinutes > 0 || diffSeconds > 0) {
                let diffText = '';
                if (diffHours > 0) {
                  diffText = `${diffHours}h ${diffMinutes}m`;
                } else if (diffMinutes > 0) {
                  diffText = `${diffMinutes}m ${diffSeconds}s`;
                } else {
                  diffText = `${diffSeconds}s`;
                }
                durationText = `+${diffText}`;
              }
            }
          }

          const s = showSeconds ? 0 : 0;
          const timeDisplay = showSeconds
            ? `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:00`
            : `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;

          options.push({
            label: timeDisplay,
            value: `${h}:${m}:${s}`,
            hour: h,
            minute: m,
            second: s,
            searchText: timeDisplay,
            durationText,
          } as TimeOption24h);
        }
      }
    } else {
      // Generate 12-hour format options
      for (let h = 1; h <= 12; h++) {
        for (let m = 0; m < 60; m += 15) {
          for (const mer of ['am', 'pm'] as const) {
            // Convert 12-hour to 24-hour for comparison
            let hour24 = h;
            if (mer === 'am' && h === 12) hour24 = 0;
            else if (mer === 'pm' && h < 12) hour24 = h + 12;

            // Filter out times that would result in negative duration
            if (startDateTime && selectedDate && shouldFilterByDate) {
              const selectedDateObj = dayjs(selectedDate).tz(tz);
              const optionDateTime = selectedDateObj
                .hour(hour24)
                .minute(m)
                .second(0)
                .millisecond(0);

              if (optionDateTime.isBefore(startDateTime)) {
                continue;
              }
            }

            // Calculate duration if startTime is provided
            let durationText: string | undefined;
            if (startDateTime && selectedDate) {
              const selectedDateObj = dayjs(selectedDate).tz(tz);
              const optionDateTime = selectedDateObj
                .hour(hour24)
                .minute(m)
                .second(0)
                .millisecond(0);

              if (
                optionDateTime.isValid() &&
                optionDateTime.isAfter(startDateTime)
              ) {
                const diffMs = optionDateTime.diff(startDateTime);
                const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
                const diffMinutes = Math.floor(
                  (diffMs % (1000 * 60 * 60)) / (1000 * 60)
                );
                const diffSeconds = Math.floor((diffMs % (1000 * 60)) / 1000);

                if (diffHours > 0 || diffMinutes > 0 || diffSeconds > 0) {
                  let diffText = '';
                  if (diffHours > 0) {
                    diffText = `${diffHours}h ${diffMinutes}m`;
                  } else if (diffMinutes > 0) {
                    diffText = `${diffMinutes}m ${diffSeconds}s`;
                  } else {
                    diffText = `${diffSeconds}s`;
                  }
                  durationText = `+${diffText}`;
                }
              }
            }

            const hourDisplay = h.toString();
            const minuteDisplay = m.toString().padStart(2, '0');
            const timeDisplay = `${hourDisplay}:${minuteDisplay} ${mer.toUpperCase()}`;

            options.push({
              label: timeDisplay,
              value: `${h}:${m}:${mer}`,
              hour: h,
              minute: m,
              meridiem: mer,
              searchText: timeDisplay,
              durationText,
            } as TimeOption12h);
          }
        }
      }
      // Sort 12-hour options by time
      return options.sort((a, b) => {
        const a12 = a as TimeOption12h;
        const b12 = b as TimeOption12h;
        let hour24A = a12.hour;
        if (a12.meridiem === 'am' && a12.hour === 12) hour24A = 0;
        else if (a12.meridiem === 'pm' && a12.hour < 12)
          hour24A = a12.hour + 12;

        let hour24B = b12.hour;
        if (b12.meridiem === 'am' && b12.hour === 12) hour24B = 0;
        else if (b12.meridiem === 'pm' && b12.hour < 12)
          hour24B = b12.hour + 12;

        if (hour24A !== hour24B) {
          return hour24A - hour24B;
        }
        return a12.minute - b12.minute;
      });
    }

    return options;
  }, [startTime, selectedDate, tz, is24Hour, showSeconds]);

  // Time picker combobox setup
  const itemToString = useMemo(() => {
    return (item: TimeOption): string => {
      return item.searchText;
    };
  }, []);

  const { contains } = useFilter({ sensitivity: 'base' });
  const customTimeFilter = useMemo(() => {
    if (is24Hour) {
      return contains;
    }
    return (itemText: string, filterText: string): boolean => {
      if (!filterText) {
        return true;
      }

      const lowerItemText = itemText.toLowerCase();
      const lowerFilterText = filterText.toLowerCase();

      if (lowerItemText.includes(lowerFilterText)) {
        return true;
      }

      const item = timeOptions.find(
        (opt) => opt.searchText.toLowerCase() === lowerItemText
      ) as TimeOption12h | undefined;
      if (!item || !('meridiem' in item)) {
        return false;
      }

      let hour24 = item.hour;
      if (item.meridiem === 'am' && item.hour === 12) hour24 = 0;
      else if (item.meridiem === 'pm' && item.hour < 12)
        hour24 = item.hour + 12;

      const hour24Str = hour24.toString().padStart(2, '0');
      const minuteStr = item.minute.toString().padStart(2, '0');

      const formats = [
        `${hour24Str}:${minuteStr}`,
        `${hour24Str}${minuteStr}`,
        hour24Str,
        `${hour24}:${minuteStr}`,
        hour24.toString(),
      ];

      return formats.some(
        (format) =>
          format.toLowerCase().includes(lowerFilterText) ||
          lowerFilterText.includes(format.toLowerCase())
      );
    };
  }, [timeOptions, is24Hour, contains]);

  const { collection, filter } = useListCollection({
    initialItems: timeOptions,
    itemToString: itemToString,
    itemToValue: (item) => item.value,
    filter: customTimeFilter,
  });

  // Get current value string for combobox (must match option.value format)
  const currentTimeValue = useMemo(() => {
    if (is24Hour) {
      if (hour === null || minute === null) {
        return '';
      }
      const s = second ?? 0;
      return `${hour}:${minute}:${s}`;
    } else {
      if (hour === null || minute === null || meridiem === null) {
        return '';
      }
      return `${hour}:${minute}:${meridiem}`;
    }
  }, [hour, minute, second, meridiem, is24Hour]);

  // Parse custom time input formats like "1400", "2pm", "14:00", "2:00 PM"
  const parseCustomTimeInput = (
    input: string
  ): {
    hour: number | null;
    minute: number | null;
    second: number | null;
    meridiem: 'am' | 'pm' | null;
  } => {
    if (!input || !input.trim()) {
      return { hour: null, minute: null, second: null, meridiem: null };
    }

    const trimmed = input.trim().toLowerCase();

    // Try parsing 4-digit format without colon: "1400" -> 14:00
    const fourDigitMatch = trimmed.match(/^(\d{4})$/);
    if (fourDigitMatch) {
      const digits = fourDigitMatch[1];
      const hour = parseInt(digits.substring(0, 2), 10);
      const minute = parseInt(digits.substring(2, 4), 10);
      if (hour >= 0 && hour <= 23 && minute >= 0 && minute <= 59) {
        if (is24Hour) {
          return { hour, minute, second: 0, meridiem: null };
        } else {
          // Convert to 12-hour format
          let hour12 = hour;
          let meridiem: 'am' | 'pm';
          if (hour === 0) {
            hour12 = 12;
            meridiem = 'am';
          } else if (hour === 12) {
            hour12 = 12;
            meridiem = 'pm';
          } else if (hour > 12) {
            hour12 = hour - 12;
            meridiem = 'pm';
          } else {
            hour12 = hour;
            meridiem = 'am';
          }
          return { hour: hour12, minute, second: null, meridiem };
        }
      }
    }

    // Try parsing hour with meridiem: "2pm", "14pm", "2am"
    const hourMeridiemMatch = trimmed.match(/^(\d{1,2})\s*(am|pm)$/);
    if (hourMeridiemMatch && !is24Hour) {
      const hour12 = parseInt(hourMeridiemMatch[1], 10);
      const meridiem = hourMeridiemMatch[2] as 'am' | 'pm';
      if (hour12 >= 1 && hour12 <= 12) {
        return { hour: hour12, minute: 0, second: null, meridiem };
      }
    }

    // Try parsing 24-hour format with hour only: "14" -> 14:00
    const hourOnlyMatch = trimmed.match(/^(\d{1,2})$/);
    if (hourOnlyMatch && is24Hour) {
      const hour = parseInt(hourOnlyMatch[1], 10);
      if (hour >= 0 && hour <= 23) {
        return { hour, minute: 0, second: 0, meridiem: null };
      }
    }

    // Try parsing standard formats: "14:00", "2:00 PM"
    const time24Pattern = /^(\d{1,2}):(\d{1,2})(?::(\d{1,2}))?$/;
    const match24 = trimmed.match(time24Pattern);
    if (match24) {
      const hour24 = parseInt(match24[1], 10);
      const minute = parseInt(match24[2], 10);
      const second = match24[3] ? parseInt(match24[3], 10) : 0;
      if (
        hour24 >= 0 &&
        hour24 <= 23 &&
        minute >= 0 &&
        minute <= 59 &&
        second >= 0 &&
        second <= 59
      ) {
        if (is24Hour) {
          return { hour: hour24, minute, second, meridiem: null };
        } else {
          // Convert to 12-hour format
          let hour12 = hour24;
          let meridiem: 'am' | 'pm';
          if (hour24 === 0) {
            hour12 = 12;
            meridiem = 'am';
          } else if (hour24 === 12) {
            hour12 = 12;
            meridiem = 'pm';
          } else if (hour24 > 12) {
            hour12 = hour24 - 12;
            meridiem = 'pm';
          } else {
            hour12 = hour24;
            meridiem = 'am';
          }
          return { hour: hour12, minute, second: null, meridiem };
        }
      }
    }

    // Try parsing 12-hour format: "2:00 PM", "2:00PM"
    const time12Pattern = /^(\d{1,2}):(\d{1,2})(?::(\d{1,2}))?\s*(am|pm)$/;
    const match12 = trimmed.match(time12Pattern);
    if (match12 && !is24Hour) {
      const hour12 = parseInt(match12[1], 10);
      const minute = parseInt(match12[2], 10);
      const second = match12[3] ? parseInt(match12[3], 10) : null;
      const meridiem = match12[4] as 'am' | 'pm';
      if (
        hour12 >= 1 &&
        hour12 <= 12 &&
        minute >= 0 &&
        minute <= 59 &&
        (second === null || (second >= 0 && second <= 59))
      ) {
        return { hour: hour12, minute, second, meridiem };
      }
    }

    return { hour: null, minute: null, second: null, meridiem: null };
  };

  const handleTimeValueChange = (details: Combobox.ValueChangeDetails) => {
    if (details.value.length === 0) {
      handleTimeChange(null, null, null, null);
      filter('');
      return;
    }

    const selectedValue = details.value[0];
    const selectedOption = timeOptions.find(
      (opt) => opt.value === selectedValue
    );

    if (selectedOption) {
      filter('');
      if (is24Hour) {
        const opt24 = selectedOption as TimeOption24h;
        handleTimeChange(opt24.hour, opt24.minute, opt24.second, null);
      } else {
        const opt12 = selectedOption as TimeOption12h;
        handleTimeChange(opt12.hour, opt12.minute, null, opt12.meridiem);
      }
    }
  };

  // Track the current input value for Enter key handling
  const [timeInputValue, setTimeInputValue] = useState<string>('');

  const handleTimeInputChange = (details: Combobox.InputValueChangeDetails) => {
    // Store the input value and filter
    setTimeInputValue(details.inputValue);
    filter(details.inputValue);
  };

  const handleTimeInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      // Use the stored input value
      const parsed = parseCustomTimeInput(timeInputValue);
      if (parsed.hour !== null && parsed.minute !== null) {
        if (is24Hour) {
          handleTimeChange(parsed.hour, parsed.minute, parsed.second, null);
        } else {
          if (parsed.meridiem !== null) {
            handleTimeChange(parsed.hour, parsed.minute, null, parsed.meridiem);
          }
        }
        // Clear the filter and input value after applying
        filter('');
        setTimeInputValue('');
        // Close the popover if value is valid
        setTimePopoverOpen(false);
      }
    }
  };

  // Calendar rendering
  const renderCalendar = () => {
    const { calendars, getBackProps, getForwardProps, getDateProps } =
      calendarProps;

    if (calendars.length === 0) return null;

    const calendar = calendars[0];

    return (
      <Grid gap={4}>
        {/* Calendar Header */}
        <Grid templateColumns={'repeat(4, auto)'} justifyContent={'center'}>
          <Button variant={'ghost'} {...getBackProps({ offset: 12 })}>
            {'<<'}
          </Button>
          <Button variant={'ghost'} {...getBackProps()}>
            {backButtonLabel}
          </Button>
          <Button variant={'ghost'} {...getForwardProps()}>
            {forwardButtonLabel}
          </Button>
          <Button variant={'ghost'} {...getForwardProps({ offset: 12 })}>
            {'>>'}
          </Button>
        </Grid>

        {/* Month/Year Display */}
        <Grid justifyContent={'center'}>
          <Text>
            {monthNamesShort[calendar.month]} {calendar.year}
          </Text>
        </Grid>

        {/* Weekday Headers */}
        <Grid templateColumns={'repeat(7, auto)'} justifyContent={'center'}>
          {[0, 1, 2, 3, 4, 5, 6].map((weekdayNum) => {
            return (
              <Text
                textAlign={'center'}
                key={`header-${weekdayNum}`}
                fontWeight="semibold"
                minW="40px"
              >
                {weekdayNamesShort[weekdayNum]}
              </Text>
            );
          })}
        </Grid>

        {/* Calendar Days */}
        {calendar.weeks.map((week, weekIndex) => (
          <Grid
            key={`week-${weekIndex}`}
            templateColumns={'repeat(7, auto)'}
            justifyContent={'center'}
          >
            {week.map((dateObj, dayIndex) => {
              if (!dateObj) {
                return (
                  <div key={`empty-${dayIndex}`} style={{ minWidth: '40px' }} />
                );
              }

              const { date, selected, selectable, isCurrentMonth } = dateObj;

              const dateProps = getDateProps({
                dateObj,
              });

              return (
                <Button
                  key={`${date.getTime()}`}
                  variant={selected ? 'solid' : 'ghost'}
                  colorPalette={selected ? 'blue' : undefined}
                  size="sm"
                  minW="40px"
                  disabled={!selectable}
                  opacity={isCurrentMonth ? 1 : 0.4}
                  {...dateProps}
                >
                  {date.getDate()}
                </Button>
              );
            })}
          </Grid>
        ))}
      </Grid>
    );
  };

  return (
    <Flex direction="row" gap={2} align="center">
      {/* Date Selection Popover */}
      <Popover.Root
        open={datePopoverOpen}
        onOpenChange={(e) => setDatePopoverOpen(e.open)}
        closeOnInteractOutside
        autoFocus={false}
      >
        <Popover.Trigger asChild>
          <Button
            size="sm"
            variant="outline"
            onClick={() => setDatePopoverOpen(true)}
            justifyContent="start"
          >
            <MdDateRange />
            {dateDisplayText}
          </Button>
        </Popover.Trigger>
        {portalled ? (
          <Portal>
            <Popover.Positioner>
              <Popover.Content width="fit-content" minW="350px" minH="25rem">
                <Popover.Body p={4}>
                  <Grid gap={4}>
                    <InputGroup
                      endElement={
                        <Popover.Root
                          open={calendarPopoverOpen}
                          onOpenChange={(e) => setCalendarPopoverOpen(e.open)}
                          closeOnInteractOutside
                          autoFocus={false}
                        >
                          <Popover.Trigger asChild>
                            <Button
                              variant="ghost"
                              size="xs"
                              aria-label="Open calendar"
                              onClick={() => setCalendarPopoverOpen(true)}
                            >
                              <MdDateRange />
                            </Button>
                          </Popover.Trigger>
                          <Popover.Positioner>
                            <Popover.Content
                              width="fit-content"
                              minW="350px"
                              minH="25rem"
                            >
                              <Popover.Body p={4}>
                                {renderCalendar()}
                              </Popover.Body>
                            </Popover.Content>
                          </Popover.Positioner>
                        </Popover.Root>
                      }
                    >
                      <Input
                        value={dateInputValue}
                        onChange={handleDateInputChange}
                        onBlur={handleDateInputBlur}
                        onKeyDown={handleDateInputKeyDown}
                        placeholder="YYYY-MM-DD"
                      />
                    </InputGroup>
                    {showQuickActions && (
                      <Grid templateColumns="repeat(4, 1fr)" gap={2}>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleQuickActionClick(getYesterday())}
                          disabled={!isDateValid(getYesterday())}
                        >
                          {quickActionLabels.yesterday}
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleQuickActionClick(getToday())}
                          disabled={!isDateValid(getToday())}
                        >
                          {quickActionLabels.today}
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleQuickActionClick(getTomorrow())}
                          disabled={!isDateValid(getTomorrow())}
                        >
                          {quickActionLabels.tomorrow}
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleQuickActionClick(getPlus7Days())}
                          disabled={!isDateValid(getPlus7Days())}
                        >
                          {quickActionLabels.plus7Days}
                        </Button>
                      </Grid>
                    )}
                  </Grid>
                </Popover.Body>
              </Popover.Content>
            </Popover.Positioner>
          </Portal>
        ) : (
          <Popover.Positioner>
            <Popover.Content width="fit-content">
              <Popover.Body p={4}>
                <Grid gap={4}>
                  <InputGroup
                    endElement={
                      <Popover.Root
                        open={calendarPopoverOpen}
                        onOpenChange={(e) => setCalendarPopoverOpen(e.open)}
                        closeOnInteractOutside
                        autoFocus={false}
                      >
                        <Popover.Trigger asChild>
                          <Button
                            variant="ghost"
                            size="xs"
                            aria-label="Open calendar"
                            onClick={() => setCalendarPopoverOpen(true)}
                          >
                            <MdDateRange />
                          </Button>
                        </Popover.Trigger>
                        <Popover.Positioner>
                          <Popover.Content
                            width="fit-content"
                            minW="350px"
                            minH="25rem"
                          >
                            <Popover.Body p={4}>
                              {renderCalendar()}
                            </Popover.Body>
                          </Popover.Content>
                        </Popover.Positioner>
                      </Popover.Root>
                    }
                  >
                    <Input
                      value={dateInputValue}
                      onChange={handleDateInputChange}
                      onBlur={handleDateInputBlur}
                      onKeyDown={handleDateInputKeyDown}
                      placeholder="YYYY-MM-DD"
                    />
                  </InputGroup>
                  {showQuickActions && (
                    <Grid templateColumns="repeat(4, 1fr)" gap={2}>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleQuickActionClick(getYesterday())}
                        disabled={!isDateValid(getYesterday())}
                      >
                        {quickActionLabels.yesterday}
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleQuickActionClick(getToday())}
                        disabled={!isDateValid(getToday())}
                      >
                        {quickActionLabels.today}
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleQuickActionClick(getTomorrow())}
                        disabled={!isDateValid(getTomorrow())}
                      >
                        {quickActionLabels.tomorrow}
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleQuickActionClick(getPlus7Days())}
                        disabled={!isDateValid(getPlus7Days())}
                      >
                        {quickActionLabels.plus7Days}
                      </Button>
                    </Grid>
                  )}
                </Grid>
              </Popover.Body>
            </Popover.Content>
          </Popover.Positioner>
        )}
      </Popover.Root>

      {/* Time Selection Popover */}
      <Popover.Root
        open={timePopoverOpen}
        onOpenChange={(e) => setTimePopoverOpen(e.open)}
        closeOnInteractOutside
        autoFocus={false}
      >
        <Popover.Trigger asChild>
          <Button
            size="sm"
            variant="outline"
            onClick={() => setTimePopoverOpen(true)}
            justifyContent="start"
          >
            <BsClock />
            {timeDisplayText}
          </Button>
        </Popover.Trigger>
        {portalled ? (
          <Portal>
            <Popover.Positioner>
              <Popover.Content width="fit-content" minW="300px">
                <Popover.Body p={4}>
                  <Grid gap={2}>
                    <Combobox.Root
                      value={currentTimeValue ? [currentTimeValue] : []}
                      onValueChange={handleTimeValueChange}
                      onInputValueChange={handleTimeInputChange}
                      collection={collection}
                      allowCustomValue
                    >
                      <Combobox.Control>
                        <InputGroup startElement={<BsClock />}>
                          <Combobox.Input
                            placeholder={
                              timePickerLabels?.placeholder ??
                              (is24Hour ? 'HH:mm' : 'hh:mm AM/PM')
                            }
                            onKeyDown={handleTimeInputKeyDown}
                          />
                        </InputGroup>
                        <Combobox.IndicatorGroup>
                          <Combobox.Trigger />
                        </Combobox.IndicatorGroup>
                      </Combobox.Control>
                      <Portal disabled={true}>
                        <Combobox.Positioner>
                          <Combobox.Content>
                            <Combobox.Empty>
                              {timePickerLabels?.emptyMessage ??
                                'No time found'}
                            </Combobox.Empty>
                            {collection.items.map((item) => {
                              const option = item as TimeOption;
                              return (
                                <Combobox.Item key={option.value} item={item}>
                                  <Flex
                                    justify="space-between"
                                    align="center"
                                    w="100%"
                                  >
                                    <Text>{option.label}</Text>
                                    {option.durationText && (
                                      <Text fontSize="xs" color="gray.500">
                                        {option.durationText}
                                      </Text>
                                    )}
                                  </Flex>
                                  <Combobox.ItemIndicator />
                                </Combobox.Item>
                              );
                            })}
                          </Combobox.Content>
                        </Combobox.Positioner>
                      </Portal>
                    </Combobox.Root>
                  </Grid>
                </Popover.Body>
              </Popover.Content>
            </Popover.Positioner>
          </Portal>
        ) : (
          <Popover.Positioner>
            <Popover.Content width="fit-content" minW="300px">
              <Popover.Body p={4}>
                <Grid gap={2}>
                  <Combobox.Root
                    value={currentTimeValue ? [currentTimeValue] : []}
                    onValueChange={handleTimeValueChange}
                    onInputValueChange={handleTimeInputChange}
                    collection={collection}
                    allowCustomValue
                  >
                    <Combobox.Control>
                      <InputGroup startElement={<BsClock />}>
                        <Combobox.Input
                          placeholder={
                            timePickerLabels?.placeholder ??
                            (is24Hour ? 'HH:mm' : 'hh:mm AM/PM')
                          }
                          onKeyDown={handleTimeInputKeyDown}
                        />
                      </InputGroup>
                      <Combobox.IndicatorGroup>
                        <Combobox.Trigger />
                      </Combobox.IndicatorGroup>
                    </Combobox.Control>
                    <Portal disabled={true}>
                      <Combobox.Positioner>
                        <Combobox.Content>
                          <Combobox.Empty>
                            {timePickerLabels?.emptyMessage ?? 'No time found'}
                          </Combobox.Empty>
                          {collection.items.map((item) => {
                            const option = item as TimeOption;
                            return (
                              <Combobox.Item key={option.value} item={item}>
                                <Flex
                                  justify="space-between"
                                  align="center"
                                  w="100%"
                                >
                                  <Text>{option.label}</Text>
                                  {option.durationText && (
                                    <Text fontSize="xs" color="gray.500">
                                      {option.durationText}
                                    </Text>
                                  )}
                                </Flex>
                                <Combobox.ItemIndicator />
                              </Combobox.Item>
                            );
                          })}
                        </Combobox.Content>
                      </Combobox.Positioner>
                    </Portal>
                  </Combobox.Root>
                </Grid>
              </Popover.Body>
            </Popover.Content>
          </Popover.Positioner>
        )}
      </Popover.Root>

      {/* Timezone Selection Popover */}
      {showTimezoneSelector && (
        <Popover.Root
          open={timezonePopoverOpen}
          onOpenChange={(e) => setTimezonePopoverOpen(e.open)}
          closeOnInteractOutside
          autoFocus={false}
        >
          <Popover.Trigger asChild>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setTimezonePopoverOpen(true)}
              justifyContent="start"
            >
              {timezoneDisplayText || 'Select timezone'}
            </Button>
          </Popover.Trigger>
          {portalled ? (
            <Portal>
              <Popover.Positioner>
                <Popover.Content width="fit-content" minW="250px">
                  <Popover.Body p={4}>
                    <Grid gap={2}>
                      <Select.Root
                        size="sm"
                        collection={timezoneCollection}
                        value={timezoneOffset ? [timezoneOffset] : []}
                        onValueChange={(e) => {
                          const newOffset = e.value[0];
                          if (newOffset) {
                            setTimezoneOffset(newOffset);
                            // Update date-time with new offset
                            if (
                              selectedDate &&
                              hour !== null &&
                              minute !== null
                            ) {
                              updateDateTime(
                                selectedDate,
                                hour,
                                minute,
                                second,
                                meridiem
                              );
                            }
                            // Close popover after selection
                            setTimezonePopoverOpen(false);
                          }
                        }}
                      >
                        <Select.Control>
                          <Select.Trigger />
                          <Select.IndicatorGroup>
                            <Select.Indicator />
                          </Select.IndicatorGroup>
                        </Select.Control>
                        <Select.Positioner>
                          <Select.Content>
                            {timezoneCollection.items.map(
                              (item: { value: string; label: string }) => (
                                <Select.Item key={item.value} item={item}>
                                  <Select.ItemText>
                                    {item.label}
                                  </Select.ItemText>
                                  <Select.ItemIndicator />
                                </Select.Item>
                              )
                            )}
                          </Select.Content>
                        </Select.Positioner>
                      </Select.Root>
                    </Grid>
                  </Popover.Body>
                </Popover.Content>
              </Popover.Positioner>
            </Portal>
          ) : (
            <Popover.Positioner>
              <Popover.Content width="fit-content" minW="250px">
                <Popover.Body p={4}>
                  <Grid gap={2}>
                    <Select.Root
                      size="sm"
                      collection={timezoneCollection}
                      value={timezoneOffset ? [timezoneOffset] : []}
                      onValueChange={(e) => {
                        const newOffset = e.value[0];
                        if (newOffset) {
                          setTimezoneOffset(newOffset);
                          // Update date-time with new offset (pass it directly to avoid stale state)
                          if (
                            selectedDate &&
                            hour !== null &&
                            minute !== null
                          ) {
                            updateDateTime(
                              selectedDate,
                              hour,
                              minute,
                              second,
                              meridiem,
                              newOffset
                            );
                          }
                          // Close popover after selection
                          setTimezonePopoverOpen(false);
                        }
                      }}
                    >
                      <Select.Control>
                        <Select.Trigger />
                        <Select.IndicatorGroup>
                          <Select.Indicator />
                        </Select.IndicatorGroup>
                      </Select.Control>
                      <Select.Positioner>
                        <Select.Content>
                          {timezoneCollection.items.map(
                            (item: { value: string; label: string }) => (
                              <Select.Item key={item.value} item={item}>
                                <Select.ItemText>{item.label}</Select.ItemText>
                                <Select.ItemIndicator />
                              </Select.Item>
                            )
                          )}
                        </Select.Content>
                      </Select.Positioner>
                    </Select.Root>
                  </Grid>
                </Popover.Body>
              </Popover.Content>
            </Popover.Positioner>
          )}
        </Popover.Root>
      )}
    </Flex>
  );
}
