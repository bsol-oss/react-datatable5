import { TimePicker as CustomTimePicker } from '@/components/TimePicker/TimePicker';
import { Button } from '@/components/ui/button';
import { Field } from '@/components/ui/field';
import { Popover, Portal } from '@chakra-ui/react';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { IoMdClock } from 'react-icons/io';
import { useSchemaContext } from '../../useSchemaContext';
import { useFormLabel } from '../../utils/useFormLabel';
import { CustomJSONSchema7 } from '../types/CustomJSONSchema7';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(timezone);

export interface DatePickerProps {
  column: string;
  schema: CustomJSONSchema7;
  prefix: string;
}

export const TimePicker = ({ column, schema, prefix }: DatePickerProps) => {
  const {
    watch,
    formState: { errors },
    setValue,
  } = useFormContext();
  const { timezone, insideDialog, timePickerLabels } = useSchemaContext();

  const {
    required,
    gridColumn = 'span 12',
    gridRow = 'span 1',
    timeFormat = 'HH:mm:ssZ',
    displayTimeFormat = 'hh:mm A',
    startTimeField,
    selectedDateField,
  } = schema as CustomJSONSchema7 & {
    startTimeField?: string;
    selectedDateField?: string;
  };
  const isRequired = required?.some((columnId) => columnId === column);
  const colLabel = `${prefix}${column}`;
  const formI18n = useFormLabel(column, prefix, schema);
  const fieldError = errors[colLabel]?.message;
  const [open, setOpen] = useState(false);
  const value = watch(colLabel);

  // Watch startTime and selectedDate fields for offset calculation
  const startTimeValue = startTimeField
    ? watch(`${prefix}${startTimeField}`)
    : undefined;
  const selectedDateValue = selectedDateField
    ? watch(`${prefix}${selectedDateField}`)
    : undefined;

  // Convert to ISO string format for startTime if it's a date-time string
  const startTime = startTimeValue
    ? dayjs(startTimeValue).tz(timezone).isValid()
      ? dayjs(startTimeValue).tz(timezone).toISOString()
      : undefined
    : undefined;

  // Convert selectedDate to YYYY-MM-DD format
  const selectedDate = selectedDateValue
    ? dayjs(selectedDateValue).tz(timezone).isValid()
      ? dayjs(selectedDateValue).tz(timezone).format('YYYY-MM-DD')
      : undefined
    : undefined;
  const displayedTime = dayjs(`1970-01-01T${value}`).tz(timezone).isValid()
    ? dayjs(`1970-01-01T${value}`).tz(timezone).format(displayTimeFormat)
    : '';

  // Parse the initial time parts from the  time string (HH:mm:ssZ)
  const parseTime = (time: string | undefined) => {
    if (!time) return { hour: 12, minute: 0, meridiem: 'am' as 'am' | 'pm' };

    const parsed = dayjs(`1970-01-01T${time}`).tz(timezone);
    if (!parsed.isValid()) {
      return { hour: 12, minute: 0, meridiem: 'am' as 'am' | 'pm' };
    }

    let hour = parsed.hour();
    const minute = parsed.minute();
    const meridiem = hour >= 12 ? 'pm' : 'am';

    if (hour === 0) hour = 12;
    else if (hour > 12) hour -= 12;

    return { hour, minute, meridiem };
  };

  const initialTime = parseTime(value);

  const [hour, setHour] = useState<number | null>(initialTime.hour);
  const [minute, setMinute] = useState<number | null>(initialTime.minute);
  const [meridiem, setMeridiem] = useState<'am' | 'pm' | null>(
    initialTime.meridiem as 'am' | 'pm'
  );

  useEffect(() => {
    const { hour, minute, meridiem } = parseTime(value);
    setHour(hour);
    setMinute(minute);
    setMeridiem(meridiem as 'am' | 'pm');
  }, [value]);

  const getTimeString = (
    hour: number | null,
    minute: number | null,
    meridiem: 'am' | 'pm' | null
  ) => {
    if (hour === null || minute === null || meridiem === null) return null;
    let newHour = hour;
    if (meridiem === 'pm' && hour !== 12) {
      newHour = hour + 12;
    }
    return dayjs()
      .tz(timezone)
      .hour(newHour)
      .minute(minute)
      .second(0)
      .format(timeFormat);
  };

  // Handle changes to time parts
  const handleTimeChange = ({
    hour: newHour,
    minute: newMinute,
    meridiem: newMeridiem,
  }: {
    hour: number | null;
    minute: number | null;
    meridiem: 'am' | 'pm' | null;
  }) => {
    setHour(newHour);
    setMinute(newMinute);
    setMeridiem(newMeridiem);
    const timeString = getTimeString(newHour, newMinute, newMeridiem);
    setValue(colLabel, timeString, { shouldValidate: true, shouldDirty: true });
  };

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
            <IoMdClock />
            {!!value ? `${displayedTime}` : ''}
          </Button>
        </Popover.Trigger>
        {insideDialog ? (
          <Popover.Positioner>
            <Popover.Content maxH="70vh" overflowY="auto">
              <Popover.Body overflow="visible">
                <CustomTimePicker
                  hour={hour}
                  setHour={setHour}
                  minute={minute}
                  setMinute={setMinute}
                  meridiem={meridiem}
                  setMeridiem={setMeridiem}
                  onChange={handleTimeChange}
                  startTime={startTime}
                  selectedDate={selectedDate}
                  timezone={timezone}
                  portalled={false}
                  labels={timePickerLabels}
                />
              </Popover.Body>
            </Popover.Content>
          </Popover.Positioner>
        ) : (
          <Portal>
            <Popover.Positioner>
              <Popover.Content>
                <Popover.Body>
                  <CustomTimePicker
                    format="12h"
                    hour={hour}
                    setHour={setHour}
                    minute={minute}
                    setMinute={setMinute}
                    meridiem={meridiem}
                    setMeridiem={setMeridiem}
                    onChange={handleTimeChange}
                    startTime={startTime}
                    selectedDate={selectedDate}
                    timezone={timezone}
                    portalled={false}
                    labels={timePickerLabels}
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
