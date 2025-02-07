import { Input, Text } from "@chakra-ui/react";
import { Field } from "../../ui/field";
import { useFormContext } from "react-hook-form";
import { useSchemaContext } from "../useSchemaContext";
import { snakeToLabel } from "../utils/snakeToLabel";
import { JSONSchema7 } from "json-schema";

export interface StringInputFieldProps {
  column: string;
}

export interface CustomJSONSchema7 extends JSONSchema7 {
  gridColumn?: string;
  gridRow?: string;
}

export const StringInputField = ({ column }: StringInputFieldProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const { schema } = useSchemaContext();
  const { required } = schema as CustomJSONSchema7;
  const isRequired = required?.some((columnId) => columnId === column);
  if (schema.properties == undefined) {
    throw new Error("schema properties when using String Input Field");
  }
  const { gridColumn, gridRow } = schema.properties[
    column
  ] as CustomJSONSchema7;

  return (
    <>
      <Field
        label={`${snakeToLabel(column)}`}
        required={isRequired}
        gridColumn={gridColumn ?? "span 4"}
        gridRow={gridRow ?? "span 1"}
      >
        <Input
          {...register(column, { required: isRequired })}
          autoComplete="off"
        />
        {errors[`${column}`] && (
          <Text color={"red.400"}>{"The field is required"}</Text>
        )}
      </Field>
    </>
  );
};
