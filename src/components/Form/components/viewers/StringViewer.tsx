import { Input, Text } from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";
import { Field } from "../../../ui/field";
import { useSchemaContext } from "../../useSchemaContext";
import { CustomJSONSchema7 } from "../types/CustomJSONSchema7";
import { removeIndex } from "../../utils/removeIndex";

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
export const StringViewer = ({
  column,
  schema,
  prefix,
}: StringInputFieldProps) => {
  const {
    watch,
    formState: { errors },
  } = useFormContext();
  const { translate } = useSchemaContext();
  const { required, gridColumn, gridRow } = schema;
  const isRequired = required?.some((columnId) => columnId === column);
  const colLabel = `${prefix}${column}`;
  const value = watch(colLabel);
  return (
    <>
      <Field
        label={`${translate.t(removeIndex(`${colLabel}.fieldLabel`))}`}
        required={isRequired}
        gridColumn={gridColumn ?? "span 4"}
        gridRow={gridRow ?? "span 1"}
      >
        <Text>{value}</Text>
        {errors[colLabel] && (
          <Text color={"red.400"}>
            {translate.t(removeIndex(`${colLabel}.fieldRequired`))}
          </Text>
        )}
      </Field>
    </>
  );
};
