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
import { Dispatch, SetStateAction, useMemo } from 'react';
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
}

interface TimeOption {
  label: string;
  value: string;
  hour: number;
  minute: number;
  second: number;
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

        // Calculate and append duration if startTime is provided
        let label = timeDisplay;
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
              label = `${timeDisplay} (+${diffText})`;
            }
          }
        }

        options.push({
          label,
          value: `${h}:${m}:0`,
          hour: h,
          minute: m,
          second: 0,
        });
      }
    }
    return options;
  }, [startTime, selectedDate, timezone]);

  const { contains } = useFilter({ sensitivity: 'base' });

  const { collection, filter } = useListCollection({
    initialItems: timeOptions,
    itemToString: (item) => item.label,
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

  // Get display text for combobox
  const displayText = useMemo(() => {
    if (hour === null || minute === null || second === null) {
      return '';
    }
    const timeDisplay = `${hour.toString().padStart(2, '0')}:${minute
      .toString()
      .padStart(2, '0')}:${second.toString().padStart(2, '0')}`;

    // Show duration difference if startTime is provided
    if (startTime && selectedDate) {
      const startDateObj = dayjs(startTime).tz(timezone);
      const selectedDateObj = dayjs(selectedDate).tz(timezone);
      const currentDateTime = selectedDateObj
        .hour(hour)
        .minute(minute)
        .second(second ?? 0)
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

  const handleInputValueChange = (
    details: Combobox.InputValueChangeDetails
  ) => {
    const inputValue = details.inputValue.trim();

    // Filter the collection based on input
    filter(inputValue);

    if (!inputValue) {
      return;
    }

    // Parse HH:mm:ss or HH:mm format
    const timePattern = /^(\d{1,2}):(\d{1,2})(?::(\d{1,2}))?$/;
    const match = inputValue.match(timePattern);

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
      }
    } else {
      // Try to parse formats like "123045" (HHmmss) or "1230" (HHmm)
      const numbersOnly = inputValue.replace(/[^0-9]/g, '');

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
        }
      }
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
              <Combobox.Input placeholder="HH:mm:ss" value={displayText} />
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
