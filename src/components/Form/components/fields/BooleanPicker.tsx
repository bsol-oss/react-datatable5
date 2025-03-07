import { CheckboxCard } from "@/components/ui/checkbox-card";
import { Field } from "@/components/ui/field";
import { Text } from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";
import { useSchemaContext } from "../../useSchemaContext";
import { CustomJSONSchema7 } from "../types/CustomJSONSchema7";

export interface DatePickerProps {
  column: string;
  schema: CustomJSONSchema7;
  prefix: string;
}

export const BooleanPicker = ({ schema, column, prefix }: DatePickerProps) => {
  const {
    watch,
    formState: { errors },
    setValue,
  } = useFormContext();
  const { translate } = useSchemaContext();
  const { required, gridColumn, gridRow } = schema;
  const isRequired = required?.some((columnId) => columnId === column);
  const colLabel = `${prefix}${column}`;
  const value = watch(colLabel);
  return (
    <Field
      label={`${translate.t(`${colLabel}.fieldLabel`)}`}
      required={isRequired}
      alignItems={"stretch"}
      {...{
        gridColumn,
        gridRow,
      }}
    >
      <CheckboxCard
        checked={value}
        variant={"surface"}
        onSelect={() => {
          setValue(colLabel, !value);
        }}
      />
      {errors[`${column}`] && (
        <Text color={"red.400"}>
          {translate.t(`${colLabel}.fieldRequired`)}
        </Text>
      )}
    </Field>
  );
};
