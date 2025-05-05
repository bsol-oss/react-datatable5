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
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { useSchemaContext } from "../../useSchemaContext";
import { CustomJSONSchema7 } from "../types/CustomJSONSchema7";
import { removeIndex } from "../../utils/removeIndex";
import { MdDateRange } from "react-icons/md";

export interface DatePickerProps {
  column: string;
  schema: CustomJSONSchema7;
  prefix: string;
}

export const DatePicker = ({ column, schema, prefix }: DatePickerProps) => {
  const {
    watch,
    formState: { errors },
    setValue,
  } = useFormContext();
  const { translate } = useSchemaContext();
  const {
    required,
    gridColumn,
    gridRow,
    dateFormat = "YYYY-MM-DD[T]HH:mm:ss[Z]",
  } = schema;
  const isRequired = required?.some((columnId) => columnId === column);
  const colLabel = `${prefix}${column}`;
  const [open, setOpen] = useState(false);
  const selectedDate = watch(colLabel);
  const formatedDate = dayjs(selectedDate).format("YYYY-MM-DD");

  useEffect(() => {
    if (selectedDate) {
      // Parse the selectedDate with dayjs
      const parsedDate = dayjs(selectedDate);

      // If invalid date, do nothing
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
            {selectedDate !== undefined ? `${formatedDate}` : ""}
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
