import { Slider } from "@/components/ui/slider";
import { Flex, Text } from "@chakra-ui/react";
import React from "react";
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
    <Flex p={2} gap={2} flexFlow={'column'}>
      <Text>{`${range[0]} - ${range[1]}`}</Text>
      <Slider
        width="full"
        min={min}
        max={max}
        defaultValue={defaultValue}
        step={step}
        name={`Selected Range: ${range[0]} - ${range[1]}`}
        // value={field.value}
        onValueChange={(val) => setRange(val.value as [number, number])}
      />
    </Flex>
  );
};

export default RangeFilter;
