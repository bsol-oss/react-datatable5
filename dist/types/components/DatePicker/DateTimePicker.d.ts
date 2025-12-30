import { DatePickerLabels } from './DatePicker';
import { TimePickerLabels } from '../Form/components/types/CustomJSONSchema7';
interface DateTimePickerProps {
    value?: string;
    onChange?: (date?: string) => void;
    format?: 'date-time' | 'iso-date-time';
    showSeconds?: boolean;
    labels?: DatePickerLabels;
    timePickerLabels?: TimePickerLabels;
    timezone?: string;
    startTime?: string;
    minDate?: Date;
    maxDate?: Date;
    portalled?: boolean;
    defaultDate?: string;
    defaultTime?: TimeData;
}
interface TimeData12Hour {
    hour: number | null;
    minute: number | null;
    meridiem: 'am' | 'pm' | null;
}
interface TimeData24Hour {
    hour: number | null;
    minute: number | null;
    second?: number | null;
}
type TimeData = TimeData12Hour | TimeData24Hour;
export declare function DateTimePicker({ value, onChange, format, showSeconds, labels, timePickerLabels, timezone, startTime, minDate, maxDate, portalled, defaultDate, defaultTime, }: DateTimePickerProps): import("react/jsx-runtime").JSX.Element;
export {};
