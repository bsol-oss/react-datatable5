import { TimePicker as CustomTimePicker } from "@/components/TimePicker/TimePicker";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Popover, Portal, Text } from "@chakra-ui/react";
import dayjs from "dayjs";
import { useEffect, useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import { IoMdClock } from "react-icons/io";
import { useSchemaContext } from "../../useSchemaContext";
import { removeIndex } from "../../utils/removeIndex";
import { CustomJSONSchema7 } from "../types/CustomJSONSchema7";
export interface DatePickerProps {
  column: string;
  schema: CustomJSONSchema7;
  prefix: string;
}

export const TimePicker = ({ column, schema, prefix }: DatePickerProps) => {
  const {
    watch,
    formState: { errors },
    setValue,
  } = useFormContext();
  const { translate } = useSchemaContext();
  const {
    required,
    gridColumn = "span 4",
    gridRow = "span 1",
    timeFormat = "HH:mm:ss",
    displayTimeFormat = "hh:mm A",
  } = schema;
  const isRequired = required?.some((columnId) => columnId === column);
  const colLabel = `${prefix}${column}`;
  const [open, setOpen] = useState(false);
  const value = watch(colLabel);
  const displayedTime = dayjs(`1970-01-01T${value}Z`).isValid()
    ? dayjs(`1970-01-01T${value}Z`).utc().format(displayTimeFormat)
    : "";

  // Parse the initial time parts from the ISO time string (HH:mm:ss)
  const parseTime = (isoTime: string | undefined) => {
    if (!isoTime) return { hour: 12, minute: 0, meridiem: "am" as "am" | "pm" };

    const parsed = dayjs(`1970-01-01T${isoTime}Z`).utc();
    if (!parsed.isValid())
      return { hour: 12, minute: 0, meridiem: "am" as "am" | "pm" };

    let hour = parsed.hour();
    const minute = parsed.minute();
    const meridiem = hour >= 12 ? "pm" : "am";

    if (hour === 0) hour = 12;
    else if (hour > 12) hour -= 12;

    return { hour, minute, meridiem };
  };

  const initialTime = parseTime(value);

  const [hour, setHour] = useState<number | null>(initialTime.hour);
  const [minute, setMinute] = useState<number | null>(initialTime.minute);
  const [meridiem, setMeridiem] = useState<"am" | "pm" | null>(
    initialTime.meridiem as "am" | "pm"
  );

  useEffect(() => {
    const { hour, minute, meridiem } = parseTime(value);
    setHour(hour);
    setMinute(minute);
    setMeridiem(meridiem as "am" | "pm");
  }, [value]);

  // Convert hour, minute, meridiem to 24-hour ISO time string
  const toIsoTime = (
    hour: number | null,
    minute: number | null,
    meridiem: "am" | "pm" | null
  ) => {
    if (hour === null || minute === null || meridiem === null) return null;
    let h = hour;
    if (meridiem === "am" && hour === 12) h = 0;
    else if (meridiem === "pm" && hour < 12) h = hour + 12;
    return dayjs(
      `1970-01-01T${h.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}:00Z`
    )
      .utc()
      .format(timeFormat);
  };

  // Handle changes to time parts
  const handleTimeChange = ({
    hour: newHour,
    minute: newMinute,
    meridiem: newMeridiem,
  }: {
    hour: number | null;
    minute: number | null;
    meridiem: "am" | "pm" | null;
  }) => {
    setHour(newHour);
    setMinute(newMinute);
    setMeridiem(newMeridiem);

    const isoTime = toIsoTime(newHour, newMinute, newMeridiem);
    setValue(colLabel, isoTime, { shouldValidate: true, shouldDirty: true });
  };

  const containerRef = useRef<HTMLDivElement>(null);
  return (
    <Field
      label={`${translate.t(removeIndex(`${colLabel}.field_label`))}`}
      required={isRequired}
      alignItems={"stretch"}
      {...{
        gridColumn,
        gridRow,
      }}
    >
      <Popover.Root
        open={open}
        onOpenChange={(e) => setOpen(e.open)}
        closeOnInteractOutside
      >
        <Popover.Trigger asChild>
          <Button
            size="sm"
            variant="outline"
            onClick={() => {
              setOpen(true);
            }}
            justifyContent={"start"}
          >
            <IoMdClock />
            {!!value ? `${displayedTime}` : ""}
          </Button>
        </Popover.Trigger>
        <Portal>
          <Popover.Positioner>
            <Popover.Content ref={containerRef}>
              <Popover.Body>
                <CustomTimePicker
                  hour={hour}
                  setHour={setHour}
                  minute={minute}
                  setMinute={setMinute}
                  meridiem={meridiem}
                  setMeridiem={setMeridiem}
                  onChange={handleTimeChange}
                  meridiemLabel={{
                    am: translate.t(removeIndex(`common.am`)),
                    pm: translate.t(removeIndex(`common.pm`)),
                  }}
                />
              </Popover.Body>
            </Popover.Content>
          </Popover.Positioner>
        </Portal>
      </Popover.Root>

      {errors[`${column}`] && (
        <Text color={"red.400"}>
          {translate.t(removeIndex(`${colLabel}.field_required`))}
        </Text>
      )}
    </Field>
  );
};
