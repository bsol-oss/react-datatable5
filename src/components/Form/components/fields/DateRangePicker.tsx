import RangeDatePicker from '@/components/DatePicker/RangeDatePicker';
import { getRangeDates } from '@/components/DatePicker/getRangeDates';
import { Button } from '@/components/ui/button';
import { Field } from '@/components/ui/field';
import { Popover, Portal } from '@chakra-ui/react';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { MdDateRange } from 'react-icons/md';
import { useSchemaContext } from '../../useSchemaContext';
import { useFormI18n } from '../../utils/useFormI18n';
import { InputDefaultProps } from './types';

dayjs.extend(utc);
dayjs.extend(timezone);

export const DateRangePicker = ({
  column,
  schema,
  prefix,
}: InputDefaultProps) => {
  const {
    watch,
    formState: { errors },
    setValue,
  } = useFormContext();
  const { timezone, insideDialog } = useSchemaContext();
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
  const selectedDateRange = watch(colLabel) as string[] | undefined;

  // Convert string[] to Date[] for the picker
  const selectedDates: Date[] = (selectedDateRange ?? [])
    .map((dateStr) => {
      if (!dateStr) return null;
      const parsed = dayjs(dateStr).tz(timezone);
      return parsed.isValid() ? parsed.toDate() : null;
    })
    .filter((date): date is Date => date !== null);

  // Format display string
  const getDisplayText = () => {
    if (!selectedDateRange || selectedDateRange.length === 0) {
      return '';
    }
    if (selectedDateRange.length === 1) {
      const date = dayjs(selectedDateRange[0]).tz(timezone);
      return date.isValid() ? date.format(displayDateFormat) : '';
    }
    if (selectedDateRange.length === 2) {
      const startDate = dayjs(selectedDateRange[0]).tz(timezone);
      const endDate = dayjs(selectedDateRange[1]).tz(timezone);
      if (startDate.isValid() && endDate.isValid()) {
        return `${startDate.format(displayDateFormat)} - ${endDate.format(displayDateFormat)}`;
      }
    }
    return '';
  };

  useEffect(() => {
    try {
      if (selectedDateRange && selectedDateRange.length > 0) {
        // Format dates according to dateFormat from schema
        const formatted = selectedDateRange
          .map((dateStr) => {
            if (!dateStr) return null;
            const parsed = dayjs(dateStr).tz(timezone);
            return parsed.isValid() ? parsed.format(dateFormat) : null;
          })
          .filter((date): date is string => date !== null);

        // Update the form value only if different to avoid loops
        // Compare arrays element by element
        const needsUpdate =
          formatted.length !== selectedDateRange.length ||
          formatted.some((val, idx) => val !== selectedDateRange[idx]);

        if (needsUpdate && formatted.length > 0) {
          setValue(colLabel, formatted, {
            shouldValidate: true,
            shouldDirty: true,
          });
        }
      }
    } catch (e) {
      console.error(e);
    }
  }, [selectedDateRange, dateFormat, colLabel, setValue, timezone]);

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
            {getDisplayText()}
          </Button>
        </Popover.Trigger>
        {insideDialog ? (
          <Popover.Positioner>
            <Popover.Content>
              <Popover.Body>
                <RangeDatePicker
                  selected={selectedDates}
                  onDateSelected={({ selected, selectable, date }) => {
                    const newDates =
                      getRangeDates({
                        selectable,
                        date,
                        selectedDates,
                      }) ?? [];

                    // Convert Date[] to string[]
                    const formattedDates = newDates
                      .map((dateObj) =>
                        dayjs(dateObj).tz(timezone).format(dateFormat)
                      )
                      .filter((dateStr) => dateStr);

                    setValue(colLabel, formattedDates, {
                      shouldValidate: true,
                      shouldDirty: true,
                    });
                  }}
                  monthsToDisplay={2}
                  withPopover={false}
                />
              </Popover.Body>
            </Popover.Content>
          </Popover.Positioner>
        ) : (
          <Portal>
            <Popover.Positioner>
              <Popover.Content>
                <Popover.Body>
                  <RangeDatePicker
                    selected={selectedDates}
                    onDateSelected={({ selected, selectable, date }) => {
                      const newDates =
                        getRangeDates({
                          selectable,
                          date,
                          selectedDates,
                        }) ?? [];

                      // Convert Date[] to string[]
                      const formattedDates = newDates
                        .map((dateObj) =>
                          dayjs(dateObj).tz(timezone).format(dateFormat)
                        )
                        .filter((dateStr) => dateStr);

                      setValue(colLabel, formattedDates, {
                        shouldValidate: true,
                        shouldDirty: true,
                      });
                    }}
                    monthsToDisplay={2}
                    withPopover={false}
                  />
                </Popover.Body>
              </Popover.Content>
            </Popover.Positioner>
          </Portal>
        )}
      </Popover.Root>
    </Field>
  );
};
