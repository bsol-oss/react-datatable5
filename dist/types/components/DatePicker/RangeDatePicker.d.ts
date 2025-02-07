import { Props, RenderProps } from "dayzed";
import React from "react";
export interface RangeCalendarProps extends RenderProps {
    firstDayOfWeek?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
    selected?: Date[];
}
export interface GetStyleProps {
    today: boolean;
    selected: boolean;
    unavailable: boolean;
    isInRange: boolean;
}
export interface RangeDatePickerProps extends Props {
}
declare class RangeDatePicker extends React.Component<RangeDatePickerProps> {
    render(): import("react/jsx-runtime").JSX.Element;
}
export default RangeDatePicker;
