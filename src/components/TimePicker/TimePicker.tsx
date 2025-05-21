import {
  Grid,
  Select,
  createListCollection,
  Text,
  Flex,
  Button,
} from "@chakra-ui/react";

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
  const hours = Array.from({ length: 12 }, (_, i) => {
    const currentHour = i + 1;
    return currentHour.toString().padStart(2, "0");
  });

  const minutes = Array.from({ length: 60 }, (_, i) => {
    return i.toString().padStart(2, "0");
  });

  const hoursCollection = createListCollection({
    items: hours.map((h) => ({
      value: h,
      label: h,
    })),
  });
  const minutesCollection = createListCollection({
    items: minutes.map((m) => ({
      value: m,
      label: m,
    })),
  });
  const meridiemsCollection = createListCollection({
    items: ["am", "pm"].map((mVal) => ({
      value: mVal,
      label: meridiemLabel[mVal as "am" | "pm"] ?? mVal,
    })),
  });

  const handleClear = () => {
    const newHour = null;
    const newMinute = null;
    const newMeridiem = null;
    setHour(newHour);
    setMinute(newMinute);
    setMeridiem(newMeridiem);
    onChange({ hour: newHour, minute: newMinute, meridiem: newMeridiem });
  };

  return (
    <Grid
      justifyContent={"center"}
      alignItems={"center"}
      templateColumns={"auto auto auto auto auto"}
      gap="4"
    >
      <Select.Root
        width={"4rem"}
        value={hour !== null ? [`${hour.toString().padStart(2, "0")}`] : []}
        onValueChange={(e) => {
          const newHour = parseInt(e.value[0]);
          setHour(newHour);
          onChange({ hour: newHour, minute, meridiem });
        }}
        collection={hoursCollection}
      >
        <Select.HiddenSelect />
        <Select.Control>
          <Select.Trigger>
            <Select.ValueText placeholder="Hour" />
          </Select.Trigger>
        </Select.Control>
        <Select.Positioner>
          <Select.Content>
            {hoursCollection.items.map(({ value: hVal, label: hLabel }) => (
              <Select.Item key={hVal} item={{ value: hVal, label: hLabel }}>
                {hLabel}
                <Select.ItemIndicator />
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Positioner>
      </Select.Root>
      <Text>:</Text>
      <Select.Root
        width={"4rem"}
        value={minute !== null ? [`${minute.toString().padStart(2, "0")}`] : []}
        onValueChange={(e) => {
          const newMinute = parseInt(e.value[0]);
          setMinute(newMinute);
          onChange({ hour, minute: newMinute, meridiem });
        }}
        collection={minutesCollection}
      >
        <Select.HiddenSelect />
        <Select.Control>
          <Select.Trigger>
            <Select.ValueText placeholder="Minute" />
          </Select.Trigger>
        </Select.Control>
        <Select.Positioner>
          <Select.Content>
            {minutesCollection.items.map(({ value: mVal, label: mLabel }) => (
              <Select.Item key={mVal} item={{ value: mVal, label: mLabel }}>
                {mLabel}
                <Select.ItemIndicator />
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Positioner>
      </Select.Root>
      <Select.Root
        width={"8rem"}
        value={meridiem !== null ? [meridiem] : []}
        onValueChange={(e) => {
          const newMeridiem = e.value[0] as "am" | "pm";
          setMeridiem(newMeridiem);
          onChange({ hour, minute, meridiem: newMeridiem as "am" | "pm" | null });
        }}
        collection={meridiemsCollection}
      >
        <Select.HiddenSelect />
        <Select.Control>
          <Select.Trigger>
            <Select.ValueText placeholder="am/pm" />
          </Select.Trigger>
        </Select.Control>
        <Select.Positioner>
          <Select.Content>
            {meridiemsCollection.items.map(({ value: mVal, label }) => (
              <Select.Item key={mVal} item={{ value: mVal, label }}>
                {label}
                <Select.ItemIndicator />
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Positioner>
      </Select.Root>
      <Button onClick={handleClear} size="sm">
        Clear
      </Button>
    </Grid>
  );
}
