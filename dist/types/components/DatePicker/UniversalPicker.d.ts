type FormatType = "date" | "time" | "date-time" | "iso-time" | "iso-date-time" | "duration";
interface UniversalPickerProps {
    format: FormatType;
    value?: string | null;
    onChange?: (value: string | null) => void;
    placeholder?: string;
}
export declare function UniversalPicker({ format, value, onChange, placeholder, }: UniversalPickerProps): import("react/jsx-runtime").JSX.Element;
export {};
