import { Text } from "@chakra-ui/react";
import { idPickerSanityCheck } from "../Form";
import { useSchemaContext } from "../useSchemaContext";
import { BooleanPicker } from "./BooleanPicker";
import { DatePicker } from "./DatePicker";
import { EnumPicker } from "./EnumPicker";
import { FilePicker } from "./FilePicker";
import { IdPicker } from "./IdPicker";
import { NumberInputField } from "./NumberInputField";
import { RecordInput } from "./RecordInput";
import { StringInputField } from "./StringInputField";
import { TagPicker } from "./TagPicker";

export const ColumnRenderer = ({ column }) => {
  const { schema } = useSchemaContext();
  const { properties } = schema;
  console.log(properties, column, "kbopoktj");
  if (properties === undefined) {
    return <></>;
  }
  // @ts-expect-error find suitable type
  const { type, variant, foreign_key } = properties[column];

  if (type === "string") {
    // @ts-expect-error find suitable type
    if ((properties[column].enum ?? []).length > 0) {
      return <EnumPicker column={column} />;
    }
    if (variant === "id-picker") {
      idPickerSanityCheck(column, foreign_key);
      return <IdPicker column={column} />;
    }
    if (variant === "date-picker") {
      return <DatePicker column={column} />;
    }
    return <StringInputField column={column} />;
  }
  if (type === "number" || type === "integer") {
    return <NumberInputField column={column} />;
  }
  if (type === "boolean") {
    return <BooleanPicker column={column} />;
  }
  if (type === "object") {
    return <RecordInput column={column} />;
  }
  if (type === "array") {
    if (variant === "id-picker") {
      idPickerSanityCheck(column, foreign_key);
      return <IdPicker column={column} isMultiple />;
    }
    if (variant === "tag-picker") {
      return <TagPicker column={column} />;
    }
    if (variant === "file-picker") {
      return <FilePicker column={column} />;
    }
    return <Text>{`array ${column}`}</Text>;
  }
  if (type === "null") {
    return <Text>{`null ${column}`}</Text>;
  }
  return <Text>missing type</Text>;
};
