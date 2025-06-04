import { Grid, Text, Button, Input, Flex } from "@chakra-ui/react";
import { useRef, KeyboardEvent, Dispatch, SetStateAction } from "react";
import { MdCancel } from "react-icons/md";

interface IsoTimePickerProps {
  hour: number | null;
  setHour: Dispatch<SetStateAction<number | null>>;
  minute: number | null;
  setMinute: Dispatch<SetStateAction<number | null>>;
  second: number | null;
  setSecond: Dispatch<SetStateAction<number | null>>;
  onChange?: (newValue: {
    hour: number | null;
    minute: number | null;
    second: number | null;
  }) => void;
}

export function IsoTimePicker({
  hour,
  setHour,
  minute,
  setMinute,
  second,
  setSecond,
  onChange = (_newValue) => {},
}: IsoTimePickerProps) {
  // Refs for focus management
  const hourInputRef = useRef<HTMLInputElement>(null);
  const minuteInputRef = useRef<HTMLInputElement>(null);
  const secondInputRef = useRef<HTMLInputElement>(null);

  // Centralized handler for key events, value changes, and focus management
  const handleKeyDown = (
    e: KeyboardEvent<HTMLInputElement>,
    field: "hour" | "minute" | "second"
  ) => {
    const input = e.target as HTMLInputElement;
    const value = input.value;

    // Handle navigation between fields
    if (e.key === "Tab") {
      return;
    }

    if (e.key === ":" && field === "hour") {
      e.preventDefault();
      minuteInputRef.current?.focus();
      return;
    }

    if (e.key === ":" && field === "minute") {
      e.preventDefault();
      secondInputRef.current?.focus();
      return;
    }

    if (e.key === "Backspace" && value === "") {
      e.preventDefault();
      if (field === "minute") {
        hourInputRef.current?.focus();
      } else if (field === "second") {
        minuteInputRef.current?.focus();
      }
      return;
    }

    // Handle number inputs
    if (field === "hour") {
      if (e.key.match(/^[0-9]$/)) {
        const newValue = value + e.key;
        const numValue = parseInt(newValue, 10);
        if (numValue > 23) {
          const digitValue = parseInt(e.key, 10);
          setHour(digitValue);
          onChange({ hour: digitValue, minute, second });
          return;
        }
        if (numValue >= 0 && numValue <= 23) {
          setHour(numValue);
          onChange({ hour: numValue, minute, second });
          e.preventDefault();
          minuteInputRef.current?.focus();
        }
      }
    } else if (field === "minute") {
      if (e.key.match(/^[0-9]$/)) {
        const newValue = value + e.key;
        const numValue = parseInt(newValue, 10);
        if (numValue > 59) {
          const digitValue = parseInt(e.key, 10);
          setMinute(digitValue);
          onChange({ hour, minute: digitValue, second });
          return;
        }
        if (numValue >= 0 && numValue <= 59) {
          setMinute(numValue);
          onChange({ hour, minute: numValue, second });
          e.preventDefault();
          secondInputRef.current?.focus();
        }
      }
    } else if (field === "second") {
      if (e.key.match(/^[0-9]$/)) {
        const newValue = value + e.key;
        const numValue = parseInt(newValue, 10);
        if (numValue > 59) {
          const digitValue = parseInt(e.key, 10);
          setSecond(digitValue);
          onChange({ hour, minute, second: digitValue });
          return;
        }
        if (numValue >= 0 && numValue <= 59) {
          setSecond(numValue);
          onChange({ hour, minute, second: numValue });
        }
      }
    }
  };

  const handleClear = () => {
    setHour(null);
    setMinute(null);
    setSecond(null);
    onChange({ hour: null, minute: null, second: null });
    hourInputRef.current?.focus();
  };

  return (
    <Flex direction="column" gap={3}>
      <Grid
        justifyContent={"center"}
        alignItems={"center"}
        templateColumns={"60px 10px 60px 10px 60px auto"}
        gap="2"
        width="auto"
        minWidth="300px"
      >
        <Input
          ref={hourInputRef}
          type="text"
          value={hour === null ? "" : hour.toString().padStart(2, "0")}
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
          onKeyDown={(e) => handleKeyDown(e, "minute")}
          placeholder="MM"
          maxLength={2}
          textAlign="center"
        />
        <Text>:</Text>
        <Input
          ref={secondInputRef}
          type="text"
          value={second === null ? "" : second.toString().padStart(2, "0")}
          onKeyDown={(e) => handleKeyDown(e, "second")}
          placeholder="SS"
          maxLength={2}
          textAlign="center"
        />
        <Button onClick={handleClear} size="sm" variant="ghost">
          <MdCancel />
        </Button>
      </Grid>
    </Flex>
  );
} 