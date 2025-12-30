import ChakraDatePicker from '@/components/DatePicker/DatePicker';
import { Field } from '@/components/ui/field';
import { Icon, IconButton, Input, Popover, Portal } from '@chakra-ui/react';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { MdDateRange } from 'react-icons/md';
import { useSchemaContext } from '../../useSchemaContext';
import { useFormI18n } from '../../utils/useFormI18n';
import { InputDefaultProps } from './types';
import { InputGroup } from '@/components/ui/input-group';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(customParseFormat);

export const DatePicker = ({ column, schema, prefix }: InputDefaultProps) => {
  const {
    watch,
    formState: { errors },
    setValue,
  } = useFormContext();
  const { timezone, dateTimePickerLabels, insideDialog } = useSchemaContext();
  const formI18n = useFormI18n(column, prefix, schema);
  const {
    required,
    gridColumn = 'span 12',
    gridRow = 'span 1',
    displayDateFormat = 'YYYY-MM-DD',
    dateFormat = 'YYYY-MM-DD',
  } = schema;
  const isRequired = required?.some((columnId) => columnId === column);
  const colLabel = formI18n.colLabel;
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const selectedDate = watch(colLabel);

  // Update input value when form value changes
  useEffect(() => {
    if (selectedDate) {
      const parsedDate = dayjs(selectedDate).tz(timezone);
      if (parsedDate.isValid()) {
        const formatted = parsedDate.format(displayDateFormat);
        setInputValue(formatted);
      } else {
        setInputValue('');
      }
    } else {
      setInputValue('');
    }
  }, [selectedDate, displayDateFormat, timezone]);

  // Format and validate existing value
  useEffect(() => {
    try {
      if (selectedDate) {
        // Parse the selectedDate as UTC or in a specific timezone to avoid +8 hour shift
        const parsedDate = dayjs(selectedDate).tz(timezone);

        if (!parsedDate.isValid()) return;

        // Format according to dateFormat from schema
        const formatted = parsedDate.format(dateFormat);

        // Update the form value only if different to avoid loops
        if (formatted !== selectedDate) {
          setValue(colLabel, formatted, {
            shouldValidate: true,
            shouldDirty: true,
          });
        }
      }
    } catch (e) {
      console.error(e);
    }
  }, [selectedDate, dateFormat, colLabel, setValue, timezone]);

  const datePickerLabels = {
    monthNamesShort: dateTimePickerLabels?.monthNamesShort ?? [
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
    weekdayNamesShort: dateTimePickerLabels?.weekdayNamesShort ?? [
      'Sun',
      'Mon',
      'Tue',
      'Wed',
      'Thu',
      'Fri',
      'Sat',
    ],
    backButtonLabel: dateTimePickerLabels?.backButtonLabel ?? 'Back',
    forwardButtonLabel: dateTimePickerLabels?.forwardButtonLabel ?? 'Forward',
  };

  // Convert value to Date object for DatePicker
  const selectedDateObj = selectedDate
    ? dayjs(selectedDate).tz(timezone).isValid()
      ? dayjs(selectedDate).tz(timezone).toDate()
      : new Date()
    : new Date();

  // Shared function to parse and validate input value
  const parseAndValidateInput = (inputVal: string) => {
    // If empty, clear the value
    if (!inputVal.trim()) {
      setValue(colLabel, undefined, {
        shouldValidate: true,
        shouldDirty: true,
      });
      setInputValue('');
      return;
    }

    // Try parsing with displayDateFormat first
    let parsedDate = dayjs(inputVal, displayDateFormat, true);

    // If that fails, try common date formats
    if (!parsedDate.isValid()) {
      parsedDate = dayjs(inputVal);
    }

    // If still invalid, try parsing with dateFormat
    if (!parsedDate.isValid()) {
      parsedDate = dayjs(inputVal, dateFormat, true);
    }

    // If valid, format and update
    if (parsedDate.isValid()) {
      const formattedDate = parsedDate.tz(timezone).format(dateFormat);
      const formattedDisplay = parsedDate
        .tz(timezone)
        .format(displayDateFormat);
      setValue(colLabel, formattedDate, {
        shouldValidate: true,
        shouldDirty: true,
      });
      setInputValue(formattedDisplay);
    } else {
      // Invalid date - reset to prop value
      resetToPropValue();
    }
  };

  // Helper function to reset input to prop value
  const resetToPropValue = () => {
    if (selectedDate) {
      const parsedDate = dayjs(selectedDate).tz(timezone);
      if (parsedDate.isValid()) {
        const formatted = parsedDate.format(displayDateFormat);
        setInputValue(formatted);
      } else {
        setInputValue('');
      }
    } else {
      setInputValue('');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only update the input value, don't parse yet
    setInputValue(e.target.value);
  };

  const handleInputBlur = () => {
    // Parse and validate when input loses focus
    parseAndValidateInput(inputValue);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Parse and validate when Enter is pressed
    if (e.key === 'Enter') {
      e.preventDefault();
      parseAndValidateInput(inputValue);
    }
  };

  const handleDateSelected = ({ date }: { date: Date }) => {
    const formattedDate = dayjs(date).tz(timezone).format(dateFormat);
    setValue(colLabel, formattedDate, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setOpen(false);
  };

  const datePickerContent = (
    <ChakraDatePicker
      selected={selectedDateObj}
      onDateSelected={handleDateSelected}
      labels={datePickerLabels}
    />
  );

  return (
    <Field
      label={formI18n.label()}
      required={isRequired}
      alignItems={'stretch'}
      {...{
        gridColumn,
        gridRow,
      }}
      errorText={errors[`${colLabel}`] ? formI18n.required() : undefined}
      invalid={!!errors[colLabel]}
    >
      <Popover.Root
        open={open}
        onOpenChange={(e) => setOpen(e.open)}
        closeOnInteractOutside
        autoFocus={false}
      >
        <InputGroup
          endElement={
            <Popover.Trigger asChild>
              <IconButton
                variant="ghost"
                size="2xs"
                aria-label="Open calendar"
                onClick={() => setOpen(true)}
              >
                <Icon>
                  <MdDateRange />
                </Icon>
              </IconButton>
            </Popover.Trigger>
          }
        >
          <Input
            value={inputValue}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            onKeyDown={handleKeyDown}
            placeholder={formI18n.label()}
            size="sm"
          />
        </InputGroup>
        {insideDialog ? (
          <Popover.Positioner>
            <Popover.Content width="fit-content" minH="25rem">
              <Popover.Body>{datePickerContent}</Popover.Body>
            </Popover.Content>
          </Popover.Positioner>
        ) : (
          <Portal>
            <Popover.Positioner>
              <Popover.Content width="fit-content" minH="25rem">
                <Popover.Body>{datePickerContent}</Popover.Body>
              </Popover.Content>
            </Popover.Positioner>
          </Portal>
        )}
      </Popover.Root>
    </Field>
  );
};
