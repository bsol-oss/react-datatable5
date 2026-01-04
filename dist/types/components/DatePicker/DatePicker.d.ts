import React from 'react';
import { type CalendarRenderProps } from './useCalendar';
export interface CalendarProps extends CalendarRenderProps {
    firstDayOfWeek?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
}
export interface GetDateColorProps {
    today: boolean;
    selected: boolean;
    selectable: boolean;
}
export interface GetVariantProps {
    today: boolean;
    selected: boolean;
    selectable: boolean;
}
export interface DatePickerProps {
    onDateSelected?: (obj: {
        date: Date;
        selected: Date | Date[];
    }) => void;
    selected: Date | Date[];
    firstDayOfWeek?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
    showOutsideDays?: boolean;
    date?: Date;
    minDate?: Date;
    maxDate?: Date;
    monthsToDisplay?: number;
    labels?: {
        monthNamesShort: string[];
        weekdayNamesShort: string[];
        backButtonLabel?: string;
        forwardButtonLabel?: string;
        todayLabel?: string;
        yesterdayLabel?: string;
        tomorrowLabel?: string;
    };
    render?: (calendarData: CalendarRenderProps) => React.ReactNode;
}
export interface DatePickerLabels {
    monthNamesShort: string[];
    weekdayNamesShort: string[];
    backButtonLabel?: string;
    forwardButtonLabel?: string;
    todayLabel?: string;
    yesterdayLabel?: string;
    tomorrowLabel?: string;
}
export declare const DatePickerContext: React.Context<{
    labels: DatePickerLabels;
}>;
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
export declare function DatePickerInput({ value, onChange, placeholder, dateFormat, displayFormat, labels, timezone, minDate, maxDate, firstDayOfWeek, showOutsideDays, monthsToDisplay, insideDialog, readOnly, showHelperButtons, }: DatePickerInputProps): import("react/jsx-runtime").JSX.Element;
