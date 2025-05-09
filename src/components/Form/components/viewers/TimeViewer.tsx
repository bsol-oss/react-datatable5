import { Field } from "@/components/ui/field";
import { Text } from "@chakra-ui/react";
import dayjs from "dayjs";
import { useFormContext } from "react-hook-form";
import { useSchemaContext } from "../../useSchemaContext";
import { removeIndex } from "../../utils/removeIndex";
import { CustomJSONSchema7 } from "../types/CustomJSONSchema7";

export interface TimeViewerProps {
  column: string;
  schema: CustomJSONSchema7;
  prefix: string;
}

export const TimeViewer = ({ column, schema, prefix }: TimeViewerProps) => {
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
      label={`${translate.t(removeIndex(`${column}.field_label`))}`}
      required={isRequired}
      alignItems={"stretch"}
      {...{
        gridColumn,
        gridRow,
      }}
    >
      <Text>
        {selectedDate !== undefined
          ? dayjs(selectedDate).format("hh:mm A")
          : ""}
      </Text>

      {errors[`${column}`] && (
        <Text color={"red.400"}>{translate.t(`${column}.field_required`)}</Text>
      )}
    </Field>
  );
};
