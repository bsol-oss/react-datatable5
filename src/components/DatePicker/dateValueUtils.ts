import { CalendarDate } from '@internationalized/date';
import type { DateValue } from '@chakra-ui/react';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);
dayjs.extend(timezone);

/** Wall calendar date in timezone → CalendarDate for Chakra DatePicker */
export function toCalendarDate(d: Date, tz: string): CalendarDate {
  const dj = dayjs(d).tz(tz);
  return new CalendarDate(dj.year(), dj.month() + 1, dj.date());
}

export function stringToCalendarDateValue(
  str: string | undefined,
  tz: string
): DateValue[] {
  if (!str) return [];
  const dj = dayjs(str).tz(tz);
  if (!dj.isValid()) return [];
  return [new CalendarDate(dj.year(), dj.month() + 1, dj.date())];
}

export function stringsToRangeValue(
  strs: string[] | undefined,
  tz: string,
  dateFormat: string
): DateValue[] {
  if (!strs?.length) return [];
  const out: DateValue[] = [];
  for (const s of strs) {
    const dj = dayjs(s, dateFormat, true).tz(tz);
    const d = dj.isValid() ? dj : dayjs(s).tz(tz);
    if (d.isValid()) {
      out.push(new CalendarDate(d.year(), d.month() + 1, d.date()));
    }
  }
  return out;
}

export function calendarDateValueToString(
  v: DateValue | undefined,
  tz: string,
  format: string
): string | undefined {
  if (!v || !('year' in v)) return undefined;
  const cal = v as CalendarDate;
  const iso = `${cal.year}-${String(cal.month).padStart(2, '0')}-${String(cal.day).padStart(2, '0')}`;
  return dayjs.tz(iso, tz).format(format);
}

export function rangeValueToDateStrings(
  values: DateValue[],
  tz: string,
  format: string
): string[] {
  if (values.length < 2) return [];
  const a = calendarDateValueToString(values[0], tz, format);
  const b = calendarDateValueToString(values[1], tz, format);
  if (!a || !b) return [];
  return [a, b];
}

/** CalendarDate at midnight in tz as JS Date (for filters using Date[]) */
export function dateValueToFilterDate(v: DateValue, tz: string): Date {
  const cal = v as CalendarDate;
  return dayjs
    .tz(
      `${cal.year}-${String(cal.month).padStart(2, '0')}-${String(cal.day).padStart(2, '0')}`,
      tz
    )
    .startOf('day')
    .toDate();
}
