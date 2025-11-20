import {
  Button,
  Combobox,
  Flex,
  Grid,
  Icon,
  InputGroup,
  Portal,
  useFilter,
  useListCollection,
} from '@chakra-ui/react';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { Dispatch, SetStateAction, useMemo } from 'react';
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

          // Format time directly without using dayjs with dummy dates
          const formattedHour = h.toString().padStart(2, '0');
          const formattedMinute = m.toString().padStart(2, '0');
          const displayTime = `${formattedHour}:${formattedMinute} ${mer}`;

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

  // Get current value string for combobox
  const currentValue = useMemo(() => {
    if (hour === null || minute === null || meridiem === null) {
      return '';
    }
    return `${hour}:${minute.toString().padStart(2, '0')}:${meridiem}`;
  }, [hour, minute, meridiem]);

  // Get display text for combobox
  const displayText = useMemo(() => {
    if (hour === null || minute === null || meridiem === null) {
      return '';
    }

    // Format time directly without using dummy dates
    const hour24 =
      meridiem === 'am'
        ? hour === 12
          ? 0
          : hour
        : hour === 12
          ? 12
          : hour + 12;

    // Format hour and minute with proper padding (12-hour format)
    const formattedHour = hour.toString().padStart(2, '0');
    const formattedMinute = minute.toString().padStart(2, '0');
    const timeDisplay = `${formattedHour}:${formattedMinute} ${meridiem}`;

    // Show duration difference if startTime is provided
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
            return `${timeDisplay} (+${diffText})`;
          }
        }
      }
    }

    return timeDisplay;
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

  const handleInputValueChange = (
    details: Combobox.InputValueChangeDetails
  ) => {
    const inputValue = details.inputValue.trim();

    // Filter the collection based on input
    filter(inputValue);

    if (!inputValue) {
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
      if (parsedMinute < 0 || parsedMinute > 59) {
        return;
      }

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

    // Pattern 2: 24-hour format (e.g., "2130", "09:30", "21:30")
    // Matches: 1-2 digits hour, optional colon, 2 digits minute
    const pattern24Hour = /^(\d{1,2}):?(\d{2})$/;
    const match24Hour = normalized.match(pattern24Hour);

    if (match24Hour) {
      let parsedHour = parseInt(match24Hour[1], 10);
      const parsedMinute = parseInt(match24Hour[2], 10);

      // Validate hour (0-23)
      if (parsedHour < 0 || parsedHour > 23) {
        return;
      }

      // Validate minute (0-59)
      if (parsedMinute < 0 || parsedMinute > 59) {
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
  };

  return (
    <Flex direction="column" gap={3}>
      <Grid
        justifyContent={'center'}
        alignItems={'center'}
        templateColumns={'1fr auto'}
        gap="2"
        width="auto"
        minWidth="300px"
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
            <InputGroup startElement={<BsClock />}>
              <Combobox.Input placeholder="hh:mm a" value={displayText} />
            </InputGroup>
            <Combobox.IndicatorGroup>
              <Combobox.ClearTrigger />
              <Combobox.Trigger />
            </Combobox.IndicatorGroup>
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
    </Flex>
  );
}
