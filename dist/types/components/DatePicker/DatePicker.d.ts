import React from 'react';
import type { DatePickerLabels, DatePickerProps } from './datePickerTypes';
export type { CalendarProps, GetDateColorProps, GetVariantProps, DatePickerLabels, DatePickerProps, } from './datePickerTypes';
export { DatePickerContext } from './datePickerContext';
/**
 * Inline single-date calendar (Chakra DatePicker). Used by UniversalPicker and stories.
 */
declare const DatePicker: React.FC<DatePickerProps>;
export default DatePicker;
export interface DatePickerInputProps {
    value?: string | Date;
    onChange?: (date?: string) => void;
    placeholder?: string;
    dateFormat?: string;
    displayFormat?: string;
    labels?: DatePickerLabels;
    timezone?: string;
    minDate?: Date;
    maxDate?: Date;
    firstDayOfWeek?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
    showOutsideDays?: boolean;
    monthsToDisplay?: number;
    insideDialog?: boolean;
    readOnly?: boolean;
    showHelperButtons?: boolean;
}
export declare function DatePickerInput({ value, onChange, placeholder, dateFormat, displayFormat, timezone, minDate, maxDate, insideDialog, readOnly, }: DatePickerInputProps): import("react/jsx-runtime").JSX.Element;
