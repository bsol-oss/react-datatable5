import ChakraDatePicker from '@/components/DatePicker/DatePicker';
import { Button } from '@/components/ui/button';
import { Field } from '@/components/ui/field';
import {
  PopoverBody,
  PopoverContent,
  PopoverRoot,
  PopoverTitle,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Text } from '@chakra-ui/react';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { MdDateRange } from 'react-icons/md';
import { useSchemaContext } from '../../useSchemaContext';
import { useFormI18n } from '../../utils/useFormI18n';
import { InputDefaultProps } from './types';

dayjs.extend(utc);
dayjs.extend(timezone);

export const DatePicker = ({ column, schema, prefix }: InputDefaultProps) => {
  const {
    watch,
    formState: { errors },
    setValue,
  } = useFormContext();
  const { timezone, dateTimePickerLabels } = useSchemaContext();
  const formI18n = useFormI18n(column, prefix);
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
  const selectedDate = watch(colLabel);
  const displayDate = dayjs(selectedDate)
    .tz(timezone)
    .format(displayDateFormat);

  useEffect(() => {
    try {
      if (selectedDate) {
        // Parse the selectedDate as UTC or in a specific timezone to avoid +8 hour shift
        // For example, parse as UTC:
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
  }, [selectedDate, dateFormat, colLabel, setValue]);

  return (
    <Field
      label={formI18n.label()}
      required={isRequired}
      alignItems={'stretch'}
      {...{
        gridColumn,
        gridRow,
      }}
    >
      <PopoverRoot
        open={open}
        onOpenChange={(e) => setOpen(e.open)}
        closeOnInteractOutside
      >
        <PopoverTrigger asChild>
          <Button
            size="sm"
            variant="outline"
            onClick={() => {
              setOpen(true);
            }}
            justifyContent={'start'}
          >
            <MdDateRange />
            {selectedDate !== undefined ? `${displayDate}` : ''}
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverBody>
            <PopoverTitle />
            <ChakraDatePicker
              selected={new Date(selectedDate)}
              onDateSelected={({ date }) => {
                setValue(colLabel, dayjs(date).format(dateFormat));
                setOpen(false);
              }}
              labels={{
                monthNamesShort: dateTimePickerLabels?.monthNamesShort ?? [
                  formI18n.translate.t(`common.month_1`, {
                    defaultValue: 'January',
                  }),
                  formI18n.translate.t(`common.month_2`, {
                    defaultValue: 'February',
                  }),
                  formI18n.translate.t(`common.month_3`, {
                    defaultValue: 'March',
                  }),
                  formI18n.translate.t(`common.month_4`, {
                    defaultValue: 'April',
                  }),
                  formI18n.translate.t(`common.month_5`, {
                    defaultValue: 'May',
                  }),
                  formI18n.translate.t(`common.month_6`, {
                    defaultValue: 'June',
                  }),
                  formI18n.translate.t(`common.month_7`, {
                    defaultValue: 'July',
                  }),
                  formI18n.translate.t(`common.month_8`, {
                    defaultValue: 'August',
                  }),
                  formI18n.translate.t(`common.month_9`, {
                    defaultValue: 'September',
                  }),
                  formI18n.translate.t(`common.month_10`, {
                    defaultValue: 'October',
                  }),
                  formI18n.translate.t(`common.month_11`, {
                    defaultValue: 'November',
                  }),
                  formI18n.translate.t(`common.month_12`, {
                    defaultValue: 'December',
                  }),
                ],
                weekdayNamesShort: dateTimePickerLabels?.weekdayNamesShort ?? [
                  formI18n.translate.t(`common.weekday_1`, {
                    defaultValue: 'Sun',
                  }),
                  formI18n.translate.t(`common.weekday_2`, {
                    defaultValue: 'Mon',
                  }),
                  formI18n.translate.t(`common.weekday_3`, {
                    defaultValue: 'Tue',
                  }),
                  formI18n.translate.t(`common.weekday_4`, {
                    defaultValue: 'Wed',
                  }),
                  formI18n.translate.t(`common.weekday_5`, {
                    defaultValue: 'Thu',
                  }),
                  formI18n.translate.t(`common.weekday_6`, {
                    defaultValue: 'Fri',
                  }),
                  formI18n.translate.t(`common.weekday_7`, {
                    defaultValue: 'Sat',
                  }),
                ],
                backButtonLabel:
                  dateTimePickerLabels?.backButtonLabel ??
                  formI18n.translate.t(`common.back_button`, {
                    defaultValue: 'Back',
                  }),
                forwardButtonLabel:
                  dateTimePickerLabels?.forwardButtonLabel ??
                  formI18n.translate.t(`common.forward_button`, {
                    defaultValue: 'Forward',
                  }),
              }}
            />
          </PopoverBody>
        </PopoverContent>
      </PopoverRoot>

      {errors[`${column}`] && (
        <Text color={'red.400'}>{formI18n.required()}</Text>
      )}
    </Field>
  );
};
