import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import {
  PopoverBody,
  PopoverContent,
  PopoverRoot,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Text } from "@chakra-ui/react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { MdDateRange } from "react-icons/md";
import { useSchemaContext } from "../../useSchemaContext";
import { removeIndex } from "../../utils/removeIndex";
import { InputDefaultProps } from "./types";
import { DateTimePicker as ChakraDateTimePicker } from "@/components/DatePicker/DateTimePicker";

dayjs.extend(utc);
dayjs.extend(timezone);

export const DateTimePicker = ({
  column,
  schema,
  prefix,
}: InputDefaultProps) => {
  const {
    watch,
    formState: { errors },
    setValue,
  } = useFormContext();
  const { translate, timezone } = useSchemaContext();
  const {
    required,
    gridColumn = "span 12",
    gridRow = "span 1",
    displayDateFormat = "YYYY-MM-DD HH:mm:ss",
    // with timezone
    dateFormat = "YYYY-MM-DD[T]HH:mm:ssZ",
  } = schema;
  const isRequired = required?.some((columnId) => columnId === column);
  const colLabel = `${prefix}${column}`;
  const [open, setOpen] = useState(false);
  const selectedDate = watch(colLabel);
  const displayDate = dayjs(selectedDate)
    .tz(timezone)
    .format(displayDateFormat);

  useEffect(() => {
    try {
      if (selectedDate) {
        // Parse the selectedDate as UTC or in a specific timezone to avoid +8 hour shift
        // For example, parse as UTC:
        const parsedDate = dayjs(selectedDate).tz(timezone);
        if (!parsedDate.isValid()) return;

        // Format according to dateFormat from schema
        const formatted = parsedDate.format(dateFormat);

        // Update the form value only if different to avoid loops
        if (formatted !== selectedDate) {
          setValue(colLabel, formatted, {
            shouldValidate: true,
            shouldDirty: true,
          });
        }
      }
    } catch (e) {
      console.error(e);
    }
  }, [selectedDate, dateFormat, colLabel, setValue]);

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
      <PopoverRoot
        open={open}
        onOpenChange={(e) => setOpen(e.open)}
        closeOnInteractOutside
      >
        <PopoverTrigger asChild>
          <Button
            size="sm"
            variant="outline"
            onClick={() => {
              setOpen(true);
            }}
            justifyContent={"start"}
          >
            <MdDateRange />
            {selectedDate !== undefined ? `${displayDate}` : ""}
          </Button>
        </PopoverTrigger>
        <PopoverContent minW={"450px"}>
          <PopoverBody >
            <PopoverTitle />
            <ChakraDateTimePicker
              value={selectedDate}
              onChange={(date) => {
                setValue(colLabel, dayjs(date).tz(timezone).format(dateFormat));
              }}
              timezone={timezone}
              labels={{
                monthNamesShort: [
                  translate.t(`common.month_1`, { defaultValue: "January" }),
                  translate.t(`common.month_2`, { defaultValue: "February" }),
                  translate.t(`common.month_3`, { defaultValue: "March" }),
                  translate.t(`common.month_4`, { defaultValue: "April" }),
                  translate.t(`common.month_5`, { defaultValue: "May" }),
                  translate.t(`common.month_6`, { defaultValue: "June" }),
                  translate.t(`common.month_7`, { defaultValue: "July" }),
                  translate.t(`common.month_8`, { defaultValue: "August" }),
                  translate.t(`common.month_9`, { defaultValue: "September" }),
                  translate.t(`common.month_10`, { defaultValue: "October" }),
                  translate.t(`common.month_11`, { defaultValue: "November" }),
                  translate.t(`common.month_12`, { defaultValue: "December" }),
                ],
                weekdayNamesShort: [
                  translate.t(`common.weekday_1`, { defaultValue: "Sun" }),
                  translate.t(`common.weekday_2`, { defaultValue: "Mon" }),
                  translate.t(`common.weekday_3`, { defaultValue: "Tue" }),
                  translate.t(`common.weekday_4`, {
                    defaultValue: "Wed",
                  }),
                  translate.t(`common.weekday_5`, { defaultValue: "Thu" }),
                  translate.t(`common.weekday_6`, { defaultValue: "Fri" }),
                  translate.t(`common.weekday_7`, { defaultValue: "Sat" }),
                ],
                backButtonLabel: translate.t(`common.back_button`, {
                  defaultValue: "Back",
                }),
                forwardButtonLabel: translate.t(`common.forward_button`, {
                  defaultValue: "Forward",
                }),
              }}
            />
          </PopoverBody>
        </PopoverContent>
      </PopoverRoot>

      {errors[`${column}`] && (
        <Text color={"red.400"}>{translate.t(removeIndex(`${colLabel}.field_required`))}</Text>
      )}
    </Field>
  );
};
