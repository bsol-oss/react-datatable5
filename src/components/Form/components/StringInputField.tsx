import { Input, Text } from "@chakra-ui/react";
import { JSONSchema7 } from "json-schema";
import { ReactNode } from "react";
import { useFormContext } from "react-hook-form";
import { Field } from "../../ui/field";
import { useSchemaContext } from "../useSchemaContext";

export interface StringInputFieldProps {
  column: string;
  schema: CustomJSONSchema7;
  prefix: string;
}

export interface ForeignKeyProps {
  column: string;
  table: string;
  display_column: string;
}
export interface CustomJSONSchema7 extends JSONSchema7 {
  gridColumn?: string;
  gridRow?: string;
  foreign_key?: ForeignKeyProps;
  variant?: string;
  renderDisplay: (item: unknown) => ReactNode;
}

export const StringInputField = ({
  column,
  schema,
  prefix,
}: StringInputFieldProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const { translate } = useSchemaContext();
  const { required, gridColumn, gridRow } = schema;
  const isRequired = required?.some((columnId) => columnId === column);
  const colLabel = `${prefix}${column}`;
  return (
    <>
      <Field
        label={`${translate.t(`${colLabel}.fieldLabel`)}`}
        required={isRequired}
        gridColumn={gridColumn ?? "span 4"}
        gridRow={gridRow ?? "span 1"}
      >
        <Input
          {...register(`${colLabel}`, { required: isRequired })}
          autoComplete="off"
        />
        {errors[colLabel] && (
          <Text color={"red.400"}>
            {translate.t(`${colLabel}.fieldRequired`)}
          </Text>
        )}
      </Field>
    </>
  );
};
