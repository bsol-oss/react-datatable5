import { Box, Text } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import DatePicker from './DatePicker';
import { TimePicker } from '../TimePicker/TimePicker';
import { DateTimePicker } from './DateTimePicker';
import { DurationPicker } from './DurationPicker';
import dayjs from 'dayjs';

type FormatType =
  | 'date'
  | 'time'
  | 'date-time'
  | 'iso-time'
  | 'iso-date-time'
  | 'duration';

interface UniversalPickerProps {
  format: FormatType;
  value?: string | null;
  onChange?: (value: string | null) => void;
}

export function UniversalPicker({
  format,
  value,
  onChange,
}: UniversalPickerProps) {
  const [internalValue, setInternalValue] = useState<any>(null);

  // Parse the string value based on format
  useEffect(() => {
    if (!value) {
      setInternalValue(null);
      return;
    }

    switch (format) {
      case 'date':
        setInternalValue(dayjs(value).toDate());
        break;
      case 'time':
      case 'iso-time':
        // Parse time string to components
        const timeMatch = value.match(/^(\d{2}):(\d{2}):(\d{2})/);
        if (timeMatch) {
          if (format === 'iso-time') {
            setInternalValue({
              hour: parseInt(timeMatch[1], 10),
              minute: parseInt(timeMatch[2], 10),
              second: parseInt(timeMatch[3], 10),
            });
          } else {
            // Convert to 12-hour format
            let hour = parseInt(timeMatch[1], 10);
            const minute = parseInt(timeMatch[2], 10);
            const meridiem = hour >= 12 ? 'pm' : 'am';
            if (hour === 0) hour = 12;
            else if (hour > 12) hour -= 12;

            setInternalValue({ hour, minute, meridiem });
          }
        }
        break;
      case 'date-time':
      case 'iso-date-time':
        setInternalValue(dayjs(value).toDate());
        break;
      case 'duration':
        setInternalValue(value);
        break;
      default:
        setInternalValue(value);
    }
  }, [value, format]);

  // Convert internal value back to string
  const handleInternalChange = (newValue: any) => {
    setInternalValue(newValue);

    if (!newValue) {
      onChange?.(null);
      return;
    }

    let stringValue: string | null = null;

    switch (format) {
      case 'date':
        if (newValue instanceof Date) {
          stringValue = dayjs(newValue).format('YYYY-MM-DD');
        }
        break;
      case 'time':
        if (newValue.hour && newValue.minute && newValue.meridiem) {
          let hour24 = newValue.hour;
          if (newValue.meridiem === 'am' && newValue.hour === 12) hour24 = 0;
          else if (newValue.meridiem === 'pm' && newValue.hour < 12)
            hour24 = newValue.hour + 12;

          stringValue = `${hour24.toString().padStart(2, '0')}:${newValue.minute.toString().padStart(2, '0')}:00`;

          // Add timezone info for full time format
          if (format === 'time') {
            stringValue += 'Z';
          }
        }
        break;
      case 'iso-time':
        if (newValue.hour !== null && newValue.minute !== null) {
          const h = newValue.hour.toString().padStart(2, '0');
          const m = newValue.minute.toString().padStart(2, '0');
          const s = (newValue.second || 0).toString().padStart(2, '0');
          stringValue = `${h}:${m}:${s}`;
        }
        break;
      case 'date-time':
        if (newValue instanceof Date) {
          stringValue = dayjs(newValue).format('YYYY-MM-DDTHH:mm:ssZ');
        }
        break;
      case 'iso-date-time':
        if (newValue instanceof Date) {
          stringValue = dayjs(newValue).format('YYYY-MM-DDTHH:mm:ss');
        }
        break;
      case 'duration':
        stringValue = newValue;
        break;
    }

    onChange?.(stringValue);
  };

  const renderPicker = () => {
    switch (format) {
      case 'date':
        return (
          <DatePicker
            selected={internalValue ? [internalValue] : []}
            onDateSelected={({ date }: { date: Date }) =>
              handleInternalChange(date)
            }
            monthsToDisplay={1}
          />
        );

      case 'time':
        return (
          <TimePicker
            format="12h"
            hour={internalValue?.hour || null}
            setHour={(h) => handleInternalChange({ ...internalValue, hour: h })}
            minute={internalValue?.minute || null}
            setMinute={(m) =>
              handleInternalChange({ ...internalValue, minute: m })
            }
            meridiem={internalValue?.meridiem || null}
            setMeridiem={(mer) =>
              handleInternalChange({ ...internalValue, meridiem: mer })
            }
            onChange={handleInternalChange}
          />
        );

      case 'iso-time':
        return (
          <TimePicker
            format="24h"
            hour={internalValue?.hour || null}
            setHour={(h: number | null) =>
              handleInternalChange({ ...internalValue, hour: h })
            }
            minute={internalValue?.minute || null}
            setMinute={(m: number | null) =>
              handleInternalChange({ ...internalValue, minute: m })
            }
            meridiem={null}
            setMeridiem={() => {}}
            showSeconds={true}
            onChange={handleInternalChange}
          />
        );

      case 'date-time':
        return (
          <DateTimePicker
            value={internalValue}
            onChange={handleInternalChange}
            format="date-time"
          />
        );

      case 'iso-date-time':
        return (
          <DateTimePicker
            value={internalValue}
            onChange={handleInternalChange}
            format="iso-date-time"
            showSeconds={true}
          />
        );

      case 'duration':
        return (
          <DurationPicker
            value={internalValue}
            onChange={handleInternalChange}
          />
        );

      default:
        return <Text>Unsupported format: {format}</Text>;
    }
  };

  return (
    <Box>
      <Text fontWeight="bold" mb={2} textTransform="capitalize">
        {format.replace('-', ' ')} Picker
      </Text>
      {renderPicker()}
      {value && (
        <Text fontSize="sm" color="gray.600" mt={2}>
          Current value: {value}
        </Text>
      )}
    </Box>
  );
}
