import ChakraDatePicker from "@/components/DatePicker/DatePicker";
import { snakeToLabel } from "@/components/Form/utils/snakeToLabel";
import { Field } from "@/components/ui/field";
import {
  PopoverBody,
  PopoverContent,
  PopoverRoot,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useFormContext } from "react-hook-form";
import { useSchemaContext } from "../useSchemaContext";
import { useState } from "react";
import { Text } from "@chakra-ui/react";
import { Button } from "@/components/ui/button";
import dayjs from "dayjs";
import { CustomJSONSchema7 } from "./StringInputField";

export interface DatePickerProps {
  column: string;
}

export const DatePicker = ({ column }: DatePickerProps) => {
  const {
    watch,
    formState: { errors },
    setValue,
  } = useFormContext();
  const { schema, displayText } = useSchemaContext();
  const { fieldRequired } = displayText;
  const { required } = schema;
  const isRequired = required?.some((columnId) => columnId === column);
  const [open, setOpen] = useState(false);
  const selectedDate = watch(column);
  if (schema.properties == undefined) {
    throw new Error("schema properties when using DatePicker");
  }
  const { gridColumn, gridRow, title } = schema.properties[
    column
  ] as CustomJSONSchema7;
  return (
    <Field
      label={`${title ?? snakeToLabel(column)}`}
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
          >
            {selectedDate !== undefined ? selectedDate : ""}
          </Button>
        </PopoverTrigger>
        <PopoverContent >
          <PopoverBody>
            <PopoverTitle />
            <ChakraDatePicker
              selected={new Date(selectedDate)}
              onDateSelected={({ selected, selectable, date }) => {
                setValue(column, dayjs(date).format("YYYY-MM-DD"));
                setOpen(false);
              }}
            />
          </PopoverBody>
        </PopoverContent>
      </PopoverRoot>

      {errors[`${column}`] && (
        <Text color={"red.400"}>
          {fieldRequired ?? "The field is requried"}
        </Text>
      )}
    </Field>
  );
};
