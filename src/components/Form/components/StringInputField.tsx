import { Input, Text } from "@chakra-ui/react";
import { Field } from "../../ui/field";
import { useFormContext } from "react-hook-form";
import { useSchemaContext } from "../useSchemaContext";
import { snakeToLabel } from "../utils/snakeToLabel";

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
