import { Grid, HStack, Input, NativeSelect, Text } from '@chakra-ui/react';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import React, { useMemo } from 'react';
import { BsClock } from 'react-icons/bs';
import { TimePickerLabels } from '../Form/components/types/CustomJSONSchema7';

dayjs.extend(utc);
dayjs.extend(timezone);

export interface TimePickerProps {
  hour: number | null;
  setHour: (hour: number | null) => void;
  minute: number | null;
  setMinute: (minute: number | null) => void;
  meridiem: 'am' | 'pm' | null;
  setMeridiem: (meridiem: 'am' | 'pm' | null) => void;
  onChange?: (params: {
    hour: number | null;
    minute: number | null;
    meridiem: 'am' | 'pm' | null;
  }) => void;
  format?: '12h' | '24h';
  showSeconds?: boolean;
  startTime?: string;
  selectedDate?: string;
  timezone?: string;
  portalled?: boolean;
  labels?: TimePickerLabels;
}

function to24(h: number, m: number, mer: 'am' | 'pm' | null): [number, number] {
  if (mer === null) return [h, m];
  let H = h;
  if (mer === 'am' && h === 12) H = 0;
  else if (mer === 'pm' && h < 12) H = h + 12;
  return [H, m];
}

export const TimePicker: React.FC<TimePickerProps> = ({
  hour,
  setHour,
  minute,
  setMinute,
  meridiem,
  setMeridiem,
  onChange,
  format = '12h',
  showSeconds = false,
  labels,
}) => {
  const is24Hour = format === '24h' || showSeconds;

  const timeInputValue = useMemo(() => {
    if (hour === null || minute === null) return '';
    if (is24Hour) {
      const s = showSeconds ? 0 : undefined;
      const H = hour;
      const M = minute;
      if (showSeconds) {
        return `${String(H).padStart(2, '0')}:${String(M).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
      }
      return `${String(H).padStart(2, '0')}:${String(M).padStart(2, '0')}`;
    }
    const [H, M] = to24(hour, minute, meridiem);
    return `${String(H).padStart(2, '0')}:${String(M).padStart(2, '0')}`;
  }, [hour, minute, meridiem, is24Hour, showSeconds]);

  const fire = (
    h: number | null,
    m: number | null,
    mer: 'am' | 'pm' | null
  ) => {
    setHour(h);
    setMinute(m);
    if (!is24Hour) setMeridiem(mer);
    onChange?.({ hour: h, minute: m, meridiem: mer });
  };

  if (is24Hour) {
    return (
      <Grid gap={2}>
        <HStack gap={2}>
          <BsClock />
          <Input
            type="time"
            step={showSeconds ? 1 : 60}
            size="sm"
            value={timeInputValue}
            onChange={(e) => {
              const v = e.currentTarget.value;
              if (!v) {
                fire(null, null, null);
                return;
              }
              const [hs, ms] = v.split(':').map((x) => parseInt(x, 10));
              if (Number.isFinite(hs) && Number.isFinite(ms)) {
                fire(hs, ms, null);
              }
            }}
            placeholder={labels?.placeholder ?? 'HH:mm'}
          />
        </HStack>
      </Grid>
    );
  }

  const hours = Array.from({ length: 12 }, (_, i) => i + 1);
  const minutes = Array.from({ length: 60 }, (_, i) => i);

  return (
    <Grid gap={2}>
      <HStack gap={2} align="center" flexWrap="wrap">
        <BsClock />
        <NativeSelect.Root size="sm" width="auto">
          <NativeSelect.Field
            aria-label={labels?.placeholder ?? 'Hour'}
            value={hour ?? ''}
            onChange={(e) => {
              const v = parseInt(e.currentTarget.value, 10);
              fire(Number.isFinite(v) ? v : null, minute, meridiem);
            }}
          >
            <option value="">--</option>
            {hours.map((h) => (
              <option key={h} value={h}>
                {h}
              </option>
            ))}
          </NativeSelect.Field>
          <NativeSelect.Indicator />
        </NativeSelect.Root>
        <Text>:</Text>
        <NativeSelect.Root size="sm" width="auto">
          <NativeSelect.Field
            aria-label="Minute"
            value={minute ?? ''}
            onChange={(e) => {
              const v = parseInt(e.currentTarget.value, 10);
              fire(hour, Number.isFinite(v) ? v : null, meridiem);
            }}
          >
            <option value="">--</option>
            {minutes.map((m) => (
              <option key={m} value={m}>
                {String(m).padStart(2, '0')}
              </option>
            ))}
          </NativeSelect.Field>
          <NativeSelect.Indicator />
        </NativeSelect.Root>
        <NativeSelect.Root size="sm" width="auto">
          <NativeSelect.Field
            aria-label="AM/PM"
            value={meridiem ?? ''}
            onChange={(e) => {
              const v = e.currentTarget.value as 'am' | 'pm' | '';
              fire(hour, minute, v === '' ? null : v);
            }}
          >
            <option value="">--</option>
            <option value="am">AM</option>
            <option value="pm">PM</option>
          </NativeSelect.Field>
          <NativeSelect.Indicator />
        </NativeSelect.Root>
      </HStack>
    </Grid>
  );
};
