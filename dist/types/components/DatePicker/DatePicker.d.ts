import { Props, RenderProps } from "dayzed";
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
}
declare class DatePicker extends React.Component<DatePickerProps> {
    render(): import("react/jsx-runtime").JSX.Element;
}
export default DatePicker;
