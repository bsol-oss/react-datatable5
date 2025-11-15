import { Props, RenderProps } from '@bsol-oss/dayzed-react19';
import React from 'react';
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
export interface RangeDatePickerLabels {
    monthNamesFull: string[];
    weekdayNamesShort: string[];
    backButtonLabel?: string;
    forwardButtonLabel?: string;
}
export interface RangeDatePickerProps extends Props {
    onDateSelected?: (obj: {
        selected: Date[];
        selectable: boolean;
        date: Date;
    }) => void;
    selected?: Date[];
    firstDayOfWeek?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
    showOutsideDays?: boolean;
    date?: Date;
    minDate?: Date;
    maxDate?: Date;
    monthsToDisplay?: number;
    labels?: RangeDatePickerLabels;
    /**
     * Whether to render the calendar in a popover with a trigger button.
     * @default true
     */
    withPopover?: boolean;
    /**
     * Controlled open state for the popover.
     */
    open?: boolean;
    /**
     * Callback when the popover open state changes.
     */
    onOpenChange?: (details: {
        open: boolean;
    }) => void;
    /**
     * The trigger button element. If not provided, a default button will be rendered.
     */
    trigger?: React.ReactNode;
    /**
     * Format string for displaying the selected date range in the trigger button.
     * @default "YYYY-MM-DD"
     */
    displayFormat?: string;
    /**
     * Placeholder text for the trigger button when no dates are selected.
     */
    placeholder?: string;
    /**
     * Whether to close the popover when clicking outside.
     * @default true
     */
    closeOnInteractOutside?: boolean;
    /**
     * Whether to portal the popover content.
     * @default true
     */
    portalled?: boolean;
    render?: (dayzedData: RenderProps) => React.ReactNode;
}
declare const RangeDatePicker: React.FC<RangeDatePickerProps>;
export default RangeDatePicker;
