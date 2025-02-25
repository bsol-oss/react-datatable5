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
  title?: string;
  in_table?: string;
  object_id_column?: string;
  foreign_key?: {
    column?: string;
    table?: string;
    display_column: string;
  };
}

export const StringInputField = ({ column }: StringInputFieldProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const { schema, displayText } = useSchemaContext();
  const { fieldRequired } = displayText;
  const { required } = schema as CustomJSONSchema7;
  const isRequired = required?.some((columnId) => columnId === column);
  if (schema.properties == undefined) {
    throw new Error("schema properties when using String Input Field");
  }
  const { gridColumn, gridRow, title } = schema.properties[
    column
  ] as CustomJSONSchema7;

  return (
    <>
      <Field
        label={`${title ?? snakeToLabel(column)}`}
        required={isRequired}
        gridColumn={gridColumn ?? "span 4"}
        gridRow={gridRow ?? "span 1"}
      >
        <Input
          {...register(column, { required: isRequired })}
          autoComplete="off"
        />
        {errors[`${column}`] && (
          <Text color={"red.400"}>
            {fieldRequired ?? "The field is requried"}
          </Text>
        )}
      </Field>
    </>
  );
};
