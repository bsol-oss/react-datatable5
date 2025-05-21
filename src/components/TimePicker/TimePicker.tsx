import {
  Grid,
  Text,
  Button,
  Input,
  Flex,
  Box,
} from "@chakra-ui/react";
import { useRef, KeyboardEvent } from "react";

interface TimePickerProps {
  hour: number | null;
  setHour: (hour: number | null) => void;
  minute: number | null;
  setMinute: (minute: number | null) => void;
  meridiem: "am" | "pm" | null;
  setMeridiem: (meridiem: "am" | "pm" | null) => void;
  onChange?: (newValue: {
    hour: number | null;
    minute: number | null;
    meridiem: "am" | "pm" | null;
  }) => void;
  meridiemLabel?: {
    am: string;
    pm: string;
  };
}
export function TimePicker({
  hour,
  setHour,
  minute,
  setMinute,
  meridiem,
  setMeridiem,
  meridiemLabel = {
    am: "am",
    pm: "pm",
  },
  onChange = (_newValue) => {},
}: TimePickerProps) {
  // Refs for focus management
  const hourInputRef = useRef<HTMLInputElement>(null);
  const minuteInputRef = useRef<HTMLInputElement>(null);
  const meridiemInputRef = useRef<HTMLInputElement>(null);

  // Create arrays for select options
  const hours = Array.from({ length: 12 }, (_, i) => {
    const currentHour = i + 1;
    return currentHour.toString().padStart(2, "0");
  });

  const minutes = Array.from({ length: 60 }, (_, i) => {
    return i.toString().padStart(2, "0");
  });

  const handleHourChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "") {
      setHour(null);
      onChange({ hour: null, minute, meridiem });
      return;
    }
    const numValue = parseInt(value, 10);
    if (!isNaN(numValue) && numValue >= 1 && numValue <= 12) {
      setHour(numValue);
      onChange({ hour: numValue, minute, meridiem });
      
      // Auto-advance to minute field if a valid 2-digit hour (or single digit followed by a number that makes a valid hour)
      if ((value.length === 2 && value[0] !== '0') || 
          (value.length === 1 && numValue >= 1)) {
        minuteInputRef.current?.focus();
      }
    }
  };

  const handleMinuteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "") {
      setMinute(null);
      onChange({ hour, minute: null, meridiem });
      return;
    }
    const numValue = parseInt(value, 10);
    if (!isNaN(numValue) && numValue >= 0 && numValue <= 59) {
      setMinute(numValue);
      onChange({ hour, minute: numValue, meridiem });
      
      // Auto-advance to meridiem field if a valid 2-digit minute
      if (value.length === 2) {
        meridiemInputRef.current?.focus();
      }
    }
  };

  const handleMeridiemChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    if (value === "") {
      setMeridiem(null);
      onChange({ hour, minute, meridiem: null });
      return;
    }
    
    // Handle 'a' → 'am' and 'p' → 'pm' auto-completion
    if (value === "a") {
      setMeridiem("am");
      onChange({ hour, minute, meridiem: "am" });
    } else if (value === "p") {
      setMeridiem("pm");
      onChange({ hour, minute, meridiem: "pm" });
    } else if (value === "am" || value === "pm") {
      setMeridiem(value as "am" | "pm");
      onChange({ hour, minute, meridiem: value as "am" | "pm" });
    }
  };

  const handleHourBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "") {
      if (hour !== null) {
        setHour(null);
        onChange({ hour: null, minute, meridiem });
      }
      return;
    }
    const numValue = parseInt(value, 10);
    if (isNaN(numValue) || numValue < 1 || numValue > 12) {
      setHour(null);
      onChange({ hour: null, minute, meridiem });
    } else if (hour !== numValue) {
      setHour(numValue);
      onChange({ hour: numValue, minute, meridiem });
    }
  };

  const handleMinuteBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "") {
      if (minute !== null) {
        setMinute(null);
        onChange({ hour, minute: null, meridiem });
      }
      return;
    }
    const numValue = parseInt(value, 10);
    if (isNaN(numValue) || numValue < 0 || numValue > 59) {
      setMinute(null);
      onChange({ hour, minute: null, meridiem });
    } else if (minute !== numValue) {
      setMinute(numValue);
      onChange({ hour, minute: numValue, meridiem });
    }
  };

  const handleMeridiemBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    if (value === "") {
      if (meridiem !== null) {
        setMeridiem(null);
        onChange({ hour, minute, meridiem: null });
      }
      return;
    }
    
    // If it's not a valid meridiem string, try to normalize it
    if (value !== "am" && value !== "pm") {
      if (value === "a") {
        setMeridiem("am");
        onChange({ hour, minute, meridiem: "am" });
      } else if (value === "p") {
        setMeridiem("pm");
        onChange({ hour, minute, meridiem: "pm" });
      } else {
        setMeridiem(null);
        onChange({ hour, minute, meridiem: null });
      }
    } else if (meridiem !== value) {
      setMeridiem(value as "am" | "pm");
      onChange({ hour, minute, meridiem: value as "am" | "pm" });
    }
  };

  // Handle select changes
  const handleHourSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newHour = parseInt(e.target.value, 10);
    setHour(newHour);
    onChange({ hour: newHour, minute, meridiem });
  };

  const handleMinuteSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newMinute = parseInt(e.target.value, 10);
    setMinute(newMinute);
    onChange({ hour, minute: newMinute, meridiem });
  };

  const handleMeridiemSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newMeridiem = e.target.value as "am" | "pm";
    setMeridiem(newMeridiem);
    onChange({ hour, minute, meridiem: newMeridiem });
  };

  // Handle keyboard navigation between inputs
  const handleKeyDown = (
    e: KeyboardEvent<HTMLInputElement>,
    field: "hour" | "minute" | "meridiem"
  ) => {
    // Move to previous field on backspace when input is empty
    if (e.key === "Backspace" && (e.target as HTMLInputElement).value === "") {
      if (field === "minute") {
        hourInputRef.current?.focus();
      } else if (field === "meridiem") {
        minuteInputRef.current?.focus();
      }
    }
    
    // Handle colon key to move from hour to minute
    if (e.key === ":" && field === "hour") {
      e.preventDefault();
      minuteInputRef.current?.focus();
    }
  };

  const handleClear = () => {
    setHour(null);
    setMinute(null);
    setMeridiem(null);
    onChange({ hour: null, minute: null, meridiem: null });
    // Focus the hour field after clearing
    hourInputRef.current?.focus();
  };

  return (
    <Flex direction="column" gap={3}>
      {/* Input version for sequential input */}
      <Grid
        justifyContent={"center"}
        alignItems={"center"}
        templateColumns={"60px 10px 60px 70px auto"}
        gap="2"
        width="auto"
        minWidth="250px"
      >
        <Input
          ref={hourInputRef}
          type="text"
          value={hour === null ? "" : hour.toString().padStart(2, "0")}
          onChange={handleHourChange}
          onBlur={handleHourBlur}
          onKeyDown={(e) => handleKeyDown(e, "hour")}
          placeholder="HH"
          maxLength={2}
          textAlign="center"
        />
        <Text>:</Text>
        <Input
          ref={minuteInputRef}
          type="text"
          value={minute === null ? "" : minute.toString().padStart(2, "0")}
          onChange={handleMinuteChange}
          onBlur={handleMinuteBlur}
          onKeyDown={(e) => handleKeyDown(e, "minute")}
          placeholder="MM"
          maxLength={2}
          textAlign="center"
        />
        <Input
          ref={meridiemInputRef}
          type="text"
          value={meridiem || ""}
          onChange={handleMeridiemChange}
          onBlur={handleMeridiemBlur}
          onKeyDown={(e) => handleKeyDown(e, "meridiem")}
          placeholder="am/pm"
          maxLength={2}
          textAlign="center"
          width="60px"
        />
        <Button onClick={handleClear} size="sm" variant="ghost">
          Clear
        </Button>
      </Grid>

      {/* Select dropdown version using native selects styled with Chakra */}
      <Grid
        justifyContent={"center"}
        alignItems={"center"}
        templateColumns={"auto auto auto auto"}
        gap="4"
      >
        <Box width="4rem">
          <select
            value={hour !== null ? hour.toString().padStart(2, "0") : ""}
            onChange={handleHourSelectChange}
            style={{
              width: "100%",
              padding: "8px",
              borderRadius: "6px",
              textAlign: "center",
            }}
          >
            <option value="" disabled>
              Hour
            </option>
            {hours.map((h) => (
              <option key={h} value={h}>
                {h}
              </option>
            ))}
          </select>
        </Box>
        <Text>:</Text>
        <Box width="4rem">
          <select
            value={minute !== null ? minute.toString().padStart(2, "0") : ""}
            onChange={handleMinuteSelectChange}
            style={{
              width: "100%",
              padding: "8px",
              borderRadius: "6px",
              textAlign: "center",
            }}
          >
            <option value="" disabled>
              Min
            </option>
            {minutes.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </Box>
        <Box width="5rem">
          <select
            value={meridiem || ""}
            onChange={handleMeridiemSelectChange}
            style={{
              width: "100%",
              padding: "8px",
              borderRadius: "6px",
              textAlign: "center",
            }}
          >
            <option value="" disabled>
              am/pm
            </option>
            <option value="am">{meridiemLabel.am}</option>
            <option value="pm">{meridiemLabel.pm}</option>
          </select>
        </Box>
      </Grid>
    </Flex>
  );
}
