interface DurationPickerProps {
    value?: string | null;
    onChange?: (duration: string | null) => void;
    showYears?: boolean;
    showMonths?: boolean;
    showDays?: boolean;
    showHours?: boolean;
    showMinutes?: boolean;
    showSeconds?: boolean;
}
export declare function DurationPicker({ value, onChange, showYears, showMonths, showDays, showHours, showMinutes, showSeconds, }: DurationPickerProps): import("react/jsx-runtime").JSX.Element;
export {};
