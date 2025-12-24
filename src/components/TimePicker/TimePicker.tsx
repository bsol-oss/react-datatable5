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
import { Dispatch, SetStateAction, useMemo } from 'react';
import { BsClock } from 'react-icons/bs';
import { MdCancel } from 'react-icons/md';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { TimePickerLabels } from '../Form/components/types/CustomJSONSchema7';

dayjs.extend(utc);
dayjs.extend(timezone);

interface TimePickerProps {
  hour: number | null;
  setHour: Dispatch<SetStateAction<number | null>>;
  minute: number | null;
  setMinute: Dispatch<SetStateAction<number | null>>;
  meridiem: 'am' | 'pm' | null;
  setMeridiem: Dispatch<SetStateAction<'am' | 'pm' | null>>;
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
}

interface TimeOption {
  label: string;
  value: string;
  hour: number;
  minute: number;
  meridiem: 'am' | 'pm';
  searchText: string; // Time without duration for searching
  durationText?: string; // Duration difference text (e.g., "+2h 30m")
}

export const TimePicker = ({
  hour,
  setHour,
  minute,
  setMinute,
  meridiem,
  setMeridiem,
  onChange = () => {},
  startTime,
  selectedDate,
  timezone = 'Asia/Hong_Kong',
  portalled = true,
  labels = {
    placeholder: 'hh:mm AM/PM',
    emptyMessage: 'No time found',
  },
}: TimePickerProps) => {
  // Generate time options (every 15 minutes in 12-hour format)
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

    // Generate 12-hour format options (1-12 for hours, AM/PM)
    for (let h = 1; h <= 12; h++) {
      for (let m = 0; m < 60; m += 15) {
        for (const mer of ['am', 'pm'] as const) {
          // Convert 12-hour to 24-hour for comparison
          let hour24 = h;
          if (mer === 'am' && h === 12) hour24 = 0;
          else if (mer === 'pm' && h < 12) hour24 = h + 12;

          // Filter out times that would result in negative duration (only when dates are the same)
          if (startDateTime && selectedDate && shouldFilterByDate) {
            const selectedDateObj = dayjs(selectedDate).tz(timezone);
            const optionDateTime = selectedDateObj
              .hour(hour24)
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
            searchText: timeDisplay, // Use base time without duration for searching
            durationText,
          });
        }
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
    if (hour === null || minute === null || meridiem === null) {
      return '';
    }
    return `${hour}:${minute}:${meridiem}`;
  }, [hour, minute, meridiem]);

  // Calculate duration difference
  const durationDiff = useMemo(() => {
    if (
      !startTime ||
      !selectedDate ||
      hour === null ||
      minute === null ||
      meridiem === null
    ) {
      return null;
    }

    const startDateObj = dayjs(startTime).tz(timezone);
    const selectedDateObj = dayjs(selectedDate).tz(timezone);

    // Convert 12-hour to 24-hour format
    let hour24 = hour;
    if (meridiem === 'am' && hour === 12) hour24 = 0;
    else if (meridiem === 'pm' && hour < 12) hour24 = hour + 12;

    const currentDateTime = selectedDateObj
      .hour(hour24)
      .minute(minute)
      .second(0)
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
  }, [hour, minute, meridiem, startTime, selectedDate, timezone]);

  const handleClear = () => {
    setHour(null);
    setMinute(null);
    setMeridiem(null);
    filter(''); // Reset filter to show all options
    onChange({ hour: null, minute: null, meridiem: null });
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
      setMeridiem(selectedOption.meridiem);
      filter(''); // Reset filter after selection
      onChange({
        hour: selectedOption.hour,
        minute: selectedOption.minute,
        meridiem: selectedOption.meridiem,
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

    // Parse formats like "1:30 PM", "1:30PM", "1:30 pm", "1:30pm"
    const timePattern12Hour = /^(\d{1,2}):(\d{1,2})\s*(am|pm|AM|PM)$/i;
    const match12Hour = trimmedValue.match(timePattern12Hour);

    if (match12Hour) {
      const parsedHour = parseInt(match12Hour[1], 10);
      const parsedMinute = parseInt(match12Hour[2], 10);
      const parsedMeridiem = match12Hour[3].toLowerCase() as 'am' | 'pm';

      // Validate ranges
      if (
        parsedHour >= 1 &&
        parsedHour <= 12 &&
        parsedMinute >= 0 &&
        parsedMinute <= 59
      ) {
        setHour(parsedHour);
        setMinute(parsedMinute);
        setMeridiem(parsedMeridiem);
        onChange({
          hour: parsedHour,
          minute: parsedMinute,
          meridiem: parsedMeridiem,
        });
        return;
      }
    }

    // Try to parse formats like "130pm" or "130 pm" (without colon)
    const timePatternNoColon = /^(\d{1,4})\s*(am|pm|AM|PM)$/i;
    const matchNoColon = trimmedValue.match(timePatternNoColon);

    if (matchNoColon) {
      const numbersOnly = matchNoColon[1];
      const parsedMeridiem = matchNoColon[2].toLowerCase() as 'am' | 'pm';

      if (numbersOnly.length >= 3) {
        const parsedHour = parseInt(numbersOnly.slice(0, -2), 10);
        const parsedMinute = parseInt(numbersOnly.slice(-2), 10);

        // Validate ranges
        if (
          parsedHour >= 1 &&
          parsedHour <= 12 &&
          parsedMinute >= 0 &&
          parsedMinute <= 59
        ) {
          setHour(parsedHour);
          setMinute(parsedMinute);
          setMeridiem(parsedMeridiem);
          onChange({
            hour: parsedHour,
            minute: parsedMinute,
            meridiem: parsedMeridiem,
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
      setMeridiem(firstItem.meridiem);
      filter(''); // Reset filter after selection
      onChange({
        hour: firstItem.hour,
        minute: firstItem.minute,
        meridiem: firstItem.meridiem,
      });
    }
  };

  const handleInputValueChange = (
    details: Combobox.InputValueChangeDetails
  ) => {
    // Filter the collection based on input, but don't parse yet
    filter(details.inputValue);
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    // Select all text when focusing
    e.target.select();
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    // Parse and commit the input value when losing focus
    const inputValue = e.target.value;
    if (inputValue) {
      parseAndCommitInput(inputValue);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Commit input on Enter key
    if (e.key === 'Enter') {
      e.preventDefault();
      const inputValue = e.currentTarget.value;
      if (inputValue) {
        parseAndCommitInput(inputValue);
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
                placeholder={labels?.placeholder ?? 'hh:mm AM/PM'}
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

        <Button onClick={handleClear} size="sm" variant="ghost">
          <Icon>
            <MdCancel />
          </Icon>
        </Button>
      </Flex>
    </Flex>
  );
};
