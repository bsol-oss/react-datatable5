import { Grid, Text, Button, Input, Flex, Box } from "@chakra-ui/react";
import { useRef, KeyboardEvent, Dispatch, SetStateAction } from "react";

interface TimePickerProps {
  hour: number | null;
  setHour: Dispatch<SetStateAction<number | null>>;
  minute: number | null;
  setMinute: Dispatch<SetStateAction<number | null>>;
  meridiem: "am" | "pm" | null;
  setMeridiem: Dispatch<SetStateAction<"am" | "pm" | null>>;
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

  // Centralized handler for key events, value changes, and focus management
  const handleKeyDown = (
    e: KeyboardEvent<HTMLInputElement>,
    field: "hour" | "minute" | "meridiem"
  ) => {
    const input = e.target as HTMLInputElement;
    const value = input.value;

    // Handle navigation between fields
    if (e.key === "Tab") {
      // Tab is handled by the browser, no need to override
      return;
    }

    if (e.key === ":" && field === "hour") {
      e.preventDefault();
      minuteInputRef.current?.focus();
      return;
    }

    if (e.key === "Backspace" && value === "") {
      e.preventDefault();
      if (field === "minute") {
        hourInputRef.current?.focus();
      } else if (field === "meridiem") {
        minuteInputRef.current?.focus();
      }
      return;
    }

    // Handle number inputs
    if (field === "hour") {
      if (e.key.match(/^[0-9]$/)) {
        const newValue = value + e.key;
        const numValue = parseInt(newValue, 10);
        console.log("newValue", newValue, numValue);
        if (numValue > 12) {
          const digitValue = parseInt(e.key, 10);
          setHour(digitValue);
          onChange({ hour: digitValue, minute, meridiem });
          return;
        }
        // Auto-advance to minutes if we have a valid hour (1-12)
        if (numValue >= 1 && numValue <= 12) {
          // Set the hour value
          setHour(numValue);
          onChange({ hour: numValue, minute, meridiem });

          // Move to minute input
          e.preventDefault();
          minuteInputRef.current?.focus();
        }
      }
    } else if (field === "minute") {
      if (e.key.match(/^[0-9]$/)) {
        const newValue = value + e.key;
        const numValue = parseInt(newValue, 10);
        if (numValue > 60) {
          const digitValue = parseInt(e.key, 10);
          setHour(digitValue);
          onChange({ hour, minute: digitValue, meridiem });
          return;
        }
        // Auto-advance to meridiem if we have a valid minute (0-59)
        if (numValue >= 0 && numValue <= 59) {
          // Set the minute value
          setMinute(numValue);
          onChange({ hour, minute: numValue, meridiem });

          // Move to meridiem input
          e.preventDefault();
          meridiemInputRef.current?.focus();
        }
      }
    } else if (field === "meridiem") {
      const key = e.key.toLowerCase();

      if (key === "a") {
        e.preventDefault();
        setMeridiem("am");
        onChange({ hour, minute, meridiem: "am" });
        input.value = "am";
      } else if (key === "p") {
        e.preventDefault();
        setMeridiem("pm");
        onChange({ hour, minute, meridiem: "pm" });
        input.value = "pm";
      }
    }
  };

  // Handle input blur events to validate and format values
  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement>,
    field: "hour" | "minute" | "meridiem"
  ) => {
    const value = e.target.value;

    if (field === "hour") {
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
    } else if (field === "minute") {
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
    } else if (field === "meridiem") {
      if (value === "") {
        if (meridiem !== null) {
          setMeridiem(null);
          onChange({ hour, minute, meridiem: null });
        }
        return;
      }

      const lowerValue = value.toLowerCase();
      if (lowerValue !== "am" && lowerValue !== "pm") {
        if (lowerValue === "a") {
          setMeridiem("am");
          onChange({ hour, minute, meridiem: "am" });
        } else if (lowerValue === "p") {
          setMeridiem("pm");
          onChange({ hour, minute, meridiem: "pm" });
        } else {
          setMeridiem(null);
          onChange({ hour, minute, meridiem: null });
        }
      } else if (meridiem !== lowerValue) {
        setMeridiem(lowerValue as "am" | "pm");
        onChange({ hour, minute, meridiem: lowerValue as "am" | "pm" });
      }
    }
  };

  // Handle meridiem button click
  const handleMeridiemClick = (newMeridiem: "am" | "pm") => {
    setMeridiem(newMeridiem);
    onChange({ hour, minute, meridiem: newMeridiem });
  };

  const handleClear = () => {
    setHour(null);
    setMinute(null);
    setMeridiem(null);
    onChange({ hour: null, minute: null, meridiem: null });
    // Focus the hour field after clearing
    hourInputRef.current?.focus();
  };

  function handleFocus(event: React.FocusEvent<HTMLInputElement>): void {
    event.target.select();
  }

  return (
    <Flex direction="column" gap={3}>
      <Grid
        justifyContent={"center"}
        alignItems={"center"}
        templateColumns={"60px 10px 60px 90px auto"}
        gap="2"
        width="auto"
        minWidth="250px"
      >
        <Input
          ref={hourInputRef}
          type="text"
          value={hour === null ? "" : hour.toString().padStart(2, "0")}
          onKeyDown={(e) => handleKeyDown(e, "hour")}
          onBlur={(e) => handleBlur(e, "hour")}
          onFocus={handleFocus}
          placeholder="HH"
          maxLength={2}
          textAlign="center"
        />
        <Text>:</Text>
        <Input
          ref={minuteInputRef}
          type="text"
          value={minute === null ? "" : minute.toString().padStart(2, "0")}
          onKeyDown={(e) => handleKeyDown(e, "minute")}
          onBlur={(e) => handleBlur(e, "minute")}
          onFocus={handleFocus}
          placeholder="MM"
          maxLength={2}
          textAlign="center"
        />
        <Flex gap="1">
          <Button 
            size="sm" 
            colorScheme={meridiem === "am" ? "blue" : "gray"}
            variant={meridiem === "am" ? "solid" : "outline"}
            onClick={() => handleMeridiemClick("am")}
            width="40px"
          >
            {meridiemLabel.am}
          </Button>
          <Button 
            size="sm" 
            colorScheme={meridiem === "pm" ? "blue" : "gray"}
            variant={meridiem === "pm" ? "solid" : "outline"}
            onClick={() => handleMeridiemClick("pm")}
            width="40px"
          >
            {meridiemLabel.pm}
          </Button>
        </Flex>
        <Button onClick={handleClear} size="sm" variant="ghost">
          Clear
        </Button>
      </Grid>
    </Flex>
  );
}
