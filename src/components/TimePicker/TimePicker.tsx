import {
  Button,
  Combobox,
  Grid,
  Icon,
  InputGroup,
  Portal,
  useFilter,
  useListCollection,
} from '@chakra-ui/react';
import dayjs from 'dayjs';
import { Dispatch, SetStateAction, useMemo } from 'react';
import { BsClock } from 'react-icons/bs';
import { MdCancel } from 'react-icons/md';

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
}

interface TimeOption {
  label: string;
  value: string;
  hour: number;
  minute: number;
  meridiem: 'am' | 'pm';
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
}: TimePickerProps) {
  // Generate time options (every 15 minutes)
  const timeOptions = useMemo<TimeOption[]>(() => {
    const options: TimeOption[] = [];
    const meridiemOptions: ('am' | 'pm')[] = ['am', 'pm'];

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
          options.push({
            label: displayTime,
            value: `${h}:${m.toString().padStart(2, '0')}:${mer}`,
            hour: h,
            minute: m,
            meridiem: mer,
          });
        }
      }
    }
    return options;
  }, [timezone]);

  const { contains } = useFilter({ sensitivity: 'base' });

  const { collection, filter } = useListCollection({
    initialItems: timeOptions,
    itemToString: (item) => item.label,
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
    return dayjs(`1970-01-01T${timeStr}`, 'HH:mmZ').format('hh:mm a');
  }, [hour, minute, meridiem, timezone]);

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

    // Try to parse custom input (e.g., "12:30pm", "12:30 pm", "1230pm")
    const normalized = inputValue
      .toLowerCase()
      .replace(/\s+/g, '')
      .replace(/[^0-9apm]/g, '');

    // Extract hour, minute, and meridiem from input
    const meridiemMatch = normalized.match(/(am|pm)/);
    const mer = meridiemMatch ? (meridiemMatch[1] as 'am' | 'pm') : null;
    const numbersOnly = normalized.replace(/(am|pm)/g, '');

    if (numbersOnly.length >= 3) {
      let hourStr = numbersOnly.slice(0, -2);
      let minuteStr = numbersOnly.slice(-2);

      // Handle formats like "930pm" -> "9:30pm"
      if (numbersOnly.length === 3) {
        hourStr = numbersOnly.slice(0, 1);
        minuteStr = numbersOnly.slice(1);
      }

      const parsedHour = parseInt(hourStr);
      const parsedMinute = parseInt(minuteStr);

      if (!isNaN(parsedHour) && !isNaN(parsedMinute)) {
        let newHour = parsedHour;
        let newMinute = parsedMinute;
        let newMeridiem = mer;

        // Validate and normalize
        if (parsedHour > 24) {
          return;
        }

        // Convert 24-hour to 12-hour format if needed
        if (parsedHour === 24) {
          newMeridiem = 'am';
          newHour = 12;
        } else if (parsedHour > 12) {
          newMeridiem = 'pm';
          newHour = parsedHour - 12;
        } else if (parsedHour === 12) {
          newMeridiem = newMeridiem ?? 'pm';
          newHour = 12;
        } else if (parsedHour === 0) {
          newMeridiem = 'am';
          newHour = 12;
        } else {
          newMeridiem = newMeridiem ?? 'am';
          newHour = parsedHour;
        }

        if (parsedMinute > 59) {
          newMinute = 0;
        }

        setHour(newHour);
        setMinute(newMinute);
        setMeridiem(newMeridiem);
        onChange({
          hour: newHour,
          minute: newMinute,
          meridiem: newMeridiem,
        });
      }
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
          <InputGroup startElement={<BsClock />}>
            <Combobox.Input placeholder="Select time" value={displayText} />
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
  );
}
