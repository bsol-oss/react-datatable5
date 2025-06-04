import { Button, Flex, Grid, Text } from "@chakra-ui/react";
import { useState } from "react";
import DatePicker from "./DatePicker";
import { TimePicker } from "../TimePicker/TimePicker";
import { IsoTimePicker } from "./IsoTimePicker";
import dayjs from "dayjs";

interface DateTimePickerProps {
  value?: Date | null;
  onChange?: (date: Date | null) => void;
  format?: "date-time" | "iso-date-time";
  showSeconds?: boolean;
}

export function DateTimePicker({
  value,
  onChange,
  format = "date-time",
  showSeconds = false,
}: DateTimePickerProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(value || null);
  
  // Time state for 12-hour format
  const [hour12, setHour12] = useState<number | null>(
    value ? (value.getHours() % 12 || 12) : null
  );
  const [minute, setMinute] = useState<number | null>(
    value ? value.getMinutes() : null
  );
  const [meridiem, setMeridiem] = useState<"am" | "pm" | null>(
    value ? (value.getHours() >= 12 ? "pm" : "am") : null
  );

  // Time state for 24-hour format
  const [hour24, setHour24] = useState<number | null>(
    value ? value.getHours() : null
  );
  const [second, setSecond] = useState<number | null>(
    value ? value.getSeconds() : null
  );

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
    updateDateTime(date);
  };

  const handleTimeChange = (timeData: any) => {
    if (format === "iso-date-time") {
      setHour24(timeData.hour);
      setMinute(timeData.minute);
      if (showSeconds) setSecond(timeData.second);
    } else {
      setHour12(timeData.hour);
      setMinute(timeData.minute);
      setMeridiem(timeData.meridiem);
    }
    updateDateTime(selectedDate, timeData);
  };

  const updateDateTime = (date: Date | null, timeData?: any) => {
    if (!date) {
      onChange?.(null);
      return;
    }

    const newDate = new Date(date);
    
    if (format === "iso-date-time") {
      const h = timeData?.hour ?? hour24;
      const m = timeData?.minute ?? minute;
      const s = showSeconds ? (timeData?.second ?? second) : 0;
      
      if (h !== null) newDate.setHours(h);
      if (m !== null) newDate.setMinutes(m);
      if (s !== null) newDate.setSeconds(s);
    } else {
      const h = timeData?.hour ?? hour12;
      const m = timeData?.minute ?? minute;
      const mer = timeData?.meridiem ?? meridiem;
      
      if (h !== null && mer !== null) {
        let hour24 = h;
        if (mer === "am" && h === 12) hour24 = 0;
        else if (mer === "pm" && h < 12) hour24 = h + 12;
        newDate.setHours(hour24);
      }
      if (m !== null) newDate.setMinutes(m);
      newDate.setSeconds(0);
    }

    onChange?.(newDate);
  };

  const handleClear = () => {
    setSelectedDate(null);
    setHour12(null);
    setHour24(null);
    setMinute(null);
    setSecond(null);
    setMeridiem(null);
    onChange?.(null);
  };

  const isISO = format === "iso-date-time";

  return (
    <Flex direction="column" gap={4} p={4} border="1px solid" borderColor="gray.200" borderRadius="md">
      <Text fontWeight="bold">
        {isISO ? "ISO Date Time Picker" : "Date Time Picker"}
      </Text>
      
      <DatePicker
        selected={selectedDate ? [selectedDate] : []}
        onDateSelected={({ date }: { date: Date }) => handleDateChange(date)}
        monthsToDisplay={1}
      />

      <Grid templateColumns="1fr auto" alignItems="center" gap={4}>
        {isISO ? (
          <IsoTimePicker
            hour={hour24}
            setHour={setHour24}
            minute={minute}
            setMinute={setMinute}
            second={second}
            setSecond={setSecond}
            onChange={handleTimeChange}
          />
        ) : (
          <TimePicker
            hour={hour12}
            setHour={setHour12}
            minute={minute}
            setMinute={setMinute}
            meridiem={meridiem}
            setMeridiem={setMeridiem}
            onChange={handleTimeChange}
          />
        )}
        
        <Button onClick={handleClear} size="sm" variant="outline" colorScheme="red">
          Clear All
        </Button>
      </Grid>

      {selectedDate && (
        <Text fontSize="sm" color="gray.600">
          Selected: {dayjs(selectedDate).format(
            isISO 
              ? (showSeconds ? "YYYY-MM-DD HH:mm:ss" : "YYYY-MM-DD HH:mm")
              : "YYYY-MM-DD hh:mm A"
          )}
        </Text>
      )}
    </Flex>
  );
} 