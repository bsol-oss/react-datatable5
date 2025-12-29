/// <reference types="react" />
export interface CalendarEvent<TData = unknown> {
    data: TData;
    date: Date;
    title?: string;
    color?: string;
}
export interface CalendarDisplayProps<TData = unknown> {
    /**
     * Column ID or accessor key that contains the date for each event
     */
    dateColumn: string;
    /**
     * Optional function to extract date from row data
     * If not provided, will use the dateColumn to get the date
     */
    getDate?: (row: TData) => Date | string | number | null | undefined;
    /**
     * Optional function to get event title from row data
     * If not provided, will use the first column's value
     */
    getEventTitle?: (row: TData) => string;
    /**
     * Optional function to get event color from row data
     */
    getEventColor?: (row: TData) => string;
    /**
     * Optional function to render event content
     */
    renderEvent?: (event: CalendarEvent<TData>) => React.ReactNode;
    /**
     * First day of week (0 = Sunday, 1 = Monday, etc.)
     */
    firstDayOfWeek?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
    /**
     * Show days outside the current month
     */
    showOutsideDays?: boolean;
    /**
     * Number of months to display
     */
    monthsToDisplay?: number;
    /**
     * Calendar labels
     */
    labels?: {
        monthNamesShort: string[];
        weekdayNamesShort: string[];
        backButtonLabel?: string;
        forwardButtonLabel?: string;
    };
    /**
     * Callback when a date is clicked
     */
    onDateClick?: (date: Date, events: CalendarEvent<TData>[]) => void;
    /**
     * Callback when an event is clicked
     */
    onEventClick?: (event: CalendarEvent<TData>) => void;
    /**
     * Maximum number of events to show per day before showing "+N more"
     */
    maxEventsPerDay?: number;
    /**
     * Color palette for the calendar
     */
    colorPalette?: 'gray' | 'red' | 'orange' | 'yellow' | 'green' | 'teal' | 'blue' | 'cyan' | 'purple' | 'pink';
    /**
     * Fixed placeholder text to show when width is too narrow
     * @default "..."
     */
    eventPlaceholder?: string;
    /**
     * Minimum width (in pixels) before showing placeholder instead of title
     * @default 80
     */
    minEventWidth?: number;
    /**
     * Minimum number of characters to show before ellipsis
     * @default 2
     */
    minCharsBeforeEllipsis?: number;
}
export declare function CalendarDisplay<TData = unknown>({ dateColumn, getDate, getEventTitle, getEventColor, renderEvent, firstDayOfWeek, showOutsideDays, monthsToDisplay, labels, onDateClick, onEventClick, maxEventsPerDay, colorPalette, eventPlaceholder, minEventWidth, minCharsBeforeEllipsis, }: CalendarDisplayProps<TData>): import("react/jsx-runtime").JSX.Element | null;
