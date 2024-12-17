import { Box,Input, VStack } from "@chakra-ui/react";
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
  console.log(startDate, endDate, "dflp");
  return (
    <Box p={"1rem"}>
      <VStack>
        <Box>
          <Box>Start Date</Box>
          <Input
            id="start-date"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </Box>
        <Box>
          <Box>End Date</Box>
          <Input
            id="end-date"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </Box>
      </VStack>
    </Box>
  );
};
