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
}
export declare function DateTimePicker({ value, onChange, format, showSeconds, labels, timePickerLabels, timezone: tz, startTime, minDate, maxDate, portalled, defaultDate, defaultTime, showQuickActions, quickActionLabels, showTimezoneSelector, }: DateTimePickerProps): import("react/jsx-runtime").JSX.Element;
export {};
