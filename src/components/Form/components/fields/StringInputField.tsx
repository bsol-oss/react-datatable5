import { Input, Text } from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";
import { Field } from "../../../ui/field";
import { useSchemaContext } from "../../useSchemaContext";
import { removeIndex } from "../../utils/removeIndex";
import { InputDefaultProps } from "./types";

export interface StringInputFieldProps extends InputDefaultProps {}

export interface ForeignKeyProps {
  column: string;
  table: string;
  display_column: string;
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
  const { required, gridColumn = "span 4", gridRow = "span 1" } = schema;
  const isRequired = required?.some((columnId) => columnId === column);
  const colLabel = `${prefix}${column}`;
  return (
    <>
      <Field
        label={`${translate.t(removeIndex(`${colLabel}.field_label`))}`}
        required={isRequired}
        gridColumn={gridColumn}
        gridRow={gridRow}
      >
        <Input
          {...register(`${colLabel}`, { required: isRequired })}
          autoComplete="off"
        />
        {errors[colLabel] && (
          <Text color={"red.400"}>
            {translate.t(removeIndex(`${colLabel}.field_required`))}
          </Text>
        )}
      </Field>
    </>
  );
};
