import { Dispatch, SetStateAction } from 'react';
import { TimePickerLabels } from '../Form/components/types/CustomJSONSchema7';
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
    startTime?: string;
    selectedDate?: string;
    timezone?: string;
    portalled?: boolean;
    labels?: TimePickerLabels;
}
export declare const TimePicker: ({ hour, setHour, minute, setMinute, meridiem, setMeridiem, onChange, startTime, selectedDate, timezone, portalled, labels, }: TimePickerProps) => import("react/jsx-runtime").JSX.Element;
export {};
