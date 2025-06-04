import { DatePickerLabels } from "./DatePicker";
interface DateTimePickerProps {
    value?: string;
    onChange?: (date?: string) => void;
    format?: "date-time" | "iso-date-time";
    showSeconds?: boolean;
    labels?: DatePickerLabels;
    timezone?: string;
}
export declare function DateTimePicker({ value, onChange, format, showSeconds, labels, timezone, }: DateTimePickerProps): import("react/jsx-runtime").JSX.Element;
export {};
