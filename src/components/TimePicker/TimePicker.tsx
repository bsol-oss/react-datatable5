import {
  Button,
  Combobox,
  Flex,
  Icon,
  InputGroup,
  Portal,
  Tag,
  Text,
  useFilter,
  useListCollection,
} from '@chakra-ui/react';
import { Dispatch, SetStateAction, useMemo, useState, useEffect } from 'react';
import { BsClock } from 'react-icons/bs';
import { MdCancel } from 'react-icons/md';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { TimePickerLabels } from '../Form/components/types/CustomJSONSchema7';

dayjs.extend(utc);
dayjs.extend(timezone);

// Union type for time picker props - supports both 12-hour and 24-hour formats
type TimePickerProps12h = {
  format?: '12h';
  hour: number | null; // 1-12 for 12-hour format
  setHour: Dispatch<SetStateAction<number | null>>;
  minute: number | null;
  setMinute: Dispatch<SetStateAction<number | null>>;
  meridiem: 'am' | 'pm' | null;
  setMeridiem: Dispatch<SetStateAction<'am' | 'pm' | null>>;
  second?: never;
  setSecond?: never;
  onChange?: (newValue: {
    hour: number | null;
    minute: number | null;
    meridiem: 'am' | 'pm' | null;
  }) => void;
  startTime?: string;
  selectedDate?: string;
  timezone?: string;
  portalled?: boolean;
  labels?: TimePickerLabels;
};

type TimePickerProps24h = {
  format: '24h';
  hour: number | null; // 0-23 for 24-hour format
  setHour: Dispatch<SetStateAction<number | null>>;
  minute: number | null;
  setMinute: Dispatch<SetStateAction<number | null>>;
  second: number | null;
  setSecond: Dispatch<SetStateAction<number | null>>;
  meridiem?: never;
  setMeridiem?: never;
  onChange?: (newValue: {
    hour: number | null;
    minute: number | null;
    second: number | null;
  }) => void;
  startTime?: string;
  selectedDate?: string;
  timezone?: string;
  portalled?: boolean;
  labels?: TimePickerLabels;
};

type TimePickerProps = TimePickerProps12h | TimePickerProps24h;

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

export const TimePicker = (props: TimePickerProps) => {
  const {
    format = '12h',
    hour,
    setHour,
    minute,
    setMinute,
    startTime,
    selectedDate,
    timezone = 'Asia/Hong_Kong',
    portalled = true,
    labels = {
      placeholder: format === '24h' ? 'HH:mm:ss' : 'hh:mm AM/PM',
      emptyMessage: 'No time found',
    },
  } = props;

  const is24Hour = format === '24h';
  const meridiem = is24Hour ? undefined : props.meridiem;
  const setMeridiem = is24Hour ? undefined : props.setMeridiem;
  const second = is24Hour ? props.second : undefined;
  const setSecond = is24Hour ? props.setSecond : undefined;
  const onChange = props.onChange || (() => {});

  const [inputValue, setInputValue] = useState<string>('');

  // Sync inputValue with current time
  useEffect(() => {
    if (is24Hour && second !== undefined) {
      if (hour !== null && minute !== null && second !== null) {
        const formatted = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}:${second.toString().padStart(2, '0')}`;
        setInputValue(formatted);
      } else {
        setInputValue('');
      }
    } else {
      // 12-hour format - input is managed by combobox
      setInputValue('');
    }
  }, [hour, minute, second, is24Hour]);
  // Generate time options based on format
  const timeOptions = useMemo<TimeOption[]>(() => {
    const options: TimeOption[] = [];

    // Get start time for comparison if provided
    let startDateTime: dayjs.Dayjs | null = null;
    let shouldFilterByDate = false;
    if (startTime && selectedDate) {
      const startDateObj = dayjs(startTime).tz(timezone);
      const selectedDateObj = dayjs(selectedDate).tz(timezone);

      if (startDateObj.isValid() && selectedDateObj.isValid()) {
        startDateTime = startDateObj;
        shouldFilterByDate =
          startDateObj.format('YYYY-MM-DD') ===
          selectedDateObj.format('YYYY-MM-DD');
      }
    }

    if (is24Hour) {
      // Generate 24-hour format options (0-23 for hours)
      for (let h = 0; h < 24; h++) {
        for (let m = 0; m < 60; m += 15) {
          // Filter out times that would result in negative duration
          if (startDateTime && selectedDate && shouldFilterByDate) {
            const selectedDateObj = dayjs(selectedDate).tz(timezone);
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
            const selectedDateObj = dayjs(selectedDate).tz(timezone);
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

          const timeDisplay = `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:00`;

          options.push({
            label: timeDisplay,
            value: `${h}:${m}:0`,
            hour: h,
            minute: m,
            second: 0,
            searchText: timeDisplay,
            durationText,
          } as TimeOption24h);
        }
      }
    } else {
      // Generate 12-hour format options (1-12 for hours, AM/PM)
      for (let h = 1; h <= 12; h++) {
        for (let m = 0; m < 60; m += 15) {
          for (const mer of ['am', 'pm'] as const) {
            // Convert 12-hour to 24-hour for comparison
            let hour24 = h;
            if (mer === 'am' && h === 12) hour24 = 0;
            else if (mer === 'pm' && h < 12) hour24 = h + 12;

            // Filter out times that would result in negative duration
            if (startDateTime && selectedDate && shouldFilterByDate) {
              const selectedDateObj = dayjs(selectedDate).tz(timezone);
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
              const selectedDateObj = dayjs(selectedDate).tz(timezone);
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
      // Sort 12-hour options by time (convert to 24-hour for proper chronological sorting)
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
  }, [startTime, selectedDate, timezone, is24Hour]);

  // itemToString returns only the clean display text (no metadata)
  const itemToString = useMemo(() => {
    return (item: TimeOption): string => {
      return item.searchText;
    };
  }, []);

  // Custom filter function
  const { contains } = useFilter({ sensitivity: 'base' });
  const customTimeFilter = useMemo(() => {
    if (is24Hour) {
      return contains; // Simple contains filter for 24-hour format
    }
    // For 12-hour format, support both 12-hour and 24-hour input
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

      // Convert item to 24-hour format for matching
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

  // Get current value string for combobox
  const currentValue = useMemo(() => {
    if (is24Hour) {
      if (hour === null || minute === null || second === null) {
        return '';
      }
      return `${hour}:${minute}:${second}`;
    } else {
      if (hour === null || minute === null || meridiem === null) {
        return '';
      }
      return `${hour}:${minute}:${meridiem}`;
    }
  }, [hour, minute, second, meridiem, is24Hour]);

  // Calculate duration difference
  const durationDiff = useMemo(() => {
    if (!startTime || !selectedDate || hour === null || minute === null) {
      return null;
    }

    if (is24Hour) {
      if (second === null) return null;
    } else {
      if (meridiem === null) return null;
    }

    const startDateObj = dayjs(startTime).tz(timezone);
    const selectedDateObj = dayjs(selectedDate).tz(timezone);

    // Convert to 24-hour format
    let hour24 = hour;
    if (!is24Hour && meridiem) {
      if (meridiem === 'am' && hour === 12) hour24 = 0;
      else if (meridiem === 'pm' && hour < 12) hour24 = hour + 12;
    }

    const currentDateTime = selectedDateObj
      .hour(hour24)
      .minute(minute)
      .second(
        is24Hour && second !== null && second !== undefined
          ? (second as number)
          : 0
      )
      .millisecond(0);

    if (!startDateObj.isValid() || !currentDateTime.isValid()) {
      return null;
    }

    const diffMs = currentDateTime.diff(startDateObj);
    if (diffMs < 0) {
      return null;
    }

    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
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
      return `+${diffText}`;
    }

    return null;
  }, [
    hour,
    minute,
    second,
    meridiem,
    startTime,
    selectedDate,
    timezone,
    is24Hour,
  ]);

  const handleClear = () => {
    setHour(null);
    setMinute(null);
    if (is24Hour && setSecond) {
      setSecond(null);
      if (onChange) {
        (
          onChange as (newValue: {
            hour: number | null;
            minute: number | null;
            second: number | null;
          }) => void
        )({ hour: null, minute: null, second: null });
      }
    } else if (!is24Hour && setMeridiem) {
      setMeridiem(null);
      if (onChange) {
        (
          onChange as (newValue: {
            hour: number | null;
            minute: number | null;
            meridiem: 'am' | 'pm' | null;
          }) => void
        )({ hour: null, minute: null, meridiem: null });
      }
    }
    filter('');
  };

  const handleValueChange = (details: Combobox.ValueChangeDetails) => {
    if (details.value.length === 0) {
      handleClear();
      return;
    }

    const selectedValue = details.value[0];
    const selectedOption = timeOptions.find(
      (opt) => opt.value === selectedValue
    );

    if (selectedOption) {
      setHour(selectedOption.hour);
      setMinute(selectedOption.minute);
      filter('');

      if (is24Hour) {
        const opt24 = selectedOption as TimeOption24h;
        if (setSecond) setSecond(opt24.second);
        if (onChange) {
          (
            onChange as (newValue: {
              hour: number | null;
              minute: number | null;
              second: number | null;
            }) => void
          )({ hour: opt24.hour, minute: opt24.minute, second: opt24.second });
        }
      } else {
        const opt12 = selectedOption as TimeOption12h;
        if (setMeridiem) setMeridiem(opt12.meridiem);
        if (onChange) {
          (
            onChange as (newValue: {
              hour: number | null;
              minute: number | null;
              meridiem: 'am' | 'pm' | null;
            }) => void
          )({
            hour: opt12.hour,
            minute: opt12.minute,
            meridiem: opt12.meridiem,
          });
        }
      }
    }
  };

  // Parse input value and update state
  const parseAndCommitInput = (value: string) => {
    const trimmedValue = value.trim();
    filter(trimmedValue);

    if (!trimmedValue) {
      return;
    }

    if (is24Hour) {
      // Parse 24-hour format: "HH:mm:ss" or "HH:mm" or "HHmmss" or "HHmm"
      const timePattern = /^(\d{1,2}):(\d{1,2})(?::(\d{1,2}))?$/;
      const match = trimmedValue.match(timePattern);

      if (match) {
        const parsedHour = parseInt(match[1], 10);
        const parsedMinute = parseInt(match[2], 10);
        const parsedSecond = match[3] ? parseInt(match[3], 10) : 0;

        if (
          parsedHour >= 0 &&
          parsedHour <= 23 &&
          parsedMinute >= 0 &&
          parsedMinute <= 59 &&
          parsedSecond >= 0 &&
          parsedSecond <= 59
        ) {
          setHour(parsedHour);
          setMinute(parsedMinute);
          if (setSecond) setSecond(parsedSecond);
          if (onChange) {
            (
              onChange as (newValue: {
                hour: number | null;
                minute: number | null;
                second: number | null;
              }) => void
            )({ hour: parsedHour, minute: parsedMinute, second: parsedSecond });
          }
          return;
        }
      }

      // Try numbers only format: "123045" or "1230"
      const numbersOnly = trimmedValue.replace(/[^0-9]/g, '');
      if (numbersOnly.length >= 4) {
        const parsedHour = parseInt(numbersOnly.slice(0, 2), 10);
        const parsedMinute = parseInt(numbersOnly.slice(2, 4), 10);
        const parsedSecond =
          numbersOnly.length >= 6 ? parseInt(numbersOnly.slice(4, 6), 10) : 0;

        if (
          parsedHour >= 0 &&
          parsedHour <= 23 &&
          parsedMinute >= 0 &&
          parsedMinute <= 59 &&
          parsedSecond >= 0 &&
          parsedSecond <= 59
        ) {
          setHour(parsedHour);
          setMinute(parsedMinute);
          if (setSecond) setSecond(parsedSecond);
          if (onChange) {
            (
              onChange as (newValue: {
                hour: number | null;
                minute: number | null;
                second: number | null;
              }) => void
            )({ hour: parsedHour, minute: parsedMinute, second: parsedSecond });
          }
          return;
        }
      }
    } else {
      // Parse 24-hour format first (e.g., "13:30", "14:00", "1330", "1400")
      const timePattern24Hour = /^(\d{1,2}):?(\d{2})$/;
      const match24Hour = trimmedValue.match(timePattern24Hour);

      if (match24Hour) {
        const parsedHour24 = parseInt(match24Hour[1], 10);
        const parsedMinute = parseInt(match24Hour[2], 10);

        if (
          parsedHour24 >= 0 &&
          parsedHour24 <= 23 &&
          parsedMinute >= 0 &&
          parsedMinute <= 59
        ) {
          // Convert 24-hour to 12-hour format
          let hour12: number;
          let meridiem: 'am' | 'pm';

          if (parsedHour24 === 0) {
            hour12 = 12;
            meridiem = 'am';
          } else if (parsedHour24 === 12) {
            hour12 = 12;
            meridiem = 'pm';
          } else if (parsedHour24 > 12) {
            hour12 = parsedHour24 - 12;
            meridiem = 'pm';
          } else {
            hour12 = parsedHour24;
            meridiem = 'am';
          }

          setHour(hour12);
          setMinute(parsedMinute);
          if (setMeridiem) setMeridiem(meridiem);
          if (onChange) {
            (
              onChange as (newValue: {
                hour: number | null;
                minute: number | null;
                meridiem: 'am' | 'pm' | null;
              }) => void
            )({ hour: hour12, minute: parsedMinute, meridiem });
          }
          return;
        }
      }

      // Parse formats like "1:30 PM", "1:30PM", "1:30 pm", "1:30pm"
      const timePattern12Hour = /^(\d{1,2}):(\d{1,2})\s*(am|pm|AM|PM)$/i;
      const match12Hour = trimmedValue.match(timePattern12Hour);

      if (match12Hour) {
        const parsedHour = parseInt(match12Hour[1], 10);
        const parsedMinute = parseInt(match12Hour[2], 10);
        const parsedMeridiem = match12Hour[3].toLowerCase() as 'am' | 'pm';

        if (
          parsedHour >= 1 &&
          parsedHour <= 12 &&
          parsedMinute >= 0 &&
          parsedMinute <= 59
        ) {
          setHour(parsedHour);
          setMinute(parsedMinute);
          if (setMeridiem) setMeridiem(parsedMeridiem);
          if (onChange) {
            (
              onChange as (newValue: {
                hour: number | null;
                minute: number | null;
                meridiem: 'am' | 'pm' | null;
              }) => void
            )({
              hour: parsedHour,
              minute: parsedMinute,
              meridiem: parsedMeridiem,
            });
          }
          return;
        }
      }

      // Parse formats like "12am" or "1pm" (hour only with meridiem, no minutes)
      const timePatternHourOnly = /^(\d{1,2})\s*(am|pm|AM|PM)$/i;
      const matchHourOnly = trimmedValue.match(timePatternHourOnly);

      if (matchHourOnly) {
        const parsedHour = parseInt(matchHourOnly[1], 10);
        const parsedMeridiem = matchHourOnly[2].toLowerCase() as 'am' | 'pm';

        if (parsedHour >= 1 && parsedHour <= 12) {
          setHour(parsedHour);
          setMinute(0); // Default to 0 minutes when only hour is provided
          if (setMeridiem) setMeridiem(parsedMeridiem);
          if (onChange) {
            (
              onChange as (newValue: {
                hour: number | null;
                minute: number | null;
                meridiem: 'am' | 'pm' | null;
              }) => void
            )({ hour: parsedHour, minute: 0, meridiem: parsedMeridiem });
          }
          return;
        }
      }

      // Try to parse formats like "130pm" or "130 pm" (without colon, with minutes)
      const timePatternNoColon = /^(\d{1,4})\s*(am|pm|AM|PM)$/i;
      const matchNoColon = trimmedValue.match(timePatternNoColon);

      if (matchNoColon) {
        const numbersOnly = matchNoColon[1];
        const parsedMeridiem = matchNoColon[2].toLowerCase() as 'am' | 'pm';

        if (numbersOnly.length >= 3) {
          const parsedHour = parseInt(numbersOnly.slice(0, -2), 10);
          const parsedMinute = parseInt(numbersOnly.slice(-2), 10);

          if (
            parsedHour >= 1 &&
            parsedHour <= 12 &&
            parsedMinute >= 0 &&
            parsedMinute <= 59
          ) {
            setHour(parsedHour);
            setMinute(parsedMinute);
            if (setMeridiem) setMeridiem(parsedMeridiem);
            if (onChange) {
              (
                onChange as (newValue: {
                  hour: number | null;
                  minute: number | null;
                  meridiem: 'am' | 'pm' | null;
                }) => void
              )({
                hour: parsedHour,
                minute: parsedMinute,
                meridiem: parsedMeridiem,
              });
            }
            return;
          }
        }
      }
    }

    // Parse failed, select first result
    selectFirstResult();
  };

  // Select first result from filtered collection
  const selectFirstResult = () => {
    if (collection.items.length > 0) {
      const firstItem = collection.items[0];
      setHour(firstItem.hour);
      setMinute(firstItem.minute);
      filter('');

      if (is24Hour) {
        const opt24 = firstItem as TimeOption24h;
        if (setSecond) setSecond(opt24.second);
        if (onChange) {
          (
            onChange as (newValue: {
              hour: number | null;
              minute: number | null;
              second: number | null;
            }) => void
          )({ hour: opt24.hour, minute: opt24.minute, second: opt24.second });
        }
      } else {
        const opt12 = firstItem as TimeOption12h;
        if (setMeridiem) setMeridiem(opt12.meridiem);
        if (onChange) {
          (
            onChange as (newValue: {
              hour: number | null;
              minute: number | null;
              meridiem: 'am' | 'pm' | null;
            }) => void
          )({
            hour: opt12.hour,
            minute: opt12.minute,
            meridiem: opt12.meridiem,
          });
        }
      }
    }
  };

  const handleInputValueChange = (
    details: Combobox.InputValueChangeDetails
  ) => {
    if (is24Hour) {
      setInputValue(details.inputValue);
    }
    filter(details.inputValue);
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.select();
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const inputVal = e.target.value;
    if (is24Hour) {
      setInputValue(inputVal);
    }
    if (inputVal) {
      parseAndCommitInput(inputVal);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const inputVal = e.currentTarget.value;
      if (is24Hour) {
        setInputValue(inputVal);
      }
      if (inputVal) {
        parseAndCommitInput(inputVal);
      }
      (e.currentTarget as HTMLInputElement)?.blur();
    }
  };

  return (
    <Flex direction="column" gap={3}>
      <Flex alignItems="center" gap="2" width="auto" minWidth="300px">
        <Combobox.Root
          collection={collection}
          value={currentValue ? [currentValue] : []}
          onValueChange={handleValueChange}
          onInputValueChange={handleInputValueChange}
          allowCustomValue
          selectionBehavior="replace"
          flex={1}
        >
          <Combobox.Control>
            <InputGroup startElement={<BsClock />}>
              <Combobox.Input
                value={is24Hour ? inputValue : undefined}
                placeholder={
                  labels?.placeholder ?? (is24Hour ? 'HH:mm:ss' : 'hh:mm AM/PM')
                }
                onFocus={handleFocus}
                onBlur={handleBlur}
                onKeyDown={handleKeyDown}
              />
            </InputGroup>
            <Combobox.IndicatorGroup>
              <Combobox.Trigger />
            </Combobox.IndicatorGroup>
          </Combobox.Control>

          <Portal disabled={!portalled}>
            <Combobox.Positioner>
              <Combobox.Content>
                <Combobox.Empty>
                  {labels?.emptyMessage ?? 'No time found'}
                </Combobox.Empty>
                {collection.items.map((item) => (
                  <Combobox.Item item={item} key={item.value}>
                    <Flex alignItems="center" gap={2} width="100%">
                      <Text flex={1}>{item.label}</Text>
                      {item.durationText && (
                        <Tag.Root size="sm">
                          <Tag.Label>{item.durationText}</Tag.Label>
                        </Tag.Root>
                      )}
                    </Flex>
                    <Combobox.ItemIndicator />
                  </Combobox.Item>
                ))}
              </Combobox.Content>
            </Combobox.Positioner>
          </Portal>
        </Combobox.Root>

        {durationDiff && (
          <Tag.Root size="sm">
            <Tag.Label>{durationDiff}</Tag.Label>
          </Tag.Root>
        )}
      </Flex>
    </Flex>
  );
};
