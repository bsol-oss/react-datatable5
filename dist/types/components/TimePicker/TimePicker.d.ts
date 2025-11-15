import { Dispatch, SetStateAction } from 'react';
interface TimePickerProps {
    hour: number | null;
    setHour: Dispatch<SetStateAction<number | null>>;
    minute: number | null;
    setMinute: Dispatch<SetStateAction<number | null>>;
    meridiem: 'am' | 'pm' | null;
    setMeridiem: Dispatch<SetStateAction<'am' | 'pm' | null>>;
    onChange?: (newValue: {
        hour: number | null;
        minute: number | null;
        meridiem: 'am' | 'pm' | null;
    }) => void;
    meridiemLabel?: {
        am: string;
        pm: string;
    };
    timezone?: string;
    startTime?: string;
    selectedDate?: string;
}
export declare function TimePicker({ hour, setHour, minute, setMinute, meridiem, setMeridiem, meridiemLabel: _meridiemLabel, onChange, timezone, startTime, selectedDate, }: TimePickerProps): import("react/jsx-runtime").JSX.Element;
export {};
