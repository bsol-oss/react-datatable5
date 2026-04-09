import { DatePickerInput } from '@/components/DatePicker/DatePicker';
import { Field } from '@/components/ui/field';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { useSchemaContext } from '../../useSchemaContext';
import { useFormLabel } from '../../utils/useFormLabel';
import { getNestedError } from '../../utils/getNestedError';
import { InputDefaultProps } from './types';

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
  const formI18n = useFormLabel(column, prefix, schema);
  const {
    required,
    gridColumn = 'span 12',
    gridRow = 'span 1',
    displayDateFormat = 'YYYY-MM-DD',
    dateFormat = 'YYYY-MM-DD',
  } = schema;
  const isRequired = required?.some((columnId) => columnId === column);
  const colLabel = formI18n.colLabel;
  const fieldError = getNestedError(errors, colLabel);
  const selectedDate = watch(colLabel);

  useEffect(() => {
    try {
      if (selectedDate) {
        const parsedDate = dayjs(selectedDate).tz(timezone);

        if (!parsedDate.isValid()) return;

        const formatted = parsedDate.format(dateFormat);

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

  return (
    <Field
      label={formI18n.label()}
      helperText={formI18n.helperText}
      required={isRequired}
      alignItems={'stretch'}
      {...{
        gridColumn,
        gridRow,
      }}
      errorText={<>{fieldError}</>}
      invalid={!!fieldError}
    >
      <input
        type="hidden"
        name={colLabel}
        value={selectedDate ?? ''}
        readOnly
        aria-hidden
      />
      <DatePickerInput
        value={selectedDate}
        onChange={(d) => {
          setValue(colLabel, d, {
            shouldValidate: true,
            shouldDirty: true,
          });
        }}
        placeholder={formI18n.label()}
        dateFormat={dateFormat}
        displayFormat={displayDateFormat}
        timezone={timezone}
        insideDialog={insideDialog}
        labels={{
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
          forwardButtonLabel:
            dateTimePickerLabels?.forwardButtonLabel ?? 'Forward',
        }}
      />
    </Field>
  );
};
