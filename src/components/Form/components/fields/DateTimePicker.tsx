import { DateTimePicker as ChakraDateTimePicker } from '@/components/DatePicker/DateTimePicker';
import { Field } from '@/components/ui/field';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useSchemaContext } from '../../useSchemaContext';
import { useFormLabel } from '../../utils/useFormLabel';
import { InputDefaultProps } from './types';

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
  const formI18n = useFormLabel(column, prefix, schema);
  const {
    required,
    gridColumn = 'span 12',
    gridRow = 'span 1',
    displayDateFormat = 'YYYY-MM-DD HH:mm:ss',
    // with timezone
    dateFormat = 'YYYY-MM-DD[T]HH:mm:ssZ',
    dateTimePicker,
  } = schema;
  const isRequired = required?.some((columnId) => columnId === column);
  const colLabel = formI18n.colLabel;
  const fieldError = errors[colLabel]?.message;
  const [open, setOpen] = useState(false);
  const selectedDate = watch(colLabel);
  const displayDate =
    selectedDate && dayjs(selectedDate).tz(timezone).isValid()
      ? dayjs(selectedDate).tz(timezone).format(displayDateFormat)
      : '';

  // Set default date on mount if no value exists

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
      showQuickActions={dateTimePicker?.showQuickActions ?? false}
      quickActionLabels={
        dateTimePickerLabels?.quickActionLabels ??
        dateTimePicker?.quickActionLabels
      }
      showTimezoneSelector={dateTimePicker?.showTimezoneSelector ?? false}
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
      errorText={<>{fieldError}</>}
      invalid={!!fieldError}
    >
      {dateTimePickerContent}
    </Field>
  );
};
