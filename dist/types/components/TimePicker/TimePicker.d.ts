interface TimePickerProps {
    hour: number;
    setHour: (hour: number) => void;
    minute: number;
    setMinute: (minute: number) => void;
    meridiem: "am" | "pm";
    setMeridiem: (meridiem: "am" | "pm") => void;
    onChange?: (newValue: {
        hour: number;
        minute: number;
        meridiem: "am" | "pm";
    }) => void;
    meridiemLabel?: {
        am: string;
        pm: string;
    };
}
export declare function TimePicker({ hour, setHour, minute, setMinute, meridiem, setMeridiem, meridiemLabel, onChange, }: TimePickerProps): import("react/jsx-runtime").JSX.Element;
export {};
