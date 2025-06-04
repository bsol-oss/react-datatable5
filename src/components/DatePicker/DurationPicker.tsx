import { Grid, Text, Button, Input, Flex, Box } from "@chakra-ui/react";
import { useRef, KeyboardEvent, Dispatch, SetStateAction, useState, useEffect } from "react";
import { MdCancel } from "react-icons/md";

interface DurationValue {
  years: number | null;
  months: number | null;
  days: number | null;
  hours: number | null;
  minutes: number | null;
  seconds: number | null;
}

interface DurationPickerProps {
  value?: string | null; // ISO 8601 duration string like "P1Y2M3DT4H5M6S"
  onChange?: (duration: string | null) => void;
  showYears?: boolean;
  showMonths?: boolean;
  showDays?: boolean;
  showHours?: boolean;
  showMinutes?: boolean;
  showSeconds?: boolean;
}

export function DurationPicker({
  value,
  onChange,
  showYears = true,
  showMonths = true,
  showDays = true,
  showHours = true,
  showMinutes = true,
  showSeconds = true,
}: DurationPickerProps) {
  // Parse initial value
  const parseDuration = (durationStr: string | null | undefined): DurationValue => {
    if (!durationStr) {
      return { years: null, months: null, days: null, hours: null, minutes: null, seconds: null };
    }

    // Match ISO 8601 duration format: P[n]Y[n]M[n]DT[n]H[n]M[n]S
    const regex = /^P(?:(\d+)Y)?(?:(\d+)M)?(?:(\d+)D)?(?:T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?)?$/;
    const match = durationStr.match(regex);
    
    if (!match) {
      return { years: null, months: null, days: null, hours: null, minutes: null, seconds: null };
    }

    return {
      years: match[1] ? parseInt(match[1], 10) : null,
      months: match[2] ? parseInt(match[2], 10) : null,
      days: match[3] ? parseInt(match[3], 10) : null,
      hours: match[4] ? parseInt(match[4], 10) : null,
      minutes: match[5] ? parseInt(match[5], 10) : null,
      seconds: match[6] ? parseInt(match[6], 10) : null,
    };
  };

  const [duration, setDuration] = useState<DurationValue>(parseDuration(value));

  // Update when external value changes
  useEffect(() => {
    setDuration(parseDuration(value));
  }, [value]);

  // Convert duration object to ISO 8601 string
  const toDurationString = (dur: DurationValue): string | null => {
    const { years, months, days, hours, minutes, seconds } = dur;
    
    // Check if all values are null
    if (!years && !months && !days && !hours && !minutes && !seconds) {
      return null;
    }

    let result = "P";
    
    // Date part
    if (years) result += `${years}Y`;
    if (months) result += `${months}M`;
    if (days) result += `${days}D`;
    
    // Time part
    const hasTimePart = hours || minutes || seconds;
    if (hasTimePart) {
      result += "T";
      if (hours) result += `${hours}H`;
      if (minutes) result += `${minutes}M`;
      if (seconds) result += `${seconds}S`;
    }

    return result === "P" ? null : result;
  };

  // Handle value changes
  const handleValueChange = (field: keyof DurationValue, newValue: number | null) => {
    const newDuration = { ...duration, [field]: newValue };
    setDuration(newDuration);
    
    const durationString = toDurationString(newDuration);
    onChange?.(durationString);
  };

  // Handle input key events
  const handleKeyDown = (
    e: KeyboardEvent<HTMLInputElement>,
    field: keyof DurationValue
  ) => {
    if (e.key === "Backspace" && (e.target as HTMLInputElement).value === "") {
      handleValueChange(field, null);
    }
  };

  const handleClear = () => {
    const emptyDuration = { years: null, months: null, days: null, hours: null, minutes: null, seconds: null };
    setDuration(emptyDuration);
    onChange?.(null);
  };

  const DurationInput = ({ 
    field, 
    label, 
    show 
  }: { 
    field: keyof DurationValue; 
    label: string; 
    show: boolean;
  }) => {
    if (!show) return null;
    
    return (
      <Box>
        <Text fontSize="xs" color="gray.600" mb={1}>{label}</Text>
        <Input
          type="number"
          min="0"
          value={duration[field] || ""}
          onChange={(e) => {
            const val = parseInt(e.target.value, 10);
            handleValueChange(field, isNaN(val) ? null : val);
          }}
          onKeyDown={(e) => handleKeyDown(e, field)}
          placeholder="0"
          size="sm"
          textAlign="center"
          width="60px"
        />
      </Box>
    );
  };

  return (
    <Flex direction="column" gap={3} p={4} border="1px solid" borderColor="gray.200" borderRadius="md">
      <Flex justify="space-between" align="center">
        <Text fontWeight="bold">Duration Picker</Text>
        <Button onClick={handleClear} size="sm" variant="ghost">
          <MdCancel />
        </Button>
      </Flex>

      <Grid templateColumns="repeat(auto-fit, minmax(60px, 1fr))" gap={3}>
        <DurationInput field="years" label="Years" show={showYears} />
        <DurationInput field="months" label="Months" show={showMonths} />
        <DurationInput field="days" label="Days" show={showDays} />
        <DurationInput field="hours" label="Hours" show={showHours} />
        <DurationInput field="minutes" label="Minutes" show={showMinutes} />
        <DurationInput field="seconds" label="Seconds" show={showSeconds} />
      </Grid>

      {toDurationString(duration) && (
        <Text fontSize="sm" color="gray.600">
          Duration: {toDurationString(duration)}
        </Text>
      )}
    </Flex>
  );
} 