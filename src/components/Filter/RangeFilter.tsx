import React from "react";
import { Box, Text, VStack } from "@chakra-ui/react";
import { Slider } from "@/components/ui/slider";
interface RangeFilterProps {
  range: [number, number];
  setRange: (value: [number, number]) => void;
  defaultValue: [number, number];
  min: number;
  max: number;
  step: number;
}

const RangeFilter: React.FC<RangeFilterProps> = ({
  range,
  setRange,
  defaultValue,
  min,
  max,
  step,
}) => {
  return (
    <Box p={8}>
      <Slider
        width="full"
        min={min}
        max={max}
        defaultValue={defaultValue}
        step={step}
        name={`Selected Range: ${range[0]} - ${range[1]}`}
        // value={field.value}
        onValueChange={(val) => setRange(val.value as [number,number])}
      />
    </Box>
  );
};

export default RangeFilter;
