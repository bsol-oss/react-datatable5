import React from "react";
interface DateRangeFilterProps {
    startDate: string;
    endDate: string;
    setStartDate: (value: string) => void;
    setEndDate: (value: string) => void;
}
export declare const DateRangeFilter: React.FC<DateRangeFilterProps>;
export {};
