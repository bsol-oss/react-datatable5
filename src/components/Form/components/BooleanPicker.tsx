import { snakeToLabel } from "@/components/Form/utils/snakeToLabel";
import { CheckboxCard } from "@/components/ui/checkbox-card";
import { Field } from "@/components/ui/field";
import { Text } from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";
import { useSchemaContext } from "../useSchemaContext";

export interface DatePickerProps {
  column: string;
}

export const BooleanPicker = ({ column }: DatePickerProps) => {
  const {
    formState: { errors },
    setValue,
    getValues,
  } = useFormContext();
  const { schema } = useSchemaContext();
  const { required } = schema;
  const isRequired = required?.some((columnId) => columnId === column);
  return (
    <Field
      // label={`${snakeToLabel(column)}`}
      required={isRequired}
      alignItems={"stretch"}
    >
      <CheckboxCard
        label={snakeToLabel(column)}
        value={getValues(column)}
        variant={"surface"}
        onSelect={() => {
          setValue(column, !getValues(column));
        }}
      />
      {errors[`${column}`] && <Text>This field is required</Text>}
    </Field>
  );
};
