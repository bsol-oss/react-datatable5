import React from 'react';
export interface RangeDatePickerLabels {
    monthNamesFull: string[];
    weekdayNamesShort: string[];
    backButtonLabel?: string;
    forwardButtonLabel?: string;
}
export interface RangeDatePickerProps {
    onDateSelected?: (obj: {
        selected: Date[];
        selectable: boolean;
        date: Date;
    }) => void;
    selected?: Date[];
    firstDayOfWeek?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
    /** @deprecated No-op; kept for story compatibility */
    showOutsideDays?: boolean;
    /** @deprecated No-op; kept for story compatibility */
    date?: Date;
    minDate?: Date;
    maxDate?: Date;
    monthsToDisplay?: number;
    labels?: RangeDatePickerLabels;
    withPopover?: boolean;
    open?: boolean;
    onOpenChange?: (details: {
        open: boolean;
    }) => void;
    trigger?: React.ReactNode;
    displayFormat?: string;
    placeholder?: string;
    closeOnInteractOutside?: boolean;
    portalled?: boolean;
    /** IANA timezone for wall dates */
    timezone?: string;
}
declare const RangeDatePicker: React.FC<RangeDatePickerProps>;
export default RangeDatePicker;
