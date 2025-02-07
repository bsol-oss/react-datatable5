import { snakeToLabel } from "@/components/Form/utils/snakeToLabel";
import { CheckboxCard } from "@/components/ui/checkbox-card";
import { Field } from "@/components/ui/field";
import { Text } from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";
import { useSchemaContext } from "../useSchemaContext";
import { CustomJSONSchema7 } from "./StringInputField";

export interface DatePickerProps {
  column: string;
}

export const BooleanPicker = ({ column }: DatePickerProps) => {
  const {
    formState: { errors },
    setValue,
    getValues,
  } = useFormContext();
  const { schema, displayText } = useSchemaContext();
  const { fieldRequired } = displayText;
  const { required } = schema;
  const isRequired = required?.some((columnId) => columnId === column);
  if (schema.properties == undefined) {
    throw new Error("schema properties when using BooleanPicker");
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
      <CheckboxCard
        // label={snakeToLabel(column)}
        value={getValues(column)}
        variant={"surface"}
        onSelect={() => {
          setValue(column, !getValues(column));
        }}
      />
      {errors[`${column}`] && (
        <Text color={"red.400"}>
          {fieldRequired ?? "The field is requried"}
        </Text>
      )}
    </Field>
  );
};
