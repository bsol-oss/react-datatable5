import React from "react";
interface RangeFilterProps {
    range: [number, number];
    setRange: (value: [number, number]) => void;
    defaultValue: [number, number];
    min: number;
    max: number;
    step: number;
}
declare const RangeFilter: React.FC<RangeFilterProps>;
export default RangeFilter;
