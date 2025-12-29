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
}
export declare function DateTimePicker({ value, onChange, format, showSeconds, labels, timePickerLabels, timezone, startTime, minDate, maxDate, portalled, }: DateTimePickerProps): import("react/jsx-runtime").JSX.Element;
export {};
