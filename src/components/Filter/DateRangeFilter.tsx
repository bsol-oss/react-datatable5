import {
    Box,
    FormControl,
    FormLabel,
    Input,
    VStack
} from "@chakra-ui/react";
import React from "react";

interface DateRangeFilterProps {
  startDate: string;
  endDate: string;
  setStartDate: (value: string) => void;
  setEndDate: (value: string) => void;
}


export const DateRangeFilter: React.FC<DateRangeFilterProps> = ({
  startDate,
  endDate,
  setStartDate,
  setEndDate,
}) => {
  console.log(startDate,endDate,"dflp")
  return (
    <Box p={'1rem'}>
      <VStack spacing={4}>
        <FormControl>
          <FormLabel htmlFor="start-date">Start Date</FormLabel>
          <Input
            id="start-date"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="end-date">End Date</FormLabel>
          <Input
            id="end-date"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </FormControl>
      </VStack>
    </Box>
  );
};
