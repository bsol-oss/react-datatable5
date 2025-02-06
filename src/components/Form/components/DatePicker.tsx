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

export interface DatePickerProps {
  column: string;
}

export const DatePicker = ({ column }: DatePickerProps) => {
  const {
    formState: { errors },
    setValue,
    getValues,
  } = useFormContext();
  const { schema } = useSchemaContext();
  const { required } = schema;
  const isRequired = required?.some((columnId) => columnId === column);
  const [open, setOpen] = useState(false);
  return (
    <Field
      label={`${snakeToLabel(column)}`}
      required={isRequired}
      alignItems={"stretch"}
    >
      <PopoverRoot
        open={open}
        onOpenChange={(e) => setOpen(e.open)}
        closeOnInteractOutside
        positioning={{ sameWidth: true }}
      >
        <PopoverTrigger asChild>
          <Button
            size="sm"
            variant="outline"
            onClick={() => {
              setOpen(true);
            }}
          >
            {}
            {getValues(column) !== undefined
              ? dayjs(getValues(column)).format("YYYY-MM-DD")
              : ""}
          </Button>
        </PopoverTrigger>
        <PopoverContent  width="auto">
          <PopoverBody>
            <PopoverTitle />
            <ChakraDatePicker
              selected={new Date(getValues(column))}
              onDateSelected={({ selected, selectable, date }) => {
                console.log(date, selected, selectable, "jasdio");
                setValue(column, dayjs(date).format("YYYY-MM-DD"));
                setOpen(false);
              }}
            />
          </PopoverBody>
        </PopoverContent>
      </PopoverRoot>

      {errors[`${column}`] && <Text>This field is required</Text>}
    </Field>
  );
};
