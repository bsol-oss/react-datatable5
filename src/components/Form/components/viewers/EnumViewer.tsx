import { Tag } from "@/components/ui/tag";
import { Flex, Text } from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";
import { Field } from "../../../ui/field";
import { useSchemaContext } from "../../useSchemaContext";
import { CustomJSONSchema7 } from "../types/CustomJSONSchema7";
import { removeIndex } from "../../utils/removeIndex";

export interface EnumViewerProps {
  column: string;
  isMultiple?: boolean;
  schema: CustomJSONSchema7;
  prefix: string;
}

export const EnumViewer = ({
  column,
  isMultiple = false,
  schema,
  prefix,
}: EnumViewerProps) => {
  const {
    watch,
    formState: { errors },
  } = useFormContext();
  const { translate } = useSchemaContext();
  const { required } = schema;
  const isRequired = required?.some((columnId) => columnId === column);
  const { gridColumn, gridRow, renderDisplay } = schema;
  const colLabel = `${prefix}${column}`;
  const watchEnum = watch(colLabel);
  const watchEnums = (watch(colLabel) ?? []) as string[];

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
      {isMultiple && (
        <Flex flexFlow={"wrap"} gap={1}>
          {watchEnums.map((enumValue) => {
            const item = enumValue;
            if (item === undefined) {
              return <>undefined</>;
            }
            return (
              <Tag closable>
                {!!renderDisplay === true
                  ? renderDisplay(item)
                  : translate.t(removeIndex(`${colLabel}.${item}`))}
              </Tag>
            );
          })}
        </Flex>
      )}
      {!isMultiple && (
        <Text>{translate.t(removeIndex(`${colLabel}.${watchEnum}`))}</Text>
      )}

      {errors[`${column}`] && (
        <Text color={"red.400"}>
          {translate.t(removeIndex(`${colLabel}.fieldRequired`))}
        </Text>
      )}
    </Field>
  );
};
