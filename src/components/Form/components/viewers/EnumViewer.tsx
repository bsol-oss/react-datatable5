import { Tag } from "@/components/ui/tag";
import { Flex, Text } from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";
import { Field } from "../../../ui/field";
import { CustomJSONSchema7 } from "../types/CustomJSONSchema7";
import { useFormI18n } from "../../utils/useFormI18n";

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
  const formI18n = useFormI18n(column, prefix);
  const { required } = schema;
  const isRequired = required?.some((columnId) => columnId === column);
  const { gridColumn = "span 12", gridRow = "span 1", renderDisplay } = schema;
  const colLabel = formI18n.colLabel;
  const watchEnum = watch(colLabel);
  const watchEnums = (watch(colLabel) ?? []) as string[];

  return (
    <Field
      label={formI18n.label()}
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
              <Tag key={item} size="lg">
                {!!renderDisplay === true
                  ? renderDisplay(item)
                  : formI18n.t(item)}
              </Tag>
            );
          })}
        </Flex>
      )}
      {!isMultiple && <Text>{formI18n.t(watchEnum)}</Text>}

      {errors[`${column}`] && (
        <Text color={"red.400"}>{formI18n.required()}</Text>
      )}
    </Field>
  );
};
