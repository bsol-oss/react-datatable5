import { Button } from '@/components/ui/button';
import { Field } from '@/components/ui/field';
import { Popover, Portal } from '@chakra-ui/react';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { MdDateRange } from 'react-icons/md';
import { useSchemaContext } from '../../useSchemaContext';
import { useFormI18n } from '../../utils/useFormI18n';
import { InputDefaultProps } from './types';
import { DateTimePicker as ChakraDateTimePicker } from '@/components/DatePicker/DateTimePicker';

dayjs.extend(utc);
dayjs.extend(timezone);

export const DateTimePicker = ({
  column,
  schema,
  prefix,
}: InputDefaultProps) => {
  const {
    watch,
    formState: { errors },
    setValue,
  } = useFormContext();
  const { timezone, dateTimePickerLabels, timePickerLabels, insideDialog } =
    useSchemaContext();
  const formI18n = useFormI18n(column, prefix, schema);
  const {
    required,
    gridColumn = 'span 12',
    gridRow = 'span 1',
    displayDateFormat = 'YYYY-MM-DD HH:mm:ss',
    // with timezone
    dateFormat = 'YYYY-MM-DD[T]HH:mm:ssZ',
  } = schema;
  const isRequired = required?.some((columnId) => columnId === column);
  const colLabel = formI18n.colLabel;
  const [open, setOpen] = useState(false);
  const selectedDate = watch(colLabel);
  const displayDate =
    selectedDate && dayjs(selectedDate).tz(timezone).isValid()
      ? dayjs(selectedDate).tz(timezone).format(displayDateFormat)
      : '';

  const dateTimePickerLabelsConfig = {
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

  const dateTimePickerContent = (
    <ChakraDateTimePicker
      value={selectedDate}
      onChange={(date) => {
        if (!date || date === null || date === undefined) {
          setValue(colLabel, undefined);
          return;
        }
        const dateObj = dayjs(date).tz(timezone);
        if (dateObj.isValid()) {
          setValue(colLabel, dateObj.format(dateFormat));
        } else {
          setValue(colLabel, undefined);
        }
      }}
      timezone={timezone}
      labels={dateTimePickerLabelsConfig}
      timePickerLabels={timePickerLabels}
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
        <Popover.Trigger asChild>
          <Button
            size="sm"
            variant="outline"
            onClick={() => {
              setOpen(true);
            }}
            justifyContent={'start'}
          >
            <MdDateRange />
            {displayDate || ''}
          </Button>
        </Popover.Trigger>
        {insideDialog ? (
          <Popover.Positioner>
            <Popover.Content width="fit-content" minW="350px" minH="10rem">
              <Popover.Body>{dateTimePickerContent}</Popover.Body>
            </Popover.Content>
          </Popover.Positioner>
        ) : (
          <Portal>
            <Popover.Positioner>
              <Popover.Content width="fit-content" minW="350px" minH="10rem">
                <Popover.Body>{dateTimePickerContent}</Popover.Body>
              </Popover.Content>
            </Popover.Positioner>
          </Portal>
        )}
      </Popover.Root>
    </Field>
  );
};
