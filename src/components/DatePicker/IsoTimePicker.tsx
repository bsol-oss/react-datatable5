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

dayjs.extend(utc);
dayjs.extend(timezone);

interface IsoTimePickerProps {
  hour: number | null;
  setHour: Dispatch<SetStateAction<number | null>>;
  minute: number | null;
  setMinute: Dispatch<SetStateAction<number | null>>;
  second: number | null;
  setSecond: Dispatch<SetStateAction<number | null>>;
  onChange?: (newValue: {
    hour: number | null;
    minute: number | null;
    second: number | null;
  }) => void;
  startTime?: string;
  selectedDate?: string;
  timezone?: string;
  portalled?: boolean;
  labels?: {
    placeholder?: string;
    emptyMessage?: string;
  };
}

interface TimeOption {
  label: string;
  value: string;
  hour: number;
  minute: number;
  second: number;
  searchText: string; // Time without duration for searching
  durationText?: string; // Duration difference text (e.g., "+2h 30m")
}

export function IsoTimePicker({
  hour,
  setHour,
  minute,
  setMinute,
  second,
  setSecond,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onChange = (_newValue) => {},
  startTime,
  selectedDate,
  timezone = 'Asia/Hong_Kong',
  portalled = true,
  labels = {
    placeholder: 'HH:mm:ss',
    emptyMessage: 'No time found',
  },
}: IsoTimePickerProps) {
  // Generate time options (every 15 minutes, seconds always 0)
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
        // Only filter if dates are the same
        shouldFilterByDate =
          startDateObj.format('YYYY-MM-DD') ===
          selectedDateObj.format('YYYY-MM-DD');
      }
    }

    for (let h = 0; h < 24; h++) {
      for (let m = 0; m < 60; m += 15) {
        const timeDisplay = `${h.toString().padStart(2, '0')}:${m
          .toString()
          .padStart(2, '0')}:00`;

        // Filter out times that would result in negative duration (only when dates are the same)
        if (startDateTime && selectedDate && shouldFilterByDate) {
          const selectedDateObj = dayjs(selectedDate).tz(timezone);
          const optionDateTime = selectedDateObj
            .hour(h)
            .minute(m)
            .second(0)
            .millisecond(0);

          if (optionDateTime.isBefore(startDateTime)) {
            continue; // Skip this option as it would result in negative duration
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

        options.push({
          label: timeDisplay,
          value: `${h}:${m}:0`,
          hour: h,
          minute: m,
          second: 0,
          searchText: timeDisplay, // Use base time without duration for searching
          durationText,
        });
      }
    }
    return options;
  }, [startTime, selectedDate, timezone]);

  const { contains } = useFilter({ sensitivity: 'base' });

  const { collection, filter } = useListCollection({
    initialItems: timeOptions,
    itemToString: (item) => item.searchText, // Use searchText (without duration) for filtering
    itemToValue: (item) => item.value,
    filter: contains,
  });

  // Get current value string for combobox
  const currentValue = useMemo(() => {
    if (hour === null || minute === null || second === null) {
      return '';
    }
    return `${hour}:${minute}:${second}`;
  }, [hour, minute, second]);

  // Calculate duration difference
  const durationDiff = useMemo(() => {
    if (
      !startTime ||
      !selectedDate ||
      hour === null ||
      minute === null ||
      second === null
    ) {
      return null;
    }

    const startDateObj = dayjs(startTime).tz(timezone);
    const selectedDateObj = dayjs(selectedDate).tz(timezone);
    const currentDateTime = selectedDateObj
      .hour(hour)
      .minute(minute)
      .second(second ?? 0)
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
  }, [hour, minute, second, startTime, selectedDate, timezone]);

  const handleClear = () => {
    setHour(null);
    setMinute(null);
    setSecond(null);
    filter(''); // Reset filter to show all options
    onChange({ hour: null, minute: null, second: null });
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
      setSecond(selectedOption.second);
      filter(''); // Reset filter after selection
      onChange({
        hour: selectedOption.hour,
        minute: selectedOption.minute,
        second: selectedOption.second,
      });
    }
  };

  // Parse input value and update state
  const parseAndCommitInput = (value: string) => {
    const trimmedValue = value.trim();

    // Filter the collection based on input
    filter(trimmedValue);

    if (!trimmedValue) {
      return;
    }

    // Parse HH:mm:ss or HH:mm format
    const timePattern = /^(\d{1,2}):(\d{1,2})(?::(\d{1,2}))?$/;
    const match = trimmedValue.match(timePattern);

    if (match) {
      const parsedHour = parseInt(match[1], 10);
      const parsedMinute = parseInt(match[2], 10);
      const parsedSecond = match[3] ? parseInt(match[3], 10) : 0;

      // Validate ranges
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
        setSecond(parsedSecond);
        onChange({
          hour: parsedHour,
          minute: parsedMinute,
          second: parsedSecond,
        });
        return;
      }
    } else {
      // Try to parse formats like "123045" (HHmmss) or "1230" (HHmm)
      const numbersOnly = trimmedValue.replace(/[^0-9]/g, '');

      if (numbersOnly.length >= 4) {
        const parsedHour = parseInt(numbersOnly.slice(0, 2), 10);
        const parsedMinute = parseInt(numbersOnly.slice(2, 4), 10);
        const parsedSecond =
          numbersOnly.length >= 6 ? parseInt(numbersOnly.slice(4, 6), 10) : 0;

        // Validate ranges
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
          setSecond(parsedSecond);
          onChange({
            hour: parsedHour,
            minute: parsedMinute,
            second: parsedSecond,
          });
          return;
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
      setSecond(firstItem.second);
      filter(''); // Reset filter after selection
      onChange({
        hour: firstItem.hour,
        minute: firstItem.minute,
        second: firstItem.second,
      });
    }
  };

  const [inputValue, setInputValue] = useState<string>('');

  // Sync inputValue with currentValue when time changes externally
  useEffect(() => {
    if (hour !== null && minute !== null && second !== null) {
      const formattedValue = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}:${second.toString().padStart(2, '0')}`;
      setInputValue(formattedValue);
    } else {
      setInputValue('');
    }
  }, [hour, minute, second]);

  const handleInputValueChange = (
    details: Combobox.InputValueChangeDetails
  ) => {
    // Update local input value state
    setInputValue(details.inputValue);
    // Filter the collection based on input, but don't parse yet
    filter(details.inputValue);
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    // Select all text when focusing
    e.target.select();
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    // Parse and commit the input value when losing focus
    const inputVal = e.target.value;
    setInputValue(inputVal);
    if (inputVal) {
      parseAndCommitInput(inputVal);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Commit input on Enter key
    if (e.key === 'Enter') {
      e.preventDefault();
      const inputVal = e.currentTarget.value;
      setInputValue(inputVal);
      if (inputVal) {
        parseAndCommitInput(inputVal);
      }
      // Blur the input
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
          openOnClick
          flex={1}
        >
          <Combobox.Control>
            <InputGroup startElement={<BsClock />}>
              <Combobox.Input
                value={inputValue}
                placeholder={labels.placeholder}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onKeyDown={handleKeyDown}
              />
            </InputGroup>
            <Combobox.IndicatorGroup>
              {/* <Combobox.ClearTrigger /> */}
              <Combobox.Trigger />
            </Combobox.IndicatorGroup>
          </Combobox.Control>

          <Portal disabled={!portalled}>
            <Combobox.Positioner>
              <Combobox.Content>
                <Combobox.Empty>{labels.emptyMessage}</Combobox.Empty>
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

        <Button onClick={handleClear} size="sm" variant="ghost">
          <Icon>
            <MdCancel />
          </Icon>
        </Button>
      </Flex>
    </Flex>
  );
}
