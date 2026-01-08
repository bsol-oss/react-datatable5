import {
  Combobox,
  Flex,
  Grid,
  InputGroup,
  Portal,
  Text,
  useFilter,
  useListCollection,
} from '@chakra-ui/react';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import React, { useMemo, useState } from 'react';
import { BsClock } from 'react-icons/bs';
import { TimePickerLabels } from '../Form/components/types/CustomJSONSchema7';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(customParseFormat);

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

export interface TimePickerProps {
  hour: number | null;
  setHour: (hour: number | null) => void;
  minute: number | null;
  setMinute: (minute: number | null) => void;
  meridiem: 'am' | 'pm' | null;
  setMeridiem: (meridiem: 'am' | 'pm' | null) => void;
  onChange?: (params: {
    hour: number | null;
    minute: number | null;
    meridiem: 'am' | 'pm' | null;
  }) => void;
  format?: '12h' | '24h';
  showSeconds?: boolean;
  startTime?: string; // ISO string
  selectedDate?: string; // YYYY-MM-DD format
  timezone?: string;
  portalled?: boolean;
  labels?: TimePickerLabels;
}

export const TimePicker: React.FC<TimePickerProps> = ({
  hour,
  setHour,
  minute,
  setMinute,
  meridiem,
  setMeridiem,
  onChange,
  format = '12h',
  showSeconds = false,
  startTime,
  selectedDate,
  timezone: tz = 'Asia/Hong_Kong',
  portalled: _portalled = false, // Unused - kept for API compatibility
  labels,
}) => {
  const is24Hour = format === '24h' || showSeconds;
  const [timeInputValue, setTimeInputValue] = useState<string>('');

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
      options.sort((a, b) => {
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
      const s = showSeconds ? 0 : 0;
      return `${hour}:${minute}:${s}`;
    } else {
      if (hour === null || minute === null || meridiem === null) {
        return '';
      }
      return `${hour}:${minute}:${meridiem}`;
    }
  }, [hour, minute, meridiem, is24Hour, showSeconds]);

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

    // Try parsing 3-digit or 4-digit format with meridiem: "215pm", "1124pm"
    // 3 digits: first digit is hour (1-9), last 2 digits are minutes
    // 4 digits: first 2 digits are hour (10-12), last 2 digits are minutes
    const timeNoColonMeridiemMatch = trimmed.match(/^(\d{3,4})(am|pm)$/);
    if (timeNoColonMeridiemMatch && !is24Hour) {
      const digits = timeNoColonMeridiemMatch[1];
      const meridiem = timeNoColonMeridiemMatch[2] as 'am' | 'pm';

      let hour12: number;
      let minute: number;

      if (digits.length === 3) {
        // 3 digits: "215" -> hour=2, minute=15
        hour12 = parseInt(digits.substring(0, 1), 10);
        minute = parseInt(digits.substring(1, 3), 10);
      } else {
        // 4 digits: "1124" -> hour=11, minute=24
        hour12 = parseInt(digits.substring(0, 2), 10);
        minute = parseInt(digits.substring(2, 4), 10);
      }

      if (hour12 >= 1 && hour12 <= 12 && minute >= 0 && minute <= 59) {
        return { hour: hour12, minute, second: null, meridiem };
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

  // Handle time change
  const handleTimeChange = (
    newHour: number | null,
    newMinute: number | null,
    newMeridiem: 'am' | 'pm' | null
  ) => {
    setHour(newHour);
    setMinute(newMinute);
    if (!is24Hour) {
      setMeridiem(newMeridiem);
    }
    onChange?.({
      hour: newHour,
      minute: newMinute,
      meridiem: newMeridiem,
    });
  };

  const handleTimeValueChange = (details: Combobox.ValueChangeDetails) => {
    if (details.value.length === 0) {
      handleTimeChange(null, null, null);
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
        handleTimeChange(opt24.hour, opt24.minute, null);
      } else {
        const opt12 = selectedOption as TimeOption12h;
        handleTimeChange(opt12.hour, opt12.minute, opt12.meridiem);
      }
    }
  };

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
          handleTimeChange(parsed.hour, parsed.minute, null);
        } else {
          if (parsed.meridiem !== null) {
            handleTimeChange(parsed.hour, parsed.minute, parsed.meridiem);
          }
        }
        // Clear the filter and input value after applying
        filter('');
        setTimeInputValue('');
      }
    }
  };

  return (
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
                labels?.placeholder ?? (is24Hour ? 'HH:mm' : 'hh:mm AM/PM')
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
                {labels?.emptyMessage ?? 'No time found'}
              </Combobox.Empty>
              {collection.items.map((item) => {
                const option = item as TimeOption;
                return (
                  <Combobox.Item key={option.value} item={item}>
                    <Flex justify="space-between" align="center" w="100%">
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
  );
};
