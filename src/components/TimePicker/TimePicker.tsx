import {
  Button,
  Combobox,
  Grid,
  Icon,
  InputGroup,
  Portal,
  Text,
  useFilter,
  useListCollection,
} from '@chakra-ui/react';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import {
  Dispatch,
  SetStateAction,
  useMemo,
  useState,
  useEffect,
  useRef,
} from 'react';
import { BsClock } from 'react-icons/bs';
import { MdCancel } from 'react-icons/md';

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
  meridiemLabel?: {
    am: string;
    pm: string;
  };
  timezone?: string;
  startTime?: string;
  selectedDate?: string;
}

interface TimeOption {
  label: string;
  value: string;
  hour: number;
  minute: number;
  meridiem: 'am' | 'pm';
  searchText: string; // Time without duration for searching
}

export function TimePicker({
  hour,
  setHour,
  minute,
  setMinute,
  meridiem,
  setMeridiem,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  meridiemLabel: _meridiemLabel = {
    am: 'am',
    pm: 'pm',
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onChange = (_newValue) => {},
  timezone = 'Asia/Hong_Kong',
  startTime,
  selectedDate,
}: TimePickerProps) {
  // Generate time options (every 15 minutes)
  const timeOptions = useMemo<TimeOption[]>(() => {
    const options: TimeOption[] = [];
    const meridiemOptions: ('am' | 'pm')[] = ['am', 'pm'];

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

    for (const mer of meridiemOptions) {
      for (let h = 1; h <= 12; h++) {
        for (let m = 0; m < 60; m += 15) {
          const hour24 =
            mer === 'am' ? (h === 12 ? 0 : h) : h === 12 ? 12 : h + 12;

          const timeStr = dayjs()
            .tz(timezone)
            .hour(hour24)
            .minute(m)
            .format('HH:mmZ');
          const displayTime = dayjs(`1970-01-01T${timeStr}`, 'HH:mmZ').format(
            'hh:mm a'
          );

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

          // Calculate and append duration if startTime is provided
          let label = displayTime;
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

              if (diffHours > 0 || diffMinutes > 0) {
                const diffText =
                  diffHours > 0
                    ? `${diffHours}h ${diffMinutes}m`
                    : `${diffMinutes}m`;
                label = `${displayTime} (+${diffText})`;
              }
            }
          }

          options.push({
            label,
            value: `${h}:${m.toString().padStart(2, '0')}:${mer}`,
            hour: h,
            minute: m,
            meridiem: mer,
            searchText: displayTime, // Use base time without duration for searching
          });
        }
      }
    }
    return options;
  }, [timezone, startTime, selectedDate]);

  const { contains } = useFilter({ sensitivity: 'base' });

  const { collection, filter } = useListCollection({
    initialItems: timeOptions,
    itemToString: (item) => item.searchText, // Use searchText (without duration) for filtering
    itemToValue: (item) => item.value,
    filter: contains,
  });

  // Track input mode vs display mode
  const [isInputMode, setIsInputMode] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  // Switch to display mode when value is selected
  useEffect(() => {
    if (hour !== null && minute !== null && meridiem !== null) {
      setIsInputMode(false);
    }
  }, [hour, minute, meridiem]);

  // Focus input when switching to input mode
  useEffect(() => {
    if (isInputMode && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isInputMode]);

  // Get current value string for combobox
  const currentValue = useMemo(() => {
    if (hour === null || minute === null || meridiem === null) {
      return '';
    }
    return `${hour}:${minute.toString().padStart(2, '0')}:${meridiem}`;
  }, [hour, minute, meridiem]);

  // INPUT MODE: Show raw input text (no duration)
  const inputModeText = useMemo(() => {
    return inputValue;
  }, [inputValue]);

  // DISPLAY MODE: Show selected value with duration
  const displayModeText = useMemo(() => {
    if (hour === null || minute === null || meridiem === null) {
      return '';
    }
    const hour24 =
      meridiem === 'am'
        ? hour === 12
          ? 0
          : hour
        : hour === 12
          ? 12
          : hour + 12;
    const timeStr = dayjs()
      .tz(timezone)
      .hour(hour24)
      .minute(minute)
      .format('HH:mmZ');
    const timeDisplay = dayjs(`1970-01-01T${timeStr}`, 'HH:mmZ').format(
      'hh:mm a'
    );

    // Add duration if startTime is provided
    if (startTime && selectedDate) {
      const startDateObj = dayjs(startTime).tz(timezone);
      const selectedDateObj = dayjs(selectedDate).tz(timezone);
      const currentDateTime = selectedDateObj
        .hour(hour24)
        .minute(minute)
        .second(0)
        .millisecond(0);

      if (startDateObj.isValid() && currentDateTime.isValid()) {
        const diffMs = currentDateTime.diff(startDateObj);
        if (diffMs >= 0) {
          const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
          const diffMinutes = Math.floor(
            (diffMs % (1000 * 60 * 60)) / (1000 * 60)
          );

          if (diffHours > 0 || diffMinutes > 0) {
            const diffText =
              diffHours > 0
                ? `${diffHours}h ${diffMinutes}m`
                : `${diffMinutes}m`;
            return `${timeDisplay} (+${diffText})`;
          }
        }
      }
    }

    return timeDisplay;
  }, [hour, minute, meridiem, timezone, startTime, selectedDate]);

  // Choose text based on mode
  const displayText = isInputMode ? inputModeText : displayModeText;

  const handleClear = () => {
    setHour(null);
    setMinute(null);
    setMeridiem(null);
    setIsInputMode(false);
    setInputValue('');
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
      setIsInputMode(false); // Switch to display mode
      setInputValue('');
      filter(''); // Reset filter after selection
      onChange({
        hour: selectedOption.hour,
        minute: selectedOption.minute,
        meridiem: selectedOption.meridiem,
      });
    }
  };

  // Handle Enter key to select first filtered option
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && collection.items.length > 0) {
      e.preventDefault();
      const firstOption = collection.items[0];
      if (firstOption) {
        const selectedOption = timeOptions.find(
          (opt) => opt.value === firstOption.value
        );
        if (selectedOption) {
          setHour(selectedOption.hour);
          setMinute(selectedOption.minute);
          setMeridiem(selectedOption.meridiem);
          setIsInputMode(false); // Switch to display mode
          setInputValue('');
          filter('');
          onChange({
            hour: selectedOption.hour,
            minute: selectedOption.minute,
            meridiem: selectedOption.meridiem,
          });
        }
      }
    }
  };

  const handleInputValueChange = (
    details: Combobox.InputValueChangeDetails
  ) => {
    const inputValue = details.inputValue.trim();
    setInputValue(inputValue);
    setIsInputMode(true); // Switch to input mode

    // Filter the collection based on input
    filter(inputValue);

    if (!inputValue) {
      setIsInputMode(false);
      return;
    }

    // Try to parse custom input using explicit regex patterns
    const normalized = inputValue.toLowerCase().replace(/\s+/g, '');

    // Pattern 1: 12-hour format with meridiem (e.g., "930pm", "1230am", "9:30pm", "12:30am")
    // Matches: 1-2 digits hour, optional colon, 2 digits minute, am/pm
    const pattern12HourWithMeridiem = /^(\d{1,2}):?(\d{2})(am|pm)$/;
    const match12Hour = normalized.match(pattern12HourWithMeridiem);

    if (match12Hour) {
      const parsedHour = parseInt(match12Hour[1], 10);
      const parsedMinute = parseInt(match12Hour[2], 10);
      const parsedMeridiem = match12Hour[3] as 'am' | 'pm';

      // Validate hour (1-12)
      if (parsedHour < 1 || parsedHour > 12) {
        return;
      }

      // Validate minute (0-59)
      const validMinute = parsedMinute > 59 ? 0 : parsedMinute;

      setHour(parsedHour);
      setMinute(validMinute);
      setMeridiem(parsedMeridiem);
      onChange({
        hour: parsedHour,
        minute: validMinute,
        meridiem: parsedMeridiem,
      });
      return;
    }

    // Pattern 2: 24-hour format (e.g., "2130", "09:30", "21:30")
    // Matches: 1-2 digits hour, optional colon, 2 digits minute
    const pattern24Hour = /^(\d{2}):?(\d{2})$/;
    const match24Hour = normalized.match(pattern24Hour);

    if (match24Hour) {
      let parsedHour = parseInt(match24Hour[1], 10);
      const parsedMinute = parseInt(match24Hour[2], 10);

      // Validate hour (0-23)
      if (parsedHour > 23) {
        return;
      }

      // Convert 24-hour to 12-hour format
      let parsedMeridiem: 'am' | 'pm';
      if (parsedHour === 0) {
        parsedHour = 12;
        parsedMeridiem = 'am';
      } else if (parsedHour === 12) {
        parsedHour = 12;
        parsedMeridiem = 'pm';
      } else if (parsedHour > 12) {
        parsedHour = parsedHour - 12;
        parsedMeridiem = 'pm';
      } else {
        parsedMeridiem = 'am';
      }

      // Validate minute (0-59)
      const validMinute = parsedMinute > 59 ? 0 : parsedMinute;

      setHour(parsedHour);
      setMinute(validMinute);
      setMeridiem(parsedMeridiem);
      onChange({
        hour: parsedHour,
        minute: validMinute,
        meridiem: parsedMeridiem,
      });
      return;
    }
  };

  return (
    <Grid
      justifyContent={'center'}
      alignItems={'center'}
      templateColumns={'200px auto'}
      gap="2"
      width="auto"
      minWidth="250px"
    >
      <Combobox.Root
        collection={collection}
        value={currentValue ? [currentValue] : []}
        onValueChange={handleValueChange}
        onInputValueChange={handleInputValueChange}
        allowCustomValue
        selectionBehavior="replace"
        openOnClick
        width="100%"
      >
        <Combobox.Control>
          {isInputMode ? (
            <InputGroup startElement={<BsClock />}>
              <Combobox.Input
                ref={inputRef}
                placeholder="Select time"
                value={displayText}
                onKeyDown={handleKeyDown}
              />
            </InputGroup>
          ) : (
            <Grid
              templateColumns="auto 1fr auto"
              alignItems="center"
              gap={2}
              width="100%"
              minHeight="40px"
              px={3}
              border="1px solid"
              borderColor="gray.200"
              borderRadius="md"
              cursor="pointer"
              onClick={() => setIsInputMode(true)}
            >
              <Icon>
                <BsClock />
              </Icon>
              <Text
                fontSize="sm"
                overflow="hidden"
                textOverflow="ellipsis"
                whiteSpace="nowrap"
              >
                {displayText || 'Select time'}
              </Text>
              <Combobox.Trigger
                onClick={(e) => {
                  e.stopPropagation();
                  setIsInputMode(true);
                }}
              />
            </Grid>
          )}
          {isInputMode && (
            <Combobox.IndicatorGroup>
              <Combobox.ClearTrigger />
              <Combobox.Trigger />
            </Combobox.IndicatorGroup>
          )}
        </Combobox.Control>

        <Portal>
          <Combobox.Positioner>
            <Combobox.Content>
              <Combobox.Empty>No time found</Combobox.Empty>
              {collection.items.map((item) => (
                <Combobox.Item item={item} key={item.value}>
                  {item.label}
                  <Combobox.ItemIndicator />
                </Combobox.Item>
              ))}
            </Combobox.Content>
          </Combobox.Positioner>
        </Portal>
      </Combobox.Root>

      <Button onClick={handleClear} size="sm" variant="ghost">
        <Icon>
          <MdCancel />
        </Icon>
      </Button>
    </Grid>
  );
}
