import { DateTimePickerLabels, TimePickerLabels } from '../Form/components/types/CustomJSONSchema7';
interface DateTimePickerProps {
    value?: string;
    onChange?: (date?: string) => void;
    format?: 'date-time' | 'iso-date-time';
    showSeconds?: boolean;
    labels?: DateTimePickerLabels;
    timePickerLabels?: TimePickerLabels;
    timezone?: string;
    startTime?: string;
    minDate?: Date;
    maxDate?: Date;
    /** When true, calendar portal attaches to document (recommended outside dialogs). */
    portalled?: boolean;
    defaultDate?: string;
    defaultTime?: {
        hour: number | null;
        minute: number | null;
        second?: number | null;
        meridiem?: 'am' | 'pm' | null;
    };
    showQuickActions?: boolean;
    quickActionLabels?: {
        yesterday?: string;
        today?: string;
        tomorrow?: string;
        plus7Days?: string;
    };
    showTimezoneSelector?: boolean;
    timezoneOffset?: string;
    onTimezoneOffsetChange?: (offset: string) => void;
}
export declare function DateTimePicker({ value, onChange, format, showSeconds, timezone: tz, minDate, maxDate, portalled, }: DateTimePickerProps): import("react/jsx-runtime").JSX.Element;
export {};
