import { Box, Grid, Text, VStack } from "@chakra-ui/react";
import { useState } from "react";
import DatePicker from "./DatePicker";
import { TimePicker } from "../TimePicker/TimePicker";
import { IsoTimePicker } from "./IsoTimePicker";
import { DurationPicker } from "./DurationPicker";
import dayjs from "dayjs";
import { DateTimePicker } from "./DateTimePicker";
import { UniversalPicker } from "./UniversalPicker";

export function PickerDemo() {
  // Date picker state
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  // Time picker state (12-hour)
  const [hour12, setHour12] = useState<number | null>(null);
  const [minute, setMinute] = useState<number | null>(null);
  const [meridiem, setMeridiem] = useState<"am" | "pm" | null>(null);

  // ISO Time picker state (24-hour)
  const [hour24, setHour24] = useState<number | null>(null);
  const [minute24, setMinute24] = useState<number | null>(null);
  const [second24, setSecond24] = useState<number | null>(null);

  // Duration picker state
  const [duration, setDuration] = useState<string | null>(null);

  // DateTime picker state
  const [dateTime, setDateTime] = useState<Date | null>(null);
  const [dateTimeISO, setDateTimeISO] = useState<Date | null>(null);

  const formatValue = (value: any, type: string) => {
    if (!value) return "No value selected";

    switch (type) {
      case "date":
        return dayjs(value).format("YYYY-MM-DD");
      case "time-12":
        if (hour12 && minute !== null && meridiem) {
          let hour24Format = hour12;
          if (meridiem === "am" && hour12 === 12) hour24Format = 0;
          else if (meridiem === "pm" && hour12 < 12) hour24Format = hour12 + 12;
          return `${hour24Format.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}:00Z`;
        }
        return "Incomplete time";
      case "iso-time":
        if (hour24 !== null && minute24 !== null) {
          const h = hour24.toString().padStart(2, "0");
          const m = minute24.toString().padStart(2, "0");
          const s = (second24 || 0).toString().padStart(2, "0");
          return `${h}:${m}:${s}`;
        }
        return "Incomplete time";
      case "duration":
        return value;
      case "date-time":
        return dayjs(value).format("YYYY-MM-DD HH:mm:ss");
      default:
        return JSON.stringify(value);
    }
  };

  return (
    <Box p={6}>
      <Text fontSize="2xl" fontWeight="bold" mb={6}>
        Date/Time Picker Components Demo
      </Text>

      <Grid templateColumns="repeat(auto-fit, minmax(400px, 1fr))" gap={6}>
        {/* Date Picker */}
        <VStack
          gap={4}
          p={4}
          border="1px solid"
          borderColor="gray.200"
          borderRadius="md"
          align="start"
        >
          <Text fontSize="lg" fontWeight="semibold">
            Date Picker
          </Text>
          <Text fontSize="sm" color="gray.600">
            Format: date (YYYY-MM-DD)
          </Text>

          <DatePicker
            selected={selectedDate ? [selectedDate] : []}
            onDateSelected={({ date }: { date: Date }) => setSelectedDate(date)}
            monthsToDisplay={1}
          />

          <Box>
            <Text fontWeight="medium">Selected Value:</Text>
            <Text fontFamily="mono" fontSize="sm" p={2} borderRadius="md">
              {formatValue(selectedDate, "date")}
            </Text>
          </Box>
        </VStack>

        {/* Time Picker (12-hour) */}
        <VStack
          gap={4}
          p={4}
          border="1px solid"
          borderColor="gray.200"
          borderRadius="md"
          align="start"
        >
          <Text fontSize="lg" fontWeight="semibold">
            Time Picker (12-hour)
          </Text>
          <Text fontSize="sm" color="gray.600">
            Format: time (HH:mm:ss with timezone)
          </Text>

          <TimePicker
            hour={hour12}
            setHour={setHour12}
            minute={minute}
            setMinute={setMinute}
            meridiem={meridiem}
            setMeridiem={setMeridiem}
            onChange={(timeData) => {
              setHour12(timeData.hour);
              setMinute(timeData.minute);
              setMeridiem(timeData.meridiem);
            }}
          />

          <Box>
            <Text fontWeight="medium">Selected Value:</Text>
            <Text fontFamily="mono" fontSize="sm" p={2} borderRadius="md">
              {formatValue(
                { hour: hour12, minute: minute, meridiem: meridiem },
                "time-12"
              )}
            </Text>
          </Box>
        </VStack>

        {/* ISO Time Picker (24-hour) */}
        <VStack
          gap={4}
          p={4}
          border="1px solid"
          borderColor="gray.200"
          borderRadius="md"
          align="start"
        >
          <Text fontSize="lg" fontWeight="semibold">
            ISO Time Picker (24-hour)
          </Text>
          <Text fontSize="sm" color="gray.600">
            Format: iso-time (HH:mm:ss)
          </Text>

          <IsoTimePicker
            hour={hour24}
            setHour={setHour24}
            minute={minute24}
            setMinute={setMinute24}
            second={second24}
            setSecond={setSecond24}
            onChange={(timeData) => {
              setHour24(timeData.hour);
              setMinute24(timeData.minute);
              setSecond24(timeData.second);
            }}
          />

          <Box>
            <Text fontWeight="medium">Selected Value:</Text>
            <Text fontFamily="mono" fontSize="sm" p={2} borderRadius="md">
              {formatValue(
                { hour: hour24, minute: minute24, second: second24 },
                "iso-time"
              )}
            </Text>
          </Box>
        </VStack>

        {/* Duration Picker */}
        <VStack
          gap={4}
          p={4}
          border="1px solid"
          borderColor="gray.200"
          borderRadius="md"
          align="start"
        >
          <Text fontSize="lg" fontWeight="semibold">
            Duration Picker
          </Text>
          <Text fontSize="sm" color="gray.600">
            Format: duration (ISO 8601 - P1Y2M3DT4H5M6S)
          </Text>

          <DurationPicker value={duration} onChange={setDuration} />

          <Box>
            <Text fontWeight="medium">Selected Value:</Text>
            <Text fontFamily="mono" fontSize="sm" p={2} borderRadius="md">
              {formatValue(duration, "duration")}
            </Text>
          </Box>
        </VStack>

        {/* DateTime Picker */}
        <VStack
          gap={4}
          p={4}
          border="1px solid"
          borderColor="gray.200"
          borderRadius="md"
          align="start"
        >
          <Text fontSize="lg" fontWeight="semibold">
            DateTime Picker
          </Text>
          <Text fontSize="sm" color="gray.600">
            Format: date-time (YYYY-MM-DD HH:mm:ss)
          </Text>

          <DateTimePicker
            value={dateTime?.toISOString()}
            onChange={(date) => {
              if (date) {
                setDateTime(new Date(date));
              }
            }}
            format="date-time"
          />

          <Box>
            <Text fontWeight="medium">Selected Value:</Text>
            <Text fontFamily="mono" fontSize="sm" p={2} borderRadius="md">
              {formatValue(dateTime, "date-time")}
            </Text>
          </Box>
        </VStack>

        {/* DateTime Picker (ISO) */}
        <VStack
          gap={4}
          p={4}
          border="1px solid"
          borderColor="gray.200"
          borderRadius="md"
          align="start"
        >
          <Text fontSize="lg" fontWeight="semibold">
            DateTime Picker (ISO)
          </Text>
          <Text fontSize="sm" color="gray.600">
            Format: iso-date-time (YYYY-MM-DD HH:mm:ss)
          </Text>

          <DateTimePicker
            value={dateTimeISO}
            onChange={setDateTimeISO}
            format="iso-date-time"
          />

          <Box>
            <Text fontWeight="medium">Selected Value:</Text>
            <Text fontFamily="mono" fontSize="sm" p={2} borderRadius="md">
              {formatValue(dateTimeISO, "iso-date-time")}
            </Text>
          </Box>
        </VStack>

        {/* Universal Picker */}
        <VStack
          gap={4}
          p={4}
          border="1px solid"
          borderColor="gray.200"
          borderRadius="md"
          align="start"
        >
          <Text fontSize="lg" fontWeight="semibold">
            Universal Picker
          </Text>
          <Text fontSize="sm" color="gray.600">
            Format: universal (date, time, date-time, iso-time, iso-date-time,
            duration)
          </Text>

          <UniversalPicker
            format="date-time"
            value={dateTime?.toISOString() || null}
            onChange={(value) => {
              if (value) {
                setDateTime(new Date(value));
              }
            }}
          />
        </VStack>
      </Grid>

      <Box mt={8} p={4} borderRadius="md">
        <Text fontWeight="bold" mb={2}>
          Available Formats:
        </Text>
        <VStack gap={1} align="start">
          <Text fontSize="sm">
            <strong>date:</strong> YYYY-MM-DD (e.g., 2024-01-15)
          </Text>
          <Text fontSize="sm">
            <strong>time:</strong> HH:mm:ss with timezone (e.g., 14:30:00Z)
          </Text>
          <Text fontSize="sm">
            <strong>date-time:</strong> Full datetime with timezone (e.g.,
            2024-01-15T14:30:00Z)
          </Text>
          <Text fontSize="sm">
            <strong>iso-time:</strong> HH:mm:ss without timezone (e.g.,
            14:30:00)
          </Text>
          <Text fontSize="sm">
            <strong>iso-date-time:</strong> Full datetime without timezone
            (e.g., 2024-01-15T14:30:00)
          </Text>
          <Text fontSize="sm">
            <strong>duration:</strong> ISO 8601 duration (e.g., P1Y2M3DT4H5M6S)
          </Text>
        </VStack>
      </Box>
    </Box>
  );
}
