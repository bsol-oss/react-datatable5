import { Grid, Text, Button, Input, Flex, Box } from "@chakra-ui/react";
import dayjs from "dayjs";
import {
  useRef,
  KeyboardEvent,
  Dispatch,
  SetStateAction,
  useState,
} from "react";
import { MdCancel } from "react-icons/md";

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
  timezone?: string;
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
  timezone = "Asia/Hong_Kong",
}: TimePickerProps) {
  const handleClear = () => {
    setHour(null);
    setMinute(null);
    setMeridiem(null);
    onChange({ hour: null, minute: null, meridiem: null });
  };

  const [stringTime, setStringTime] = useState("");
  const [inputValue, setInputValue] = useState("");

  const getTimeString = (
    hour: number,
    minute: number,
    meridiem: "am" | "pm"
  ) => {
    // use dayjs to format the time at current timezone
    // if meridiem is pm, add 12 hours
    let newHour = hour;
    if (meridiem === "pm") {
      newHour = hour + 12;
    }

    return dayjs().tz(timezone).hour(newHour).minute(minute).format("HH:mmZ");
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    // ignore all non-numeric characters
    const text = e.currentTarget.value;
    if (!text) {
      return;
    }
    const value = text.replace(/[^0-9apm]/g, "");
    if (value === "") {
      handleClear();
      return;
    }
    // if the value is a valid time, parse it and set the hour, minute, and meridiem
    // if the value is not a valid time, set the stringTime to the value
    // first two characters are the hour
    // next two characters are the minute
    // final two characters are the meridiem
    const hour = parseInt(value.slice(0, 2));
    const minute = parseInt(value.slice(2, 4));
    const meridiem = value.slice(4, 6) as "am" | "pm";

    let newHour = hour;
    let newMinute = minute;
    let newMeridiem = meridiem;
    // if the hour is greater than 12, set the meridiem to pm, and subtract 12 from the hour
    if (hour > 12) {
      newMeridiem = "pm";
      newHour = hour - 12;
    } else if (hour === 0) {
      newMeridiem = "pm";
      newHour = 12;
    } else {
      newHour = hour;
    }

    if (minute > 59) {
      newMinute = 0;
    } else {
      newMinute = minute;
    }

    onChange({
      hour: newHour,
      minute: newMinute,
      meridiem: newMeridiem,
    });

    setStringTime(getTimeString(newHour, newMinute, newMeridiem));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleBlur(e);
    }
  };

  return (
    <Flex direction="column" gap={3}>
      <Grid
        justifyContent={"center"}
        alignItems={"center"}
        templateColumns={"200px auto"}
        gap="2"
        width="auto"
        minWidth="250px"
      >
        <Input
          onKeyDown={handleKeyDown}
          onChange={(e) => {
            setInputValue(e.currentTarget.value);
          }}
          onBlur={handleBlur}
          value={inputValue}
        />
        <Box>
          <Text>{dayjs(`1970-01-01T${stringTime}`, "hh:mmZ").format("hh:mm a")}</Text>
        </Box>
        <Button onClick={handleClear} size="sm" variant="ghost">
          <MdCancel />
        </Button>
      </Grid>
    </Flex>
  );
}
