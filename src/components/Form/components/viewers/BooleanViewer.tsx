import { Field } from "@/components/ui/field";
import { Text } from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";
import { useSchemaContext } from "../../useSchemaContext";
import { CustomJSONSchema7 } from "../types/CustomJSONSchema7";
import { removeIndex } from "../../utils/removeIndex";

export interface BooleanViewerProps {
  column: string;
  schema: CustomJSONSchema7;
  prefix: string;
}

export const BooleanViewer = ({
  schema,
  column,
  prefix,
}: BooleanViewerProps) => {
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
    <Field
      label={`${translate.t(removeIndex(`${colLabel}.fieldLabel`))}`}
      required={isRequired}
      alignItems={"stretch"}
      {...{
        gridColumn,
        gridRow,
      }}
    >
      <Text>
        {value
          ? translate.t(`${colLabel}.true`)
          : translate.t(`${colLabel}.false`)}
      </Text>
      {errors[`${column}`] && (
        <Text color={"red.400"}>
          {translate.t(removeIndex(`${colLabel}.fieldRequired`))}
        </Text>
      )}
    </Field>
  );
};
