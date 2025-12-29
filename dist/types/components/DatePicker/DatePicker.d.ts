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
    };
    render?: (calendarData: CalendarRenderProps) => React.ReactNode;
}
export interface DatePickerLabels {
    monthNamesShort: string[];
    weekdayNamesShort: string[];
    backButtonLabel?: string;
    forwardButtonLabel?: string;
}
declare const DatePicker: React.FC<DatePickerProps>;
export default DatePicker;
