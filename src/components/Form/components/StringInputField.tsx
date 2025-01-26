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
  console.log(errors);
  return (
    <>
      <Field label={`${snakeToLabel(column)}`} required={isRequired}>
        <Input
          {...register(column, { required: isRequired })}
          autoComplete="off"
        />
        {errors[`${column}`] && <Text color={'red.400'}>{"The field is required"}</Text>}
      </Field>
    </>
  );
};
