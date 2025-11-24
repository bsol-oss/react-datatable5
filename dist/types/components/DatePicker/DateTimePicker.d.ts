import { DatePickerLabels } from './DatePicker';
interface DateTimePickerProps {
    value?: string;
    onChange?: (date?: string) => void;
    format?: 'date-time' | 'iso-date-time';
    showSeconds?: boolean;
    labels?: DatePickerLabels;
    timezone?: string;
    startTime?: string;
    minDate?: Date;
    maxDate?: Date;
    portalled?: boolean;
}
export declare function DateTimePicker({ value, onChange, format, showSeconds, labels, timezone, startTime, minDate, maxDate, portalled, }: DateTimePickerProps): import("react/jsx-runtime").JSX.Element;
export {};
