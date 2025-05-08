import ChakraDatePicker from "@/components/DatePicker/DatePicker";
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
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { MdDateRange } from "react-icons/md";
import { useSchemaContext } from "../../useSchemaContext";
import { removeIndex } from "../../utils/removeIndex";
import { InputDefaultProps } from "./types";

dayjs.extend(utc);

export const DatePicker = ({ column, schema, prefix }: InputDefaultProps) => {
  const {
    watch,
    formState: { errors },
    setValue,
  } = useFormContext();
  const { translate } = useSchemaContext();
  const {
    required,
    gridColumn =  "span 4",
    gridRow =  "span 1",
    displayDateFormat = "YYYY-MM-DD",
    dateFormat = "YYYY-MM-DD[T]HH:mm:ss[Z]",
  } = schema;
  const isRequired = required?.some((columnId) => columnId === column);
  const colLabel = `${prefix}${column}`;
  const [open, setOpen] = useState(false);
  const selectedDate = watch(colLabel);
  const displayDate = dayjs.utc(selectedDate).format(displayDateFormat);

  useEffect(() => {
    try {
      if (selectedDate) {
        // Parse the selectedDate as UTC or in a specific timezone to avoid +8 hour shift
        // For example, parse as UTC:
        const parsedDate = dayjs.utc(selectedDate);

        // Or if you want to parse in local timezone without shifting:
        // const parsedDate = dayjs.tz(selectedDate, dayjs.tz.guess());

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
        <PopoverContent>
          <PopoverBody>
            <PopoverTitle />
            <ChakraDatePicker
              // @ts-expect-error TODO: find appropriate types
              selected={new Date(selectedDate)}
              // @ts-expect-error TODO: find appropriate types
              onDateSelected={({ date }) => {
                setValue(colLabel, dayjs(date).format(dateFormat));
                setOpen(false);
              }}
            />
          </PopoverBody>
        </PopoverContent>
      </PopoverRoot>

      {errors[`${column}`] && (
        <Text color={"red.400"}>
          {translate.t(removeIndex(`${colLabel}.field_required`))}
        </Text>
      )}
    </Field>
  );
};
