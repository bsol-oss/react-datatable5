import { DatePickerLabels } from './DatePicker';
export interface DatePickerInputProps {
    value?: string | Date;
    onChange?: (date?: string) => void;
    placeholder?: string;
    dateFormat?: string;
    displayFormat?: string;
    labels?: DatePickerLabels;
    timezone?: string;
    minDate?: Date;
    maxDate?: Date;
    firstDayOfWeek?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
    showOutsideDays?: boolean;
    monthsToDisplay?: number;
    insideDialog?: boolean;
    readOnly?: boolean;
}
export declare function DatePickerInput({ value, onChange, placeholder, dateFormat, displayFormat, labels, timezone, minDate, maxDate, firstDayOfWeek, showOutsideDays, monthsToDisplay, insideDialog, readOnly, }: DatePickerInputProps): import("react/jsx-runtime").JSX.Element;
