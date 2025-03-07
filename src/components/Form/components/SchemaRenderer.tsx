import { Text } from "@chakra-ui/react";
import { idPickerSanityCheck } from "../Form";
import { ArrayRenderer } from "./ArrayRenderer";
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

export interface SchemaRendererProps {
  column: string;
  schema: CustomJSONSchema7;
  prefix: string;
}

export const SchemaRenderer = ({
  schema,
  prefix,
  column,
}: SchemaRendererProps) => {
  const colSchema = schema;
  const {
    type,
    variant,
    properties: innerProperties,
    foreign_key,
    items,
  } = schema;
  if (type === "string") {
    if ((schema.enum ?? []).length > 0) {
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
    if (items) {
      return <ArrayRenderer schema={colSchema} {...{ prefix, column }} />;
    }
    return <Text>{`array ${column}`}</Text>;
  }
  if (type === "null") {
    return <Text>{`null ${column}`}</Text>;
  }
  return <Text>missing type</Text>;
};
