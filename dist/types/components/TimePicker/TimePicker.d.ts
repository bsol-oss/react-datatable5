import React from 'react';
import { TimePickerLabels } from '../Form/components/types/CustomJSONSchema7';
export interface TimePickerProps {
    hour: number | null;
    setHour: (hour: number | null) => void;
    minute: number | null;
    setMinute: (minute: number | null) => void;
    meridiem: 'am' | 'pm' | null;
    setMeridiem: (meridiem: 'am' | 'pm' | null) => void;
    onChange?: (params: {
        hour: number | null;
        minute: number | null;
        meridiem: 'am' | 'pm' | null;
    }) => void;
    format?: '12h' | '24h';
    showSeconds?: boolean;
    startTime?: string;
    selectedDate?: string;
    timezone?: string;
    portalled?: boolean;
    labels?: TimePickerLabels;
}
export declare const TimePicker: React.FC<TimePickerProps>;
