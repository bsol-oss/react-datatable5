import { Text } from "@chakra-ui/react";
import { idPickerSanityCheck } from "../Form";
import { BooleanPicker } from "./BooleanPicker";
import { DatePicker } from "./DatePicker";
import { EnumPicker } from "./EnumPicker";
import { FilePicker } from "./FilePicker";
import { IdPicker } from "./IdPicker";
import { NumberInputField } from "./NumberInputField";
import { ObjectInput } from "./ObjectInput";
import { RecordInput } from "./RecordInput";
import { CustomJSONSchema7, StringInputField } from "./StringInputField";
import { TagPicker } from "./TagPicker";

export interface ColumnRendererProps {
  column: string;
  properties: Record<string, CustomJSONSchema7>;
  prefix: string;
}

export const ColumnRenderer = ({
  column,
  properties,
  prefix,
}: ColumnRendererProps) => {
  if (properties === undefined) {
    return <></>;
  }
  console.log(
    `${column} does not exist when using ColumnRenderer`,
   { properties,
    column,
    prefix,},
    "fdpok"
  );
  const colSchema = properties[column];
  if (colSchema === undefined) {
    throw new Error(`${column} does not exist when using ColumnRenderer`);

    return <></>;
  }
  const { type, variant, foreign_key, properties: innerProperties } = colSchema;

  if (type === "string") {
    if ((properties[column].enum ?? []).length > 0) {
      return <EnumPicker schema={colSchema} {...{ prefix, column }} />;
    }
    if (variant === "id-picker") {
      idPickerSanityCheck(column, foreign_key);
      return <IdPicker schema={colSchema} {...{ prefix, column }} />;
    }
    if (variant === "date-picker") {
      return <DatePicker schema={colSchema} {...{ prefix, column }} />;
    }
    return <StringInputField schema={colSchema} {...{ prefix, column }} />;
  }
  if (type === "number" || type === "integer") {
    return <NumberInputField schema={colSchema} {...{ prefix, column }} />;
  }
  if (type === "boolean") {
    return <BooleanPicker schema={colSchema} {...{ prefix, column }} />;
  }
  if (type === "object") {
    if (innerProperties) {
      return <ObjectInput schema={colSchema} {...{ prefix, column }} />;
    }
    return <RecordInput schema={colSchema} {...{ prefix, column }} />;
  }
  if (type === "array") {
    if (variant === "id-picker") {
      idPickerSanityCheck(column, foreign_key);
      return (
        <IdPicker
          schema={colSchema}
          {...{ prefix, column, isMultiple: true }}
        />
      );
    }
    if (variant === "tag-picker") {
      return <TagPicker schema={colSchema} {...{ prefix, column }} />;
    }
    if (variant === "file-picker") {
      return <FilePicker schema={colSchema} {...{ prefix, column }} />;
    }
    return <Text>{`array ${column}`}</Text>;
  }
  if (type === "null") {
    return <Text>{`null ${column}`}</Text>;
  }
  return <Text>missing type</Text>;
};
