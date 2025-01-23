import { Input, Text } from "@chakra-ui/react";
import { Field } from "../../ui/field";
import { useFormContext } from "react-hook-form";
import { useSchemaContext } from "../useSchemaContext";

const snakeToLabel = (str: string): string => {
  return str
    .split("_") // Split by underscore
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize each word
    .join(" "); // Join with space
};

export interface StringInputFieldProps {
  column: string;
}

export const StringInputField = ({ column }: StringInputFieldProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const { schema } = useSchemaContext();
  const { required } = schema;
  const isRequired = required?.some((columnId) => columnId === column);
  return (
    <>
      <Field label={`${snakeToLabel(column)}`} required={isRequired}>
        <Input {...register(column, { required: isRequired })} />
        {errors[`${column}`] && <Text>This field is required</Text>}
      </Field>
    </>
  );
};
