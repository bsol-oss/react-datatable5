import { Dispatch, SetStateAction } from 'react';
interface IsoTimePickerProps {
    hour: number | null;
    setHour: Dispatch<SetStateAction<number | null>>;
    minute: number | null;
    setMinute: Dispatch<SetStateAction<number | null>>;
    second: number | null;
    setSecond: Dispatch<SetStateAction<number | null>>;
    onChange?: (newValue: {
        hour: number | null;
        minute: number | null;
        second: number | null;
    }) => void;
    startTime?: string;
    selectedDate?: string;
    timezone?: string;
    portalled?: boolean;
}
export declare function IsoTimePicker({ hour, setHour, minute, setMinute, second, setSecond, onChange, startTime, selectedDate, timezone, portalled, }: IsoTimePickerProps): import("react/jsx-runtime").JSX.Element;
export {};
