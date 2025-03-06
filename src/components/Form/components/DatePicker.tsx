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
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { useSchemaContext } from "../useSchemaContext";
import { CustomJSONSchema7 } from "./StringInputField";

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
  const { required, gridColumn, gridRow } = schema;
  const isRequired = required?.some((columnId) => columnId === column);
  const colLabel = `${prefix}${column}`;
  const [open, setOpen] = useState(false);
  const selectedDate = watch(colLabel);
  return (
    <Field
      label={`${translate.t(`${colLabel}.fieldLabel`)}`}
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
        <PopoverContent>
          <PopoverBody>
            <PopoverTitle />
            <ChakraDatePicker
              // @ts-expect-error TODO: find appropriate types
              selected={new Date(selectedDate)}
              // @ts-expect-error TODO: find appropriate types
              onDateSelected={({ date }) => {
                setValue(column, dayjs(date).format("YYYY-MM-DD"));
                setOpen(false);
              }}
            />
          </PopoverBody>
        </PopoverContent>
      </PopoverRoot>

      {errors[`${column}`] && (
        <Text color={"red.400"}>{translate.t(`${column}.fieldRequired`)}</Text>
      )}
    </Field>
  );
};
