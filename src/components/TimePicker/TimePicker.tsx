import {
  Grid,
  Select,
  createListCollection,
  Text,
  Flex,
} from "@chakra-ui/react";

interface TimePickerProps {
  hour: number;
  setHour: (hour: number) => void;
  minute: number;
  setMinute: (minute: number) => void;
  meridiem: "am" | "pm";
  setMeridiem: (meridiem: "am" | "pm") => void;
  onChange?: (newValue: {
    hour: number;
    minute: number;
    meridiem: "am" | "pm";
  }) => void;
}
export function TimePicker({
  hour,
  setHour,
  minute,
  setMinute,
  meridiem,
  setMeridiem,
  onChange = () => {},
}: TimePickerProps) {
  const hours = Array.from({ length: 12 }, (_, i) => {
    const hour = i + 1;
    return hour.toString().padStart(2, "0");
  });

  const minutes = Array.from({ length: 60 }, (_, i) => {
    return i.toString().padStart(2, "0");
  });

  const hoursCollection = createListCollection({
    items: hours.map((hour) => ({
      value: hour,
      label: hour,
    })),
  });
  const minutesCollection = createListCollection({
    items: minutes.map((hour) => ({
      value: hour,
      label: hour,
    })),
  });
  const meridiemsCollection = createListCollection({
    items: ["am", "pm"].map((hour) => ({
      value: hour,
      label: hour,
    })),
  });

  return (
    <Grid templateColumns={"auto  auto"} gap="4">
      <Flex justifyContent={"center"} alignItems={"center"} gap={"2"}>
        <Select.Root
          value={[`${hour.toString().padStart(2, "0")}`]}
          onValueChange={(e) => {
            setHour(parseInt(e.value[0]));
            onChange({ hour: parseInt(e.value[0]), minute, meridiem });
          }}
          collection={hoursCollection}
          positioning={{ sameWidth: true, placement: "bottom" }}
        >
          <Select.HiddenSelect />
          <Select.Control>
            <Select.Trigger>
              <Select.ValueText placeholder="Hour" />
            </Select.Trigger>
          </Select.Control>
          <Select.Positioner>
            <Select.Content width="full">
              {hoursCollection.items.map(({ value: hour }) => (
                <Select.Item key={hour} item={hour}>
                  {hour}
                  <Select.ItemIndicator />
                </Select.Item>
              ))}
            </Select.Content>
          </Select.Positioner>
        </Select.Root>
        <Text>:</Text>
        <Select.Root
          value={[`${minute.toString().padStart(2, "0")}`]}
          onValueChange={(e) => {
            setMinute(parseInt(e.value[0]));
            onChange({ hour, minute: parseInt(e.value[0]), meridiem });
          }}
          collection={minutesCollection}
          positioning={{ sameWidth: true, placement: "bottom" }}
        >
          <Select.HiddenSelect />
          <Select.Control>
            <Select.Trigger>
              <Select.ValueText placeholder="Minute" />
            </Select.Trigger>
          </Select.Control>
          <Select.Positioner>
            <Select.Content width="full">
              {minutes.map((minute) => (
                <Select.Item key={minute} item={minute}>
                  {minute}
                  <Select.ItemIndicator />
                </Select.Item>
              ))}
            </Select.Content>
          </Select.Positioner>
        </Select.Root>
      </Flex>
      <Select.Root
        value={[meridiem]}
        onValueChange={(e) => {
          setMeridiem(e.value[0] as "am" | "pm");
          onChange({ hour, minute, meridiem: e.value[0] });
        }}
        collection={meridiemsCollection}
        positioning={{ sameWidth: true, placement: "bottom" }}
      >
        <Select.HiddenSelect />
        <Select.Control>
          <Select.Trigger>
            <Select.ValueText placeholder="am/pm" />
          </Select.Trigger>
        </Select.Control>
        <Select.Positioner>
          <Select.Content width="full">
            {meridiemsCollection.items.map(({ value: hour, label }) => (
              <Select.Item key={hour} item={hour}>
                {label}
                <Select.ItemIndicator />
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Positioner>
      </Select.Root>
    </Grid>
  );
}
