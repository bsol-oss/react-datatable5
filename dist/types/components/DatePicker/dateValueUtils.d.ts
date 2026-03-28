import { CalendarDate } from '@internationalized/date';
import type { DateValue } from '@chakra-ui/react';
/** Wall calendar date in timezone → CalendarDate for Chakra DatePicker */
export declare function toCalendarDate(d: Date, tz: string): CalendarDate;
export declare function stringToCalendarDateValue(str: string | undefined, tz: string): DateValue[];
export declare function stringsToRangeValue(strs: string[] | undefined, tz: string, dateFormat: string): DateValue[];
export declare function calendarDateValueToString(v: DateValue | undefined, tz: string, format: string): string | undefined;
export declare function rangeValueToDateStrings(values: DateValue[], tz: string, format: string): string[];
/** CalendarDate at midnight in tz as JS Date (for filters using Date[]) */
export declare function dateValueToFilterDate(v: DateValue, tz: string): Date;
