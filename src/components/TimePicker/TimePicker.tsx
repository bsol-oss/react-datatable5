import { Button, Flex, Grid, Icon, Input, Text } from "@chakra-ui/react";
import dayjs from "dayjs";
import { Dispatch, SetStateAction, useRef, useState } from "react";
import { BsClock } from "react-icons/bs";
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
    setInputValue("");
    setShowInput(false);
    onChange({ hour: null, minute: null, meridiem: null });
  };

  const getTimeString = (
    hour: number | null,
    minute: number | null,
    meridiem: "am" | "pm" | null
  ) => {
    if (hour === null || minute === null || meridiem === null) {
      return "";
    }
    // if the hour is 24, set the hour to 0
    if (hour === 24) {
      return dayjs().tz(timezone).hour(0).minute(minute).format("HH:mmZ");
    }
    // use dayjs to format the time at current timezone
    // if meridiem is pm, add 12 hours
    let newHour = hour;

    if (meridiem === "pm" && hour !== 12) {
      newHour = hour + 12;
    }
    // if the hour is 12, set the meridiem to am, and set the hour to 0
    else if (meridiem === "am" && hour === 12) {
      newHour = 0;
    }

    return dayjs().tz(timezone).hour(newHour).minute(minute).format("HH:mmZ");
  };

  const stringTime = getTimeString(hour, minute, meridiem);

  const [inputValue, setInputValue] = useState("");
  const [showInput, setShowInput] = useState(false);

  const handleBlur = (text: string) => {
    // ignore all non-numeric characters
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
    const meridiem = value.slice(4, 6) as "am" | "pm" | null;

    // validate the hour and minute
    if (isNaN(hour) || isNaN(minute)) {
      setInputValue("");
      return;
    }
    // if the hour is larger than 24, set the hour to 24
    if (hour > 24) {
      setInputValue("");
      return;
    }

    let newHour = hour;
    let newMinute = minute;
    let newMeridiem = meridiem;

    // if the hour is 24, set the meridiem to am, and set the hour to 0
    if (hour === 24) {
      newMeridiem = "am";
      newHour = 0;
    }
    // if the hour is greater than 12, set the meridiem to pm, and subtract 12 from the hour
    else if (hour > 12) {
      newMeridiem = "pm";
      newHour = hour - 12;
    }
    // if the hour is 12, set the meridiem to pm, and set the hour to 12
    else if (hour === 12) {
      newMeridiem = "pm";
      newHour = 12;
    }
    // if the hour is 0, set the meridiem to am, and set the hour to 12
    else if (hour === 0) {
      newMeridiem = "am";
      newHour = 12;
    } else {
      newMeridiem = meridiem ?? "am";
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

    setShowInput(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleBlur(e.currentTarget.value);
    }
  };

  const inputRef = useRef<HTMLInputElement>(null);

  return (
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
        onBlur={(e) => {
          handleBlur(e.currentTarget.value);
        }}
        value={inputValue}
        display={showInput ? undefined : "none"}
        ref={inputRef}
      />

      <Button
        onClick={() => {
          setShowInput(true);
          setInputValue(
            dayjs(
              `1970-01-01T${getTimeString(hour, minute, meridiem)}`,
              "hh:mmZ"
            ).format("hh:mm a")
          );
          inputRef.current?.focus();
        }}
        display={showInput ? "none" : "flex"}
        alignItems={"center"}
        justifyContent={"start"}
        variant="outline"
        gap={2}
      >
        <Icon size="sm">
          <BsClock />
        </Icon>
        <Text fontSize="sm">
          {stringTime
            ? dayjs(`1970-01-01T${stringTime}`, "hh:mmZ").format("hh:mm a")
            : ""}
        </Text>
      </Button>

      <Button onClick={handleClear} size="sm" variant="ghost">
        <MdCancel />
      </Button>
    </Grid>
  );
}
