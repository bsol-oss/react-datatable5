import { Text } from "@chakra-ui/react";
import { idPickerSanityCheck } from "../core/FormRoot";
import { CustomJSONSchema7 } from "../types/CustomJSONSchema7";
import { ArrayViewer } from "./ArrayViewer";
import { BooleanViewer } from "./BooleanViewer";
import { DateViewer } from "./DateViewer";
import { EnumViewer } from "./EnumViewer";
import { FileViewer } from "./FileViewer";
import { IdViewer } from "./IdViewer";
import { NumberViewer } from "./NumberViewer";
import { ObjectViewer } from "./ObjectViewer";
import { RecordInput } from "./RecordViewer";
import { TagViewer } from "./TagViewer";
import { StringViewer } from "./StringViewer";
import { CustomViewer } from "./CustomViewer";

export interface SchemaRendererProps {
  column: string;
  schema: CustomJSONSchema7;
  prefix: string;
}

export const SchemaViewer = ({
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
  if (variant === "custom-input") {
    return <CustomViewer schema={colSchema} {...{ prefix, column }} />;
  }
  if (type === "string") {
    if ((schema.enum ?? []).length > 0) {
      return <EnumViewer schema={colSchema} {...{ prefix, column }} />;
    }
    if (variant === "id-picker") {
      idPickerSanityCheck(column, foreign_key);
      return <IdViewer schema={colSchema} {...{ prefix, column }} />;
    }
    if (variant === "date-picker") {
      return <DateViewer schema={colSchema} {...{ prefix, column }} />;
    }
    return <StringViewer schema={colSchema} {...{ prefix, column }} />;
  }
  if (type === "number" || type === "integer") {
    return <NumberViewer schema={colSchema} {...{ prefix, column }} />;
  }
  if (type === "boolean") {
    return <BooleanViewer schema={colSchema} {...{ prefix, column }} />;
  }
  if (type === "object") {
    if (innerProperties) {
      return <ObjectViewer schema={colSchema} {...{ prefix, column }} />;
    }
    return <RecordInput schema={colSchema} {...{ prefix, column }} />;
  }
  if (type === "array") {
    if (variant === "id-picker") {
      idPickerSanityCheck(column, foreign_key);
      return (
        <IdViewer
          schema={colSchema}
          {...{ prefix, column, isMultiple: true }}
        />
      );
    }
    if (variant === "tag-picker") {
      return <TagViewer schema={colSchema} {...{ prefix, column }} />;
    }
    if (variant === "file-picker") {
      return <FileViewer schema={colSchema} {...{ prefix, column }} />;
    }
    if (items) {
      return <ArrayViewer schema={colSchema} {...{ prefix, column }} />;
    }
    return <Text>{`array ${column}`}</Text>;
  }
  if (type === "null") {
    return <Text>{`null ${column}`}</Text>;
  }
  return <Text>missing type</Text>;
};
