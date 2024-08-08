import React from "react";
import {
  Box,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  RangeSliderTrack,
  Text,
  VStack,
} from "@chakra-ui/react";

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
      <VStack spacing={4}>
        <Text>
          Selected Range: {range[0]} - {range[1]}
        </Text>
        <RangeSlider
          aria-label={["min", "max"]}
          defaultValue={defaultValue}
          min={min}
          max={max}
          step={step}
          onChangeEnd={(val) => setRange(val as [number, number])}
        >
          <RangeSliderTrack>
            <RangeSliderFilledTrack />
          </RangeSliderTrack>
          <RangeSliderThumb index={0} />
          <RangeSliderThumb index={1} />
        </RangeSlider>
      </VStack>
    </Box>
  );
};

export default RangeFilter;
