import { Text, Textarea } from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";
import { Field } from "../../../ui/field";
import { useSchemaContext } from "../../useSchemaContext";
import { removeIndex } from "../../utils/removeIndex";
import { CustomJSONSchema7 } from "../types/CustomJSONSchema7";

export interface TextAreaInputProps {
  column: string;
  schema: CustomJSONSchema7;
  prefix: string;
}

export interface ForeignKeyProps {
  column: string;
  table: string;
  display_column: string;
}
export const TextAreaInput = ({
  column,
  schema,
  prefix,
}: TextAreaInputProps) => {
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
        gridColumn={gridColumn ?? "span 4"}
        gridRow={gridRow ?? "span 1"}
      >
        <Textarea
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
