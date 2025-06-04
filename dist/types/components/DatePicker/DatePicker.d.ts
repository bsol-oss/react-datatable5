import { Props, RenderProps } from "@bsol-oss/dayzed-react19";
import React from "react";
export interface CalendarProps extends RenderProps {
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
export interface DatePickerProps extends Props {
    onDateSelected?: (obj: {
        date: Date;
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
    render?: (dayzedData: any) => React.ReactNode;
}
export interface DatePickerLabels {
    monthNamesShort: string[];
    weekdayNamesShort: string[];
    backButtonLabel?: string;
    forwardButtonLabel?: string;
}
declare class DatePicker extends React.Component<DatePickerProps> {
    render(): import("react/jsx-runtime").JSX.Element;
}
export default DatePicker;
