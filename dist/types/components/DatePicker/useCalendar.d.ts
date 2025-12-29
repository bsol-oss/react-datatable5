export interface CalendarDate {
    date: Date;
    selected: boolean;
    selectable: boolean;
    today: boolean;
    isCurrentMonth: boolean;
}
export interface Calendar {
    month: number;
    year: number;
    weeks: Array<Array<CalendarDate | null>>;
}
export interface UseCalendarProps {
    selected?: Date | Date[];
    firstDayOfWeek?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
    showOutsideDays?: boolean;
    date?: Date;
    minDate?: Date;
    maxDate?: Date;
    monthsToDisplay?: number;
    onDateSelected?: (obj: {
        date: Date;
        selected: Date | Date[];
    }) => void;
}
export interface CalendarRenderProps {
    calendars: Calendar[];
    getBackProps: (props?: {
        calendars?: Calendar[];
        offset?: number;
    }) => {
        onClick: () => void;
    };
    getForwardProps: (props?: {
        calendars?: Calendar[];
        offset?: number;
    }) => {
        onClick: () => void;
    };
    getDateProps: (props: {
        dateObj: CalendarDate;
        onMouseEnter?: () => void;
    }) => {
        onClick: () => void;
        onMouseEnter?: () => void;
    };
}
export declare function useCalendar({ selected, firstDayOfWeek, showOutsideDays, date, minDate, maxDate, monthsToDisplay, onDateSelected, }: UseCalendarProps): CalendarRenderProps;
