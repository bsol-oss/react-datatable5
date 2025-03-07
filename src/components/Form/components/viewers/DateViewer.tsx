import { Field } from "@/components/ui/field";
import { Text } from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";
import { useSchemaContext } from "../../useSchemaContext";
import { removeIndex } from "../../utils/removeIndex";
import { CustomJSONSchema7 } from "../types/CustomJSONSchema7";

export interface DateViewerProps {
  column: string;
  schema: CustomJSONSchema7;
  prefix: string;
}

export const DateViewer = ({ column, schema, prefix }: DateViewerProps) => {
  const {
    watch,
    formState: { errors },
  } = useFormContext();
  const { translate } = useSchemaContext();
  const { required, gridColumn, gridRow } = schema;
  const isRequired = required?.some((columnId) => columnId === column);
  const colLabel = `${prefix}${column}`;
  const selectedDate = watch(colLabel);
  return (
    <Field
      label={`${translate.t(removeIndex(`${column}.fieldLabel`))}`}
      required={isRequired}
      alignItems={"stretch"}
      {...{
        gridColumn,
        gridRow,
      }}
    >
      <Text> {selectedDate !== undefined ? selectedDate : ""}</Text>

      {errors[`${column}`] && (
        <Text color={"red.400"}>{translate.t(`${column}.fieldRequired`)}</Text>
      )}
    </Field>
  );
};
